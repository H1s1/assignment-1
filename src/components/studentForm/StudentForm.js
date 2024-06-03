import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './StudentForm.css';
import toast, { Toaster } from 'react-hot-toast';


function StudentForm(props){
   const [student , setSutdent] = useState({
    RollNum: "",
    Name: "",
    Marks: "",
   });
   
   
   function handleChange(event){
     const {name, value} = event.target;
     setSutdent({...student, [name]:value});
    };
   
   async function handleSave(event){
      event.preventDefault(false);
     try {
       const response = await axios.post('http://localhost:5000/create', student);
       if(response.status === 200)
        {
          //small pop-up sticker ---> data saved sucessfully
          toast.success('Data saved successfully');
          
          setSutdent({
            RollNum: "",
            Name: "",
            Marks: "",
          });
        }
       props.fetchdata();
     } catch (error) {
      console.error('Error:', error);
     }
   }
   
    return(<div>

<form>
  <div class="mb-3">
    <label for="RollNum" class="form-label">Roll Number</label>
    <input type='number' class="form-control" name="RollNum" aria-describedby="RollNum" value={student.RollNum} onChange={handleChange}></input>
  </div>
  <div class="mb-3">
    <label for="Name" class="form-label">Name</label>
    <input type="text" class="form-control" name="Name" value={student.Name} onChange={handleChange}></input>
  </div>
  <div class="mb-3">
    <label for="Marks" class="form-label">Marks</label>
    <input type="number" class="form-control" name="Marks" value={student.Marks} onChange={handleChange}></input>
  </div>
  
  <button type="submit"  class="btn btn-outline-primary" onClick={handleSave}>Save</button>
</form>

    </div>);
}

export default StudentForm;