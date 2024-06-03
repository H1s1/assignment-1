import axios from 'axios'
import { useState, useEffect } from 'react';
import './App.css';
import StudentForm from './components/studentForm/StudentForm';
import StudentTable from './components/studentTable/StudentTable';

function App() {
  const baseURL = "http://localhost:5000/getdata";

  // const students = [
  //   {
  //     "Sno": "2",
  //     "RollNum": "144",
  //     "Name": "Mark",
  //     "Marks": "56"
  //   },
  //   {
  //     "RollNum": "145",
  //     "Name": "Roger",
  //     "Marks": "23"
  //   },
  //   {
  //     "RollNum": "233",
  //     "Name": "Alex",
  //     "Marks": "37"
  //   },
  //   {
  //     "RollNum": "476",
  //     "Name": "Raj",
  //     "Marks": "88"
  //   },
  //   {
  //     "RollNum": "477",
  //     "Name": "Kumari",
  //     "Marks": "99"
  //   },
  // ];

  const [data, setData] = useState([]);

  const fetchdata = async () => {
   try{
    await axios.get(baseURL).then((response) => {
      setData(response.data);
    });
   }catch(error){
      console.error("Error fetching Data!!");
   }
  }
  
  useEffect(() => {
    fetchdata();
  }, []);
  console.log(data);
  

  return ( <div>
    <h1> STUDENT FORM </h1>
    <h2>Fill the details below</h2>
    <StudentForm fetchdata = {fetchdata} />
   
   <h1>STUDENT TABLE</h1>
    <StudentTable students = {data}  fetchdata = {fetchdata}/>
   
   </div>);
}

export default App;
