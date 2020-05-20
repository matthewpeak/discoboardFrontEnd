import React, { Component } from 'react'

import {  Canvas} from 'react-three-fiber'
import Particles from './Particles'
import {OrbitControls} from 'drei'
import Tone from 'tone'

export default class Zzzaaa extends Component {
    state={
        test:[[null],[null],[null]],
        playing:false,
        toneID:""
    }
    
    handlePlay=()=>{
        if(this.state.playing===false){
            let index=0
            let    PlaySynths    = this.props.synths
            let    PlayNotes     = this.props.notes
            let    PlaySequences = this.props.sequences
            let    newTest       = []
            this.props.sequences.forEach(s=>newTest.push([null]))
            let repeat=(time)=> {
                let step = index % 8;
                for (let i = 0; i < PlaySequences.length; i++) {
                  let synth = PlaySynths[i],
                      note = PlayNotes[i],
                      sequence = PlaySequences[i],
                      input = sequence[step];
                  if (input===true){ synth.triggerAttackRelease(note, '8n', time); 
                  newTest[i][0]=step; 
                  newTest.forEach(test=> test[0]===step?null:test[0]=null);
                  this.setState({test:newTest})}
                }
                index++;
              }
              this.setState({toneID: Tone.Transport.scheduleRepeat(repeat, '8n')})
              Tone.Transport.start();
            this.setState({playing:true})
        }else{
            let newTests=[]
            this.props.sequences.forEach(s=>newTests.push([null]))
            Tone.Transport.stop();
            Tone.Transport.clear(this.state.toneID);
            this.setState({playing:false})
            this.setState({test:newTests})
        }
        
    }
    render() {
            
    let particlez=[]
    let x =-50
    for (let index = 0; index < this.props.sequences.length; index++) {
        particlez.push(<Particles key={index} played={this.state.test[index][0]===null?false:true} x={x} count={150}/>)
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
          <button onClick={this.props.handleDisco}>I'd rather not Disco rn</button>
          <button onClick={this.handlePlay}>{this.state.playing ? "IT BE PLAYING" : "IT AINT PLAYING"}</button>
        </div>
    )
    }
}
