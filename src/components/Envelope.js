import React, { Component } from 'react'

export default class Envelope extends Component {
    state={
        attack:this.props.editSynth.envelope.attack,
        decay:this.props.editSynth.envelope.decay,
        sustain:this.props.editSynth.envelope.sustain,
        release:this.props.editSynth.envelope.release,
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
        console.log(this.props.editSynth)
        console.log(this.state.attack)
        return (
            <div>
                Attack Slider
                 <input type="range" min="0.00" max="2.00" step=".01" value={this.state.attack} onChange={this.onChange} name="attack"></input>
                 Decay Slider
                 <input type="range" min="0.00" max="2.00" step=".01" value={this.state.attack} onChange={this.onChange} name="decay"></input>
                 Release Slider
                 <input type="range" min="0.00" max="1.00" step=".01" value={this.state.attack} onChange={this.onChange} name="sustain"></input>
                 Sustain Slider
                 <input type="range" min="0.00" max="4.00" step=".01" value={this.state.attack} onChange={this.onChange} name="release"></input>
            </div>
        )
    }
}
