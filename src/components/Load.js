import React, { Component } from 'react'

export default class load extends Component {
    state={
        songs:[],
        value:"lalala"
    }
    componentDidMount(){

    fetch("http://localhost:3000/songs")
    .then(res=>res.json())
    .then(data=>this.setState({songs:data}))
    }

    change(event){
        this.setState({value: event.target.value});
        
    }
    render() {
        
      const showSongs= this.state.songs.map((song,index)=><option key={index} value={song.id}>{song.name}</option>)
        return (
        <div className="custom-select" >
            <select value={this.state.value} onChange={e=>this.change(e)}>
              <option>select a loop</option>
              {showSongs}
            </select>
            <button onClick={()=>this.props.loadLoop(this.state.value)}>Load Loop</button>
          </div>
        )
    }
}
