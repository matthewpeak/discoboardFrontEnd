import React, { Component } from 'react'
import Draggable from 'react-draggable'
import Load from './Load'
import Save from './Save'
import EditCard from './Edit'
import AddSeq from './AddSeq'
export default class Menu extends Component {
    state={
        menuSelect:"Add Sequence",
        menuExpand: false
    }
    addSequenceButton=()=>{
        this.setState({menuSelect:"Add Sequence"})
      }
  
  
      handleDiscoButton=()=>{
        this.state.discoButton===false? this.setState({discoButton:true}):this.setState({discoButton:false})
      }
  
     handleMenuExpand=()=>{
      this.state.menuExpand===false? this.setState({menuExpand:true}):this.setState({menuExpand:false})
     }
     handleEditClick=()=>{
      this.setState({menuSelect:"Edit"})
     }
     saveButtonClick=()=>{
        this.setState({menuSelect: "Save"})
    }
    loadingButtonClick=()=>{
        this.setState({menuSelect: "Saved Loops"})
      }
    render() {
      const nodeRef = React.createRef(null);
       const {handlePlayButton,playing,handleAddSeq,handleSave,handleLoadLoop,handleEditSynth,synths,handleDiscoButton,Sequences,editSequences,handleRemoveSequence,handleEdit,notes,synthTypes}=this.props
       
       let edit=editSequences===null?"Select A Sequence To Edit": <EditCard handleEditSynth={handleEditSynth} editSynth={synths[editSequences]} handleRemoveSequence={handleRemoveSequence} handleEdit={handleEdit}seqNote={notes[editSequences]} seqSynthType={synthTypes[editSequences]} seqLength={Sequences[editSequences].length} seqNum={editSequences}></EditCard>
        return (
           <Draggable nodeRef={nodeRef}>
                 <div className="controlPanel" ref={nodeRef} style={{ top:"50px", left:"30px", position: "fixed", width: "350px",border: "1px solid", fontFamily: "Stellar"}}>
                <div className="menuTop" style={{display:"flex", justifyContent:"space-between", padding:'4px',  borderBottom:"1px solid black"}}>
                <div className="title" style={{fontFamily:"GrafierDisplay"}} >
                  Let's Disco Baby!
                </div>
                <div className="playBtn" style={{ width:"20px", height:"16px" }} onClick={handlePlayButton}>
                { playing===false? <svg width="20" height="16"viewBox="0 0 24 24"fill="none"xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd"clipRule="evenodd"d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5Z"fill="#00FF00"/>  <path d="M16 12L10 16.3301V7.66987L16 12Z" fill="#00FF00" /></svg> : <svg width="20" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9H11V15H9V9Z" fill="#FF0000" /><path d="M15 15H13V9H15V15Z" fill="#FF0000" /><path fillRule="evenodd" clipRule="evenodd" d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" fill="#FF0000"/></svg>}
                </div>
                </div>
                <div className="middle" style={{display:"flex", padding:'4px', paddingTop:'6px',justifyContent:"space-between"}}>
                  <div className="menuSelectShow">
                  {this.state.menuSelect}
                  </div>
                <div className="expandWindowBtn" onClick={this.handleMenuExpand} style={{width:"20px",height:"24px"}}>
                 {  this.state.menuExpand===false? <svg width="20" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor"/></svg>:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z" fill="currentColor"/></svg>}
                </div>
                </div>
                 {this.state.menuExpand===false? null: <div className="expandMenu" style={{display:'flex',justifyContent:"space-between",borderTop:"1px solid black"}}>
                    <div className="expandLeft" style={{ borderRight: this.state.menuSelect!=="Edit"?"1px solid black":"none", height:'100%',width:'100%', display:'flex',flexDirection:'column',justifyContent:'space-around',paddingTop:'20px',paddingBottom:'20px'}}>
                      <div className="addSequenceBtn" style={{cursor: "pointer"}} onClick={this.addSequenceButton}>
                        Add Sequence
                      </div>
                      <div className="Saved Loops" style={{cursor: "pointer"}}  onClick={this.loadingButtonClick}>
                        Saved Loops
                      </div>
                      <div className="editSequence" style={{cursor: "pointer"}}  onClick={this.handleEditClick}>
                        Edit Sequence
                      </div>
                      <div className="saveSequence" style={{cursor: "pointer"}}  onClick={this.saveButtonClick}>
                        Save Loop
                      </div>
                    </div>
                    <div className="expandRight" style={{height:'100%',width:'100%'}} >
                      {this.state.menuSelect==="Add Sequence"?<AddSeq playing={playing} handleAddSeq={handleAddSeq}/>:null}
                      {this.state.menuSelect==="Save"?<Save handleSave={handleSave}/>:null}
                      {this.state.menuSelect==="Saved Loops"?<Load playing={playing} loadLoop={handleLoadLoop}/>:null}
                      {/* look into this  */}
                      {this.state.menuSelect==="Edit"?edit:null}
                    </div>
                  </div>}
                  <div className="menuBottom" onClick={playing===false? handleDiscoButton:null} style={{display:"flex", padding:'4px',paddingTop:'6px', justifyContent:"space-between",borderTop:"1px solid black"}}>
                  <div  style={{color:playing===false?"#FF69B4":"black"}}>{playing===false?"See You Space Cowboy...":"Touch Me Later..."}</div>
                  <div>
                  {playing===false?<svg width="16" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#FF69B4"/><path fillRule="evenodd" clipRule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="#FF69B4"/> </svg>:<svg width="16" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor"/> <path fillRule="evenodd" clipRule="evenodd" d="M12 3C6.40848 3 1.71018 6.82432 0.378052 12C1.71018 17.1757 6.40848 21 12 21C17.5915 21 22.2898 17.1757 23.6219 12C22.2898 6.82432 17.5915 3 12 3ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" fill="currentColor"/></svg>}
                  </div>
                  </div>
               </div>
           </Draggable>
        )
    }
}
