import * as THREE from 'three'
import { expect, test } from 'vitest'

import { createRubikModel } from './rubikModel'

test('the model has separated rounded bodies and 54 flat photo faces', () => {
  const model = createRubikModel()
  expect(model.group.children).toHaveLength(26)
  expect(
    model.group.children.reduce(
      (count, cube) => count + cube.children.length - 1,
      0,
    ),
  ).toBe(54)
  const body = model.group.children[0].children[0] as THREE.Mesh
  body.geometry.computeBoundingBox()
  const size = body.geometry.boundingBox?.getSize(new THREE.Vector3())
  expect(size?.x).toBeLessThan(10)
  expect(size?.y).toBeLessThan(10)
  const photo = model.group.children[0].children[1] as THREE.Mesh
  photo.geometry.computeBoundingBox()
  expect(photo.geometry.boundingBox?.max.z).toBe(0)
  expect(photo.geometry.boundingBox?.min.z).toBe(0)
  const uv = photo.geometry.getAttribute('uv')
  for (let i = 0; i < uv.count; i += 1) {
    expect(uv.getX(i)).toBeGreaterThanOrEqual(-1e-6)
    expect(uv.getX(i)).toBeLessThanOrEqual(1 + 1e-6)
    expect(uv.getY(i)).toBeGreaterThanOrEqual(-1e-6)
    expect(uv.getY(i)).toBeLessThanOrEqual(1 + 1e-6)
  }
  model.dispose()
})

test('changing photos preserves geometry and releases old textures', () => {
  const model = createRubikModel()
  const cube = model.group.children[0]
  const first = new THREE.Texture()
  const second = new THREE.Texture()
  let released = 0
  first.addEventListener('dispose', () => {
    released += 1
  })
  second.addEventListener('dispose', () => {
    released += 1
  })
  model.setTexture(first)
  expect(first.colorSpace).toBe(THREE.SRGBColorSpace)
  model.setTexture(second)
  expect(released).toBe(1)
  expect(model.group.children[0]).toBe(cube)
  model.dispose()
  expect(released).toBe(2)
})
