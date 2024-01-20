import React, { useEffect, useRef, useMemo, useState } from 'react'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

const Earth = (props: EarthProps): JSX.Element => {
  const { mode } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const currentModeConfig = modeConfig[mode]

  /**
   * 加载贴图
   */
  const [textureLoading, setTextureLoading] = useState(false)
  const [loadingError, setLoadingError] = useState('')
  const texture = useMemo(() => {
    if (typeof window !== 'undefined') {
      setTextureLoading(true)
      return new THREE.TextureLoader().load(
        currentModeConfig.projection,
        t => {
          if (t === texture) {
            setTextureLoading(false)
            setLoadingError('')
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        error => {
          logger.earth.error('加载贴图出错', error)
          setTextureLoading(false)
          setLoadingError((error as Error).message || '贴图加载失败')
        },
      )
    }
    return new THREE.Texture()
  }, [currentModeConfig])

  const handleCloseError = (): void => {
    setLoadingError('')
  }

  /**
   * 创建球体并加入场景
   */
  const scene = useMemo(() => {
    const scene = new THREE.Scene()
    if (textureLoading || loadingError) {
      return scene
    }

    const group = new THREE.Group()
    group.position.set(0, 0, 0)

    const geometry = new THREE.BufferGeometry()
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: currentModeConfig.lineColor,
        transparent: true,
      }),
    )

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    })
    const earth = new THREE.Mesh(geometry, material)

    group.add(line)
    group.add(earth)

    line.geometry.dispose()
    line.geometry = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(constant.sphereRadius),
    )
    earth.geometry.dispose()
    earth.geometry = new THREE.SphereGeometry(constant.sphereRadius)

    scene.add(group)

    return scene
  }, [currentModeConfig, texture, textureLoading, loadingError])

  /**
   * 渲染
   */
  useEffect(() => {
    if (!canvasRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }
    if (scene.children.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }
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
      cancelAnimationFrame(requestId)
      window.removeEventListener('resize', handleWindowResize)
      controls.dispose()
    }
  }, [scene])

  return (
    <section className={styles.earth}>
      <canvas className={styles.canvas} ref={canvasRef} />
      {textureLoading && <SimpleLoading title='贴图加载中' />}
      {loadingError && (
        <SimpleError message={loadingError} onConfirm={handleCloseError} />
      )}
    </section>
  )
}

export default Earth
