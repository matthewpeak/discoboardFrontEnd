import React, { Component } from 'react'

export default class Note extends Component {
   
   
    render() {
        
        return (
            <div onClick={(e)=>this.props.handleNotePLay(e,this.props.seqNum,this.props.noteNum)}  style={{border: "2px solid black",display: "inline-block", margin:"0 10px" ,width:"10px",height:"10px",background:this.props.played===false? "white":"red"}}>
                {/* {this.props.played===false? "no":"yes"} */}
            </div>
        )
    }
}
