import * as THREE from 'three'
import React, { Component} from 'react'
import Note from './Note'
import { Canvas } from 'react-three-fiber'

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
            <div className="sequenceButtons"style={{display:"flex",justifyContent:"space-between",width:"100px", margin: "0 auto"}}>
              <div className="minusBtn" onClick={e=>this.props.handleSubtract(e,this.props.seqNum)} style={{width:"24px", height:"24px"}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="currentColor"/></svg></div>
              <div className="plusBtn"  onClick={e=>this.props.handleAdd(e,this.props.seqNum)}      style={{width:"24px", height:"24px"}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor"/></svg></div>
              </div>
          </div>
        )
    }
}
