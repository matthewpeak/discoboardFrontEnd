import * as THREE from 'three'
import React, { Component,Suspense } from 'react'

import {  Canvas} from 'react-three-fiber'
import Particles from './Particles'
import {OrbitControls} from 'drei'
import Tone from 'tone'
import DiscoBoard from './DiscoBoard'
import Effect from './Effect'

import BallDrop from './BallDrop'

export default class Zzzaaa extends Component {
    state={
        test:[[null],[null],[null],[null],[null],[null],[null],[null],[null],[null],[null],[null],[null]],
        playing:false,
        toneID:"",
        ballDrop:false
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
    handleDrop=()=>{

    }
    render() {
            
    let particlez=[]
    // -50 works for two 
    //-250 works for 6
    let x =  -(this.props.sequences.length-1)*100/2
    for (let index = 0; index < this.props.sequences.length; index++) {
        particlez.push(<Particles key={index} note={this.props.notes[index].charAt(0)} played={this.state.test[index][0]===null?false:true} x={x} count={1000}/>)
        x=x+100;
    }
    let y = <group>{[...particlez]}</group>
   
    return(
        
        <div style={{ position:'absolute', width: '100%', height: '100%' }}>
         <Canvas  gl={{ antialias: false, alpha: false }} camera={{ fov: 75, position: [0, 0, 1000] }} onCreated={({ gl }) => gl.setClearColor('black')}>>
              
              
              {/* <pointLight   position={[100, 100, 100]} intensity={2.2} /> */}
              {/* <pointLight position={[-100, -100, -100]} intensity={2.2} /> */}
              <pointLight distance={130} intensity={2.2} color="white" position={[300, 0, 0]} /> 
              <pointLight distance={130} intensity={2.2} color="white" position={[200, 0, 0]} /> 
              <pointLight distance={130} intensity={2.2} color="white" position={[100, 0, 0]} /> 
              <pointLight distance={130} intensity={2.2} color="white" />
              <pointLight distance={130} intensity={2.2} color="white" position={[-100, 0, 0]} /> 
              <pointLight distance={130} intensity={2.2} color="white" position={[-200, 0, 0]} /> 
              <pointLight distance={130} intensity={2.2} color="white" position={[-300, 0, 0]} /> 
              <pointLight distance={130} intensity={2.2} color="white" position={[0, -100, 0]} /> 
              <OrbitControls />
              <Suspense fallback={null}>
                 {y}
                 
                 <DiscoBoard hAlign="left" position={[0.5, 18, -100]} handlePlay={this.handlePlay} children="LETS" />
                 <DiscoBoard hAlign="left" position={[13.7, 0, -100]} handlePlay={this.handlePlay} children="DISCO" />
                 <DiscoBoard hAlign="left" position={[9, -16, -100]}  handlePlay={this.handlePlay} children="BABY" />
                 <BallDrop  hAlign="left" position={[-40, -50, -100]} disco={this.state.playing} handleDrop={this.handleDrop} children="DROP" />
                 <BallDrop hAlign="left" position={[-5, -50, -100]}  disco={this.state.playing} handleDrop={this.handleDrop} children="THE" />
                 <BallDrop hAlign="left" position={[50, -50, -100]}  disco={this.state.playing} handleDrop={this.handleDrop} children="BALL" />
                <Effect/>
               </Suspense>
              
          </Canvas>
          <button style={{position:'fixed',zIndex:'100' ,bottom:'50px', left:'300px'}} onClick={this.props.handleDisco}>I'd rather not Disco rn</button>
          <button style={{position:'fixed',zIndex:'100', bottom:'50px'}} onClick={this.handlePlay}>{this.state.playing ? "IT BE PLAYING" : "IT AINT PLAYING"}</button>
        </div>
    )
    }
}
