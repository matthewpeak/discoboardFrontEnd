import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'

function Note(props) {
  
  const mesh = useRef()
   
  const noteColor={
    "A":"#09FBD3",
    "B":"#08F7fe",
    "D":"#E92efb",
    "E":"#ff2079",
    "F":"#ff6ec7",
    "G":"#F5D300"
  }
 
  console.log(props.note)
 console.log(noteColor[props.note])

  const [hovered, setHover] = useState(false)
  // const [active, setActive] = useState(false)

  
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
    const color= props.played===false? "white": noteColor[props.note]
    // const onHover = useCallback((e, value) => {
    //     e.stopPropagation();
    //     setIsHovered(value);
    //   }, [setIsHovered]);
     
  
  return (
      
    <mesh
      position={props.pos}
      ref={mesh}
      scale={hovered? [1.75, 1.75, 1.75] : [1, 1, 1]}
      onClick={(e)=>props.handleNotePLay(e,props.seqNum,props.noteNum)}
      onPointerOver={(e) =>{ setHover(true);  if (!e) var e = window.event; e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation();}}
      onPointerOut={(e) => {setHover(false);if(!e) var e = window.event; e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation();} }>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" metalness={.0} color={hovered ? noteColor[props.note] : color} />
    </mesh>
  )
}
export default Note