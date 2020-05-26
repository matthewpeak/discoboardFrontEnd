import React, { Component } from 'react'

export default class Envelope extends Component {
    state={
        attack:this.props.editSynth.envelope.attack,
        decay:this.props.editSynth.envelope.decay,
        sustain:this.props.editSynth.envelope.sustain,
        release:this.props.editSynth.envelope.release,
    }
    handleChange=(event)=> {
        const target = event.target;
        const value = target.value ;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    render() {
      
        return (
            <div>
                 Attack 
                 <input type="range" min="0.00" max="2.00" step=".01" value={this.state.attack} onChange={e=>this.handleChange(e)} name="attack"></input>
                 Decay 
                 <input type="range" min="0.00" max="2.00" step=".01" value={this.state.decay} onChange={e=>this.handleChange(e)} name="decay"></input>
                 Release 
                 <input type="range" min="0.00" max="1.00" step=".01" value={this.state.release} onChange={e=>this.handleChange(e)} name="release"></input>
                 Sustain 
                 <input type="range" min="0.00" max="4.00" step=".01" value={this.state.sustain} onChange={e=>this.handleChange(e)} name="sustain"></input>
                 <button onClick={e=>this.props.handleEditSynth(e,this.state.attack,this.state.decay,this.state.release,this.state.sustain,this.props.seqNum)}>Edit Synth</button>
            </div>
        
        )
    }
}
