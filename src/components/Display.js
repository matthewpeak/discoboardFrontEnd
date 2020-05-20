import * as THREE from 'three'

import React from 'react'
import {  Canvas} from 'react-three-fiber'
import Particles from './Particles'

function Display({handleDisco,sequences}) {
    
 
    let particlez=[]
    for (let index = 0; index < sequences; index++) {
        particlez.push(<Particles key={index}  count={150}/>)
        
    }
    const y=<group>particlez</group>
    return(
        <div style={{ position:'absolute', width: '100%', height: '100%' }}>
         <Canvas camera={{ fov: 75, position: [0, 0, 70] }}>
              <ambientLight intensity={1.1} />
              <Particles  count={150}/>
          </Canvas>
          <button onClick={handleDisco}>I'd rather not Disco rn</button>
        </div>
    )
}
export default Display 