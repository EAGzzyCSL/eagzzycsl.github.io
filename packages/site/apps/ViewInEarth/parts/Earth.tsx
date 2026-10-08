import React, { useEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import SimpleError from '@/share/SimpleError'
import SimpleLoading from '@/share/SimpleLoading'
import logger from '@/utils/logger'

import cylindricalProjectionLight from '../assets/eo_base_2020_clean_geo.webp'
import cylindricalProjectionDark from '../assets/world.topo.bathy.200407.3.webp'
import { TMode } from '../type'

import styles from './Earth.module.scss'

interface IModeConfig {
  projection: string
  lineColor: number
}

const constant = {
  minFov: 30,
  initFov: 60,
  maxFov: 100,
  cameraNear: 1,
  cameraFar: 2100,
  sphereRadius: 2000,
} as const

const modeConfig: Record<TMode, IModeConfig> = {
  light: {
    projection: cylindricalProjectionLight,
    lineColor: 0x333333,
  },
  dark: {
    projection: cylindricalProjectionDark,
    lineColor: 0xffffff,
  },
}

interface EarthProps {
  mode: TMode
}

const Earth = (props: EarthProps): React.JSX.Element => {
  const { mode } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const viewRef = useRef<{
    position: THREE.Vector3
    quaternion: THREE.Quaternion
    fov: number
  } | null>(null)
  const currentModeConfig = modeConfig[mode]

  /**
   * 加载贴图
   */
  const [textureLoading, setTextureLoading] = useState(false)
  const [loadingError, setLoadingError] = useState('')
  const [textureResource, setTextureResource] = useState<{
    projection: string
    texture: THREE.Texture
  } | null>(null)

  useEffect(() => {
    let active = true
    setTextureLoading(true)
    setLoadingError('')
    setTextureResource(null)
    const texture = new THREE.TextureLoader().load(
      currentModeConfig.projection,
      loadedTexture => {
        if (active) {
          setTextureResource({
            projection: currentModeConfig.projection,
            texture: loadedTexture,
          })
          setTextureLoading(false)
          setLoadingError('')
        }
      },
      undefined,
      error => {
        if (active) {
          logger.earth.error('加载贴图出错', error)
          setTextureLoading(false)
          setLoadingError((error as Error).message || '贴图加载失败')
        }
      },
    )

    return () => {
      active = false
      texture.dispose()
    }
  }, [currentModeConfig])

  /**
   * 创建场景并渲染，资源由本次 effect 持有和释放
   */
  useEffect(() => {
    if (
      !canvasRef.current ||
      !textureResource ||
      textureResource.projection !== currentModeConfig.projection ||
      textureLoading ||
      loadingError
    ) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }

    const scene = new THREE.Scene()
    const group = new THREE.Group()
    const geometry = new THREE.SphereGeometry(constant.sphereRadius)
    const wireframeGeometry = new THREE.WireframeGeometry(geometry)
    // 默认线框只有每格的一条对角线，补上另一条；两极是三角形，无需补线。
    const { widthSegments, heightSegments } = geometry.parameters
    const vertices = geometry.getAttribute('position')
    const wireframePositions = Array.from(
      wireframeGeometry.getAttribute('position').array,
    )
    for (let row = 1; row < heightSegments - 1; row += 1) {
      for (let column = 0; column < widthSegments; column += 1) {
        const topRight = row * (widthSegments + 1) + column + 1
        const bottomLeft = (row + 1) * (widthSegments + 1) + column
        const endpoints = [topRight, bottomLeft]
        endpoints.forEach(index => {
          wireframePositions.push(
            vertices.getX(index),
            vertices.getY(index),
            vertices.getZ(index),
          )
        })
      }
    }
    wireframeGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(wireframePositions, 3),
    )
    const lineMaterial = new THREE.LineBasicMaterial({
      color: currentModeConfig.lineColor,
      transparent: true,
    })
    const material = new THREE.MeshBasicMaterial({
      map: textureResource.texture,
      side: THREE.BackSide,
    })
    const line = new THREE.LineSegments(wireframeGeometry, lineMaterial)
    // 从球内观察，将线框向球心收缩 0.1%，避免与球面重合产生深度冲突。
    line.scale.setScalar(0.999)
    const earth = new THREE.Mesh(geometry, material)
    group.add(line)
    group.add(earth)
    scene.add(group)

    /**
     * 创建渲染器
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    })

    renderer.setPixelRatio(devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    /**
     * 创建相机
     */
    const camera = new THREE.PerspectiveCamera(
      constant.initFov,
      window.innerWidth / window.innerHeight,
      constant.cameraNear,
      constant.cameraFar,
    )
    camera.position.y = 0
    camera.position.x = 0
    camera.position.z = -1
    camera.lookAt(0, 0, constant.sphereRadius)

    /**
     * 添加控制器
     */
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.rotateSpeed *= -1
    controls.enableZoom = false
    controls.enablePan = false
    controls.minDistance = 1
    controls.maxDistance = 1
    if (viewRef.current) {
      camera.position.copy(viewRef.current.position)
      controls.update()
      camera.quaternion.copy(viewRef.current.quaternion)
      camera.fov = viewRef.current.fov
      camera.updateProjectionMatrix()
    }

    // 缩放只改变视角，相机始终保持在球心附近。
    const canvas = renderer.domElement
    const zoom = (factor: number): void => {
      camera.fov = THREE.MathUtils.clamp(
        camera.fov * factor,
        constant.minFov,
        constant.maxFov,
      )
      camera.updateProjectionMatrix()
    }
    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault()
      let unit = 1
      if (event.deltaMode === 1) unit = 16
      if (event.deltaMode === 2) unit = canvas.clientHeight
      zoom(Math.exp(THREE.MathUtils.clamp(event.deltaY * unit * 0.001, -1, 1)))
    }
    const touches = new Map<number, THREE.Vector2>()
    const getPinchDistance = (): number => {
      if (touches.size !== 2) return 0
      const [first, second] = Array.from(touches.values())
      return first.distanceTo(second)
    }
    const handlePointerDown = (event: PointerEvent): void => {
      if (event.pointerType === 'touch') {
        touches.set(
          event.pointerId,
          new THREE.Vector2(event.clientX, event.clientY),
        )
      }
    }
    const handlePointerMove = (event: PointerEvent): void => {
      const point = touches.get(event.pointerId)
      if (!point) return
      const previousDistance = getPinchDistance()
      point.set(event.clientX, event.clientY)
      const distance = getPinchDistance()
      if (touches.size === 2 && previousDistance > 0 && distance > 0) {
        zoom(previousDistance / distance)
      }
    }
    const handlePointerEnd = (event: PointerEvent): void => {
      touches.delete(event.pointerId)
    }
    canvas.addEventListener('wheel', handleWheel, { passive: false })
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', handlePointerEnd)
    canvas.addEventListener('pointercancel', handlePointerEnd)
    canvas.addEventListener('lostpointercapture', handlePointerEnd)
    /**
     * requestAnimationFrame完成渲染
     */
    let requestId = 0
    const render = (): void => {
      renderer.render(scene, camera)
      requestId = requestAnimationFrame(render)
    }
    render()
    /**
     * 监听窗口变动
     */
    const handleWindowResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleWindowResize)

    return () => {
      viewRef.current = {
        position: camera.position.clone(),
        quaternion: camera.quaternion.clone(),
        fov: camera.fov,
      }
      canvas.removeEventListener('wheel', handleWheel)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', handlePointerEnd)
      canvas.removeEventListener('pointercancel', handlePointerEnd)
      canvas.removeEventListener('lostpointercapture', handlePointerEnd)
      cancelAnimationFrame(requestId)
      window.removeEventListener('resize', handleWindowResize)
      controls.dispose()
      geometry.dispose()
      wireframeGeometry.dispose()
      lineMaterial.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [currentModeConfig, textureResource, textureLoading, loadingError])

  return (
    <section className={styles.earth}>
      <canvas className={styles.canvas} ref={canvasRef} />
      {textureLoading && <SimpleLoading title='贴图加载中' />}
      {loadingError && (
        <SimpleError
          message={loadingError}
          onConfirm={() => {
            setLoadingError('')
          }}
        />
      )}
    </section>
  )
}

export default Earth
