import React, { Component } from 'react'
import Envelope from './Envelope'
import './form.css'
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
            <div style={{ height:'100%',width:'100%', borderLeft:"1px solid black", display:'flex',flexDirection:'column', justifyContent:'space-around'}}>
            <form onSubmit={e=> this.props.handleEdit(e,this.props.seqNum)}>
            <div style={{  border:'0px', justifyContent:'space-between', display:'flex'}}>
            <label className="label">
             Note
             </label>
             <select className="select" value={this.state.note} onChange={e=>this.handleInputChange(e)} name="note">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
             </select>
             </div>
             <div style={{  border:'0px', justifyContent:'space-between', display:'flex'}}>
            <label className="label">
             Octave
             </label>
             <select className="select"  value={this.state.octave} onChange={e=>this.handleInputChange(e)} name="octave">
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
             </div>
             <div style={{  border:'0px', justifyContent:'space-between', display:'flex'}}>
            <label className="label">
             Synth
             </label>
             <select className="select"  value={this.state.synth} onChange={e=>this.handleInputChange(e)} name="synth">
                <option value="default">Default</option>
                <option value="fm">FM</option>
                <option value="am">AM</option>
                <option value="mem">Membrane</option>
             </select>
           </div>
           <div style={{  border:'0px', justifyContent:'space-between', display:'flex'}}>
            <label className="label">
             Length
             </label>
             <select className="select"  value={this.state.length} onChange={e=>this.handleInputChange(e)} name="length">
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
            </div>
            <div style={{paddingTop:'8px'}}>
            <input  type="submit" value="Save Edit" />
            <button onClick={this.handleDisplayChange}> Synth Envelope </button>
             <button style ={{color:"red"}}onClick={()=>this.props.handleRemoveSequence(this.props.seqNum)}>DELETE SEQUENCE</button>
            </div>
            </form>
            {/* <div style={{width:"100%",borderLeft:"1px solid black"}}>
            <button onClick={this.handleDisplayChange}> Synth Envelope </button>
             <button style ={{color:"red"}}onClick={()=>this.props.handleRemoveSequence(this.props.seqNum)}>DELETE SEQUENCE</button>
             </div> */}
             </div>
        )} else{
           return(
            <div >
             <Envelope value={this.props.seqNum} handleDisplayChange={this.handleDisplayChange} seqNum={this.props.seqNum} handleEditSynth={this.props.handleEditSynth} editSynth={this.props.editSynth}/>
             {/* <button onClick={this.handleDisplayChange}> Back To Sequence </button> */}
           </div>
         )
        } 
    }
}


