import React, { Component } from 'react'
import Sequence from './Sequence'
import Load from './Load'
import Save from './Save'
import EditCard from './Edit'
import AddSeq from './AddSeq'

import Tone from 'tone'


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
        sequenceIds:[],
        songId:[],
        userId:1,
        editSequences:[],
        toneID:null
    }
   

    setSynths(){
       this.state.Sequences.forEach(sequence=>{console.log(sequence.props)})
        
    }
  
    handlePlayButton=()=>{
        if(this.state.playing===false){
            let index=0
            let    PlaySynths = [...this.state.synths]
            let    PlayNotes = [...this.state.notes]
            let    PlaySequences = [...this.state.Sequences]
            this.setState({toneID: Tone.Transport.scheduleRepeat(repeat, '8n')})
            Tone.Transport.start();
            
            function repeat(time) {
                let step = index % 8;
                for (let i = 0; i < PlaySequences.length; i++) {
                  let synth = PlaySynths[i],
                      note = PlayNotes[i],
                      sequence = PlaySequences[i],
                      input = sequence[step];
                  if (input===true) synth.triggerAttackRelease(note, '8n', time);
                }
                index++;
              }
           
            this.setState({playing:true})
        }else{
            Tone.Transport.stop();
            Tone.Transport.clear(this.state.toneID);
            this.setState({playing:false})
        }
        
    }
    handleNotePLay=(e,seqNum,noteNum)=>{
        let newSeq=[...this.state.Sequences]
         if(newSeq[seqNum][noteNum] === false){
            newSeq[seqNum][noteNum]=true
            this.setState({Sequences:newSeq})
            if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
         }else{
            newSeq[seqNum][noteNum]=false
            this.setState({Sequences:newSeq})
            if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
         }
        
    }
    
    loadingButtonClick=()=>{
        this.state.loadButton===false? this.setState({loadButton:true}):this.setState({loadButton:false})
    }
   

   async handleLoadLoop(songId){
      /// gotta sort the ids and make sure they line up 



      ///you addedorder to the sequence 
        let extractionOfIdNotes=[]
        let newNotes=[]
        let newSeqIds=[]

        var newSynthTypes=[]
        
        let newSequences= await fetch("http://localhost:3000/sequences")
        .then(res=>res.json())
        .then(data=> data.filter(s => s.song_id==songId))
        .then(newData=>{
          return newData.map(s=> Object.values(s))
        })
        console.log(newSequences)
        newSequences.sort((s1,s2)=>s1[2]-s2[2])
        console.log(newSequences)
        newSequences.forEach(s=>extractionOfIdNotes.push(s.splice(0,4)))

        extractionOfIdNotes.forEach(s=>{
          newNotes.push(s[3])
          newSeqIds.push(s[0])
        })

        // return 
        // console.log(newSequences)
        // newSequences.sort((s1,s2)=>s1[2]-s2[2])
        // console.log(newSequences)
        // newSequences.forEach(s=> extractionOfIdNotes.push(s.splice(0,3)))
       
       

        let newSynths=await fetch("http://localhost:3000/synths")
        .then(res=>res.json())
        .then(data=> data.filter(s => newSeqIds.includes(s.sequence_id)))
        .then(newData=>{
           return newData.map(s=> Object.values(s))
        })
        
        
        newSynths.sort((synthA,synthB)=> synthA[1]-synthB[1])
       

       newSynths= newSynths.map(synth=>{
            if(synth[2]==="default"){
               newSynthTypes.push("default")
               return new Tone.Synth().toMaster()
            }else if(synth[2]==="fm"){
              newSynthTypes.push("fm")
              return new Tone.FMSynth().toMaster()
            }else if(synth[2]==="am"){
              newSynthTypes.push("am")
              return new Tone.AMSynth().toMaster()
            }else if(synth[2]==="mem"){
              newSynthTypes.push("mem")
              return new Tone.MembraneSynth().toMaster()
            }
        })
        //  console.log(newSequences)
        // console.log(newNotes)
        //  console.log(newSynthTypes)
        //  console.log(newNotes)
        //  console.log(newSeqIds)
        //  console.log(newSynths)
        this.setState({synthTypes:newSynthTypes})
        this.setState({Sequences:newSequences})
        this.setState({notes:newNotes})  
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
    
    let sequenceIds= await Promise.all(this.state.Sequences.map( async(sequence,index)=>{
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
        note8: sequence[7]
      })
    })
    .then(res=>res.json())
    .then(data=> {return Object.values(data)})}))

    console.log(sequenceIds)
    sequenceIds.sort((seq1,seq2)=>seq1[2]-seq2[2])
    console.log(sequenceIds)
    
   let whatever = await Promise.all(sequenceIds.map( async(id,index)=>{
    return await  fetch("http://localhost:3000/synths",{
      method:"POST",
      headers:{
        'content-type':'application/json',
        Accept:'application/json'
      },body:JSON.stringify({
        sequence_id: id[0],
        kind: this.state.synthTypes[index]
      })
    })
    .then(res=>res.json())
    .then(data=> console.log(data))}))
    this.setState({saveButton:false})
    }

    saveButtonClick=()=>{
        this.state.saveButton===false? this.setState({saveButton:true}):this.setState({saveButton:false})
    }
    
    editSequenceClick=(index)=>{
      this.state.midiButton===false? this.setState({midiButton:true}):this.setState({midiButton:false})
      console.log(this.state.midiButton)
      console.log(index)
      this.state.editSequences.includes(index)? this.setState({editSequences:[...this.state.editSequences].filter(i=> i!=index)}): this.setState({editSequences:[...this.state.editSequences,index]})
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
        console.log("texxxt")
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
      this.setState({editSequences:[...this.state.editSequences].filter(i=> i!=index)})
    }

    handleAdd(e,seqNum){
      console.log("add")
      let newSequences=[...this.state.Sequences]
      newSequences[seqNum].push(false)
      this.setState({Sequences:newSequences})
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();

    }

    handleSubtract(e,seqNum){
        console.log("subtract")
        let newSequences=[...this.state.Sequences]
        newSequences[seqNum].pop()
        this.setState({Sequences:newSequences})
       if (!e) var e = window.event;
       e.cancelBubble = true;
       if (e.stopPropagation) e.stopPropagation();
    }

    handleRemoveSequence(seqNum){
      let newSequences=[...this.state.Sequences]
      let newEditSequences=this.state.editSequences.filter(edit=> edit!=seqNum)
      
      newSequences.splice(seqNum,1)
      this.setState({Sequences:newSequences})
      this.setState({editSequences:newEditSequences})
    }

    addSequenceButton=()=>{
      this.state.addSequenceButton===false? this.setState({addSequenceButton:true}):this.setState({addSequenceButton:false})
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

     

     this.setState({notes:[...this.state.notes,newNote]})
     this.setState({Sequences:[...this.state.Sequences,newSequence]})
     this.setState({synthTypes:[...this.state.synthTypes,newSynthType]})
     this.setState({synths:[...this.state.synths,newSynth]})
     this.setState({addSequenceButton:false})

    }

    render() {
   
      const displaySequences=this.state.Sequences.map((sequence,index)=><Sequence key={index} handleSubtract={this.handleSubtract} handleAdd={this.handleAdd} editSequenceClick={this.editSequenceClick} handleNotePLay={this.handleNotePLay} seqNum={index} noteValues={sequence}/>)
      const editSequences= this.state.editSequences.map((sequence,index)=><EditCard key={index} editSynth={this.state.synths[sequence]} handleRemoveSequence={this.handleRemoveSequence} handleEdit={this.handleEdit}seqNote={this.state.notes[sequence]} seqSynthType={this.state.synthTypes[sequence]} seqLength={this.state.Sequences[sequence].length} seqNum={sequence}></EditCard>)   
        return (
            <div>
             {displaySequences}
             <button onClick={this.handlePlayButton}>{ this.state.playing===false? "false": "true"}</button>
             <button onClick={this.loadingButtonClick}>Saved Loops</button>
             {this.state.loadButton===false? null:<Load loadLoop={this.handleLoadLoop}/>}
             <button onClick={this.saveButtonClick}>Save Loop</button>
             {this.state.saveButton===false? null : <Save handleSave={this.handleSave}/>}
             <button onClick={this.addSequenceButton}>Add Sequence</button>
             {this.state.addSequenceButton===false? null : <AddSeq handleAddSeq={this.handleAddSeq}/>}
             {editSequences}
            </div>
        )
    }
}
