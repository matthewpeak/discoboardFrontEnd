import React, { Component,Fragment } from 'react'
import Sequence from './Sequence'
import Tone from 'tone'
import Menu from './Menu'
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
        
     
       
       
       await this.setState(prevState => ({
          Sequences:newSequences,
          notes:newNotes,
          test:newTests,
          synths:newSynths,
          synthTypes:newSynthTypes
        }));
           
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
      
    
      this.setState({editSequences:index})
      
      
      
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
 
    

      let newSequences=[...this.state.Sequences]
      let newNotes=[...this.state.notes]
      let newSynthTypes=[...this.state.synthTypes]
      let newSynths=[...this.state.synths]

      newSequences.splice(index,1,newSequence)
      newNotes.splice(index,1,newNote)
      newSynthTypes.splice(index,1,newSynthType)
      newSynths.splice(index,1,newSynth)
 
       this.setState(prevState => ({
        Sequences:newSequences,
        notes:newNotes,
        synths:newSynths,
        synthTypes:newSynthTypes,
        editSequences:null
      }));
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
      let newTests=this.state.test
      let newNotes=this.state.notes
      let newSynths=this.state.synths
      let newSynthTypes=this.state.synthTypes
      let newSequences =this.state.Sequences
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

      newTests.push([])
      newNotes.push(newNote)
      newSynths.push(newSynth)
      newSynthTypes.push(newSynthType)
      newSequences.push(newSequence)
     
   
      this.setState(prevState => ({
      Sequences:newSequences,
      notes:newNotes,
      test:newTests,
      synths:newSynths,
      synthTypes:newSynthTypes
    }));
    
   
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
       
       
     let displaySequences=this.state.Sequences.map((sequence,index)=><Sequence key={index} currentNote={this.state.test} handleSubtract={this.handleSubtract} handleAdd={this.handleAdd} editSequenceClick={this.editSequenceClick} handleNotePLay={this.handleNotePLay} seqNum={index} note={this.state.notes[index].charAt(0)} noteValues={sequence}/>)
    
    
      
      return (
            <div className="board" style={{height:"100vh", width:"100vw"}}>
              <div className="sequences">
                {displaySequences}
              </div>
                <Menu handlePlayButton={this.handlePlayButton}  playing={this.state.playing} handleAddSeq={this.handleAddSeq} handleSave={this.handleSave} handleLoadLoop={this.handleLoadLoop} handleEditSynth={this.handleEditSynth} synths={this.state.synths} handleDiscoButton={this.handleDiscoButton} synthTypes={this.state.synthTypes} Sequences={this.state.Sequences} handleRemoveSequence={this.handleRemoveSequence} handleEdit={this.handleEdit} editSequences={this.state.editSequences} notes={this.state.notes}/>
             </div>
        )
     }else{
       return(
      <Fragment>
    
       <Zzzaaa  handleDisco={this.handleDiscoButton} synths={this.state.synths} oldTests={this.state.tests}notes={this.state.notes} Sequences={this.state.Sequences}/>
      
      </Fragment>
       )
     }
    }
}
