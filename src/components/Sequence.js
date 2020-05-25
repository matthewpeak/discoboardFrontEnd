import * as THREE from 'three'
import React, { Component,Fragment } from 'react'
import Note from './Note'
import Tone from 'tone'
import { Canvas, useFrame } from 'react-three-fiber'

export default class Sequence extends Component {
   
   
   
    render() {
    
        var z=-12
        let showNotes=[]
       
        for(let index=0;index<this.props.noteValues.length;index++){
          if(this.props.currentNote[this.props.seqNum][0]===index){
          showNotes.push( <Note key={index} pos={[z,1,0]} handleNotePLay={this.props.handleNotePLay} note={this.props.note} seqNum={this.props.seqNum} noteNum={index} played={this.props.noteValues[index]}/>)
          z=z+3.2
          }else{
            showNotes.push( <Note key={index}  pos={[z,0,0]} handleNotePLay={this.props.handleNotePLay} seqNum={this.props.seqNum} note={this.props.note} noteNum={index} played={this.props.noteValues[index]}/>)
          z=z+3.2
          }
         }  

        let y= <group>{showNotes}</group>
       
        return (
          <div className="sequence" onClick={(e)=>this.props.editSequenceClick(e,this.props.seqNum)}>
          <Canvas  gl={{ alpha: false, logarithmicDepthBuffer: true}} onCreated={({ gl }) => {
          gl.setClearColor('white')
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputEncoding = THREE.sRGBEncoding
          }} >      <pointLight position={[100, 100, 100]} intensity={2.2} />
          <pointLight position={[-100, -100, -100]} intensity={5} />{y}</Canvas> 
          <div className="sequenceButtons">
          <button onClick={e=>this.props.handleSubtract(e,this.props.seqNum)} > - </button> 
          <button onClick={e=>this.props.handleAdd(e,this.props.seqNum)}> + </button>
          </div>
          </div>
        )
    }
}
