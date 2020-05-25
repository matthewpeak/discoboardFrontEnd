import React, { Component } from 'react'
import './form.css'

export default class AddSeq extends Component {
    state={
        note:"",
        octave:"",
        synth:"",
        length:""
        
    }
    



    handleInputChange(event) {
        const target = event.target;
        const value = target.value ;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
     
    render() {
        return (
            //display:'flex',flexDirection:'column'
            <form  style={{ height:'100%',width:'100%', border:'0px', display:'flex',flexDirection:'column', justifyContent:'space-around'}}onSubmit={e=> this.props.handleAddSeq(e)}>
            <div style={{  border:'0px', justifyContent:'space-between', display:'flex'}}>
            <label className='label'>
              Note
              </label>
            <select className="select"  onChange={e=>this.handleInputChange(e)} name="note">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">G</option>
             </select>
           
           </div>
           <div style={{  border:'0px', justifyContent:'space-between', display:'flex'}}>
            <label className='label'>
             Octave
             </label>
             <select className="select" onChange={e=>this.handleInputChange(e)} name="octave">
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
            <label className='label'>
             Synth
             </label>
             <select className="select" onChange={e=>this.handleInputChange(e)} name="synth">
                <option value="default">Default</option>
                <option value="fm">FM</option>
                <option value="am">AM</option>
                <option value="mem">Membrane</option>
             </select>
             </div>
             <div style={{  border:'0px', justifyContent:'space-between', display:'flex'}}>
            <label className='label'>
             Length
             </label>
             <select className="select" onChange={e=>this.handleInputChange(e)} name="length">
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
           
            <input className='submit' type="submit" value="save" />
          </form>
            
        )
    }
}
