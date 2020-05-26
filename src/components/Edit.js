import React, { Component } from 'react'
import Envelope from './Envelope'
export default class EditCard extends Component {
    state={
        note: this.props.seqNote.charAt(0),
        octave: this.props.seqNote.charAt(1),
        synth:this.props.seqSynthType,
        length:this.props.seqLength,
        display:"sequence"
    }
    




    handleInputChange(event) {
        const target = event.target;
        const value = target.value ;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      handleDisplayChange=()=>{
         this.state.display==="sequence"? this.setState({display:"envelope"}):this.setState({display:"sequence"})
      }
    
      render() {
      if(this.state.display==="sequence"){
        return (
            <div>
            <form onSubmit={e=> this.props.handleEdit(e,this.props.seqNum)}>
            <label>
             Note
             <select id="selectNotes" value={this.state.note} onChange={e=>this.handleInputChange(e)} name="note">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">G</option>
             </select>
            </label>
            <label>
             Octave
             <select id="selectOctaves" value={this.state.octave} onChange={e=>this.handleInputChange(e)} name="octave">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
             </select>
             
            </label>
            <label>
             synth
             <select id="selectNotes" value={this.state.synth} onChange={e=>this.handleInputChange(e)} name="synth">
                <option value="default">Default</option>
                <option value="fm">FM</option>
                <option value="am">AM</option>
                <option value="mem">Membrane</option>
             </select>
            </label>
            <label>
             length
             <select id="selectLength" value={this.state.length} onChange={e=>this.handleInputChange(e)} name="length">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
             </select>
            </label>
            <input type="submit" value="EDIT SEQUENCE" />
            </form>
            <button onClick={this.handleDisplayChange}> Synth Envelope </button>
             <button onClick={()=>this.props.handleRemoveSequence(this.props.seqNum)}>DELETE SEQUENCE</button>
             </div>
        )} else{
           return(
           <div>
             <Envelope value={this.props.seqNum} seqNum={this.props.seqNum} handleEditSynth={this.props.handleEditSynth} editSynth={this.props.editSynth}/>
             <button onClick={this.handleDisplayChange}> Synth Envelope </button>
          </div>
         )
        } 
    }
}


