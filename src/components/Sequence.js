import React, { Component,Fragment } from 'react'
import Note from './Note'
import Tone from 'tone'


export default class Sequence extends Component {
   
    // componentDidMount(){
    //     this.checkNotes()
    // }
    // checkNotes(){
    //     let newNotes=[...this.state.displayNotes]
    //     for (let i = this.state.displayNotes.length; i <= this.state.noteLength; i++) {
    //          newNotes.push(<Note key={i}/>)
    //      }
    //      this.setState({displayNotes:newNotes})
    // }
   
    render() {
    //    console.log(this.props.noteValues)
      
       
        const showNotes = this.props.noteValues.map((note,index) => <Note key={index} handleNotePLay={this.props.handleNotePLay} seqNum={this.props.seqNum} noteNum={index} played={note}/>);
       
        return (
          <div onClick={()=>this.props.editSequenceClick(this.props.seqNum)}>
         <button onClick={e=>this.props.handleSubtract(e,this.props.seqNum)} > - </button> {showNotes} <button onClick={e=>this.props.handleAdd(e,this.props.seqNum)}> + </button>
          </div>
        )
    }
}
