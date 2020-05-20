import React, { Component,Fragment } from 'react'
import Note from './Note'
import Tone from 'tone'
import { Canvas, useFrame } from 'react-three-fiber'

export default class Sequence extends Component {
   
   
   
    render() {
    //    console.log(this.props.noteValues)
      ///pick a color for the note 
        var z=-12
        let showNotes=[]
        //  const showNotes = this.props.noteValues.map((note,index) => <Note key={index} pos={[z+index+2.2,0,0]} handleNotePLay={this.props.handleNotePLay} seqNum={this.props.seqNum} noteNum={index} played={note}/> );
        for(let index=0;index<this.props.noteValues.length;index++){
          if(this.props.currentNote[this.props.seqNum][0]===index){
          showNotes.push( <Note key={index} pos={[z,1,0]} handleNotePLay={this.props.handleNotePLay} seqNum={this.props.seqNum} noteNum={index} played={this.props.noteValues[index]}/>)
          z=z+3.2
          }else{
            showNotes.push( <Note key={index}  pos={[z,0,0]} handleNotePLay={this.props.handleNotePLay} seqNum={this.props.seqNum} noteNum={index} played={this.props.noteValues[index]}/>)
          z=z+3.2
          }
         }  

        let y= <group>{showNotes}</group>
       
        return (
          <div onClick={(e)=>this.props.editSequenceClick(e,this.props.seqNum)}>
         <button onClick={e=>this.props.handleSubtract(e,this.props.seqNum)} > - </button>  <Canvas><ambientLight/> <pointLight position={[10, 10, 10]}/> {y}</Canvas> <button onClick={e=>this.props.handleAdd(e,this.props.seqNum)}> + </button>
          </div>
        )
    }
}
