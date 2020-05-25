import * as THREE from 'three'
import React, { useMemo,useState } from 'react'
import { useLoader, useUpdate } from 'react-three-fiber'

export default function({ disco,handleDrop,children, vAlign = 'center', hAlign = 'center', size = 3, ...props }) {
  const font = useLoader(THREE.FontLoader, '/bold.blob')
  // clicked?[2 * size, 2 * size, 0.1]:
  const config = useMemo(
    () => ({ font, size: 40, height: 30, curveSegments: 15, bevelEnabled: true, bevelThickness: 2, bevelSize: 1.5, bevelOffset: 0, bevelSegments: 2 }),
    [font]
  )
  // onClick={clicked?setClicked(false):setClicked(true)
  
  const mesh = useUpdate(
    self => {
      const size = new THREE.Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)
      self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    },
    [children]
  )
  return (
    <group {...props} scale={ [0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}    onClick={handleDrop}>
       
        <textGeometry attach="geometry" args={[children, config]} />
        <meshStandardMaterial attach="material" color={disco?"white":"black"} />
      </mesh>
    </group>
  )
}