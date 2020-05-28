import * as THREE from 'three'

import React, {  useRef, useMemo } from 'react'
import {  useFrame } from 'react-three-fiber'

function Particles({note,count,played,x}) {
    
        
            const mesh = useRef()
            const dummy = useMemo(() => new THREE.Object3D(), [])
            var zex=x
            const noteColor={
              "A":"#08F7fe",
              "B":"#21ff25",
              "C":"#7122fa",
              "D":"#FF3300",
              "E":"#ff2079",
              "F":"#FF0000",
              "G":"#F5D300"
            }



            const particles = useMemo(() => {
              const temp = []
              for (let i = 0; i < count; i++) {
                const t = Math.random() * 100
                const factor = 20 + Math.random() * 100
                const speed = 0.01 + Math.random() / 200
                const xFactor = x
                const yFactor = -20 + Math.random() * 40
                const zFactor = -20 + Math.random() * 40
                temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
              }
              return temp
            }, [count])
          
            useFrame(state => {
             if(played===false){
              const time = state.clock.getElapsedTime()
             
                let i = 0
                for (let x = 0; x < 10; x++)
                  for (let y = 0; y < 10; y++)
                    for (let z = 0; z < 10; z++) {
                      const id = i++
                      dummy.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
                      dummy.rotation.z = dummy.rotation.y * 2
                      dummy.position.set(zex - x, 5 - y, 5 - z)
                      dummy.scale.set(0.7, 0.7, 0.7)
                      dummy.updateMatrix()
                      mesh.current.setMatrixAt(id, dummy.matrix)
                    }
                mesh.current.instanceMatrix.needsUpdate = true
             }else{
                particles.forEach((particle, i) => {
                    let { t, factor, speed, xFactor, yFactor, zFactor } = particle
                    t = particle.t += speed / 2
                    const a = Math.cos(t) + Math.sin(t * 1) / 10
                    const b = Math.sin(t) + Math.cos(t * 2) / 10
                    const s = Math.max(1.5, Math.cos(t) * 5)
                    dummy.position.set(
                      (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 4,
                      (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                      (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
                    )
                    dummy.scale.set(0.7, 0.7, 0.7)
                    dummy.updateMatrix()
                    mesh.current.setMatrixAt(i, dummy.matrix)
                  })
                  mesh.current.instanceMatrix.needsUpdate = true
              }
            })
            
            return (
              <>
                <instancedMesh ref={mesh} args={[null, null, count]}>
                  <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]} />
                  <meshPhongMaterial attach="material" color={noteColor[note]} />
                </instancedMesh>
              </>
            )
      
}

export default Particles