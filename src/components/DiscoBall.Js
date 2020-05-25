
import * as THREE from 'three'

import React, {  useRef, useMemo } from 'react'
import {  useFrame } from 'react-three-fiber'

function DiscoBall(props) {
    
              const mesh = useRef()
              const dummy = useMemo(() => new THREE.Object3D(), [])
              var zex=x
              const noteColor={
                "A":"#09FBD3",
                "B":"#08F7fe",
                "D":"#E92efb",
                "E":"#ff2079",
                "F":"#ff6ec7",
                "G":"#F5D300"
              }
  
  
  
              const particles = useMemo(() => {
                const temp = []
                  const t = Math.random() * 100
                  const factor = 20 + Math.random() * 100
                  const speed = 0.01 + Math.random() / 200
                  const xFactor = x
                  const yFactor = -20 + Math.random() * 40
                  const zFactor = -20 + Math.random() * 40
                  temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
                
                return temp
              })
            
              useFrame(state => {
                 {
                        const id = i++
                        dummy.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
                        dummy.rotation.z = dummy.rotation.y * 2
                        dummy.position.set(zex - x, 5 - y, 5 - z)
                        dummy.scale.set(0.7, 0.7, 0.7)
                        dummy.updateMatrix()
                        mesh.current.setMatrixAt(id, dummy.matrix)
                      }
                  mesh.current.instanceMatrix.needsUpdate = true
               })
              
              return (
                <>
                  <instancedMesh ref={mesh} args={[null, null, null]}>
                    <shphereBufferGeometry attach="geometry" args={[50, 50, 50]} />
                    <meshPhongMaterial attach="material" color={red} />
                  </instancedMesh>
                </>
              )
        

}

export default DiscoBall