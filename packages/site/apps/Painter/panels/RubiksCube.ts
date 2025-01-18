/* eslint-disable max-classes-per-file */
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three-stdlib'

const CUBE_SIZE = 10

interface CubeMeshProps {
  position: THREE.Vector3
  materials: THREE.MeshBasicMaterial[]
}

class CubeMesh extends THREE.Mesh {
  constructor({ position, materials }: CubeMeshProps) {
    super(
      new RoundedBoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, 2, 1),
      materials,
    )
    this.position.x = position.x
    this.position.y = position.y
    this.position.z = position.z
  }
}

const generateCubeCluster = (materials: THREE.MeshBasicMaterial[]) => {
  const v = [-1, 0, 1]
  const cubes: CubeMesh[] = []
  v.forEach(x => {
    v.forEach(y => {
      v.forEach(z => {
        const cube = new CubeMesh({
          position: new THREE.Vector3(
            x * CUBE_SIZE,
            y * CUBE_SIZE,
            z * CUBE_SIZE,
          ),
          materials,
        })
        cubes.push(cube)
      })
    })
  })
  return cubes
}

export class RubikCube {
  private camera: THREE.PerspectiveCamera

  private renderer: THREE.Renderer

  private scene: THREE.Scene

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new THREE.PerspectiveCamera()
    this.camera.position.set(35, 35, 35)
    this.camera.lookAt(0, -3, 0)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
      alpha: true,
      // 需要添加 preserveDrawingBuffer 参数才能让 toDataURL 生效
      // https://discourse.threejs.org/t/converting-canvas-to-image-doesnt-work/16831
      preserveDrawingBuffer: true,
    })
    this.scene = new THREE.Scene()
  }

  public updateMaterials(materials: THREE.MeshBasicMaterial[]) {
    this.resize()

    this.scene.clear()
    this.scene.add(...generateCubeCluster(materials))

    // 直接 render 的话是黑的，有个 Timeout 就能好
    setTimeout(() => {
      this.render()
    }, 100)
  }

  private resize() {
    const canvas = this.renderer.domElement
    const width = canvas.clientWidth * window.devicePixelRatio
    const height = canvas.clientHeight * window.devicePixelRatio

    if (canvas.width !== width || canvas.height !== height) {
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height, false)
    }
  }

  private render() {
    this.renderer.render(this.scene, this.camera)
  }
}
