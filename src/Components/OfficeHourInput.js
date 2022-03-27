//Below is my office hours input information component
import React, { useState, useContext} from 'react';
import firebase from "../config";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../Auth";
import Nav from './TeachNav';

function OfficeHourInput() {

  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/`; 
    history.push(path);
  }

  const { currentUser } = useContext(AuthContext);

  const db = firebase.database();

 const [form, setForm]=useState([]);

 const dataHandler = (event) => {
    event.preventDefault();
    console.log("Info as follows:",form)   
     
    
    var tempStr = "";
    for(var y=0; y<form.length;y++){
       if(form[y].dayPicked==="Monday"||form[y].dayPicked==="monday"){
        tempStr+= "1";
      }
      else if(form[y].dayPicked==="Tuesday"||form[y].dayPicked==="tuesday"){
        tempStr+= "2";
      }
      else if(form[y].dayPicked==="Wednesday"||form[y].dayPicked==="wednesday"){
        tempStr+= "3";
      }
      else if(form[y].dayPicked==="Thursday"||form[y].dayPicked==="thursday"){
        tempStr+= "4";
      }
      else if(form[y].dayPicked==="Friday"||form[y].dayPicked==="friday"){
        tempStr+= "5";
      }
    }

    console.log(tempStr);
   var tempAr= Array.from(tempStr);
   var uniqueAr = [...new Set(tempAr)];
   var finalString = uniqueAr.toString();
   console.log(finalString);

   //push finalString to db below, then check the db value of the pushed string in
   // the calendar script to include correct  days
   const dayRef = db.ref("Users/" + currentUser.uid + "/daysToInclude");
   const newDayRef = dayRef;
   try{
    newDayRef.set({
     dayString:finalString
   })
   alert("Days Updated!")
 }catch(error){alert(error)}


    const timeRef = db.ref("Users/"+ currentUser.uid + "/officeHoursAvailability");
    const newTimeref = timeRef;
    try{
    newTimeref.set({
      form
    })
    alert("Office Hours Updated!")
  }catch(error){alert(error)}

    // timeslot would go here when works
    // const timeSlotLength = db.ref("Users/Teachers/testteacher");
    // const newTimeLength = timeSlotLength;
    // newTimeLength.set({
    //   timeSlotLength:10
    // })

    routeChange();
  }
  
  function handleAddSlot(e){
    e.preventDefault();
      const inputState={
        startTime:"",
        endTime:"",
    };

  setForm(prev=>[...prev,inputState])
};
const onChange=(index,event)=>{

event.preventDefault();
event.persist();

setForm(prev=>{
 return prev.map((item,i)=>{

if (i!==index){
  return item;
}
return{
...item,
[event.target.name]:event.target.value,
}
  });

});
};

const handleRemove=(e,index)=>{
  e.preventDefault();

  setForm(prev=>prev.filter((item)=>item!==prev[index]));
}


  return (
<div>
  <Nav/>
  <br></br>
      {/* <h1>First input desired length per appointment in minutes</h1> */}
      <h1>Enter available times for the following days</h1>
      <h2>Format entry as follows -- Start time: 12:30  End Time: 16:00 (Military Time)</h2>
  
<form onSubmit={dataHandler}>

<button onClick={handleAddSlot}>Add time slot</button>   <br></br>  <br></br>
{
  form.map((item,index)=>(
 
 <div key={`item-${index}`}>
     <br></br> 
    <div>
        <input 
        type="text" 
        name="startTime" 
        placeholder="Start Time"
         value={item.start}
          onChange={(e)=>onChange(index,e)}
          />

    </div>
    <div>
        <input 
        type="text" 
        name="endTime" 
        placeholder="End Time"
         value={item.end}
          onChange={(e)=>onChange(index,e)}
          />
     <div>
     <input 
        type="text" 
        name="dayPicked" 
        placeholder="Desired Day"
         value={item.end}
          onChange={(e)=>onChange(index,e)}
          />
    </div>
    </div>
    

    <button onClick={(e)=>handleRemove(e,index)}>Remove Time Slot</button>
    </div>

  ))}

  <br></br>
  <input type="submit" />

</form>


</div>
  );
}
export default OfficeHourInput;