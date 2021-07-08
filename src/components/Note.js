import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'

function Note(props) {
  
  const mesh = useRef()
   
  const noteColor={
    "A":"#08F7fe",
    "B":"#21ff25",
    "C":"#7122fa",
    "D":"#FF3300",
    "E":"#ff2079",
    "F":"#FF0000",
    "G":"#F5D300"
  }
 
  

  const [hovered, setHover] = useState(false)
  
  
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
    const color= props.played===false? "white": noteColor[props.note]
   
     
  
  return (
      
    <mesh
      position={props.pos}
      ref={mesh}
      scale={hovered? [1.75, 1.75, 1.75] : [1, 1, 1]}
      onClick={(e)=>props.handleNotePLay(e,props.seqNum,props.noteNum)}
      onPointerOver={(e) =>{ setHover(true);  if (!e)  e = window.event; e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation();}}
      onPointerOut={(e) => {setHover(false);if(!e)  e = window.event; e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation();} }>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" metalness={.0} color={hovered ? noteColor[props.note] : color} />
    </mesh>
  )
}
export default Note