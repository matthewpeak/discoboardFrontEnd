import React, { Component } from 'react'
import './form.css'
export default class load extends Component {
    state={
        songs:[],
        value:""
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
        <div style={{display:'flex',flexDirection:"column", justifyContent:'center', height:'100%',width:'100%'}} >
            <select className="loadSelect" value={this.state.value} onChange={e=>this.change(e)}>
            <option value={null}>Select Loop</option>
              {showSongs}
            </select>
            <button onClick={this.props.playing===false?()=>this.props.loadLoop(this.state.value):null}>{this.props.playing===false?"Load Loop":"Pause Music To Load"}</button>
          </div>
        )
    }
}
