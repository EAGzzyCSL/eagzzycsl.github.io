import * as THREE from 'three'

import { createRubikModel } from './rubikModel'
import { clampView, DEFAULT_VIEW, getCameraPosition } from './rubikView'
import type { RubikView } from './rubikView'

export class RubikCube {
  private camera: THREE.PerspectiveCamera

  private renderer: THREE.WebGLRenderer

  private scene: THREE.Scene

  private resizeObserver: ResizeObserver

  private model = createRubikModel()

  private renderFrame: number | undefined

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new THREE.PerspectiveCamera()
    this.camera.position.set(...getCameraPosition(DEFAULT_VIEW))
    this.camera.lookAt(0, -3, 0)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
      alpha: true,
      // 需要添加 preserveDrawingBuffer 参数才能让 toDataURL 生效
      // https://discourse.threejs.org/t/converting-canvas-to-image-doesnt-work/16831
      preserveDrawingBuffer: true,
    })
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowMap
    // Geometry and lights stay fixed; camera and material changes reuse the shadow map.
    this.renderer.shadowMap.autoUpdate = false
    this.renderer.shadowMap.needsUpdate = true
    this.scene = new THREE.Scene()
    this.scene.add(this.model.group)
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x67707c, 1.5))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
    keyLight.position.set(-30, 60, 45)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(1024, 1024)
    Object.assign(keyLight.shadow.camera, {
      left: -30,
      right: 30,
      top: 30,
      bottom: -30,
      near: 1,
      far: 150,
    })
    keyLight.shadow.bias = -0.0001
    keyLight.shadow.normalBias = 0.02
    this.scene.add(keyLight)
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.4)
    fillLight.position.set(50, 20, 30)
    this.scene.add(fillLight)
    this.resizeObserver = new ResizeObserver(() => {
      this.render()
    })
    this.resizeObserver.observe(canvas)
  }

  public setBodyColor(color: string): void {
    this.model.setBodyColor(color)
    this.render()
  }

  public updateTexture(texture: THREE.Texture): void {
    // eslint-disable-next-line no-param-reassign
    texture.anisotropy = Math.min(
      8,
      this.renderer.capabilities.getMaxAnisotropy(),
    )
    this.model.setTexture(texture)
    this.render()
  }

  public setView(view: RubikView): void {
    this.camera.position.set(...getCameraPosition(clampView(view)))
    this.camera.lookAt(0, -3, 0)
    if (this.renderFrame === undefined) {
      this.renderFrame = requestAnimationFrame(() => {
        this.renderFrame = undefined
        this.render()
      })
    }
  }

  public toDataURL(): string {
    // Flush the latest angle if saving before the scheduled frame runs.
    this.render()
    return this.renderer.domElement.toDataURL()
  }

  public dispose(): void {
    this.cancelRender()
    this.resizeObserver.disconnect()
    this.model.dispose()
    this.scene.traverse(object => {
      if (object instanceof THREE.DirectionalLight) object.dispose()
    })
    this.scene.clear()
    this.renderer.dispose()
  }

  private cancelRender(): void {
    if (this.renderFrame !== undefined) cancelAnimationFrame(this.renderFrame)
    this.renderFrame = undefined
  }

  private render(): void {
    this.cancelRender()
    const canvas = this.renderer.domElement
    // Hidden panels have no layout size. Wait for ResizeObserver to report visibility.
    if (!canvas.clientWidth || !canvas.clientHeight) return
    const width = Math.floor(canvas.clientWidth * window.devicePixelRatio)
    const height = Math.floor(canvas.clientHeight * window.devicePixelRatio)
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight
    this.camera.updateProjectionMatrix()
    if (canvas.width !== width || canvas.height !== height) {
      this.renderer.setSize(width, height, false)
    }
    this.renderer.render(this.scene, this.camera)
  }
}
