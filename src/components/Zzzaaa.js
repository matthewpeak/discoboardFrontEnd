import * as THREE from 'three'
import React, { Component,Suspense } from 'react'
import './form.css'
import {  Canvas} from 'react-three-fiber'
import Particles from './Particles'
import {OrbitControls} from 'drei'
import Tone from 'tone'
import DiscoBoard from './DiscoBoard'
import Effect from './Effect'



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
            let    PlaySequences = this.props.Sequences
            let    newTest       = []
            this.props.Sequences.forEach(s=>newTest.push([null]))
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
            this.props.Sequences.forEach(s=>newTests.push([null]))
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
    let x =  -(this.props.Sequences.length-1)*100/2
    for (let index = 0; index < this.props.Sequences.length; index++) {
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
                <Effect/>
               </Suspense>
              
          </Canvas>
          {/* style={{zIndex:'100',color:"#FF69B4" }} */}
          <div className="controlPanel" style={{ display:"flex",justifyContent:"space-between",top:"95%", left:"30px", position: "fixed", width: "350px", fontFamily: "Stellar"}}>
           <div className="spaceParty" style={{zIndex:'100'}} onClick={this.state.playing===false? this.props.handleDisco:null}> {this.state.playing===false?"There Is Always Tomorrow Baby...":"I'm watching a dream I'll never wake up from..."} {this.state.playing===false?<svg width="16" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#FF69B4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="#FF69B4"/> </svg>:""}</div>
          <div style={{zIndex:'100'}} onClick={this.handlePlay}>{this.state.playing===false? <svg width="20" height="16"viewBox="0 0 24 24"fill="none"xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"clip-rule="evenodd"d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5Z"fill="#00FF00"/>  <path d="M16 12L10 16.3301V7.66987L16 12Z" fill="#00FF00" /></svg> : <svg width="20" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9H11V15H9V9Z" fill="#FF0000" /><path d="M15 15H13V9H15V15Z" fill="#FF0000" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" fill="#FF0000"/></svg>}</div>
          </div>
        </div>
    )
    }
}

