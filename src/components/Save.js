import React, { Component } from 'react'

export default class Save extends Component {
    state={
        name:""
    }
    handleChange=(event)=> {
        this.setState({name: event.target.value});
      }
    
      render() {
        return (
          <form style={{paddingTop:'30px'}} onSubmit={e=>this.props.handleSave(e,this.state.name)}>
            <label >
              Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <input type="submit" value="save" />
          </form>
        );
      }
}

