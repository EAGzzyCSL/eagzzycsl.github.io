import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three-stdlib'

export const DEFAULT_BODY_COLOR = '#f2f2f2'

const SPACING = 10
const BODY_SIZE = 9.6
const PHOTO_SIZE = 8.6
const PHOTO_RADIUS = 0.35

const createPhotoGeometry = (): THREE.ShapeGeometry => {
  const half = PHOTO_SIZE / 2
  const corner = half - PHOTO_RADIUS
  const shape = new THREE.Shape()
  shape.moveTo(-corner, -half)
  shape.lineTo(corner, -half)
  shape.quadraticCurveTo(half, -half, half, -corner)
  shape.lineTo(half, corner)
  shape.quadraticCurveTo(half, half, corner, half)
  shape.lineTo(-corner, half)
  shape.quadraticCurveTo(-half, half, -half, corner)
  shape.lineTo(-half, -corner)
  shape.quadraticCurveTo(-half, -half, -corner, -half)
  const geometry = new THREE.ShapeGeometry(shape, 6)
  const positions = geometry.getAttribute('position')
  const uv = geometry.getAttribute('uv')
  for (let i = 0; i < positions.count; i += 1) {
    uv.setXY(
      i,
      positions.getX(i) / PHOTO_SIZE + 0.5,
      positions.getY(i) / PHOTO_SIZE + 0.5,
    )
  }
  return geometry
}

export const createRubikModel = () => {
  const group = new THREE.Group()
  const bodyGeometry = new RoundedBoxGeometry(
    BODY_SIZE,
    BODY_SIZE,
    BODY_SIZE,
    4,
    0.35,
  )
  const photoGeometry = createPhotoGeometry()
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: DEFAULT_BODY_COLOR,
    roughness: 0.4,
    metalness: 0,
  })
  const photoMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.82,
    metalness: 0,
  })
  // The photo plane's +Z normal is rotated onto each exposed face.
  const faces = [
    { axis: 'x', side: 1, rotation: [0, Math.PI / 2, 0] },
    { axis: 'x', side: -1, rotation: [0, -Math.PI / 2, 0] },
    { axis: 'y', side: 1, rotation: [-Math.PI / 2, 0, 0] },
    { axis: 'y', side: -1, rotation: [Math.PI / 2, 0, 0] },
    { axis: 'z', side: 1, rotation: [0, 0, 0] },
    { axis: 'z', side: -1, rotation: [0, Math.PI, 0] },
  ] as const
  const coordinates = [-1, 0, 1]
  coordinates.forEach(x => {
    coordinates.forEach(y => {
      coordinates.forEach(z => {
        if (x === 0 && y === 0 && z === 0) return
        const cube = new THREE.Group()
        cube.position.set(x * SPACING, y * SPACING, z * SPACING)
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        body.castShadow = true
        body.receiveShadow = true
        cube.add(body)
        const position = { x, y, z }
        faces.forEach(({ axis, side, rotation }) => {
          if (position[axis] !== side) return
          const photo = new THREE.Mesh(photoGeometry, photoMaterial)
          photo.position[axis] = side * (BODY_SIZE / 2 + 0.015)
          photo.rotation.set(rotation[0], rotation[1], rotation[2])
          photo.receiveShadow = true
          cube.add(photo)
        })
        group.add(cube)
      })
    })
  })
  return {
    group,
    setBodyColor(color: string): void {
      bodyMaterial.color.set(color)
    },
    setTexture(texture: THREE.Texture): void {
      photoMaterial.map?.dispose()
      // The model owns the supplied texture from this point.
      // eslint-disable-next-line no-param-reassign
      texture.colorSpace = THREE.SRGBColorSpace
      photoMaterial.map = texture
      photoMaterial.needsUpdate = true
    },
    dispose(): void {
      group.clear()
      bodyGeometry.dispose()
      photoGeometry.dispose()
      bodyMaterial.dispose()
      photoMaterial.map?.dispose()
      photoMaterial.dispose()
    },
  }
}
