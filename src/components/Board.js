import React, { Component,Fragment } from 'react'
import Sequence from './Sequence'
import Load from './Load'
import Save from './Save'
import EditCard from './Edit'
import AddSeq from './AddSeq'
import Draggable from 'react-draggable'
import Envelope from './Envelope'
import Tone from 'tone'


import Zzzaaa from './Zzzaaa'


export default class Board extends Component {
    constructor() {
        super()
        this.handleLoadLoop = this.handleLoadLoop.bind(this)
        this.handleSave=this.handleSave.bind(this)
        this.handleEdit=this.handleEdit.bind(this)
        this.handleSubtract=this.handleSubtract.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
        this.handleRemoveSequence=this.handleRemoveSequence.bind(this)
        this.handleAddSeq=this.handleAddSeq.bind(this)
        
        
     }
    state={
        sequenceCounter:2,
        synthTypes:["default","fm"],
        synths:[new Tone.Synth().toMaster(),new Tone.FMSynth().toMaster()],
        Sequences:[[false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false]],
        notes:["G5","E4"],
        playing:false,
        playID:null,
        loadButton:false,
        saveButton:false,
        midiButton:false,
        addSequenceButton:false,
        discoButton:false,
        sequenceIds:[],
        songId:[],
        userId:1,
        editSequences:null,
        toneID:null,
        test:[[null],[null]],
        menuSelect:"Add Sequence",
        menuExpand: false
        
    }
   

       
  
    handlePlayButton=()=>{
        if(this.state.playing===false){
            let index=0
            let    PlaySynths    = [...this.state.synths]
            let    PlayNotes     = [...this.state.notes]
            let    PlaySequences = [...this.state.Sequences]
            let    newTest       = [...this.state.test]
            var draw=0
            let repeat=(time)=> {
                let step = index % 8;
                for (let i = 0; i < PlaySequences.length; i++) {
                  let synth = PlaySynths[i],
                      note = PlayNotes[i],
                      sequence = PlaySequences[i],
                      input = sequence[step];
                  if (input===true){ synth.triggerAttackRelease(note, '8n', time); 
                  newTest[i][0]=step; 
                  newTest.forEach(test=> test[0]===step?null:test[0]=null);
                  this.setState({test:newTest})}
                }
                index++;
              }
              this.setState({toneID: Tone.Transport.scheduleRepeat(repeat, '8n')})
              Tone.Transport.start();
            this.setState({playing:true})
        }else{
            let newTests=[]
            this.state.Sequences.forEach(s=>newTests.push([]))
            Tone.Transport.stop();
            Tone.Transport.clear(this.state.toneID);
            this.setState({playing:false})
            this.setState({test:newTests})
        }
        
    }
    handleNotePLay=(e,seqNum,noteNum)=>{
        let newSeq=[...this.state.Sequences]
         if(newSeq[seqNum][noteNum] === false){
            newSeq[seqNum][noteNum]=true
            this.setState({Sequences:newSeq})
           e.stopPropagation();
         }else{
            newSeq[seqNum][noteNum]=false
            this.setState({Sequences:newSeq})
             e.stopPropagation();
         }
        
    }
    
    loadingButtonClick=()=>{
      this.setState({menuSelect: "Saved Loops"})
    }
   

   async handleLoadLoop(songId){
      /// gotta sort the ids and make sure they line up 



      ///you addedorder to the sequence 
        let extractionOfIdNotes=[]
        let newNotes=[]
        let newSeqIds=[]
        let newTests=[]
        var newSynthTypes=[]
        
        let newSequences= await fetch("http://localhost:3000/sequences")
        .then(res=>res.json())
        .then(data=> data.filter(s => s.song_id==songId))
        .then(newData=>{
          return newData.map(s=> Object.values(s))
        })
       
        newSequences.sort((s1,s2)=>s1[2]-s2[2])
        
        newSequences.forEach(s=> newSynthTypes.push(s.pop()))

        newSequences.forEach(s=>extractionOfIdNotes.push(s.splice(0,4)))

        extractionOfIdNotes.forEach(s=>{
          newNotes.push(s[3])
          newSeqIds.push(s[0])
          newTests.push([])
        })

        // return 
        // console.log(newSequences)
        // newSequences.sort((s1,s2)=>s1[2]-s2[2])
        // console.log(newSequences)
        // newSequences.forEach(s=> extractionOfIdNotes.push(s.splice(0,3)))
       
       

      let newSynths= newSynthTypes.map(synth=>{
            if(synth==="default"){
               return new Tone.Synth().toMaster()
            }else if(synth==="fm"){
              return new Tone.FMSynth().toMaster()
            }else if(synth==="am"){
              return new Tone.AMSynth().toMaster()
            }else if(synth==="mem"){
              return new Tone.MembraneSynth().toMaster()
            }
        })
        
     
       
        console.log(newNotes)
        
        this.setState({test:newTests})
        this.setState({synthTypes:newSynthTypes})
        this.setState({notes:newNotes})
        this.setState({Sequences:newSequences}) 
        this.setState({synths:newSynths})
        this.setState({sequenceIds:newSeqIds})    
    }

 async  handleSave(e,name){
        e.preventDefault()
        
      
      
      let savedSongId= await fetch("http://localhost:3000/songs",{
      method:"POST",
      headers:{
        'content-type':'application/json',
        Accept:'application/json'
      },body:JSON.stringify({
        name:name,
        user_id:this.state.userId
      })
    })
    .then(res=>res.json())
    .then(data=> Object.values(data)[0])
    
    await Promise.all(this.state.Sequences.map( async(sequence,index)=>{
    return await  fetch("http://localhost:3000/sequences",{
      method:"POST",
      headers:{
        'content-type':'application/json',
        Accept:'application/json'
      },body:JSON.stringify({
        song_id: savedSongId,
        order:index,
        tone: this.state.notes[index],
        note1: sequence[0],
        note2: sequence[1],
        note3: sequence[2],
        note4: sequence[3],
        note5: sequence[4],
        note6: sequence[5],
        note7: sequence[6],
        note8: sequence[7],
        synth: this.state.synthTypes[index]
      })
    })
    .then(res=>res.json())
    .then(data=> {return Object.values(data)})}))

   
 }
    
   

    saveButtonClick=()=>{
        this.setState({menuSelect: "Save"})
    }
    
    editSequenceClick=(e,index)=>{
      console.log(index)
      // this.state.midiButton===false? this.setState({midiButton:true}):this.setState({midiButton:false})
      this.setState({editSequences:index})
      
      // this.state.editSequences.includes(index)? this.setState({editSequences:[...this.state.editSequences].filter(i=> i!=index)}): this.setState({editSequences:[...this.state.editSequences,index]})
      
    }

    handleEdit(e,index){
      e.preventDefault()
      const newNote= e.target.note.value+e.target.octave.value
      const newSynthType= e.target.synth.value
      
      let newSequence = [...this.state.Sequences][index]

      if (e.target.length.value>newSequence.length){
      for (let index = newSequence.length; index < e.target.length.value; index++) {
        newSequence.push(false)
       }
     }else if(e.target.length.value< newSequence.length){
       
        let delta= newSequence.length-e.target.length.value
        let slicePos= e.target.length.value - 1
        newSequence.splice(slicePos,delta)
     }
      let newSynth=null
 
      if(newSynthType==="default"){
        newSynth= new Tone.Synth().toMaster()
      }else if(newSynthType==="fm"){
        newSynth= new Tone.FMSynth().toMaster()
      }else if(newSynthType==="am"){
        newSynth= new Tone.AMSynth().toMaster()
      }else if(newSynthType==="mem"){
        newSynth= new Tone.MembraneSynth().toMaster()
      }
 
      // console.log(newSequence)
      // console.log(newSynth)
      // console.log(newSynthType)
      // console.log(newNote)

      let newSequences=[...this.state.Sequences]
      let newNotes=[...this.state.notes]
      let newSynthTypes=[...this.state.synthTypes]
      let newSynths=[...this.state.synths]

      newSequences.splice(index,1,newSequence)
      newNotes.splice(index,1,newNote)
      newSynthTypes.splice(index,1,newSynthType)
      newSynths.splice(index,1,newSynth)
 
      this.setState({notes:newNotes})
      this.setState({Sequences:newSequences})
      this.setState({synthTypes:newSynthTypes})
      this.setState({synths:newSynths})
      this.setState({editSequences:null})
    }

    handleAdd(e,seqNum){
      
      let newSequences=[...this.state.Sequences]
      newSequences[seqNum].push(false)
      this.setState({Sequences:newSequences})
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();

    }

    handleSubtract(e,seqNum){
        
        let newSequences=[...this.state.Sequences]
        newSequences[seqNum].pop()
        this.setState({Sequences:newSequences})
       if (!e) var e = window.event;
       e.cancelBubble = true;
       if (e.stopPropagation) e.stopPropagation();
    }

    handleRemoveSequence(seqNum){
      let newSequences=[...this.state.Sequences]
      let newNotes=[...this.state.notes]
      let newSynths=[...this.state.synths]
      let newSynthTypes=[...this.state.synthTypes]
      let newTest=[...this.state.test]
      

      newTest.pop()
      newSequences.splice(seqNum,1)
      newNotes.splice(seqNum,1)
      newSynths.splice(seqNum,1)
      newSynthTypes.splice(seqNum,1)



      this.setState({Sequences:newSequences})
      this.setState({editSequences:null})
      this.setState({test:newTest})
      this.setState({synths:newSynths})
      this.setState({synthTypes:newSynthTypes})
      this.setState({notes:newNotes})
    }

   

    handleAddSeq(e){
      e.preventDefault()
     const newNote= e.target.note.value+e.target.octave.value
     const newSynthType= e.target.synth.value
     
     let newSequence = []
     for (let index = 0; index < e.target.length.value; index++) {
       newSequence.push(false)
       
     }
     let newSynth=null

     if(newSynthType==="default"){
       newSynth= new Tone.Synth().toMaster()
     }else if(newSynthType==="fm"){
       newSynth= new Tone.FMSynth().toMaster()
     }else if(newSynthType==="am"){
      newSynth= new Tone.AMSynth().toMaster()
     }else if(newSynthType==="mem"){
      newSynth= new Tone.MembraneSynth().toMaster()
    }

     
     this.setState({test:[...this.state.test,[]]})
     this.setState({notes:[...this.state.notes,newNote]})
     this.setState({Sequences:[...this.state.Sequences,newSequence]})
     this.setState({synthTypes:[...this.state.synthTypes,newSynthType]})
     this.setState({synths:[...this.state.synths,newSynth]})
   

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
    
   handleEditSynth=(e,attack,decay,release,sustain,seqNum)=>{
      let newSynth= this.state.synths[seqNum]
      console.log(parseFloat(attack))
      console.log(newSynth.envelope.attack)
      
      newSynth.envelope.attack= parseFloat(attack)
      newSynth.envelope.decay= parseFloat(decay)
      newSynth.envelope.release= parseFloat(release)
      newSynth.envelope.sustain= parseFloat(sustain)
      
      let newSynths =[...this.state.synths]
      newSynths.splice(seqNum,1,newSynth)
      this.setState({synths:newSynths})
   }
    render() {

     if(this.state.discoButton===false){
       
     
     const displaySequences=this.state.Sequences.map((sequence,index)=><Sequence key={index} currentNote={this.state.test} handleSubtract={this.handleSubtract} handleAdd={this.handleAdd} editSequenceClick={this.editSequenceClick} handleNotePLay={this.handleNotePLay} seqNum={index} note={this.state.notes[index].charAt(0)} noteValues={sequence}/>)
      const editSequence=this.state.editSequences===null?"select a sequence to edit":<EditCard handleEditSynth={this.handleEditSynth} editSynth={this.state.synths[this.state.editSequences]} handleRemoveSequence={this.handleRemoveSequence} handleEdit={this.handleEdit}seqNote={this.state.notes[this.state.editSequences]} seqSynthType={this.state.synthTypes[this.state.editSequences]} seqLength={this.state.Sequences[this.state.editSequences].length} seqNum={this.state.editSequences}></EditCard>
    
      
      return (
            <div className="board" style={{height:"100vh", width:"100vw"}}>
              <div className="sequences">
             {displaySequences}
              </div>
              <Draggable>
              <div className="controlPanel" onMouseDown={e=>this.handleMouseDown(e)} onMouseUp={e=>this.handleMouseUp(e)} style={{ top:"50px", left:"30px", position: "fixed", width: "350px",border: "1px solid", fontFamily: "Stellar"}}>
                <div className="menuTop" style={{display:"flex", justifyContent:"space-between", padding:'4px',  borderBottom:"1px solid black"}}>
                <div className="title" style={{fontFamily:"GrafierDisplay"}} >
                  Let's Disco Baby!
                </div>
                <div className="playBtn" style={{ width:"20px", height:"16px" }} onClick={this.handlePlayButton}>
                { this.state.playing===false? <svg width="20" height="16"viewBox="0 0 24 24"fill="none"xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"clip-rule="evenodd"d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5Z"fill="#00FF00"/>  <path d="M16 12L10 16.3301V7.66987L16 12Z" fill="#00FF00" /></svg> : <svg width="20" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9H11V15H9V9Z" fill="#FF0000" /><path d="M15 15H13V9H15V15Z" fill="#FF0000" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" fill="#FF0000"/></svg>}
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
                 {this.state.menuExpand===false? null:
                  <div className="expandMenu" style={{display:'flex',justifyContent:"space-between",borderTop:"1px solid black"}}>
                    <div className="expandLeft" style={{ borderRight:"1px solid black", height:'100%',width:'100%', display:'flex',flexDirection:'column',justifyContent:'space-around',paddingTop:'20px',paddingBottom:'20px'}}>
                      <div className="addSequenceBtn" onClick={this.addSequenceButton}>
                        Add Sequence
                      </div>
                      <div className="Saved Loops" onClick={this.loadingButtonClick}>
                        Saved Loops
                      </div>
                      <div className="editSequence" onClick={this.handleEditClick}>
                        Edit Sequence
                      </div>
                      <div className="saveSequence"onClick={this.saveButtonClick}>
                        Save Loop
                      </div>
                    </div>
                    <div className="expandRight" style={{height:'100%',width:'100%'}} >
                      {this.state.menuSelect==="Add Sequence"?<AddSeq handleAddSeq={this.handleAddSeq}/>:null}
                      {this.state.menuSelect==="Save"?<Save handleSave={this.handleSave}/>:null}
                      {this.state.menuSelect==="Saved Loops"?<Load loadLoop={this.handleLoadLoop}/>:null}
                      {this.state.menuSelect==="Edit"?editSequence:null}
                   
                    </div>
                  </div>}
                  <div className="menuBottom" onClick={this.state.playing===false?this.handleDiscoButton:null} style={{display:"flex", padding:'4px',paddingTop:'6px', justifyContent:"space-between",borderTop:"1px solid black"}}>
                  <div  style={{color:this.state.playing===false?"#FF69B4":"black"}}>{this.state.playing===false?"See You Space Cowboy...":"Touch Me Later..."}</div>
                  <div>
                  {this.state.playing===false?<svg width="16" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#FF69B4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="#FF69B4"/> </svg>:<svg width="16" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C6.40848 3 1.71018 6.82432 0.378052 12C1.71018 17.1757 6.40848 21 12 21C17.5915 21 22.2898 17.1757 23.6219 12C22.2898 6.82432 17.5915 3 12 3ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" fill="currentColor"/></svg>}
                  </div>
                  </div>
               </div>
              </Draggable>   
             </div>
        )
     }else{
       return(
      <Fragment>
    
       <Zzzaaa  handleDisco={this.handleDiscoButton} synths={this.state.synths} oldTests={this.state.tests}notes={this.state.notes} sequences={this.state.Sequences}/>
      
      </Fragment>
       )
     }
    }
}
