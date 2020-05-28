import * as THREE from 'three'

import React, {useState,useEffect}from 'react'
import {  Canvas} from 'react-three-fiber'
import Particles from './Particles'
import {OrbitControls} from 'drei'
import Tone from 'tone'
import { useRef } from 'react'
function Display({handleDisco,sequences,synths,notes,oldTests}) {
  const [playing, setPlaying] = useState(false)
  const [tests, setTests]=useState([[null],[null]])
  const [toneID,setToneID]=useState()
 
  
  const handlePlay=()=>{
        if(playing===false){
            
            let index=0
            let    PlaySynths = synths
            let    PlayNotes = notes
            let    PlaySequences = sequences
            let newTest=[[null],[null]]
            // sequences.forEach(s=>newTest.push([]))
            
            let repeat=(time)=> {
               
                let step = index % 8;
                for (let i = 0; i < PlaySequences.length; i++) {
                  let synth = PlaySynths[i],
                      note = PlayNotes[i],
                      sequence = PlaySequences[i],
                      input = sequence[step];
                  if (input===true){ synth.triggerAttackRelease(note, '8n', time); 
                 
                  newTest[i][0]=step; 
                  newTest.forEach(test=> test[0]===step?null:test[0]=null)
                 
                  
                  setTests(newTest);
                 }
                }
                index++;
              }
             setToneID( Tone.Transport.scheduleRepeat(repeat, '8n'))
              Tone.Transport.start();
              setPlaying(true)
        }else{
            let newTests=[]
            sequences.forEach(s=>newTests.push([null]))
            Tone.Transport.stop();
            Tone.Transport.clear(toneID);
            setPlaying(false)
            setTests(newTests)
        }
        
    }
   
    
    let particlez=[]
    let x =-50
    for (let index = 0; index < sequences.length; index++) {
        particlez.push(<Particles key={index} played={tests[index][0]===null?false:true} x={x} count={150}/>)
        x=x+100;
    }
    let y = <group>{particlez}</group>
   
    return(
        
        <div style={{ position:'absolute', width: '100%', height: '90%' }}>
         <Canvas camera={{ fov: 75, position: [0, 0, 1000] }}>
              <ambientLight intensity={1.1} />
             
              <OrbitControls />
              {y}
          </Canvas>
          <button onClick={handleDisco}>I'd rather not Disco rn</button>
          <button onClick={handlePlay}>{playing ? "IT BE PLAYING" : "IT AINT PLAYING"}</button>
        </div>
    )
}
export default Display 