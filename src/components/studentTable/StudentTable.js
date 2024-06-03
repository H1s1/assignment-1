import React, { useState, useEffect } from 'react';
import './StudentTable.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const notify = (msg) => toast(msg);

function StudentTable(props) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    RollNum: '',
    Name: '',
    Marks: ''
  });
  const [sortedBy, setSortedBy] = useState(null);
  const [sortedStudents, setSortedStudents] = useState(props.students || []);

  useEffect(() => {
    setSortedStudents(props.students || []);
  }, [props.students]);

  function handleEdit(index) {
    setEditingIndex(index);
    setEditedStudent({
      RollNum: sortedStudents[index].RollNum,
      Name: sortedStudents[index].Name,
      Marks: sortedStudents[index].Marks
    });
  }

  async function handleUpdate(index) {
    try {
      const response = await axios.post('http://localhost:5000/update', {
        RollNum: editedStudent.RollNum, Name: editedStudent.Name, Marks: editedStudent.Marks, 
      });
      console.log(response.data);
      if(response.status === 200){
       //-------toast
       toast.success('Updated Successfully!');
      }
      props.fetchdata();
    } catch (error) {
      console.log("Error message ", error);
    }
    setEditingIndex(null);
  }

  function handleInputChange(event, key) {
    const { value } = event.target;
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [key]: value
    }));
  }

  async function handleDelete(index){
    try {
      const response = await axios.post('http://localhost:5000/delete', { RollNum: sortedStudents[index].RollNum})
      if(response.status === 200){
        //small popup sticker ---> deletion sucessful
        toast.success('Deleted Sucessfully!');
      }
      console.log(response);
      props.fetchdata();
    } catch (error) {
      console.error("Error in deleating data! ", error);
    }
  }

  const sortByRollNum = () => {
    const sortedData = [...sortedStudents].sort((a, b) => a.RollNum - b.RollNum);
    setSortedStudents(sortedData);
    setSortedBy("RollNum");
  };

  const sortByName = () => {
    const sortedData = [...sortedStudents].sort((a, b) => a.Name.localeCompare(b.Name));
    setSortedStudents(sortedData);
    setSortedBy("Name");
  };

  const sortByMarks = () => {
    const sortedData = [...sortedStudents].sort((a, b) => a.Marks - b.Marks);
    setSortedStudents(sortedData);
    setSortedBy("Marks");
  };

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">
              Roll No.
              <button className='btn btn-outline-secondary sort' onClick={() =>{ 
                sortByRollNum();
                notify("Roll No. sorted");
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up-alt" viewBox="0 0 16 16">
                <path d="M3.5 13.5a.5.5 0 0 1-1 0V4.707L1.354 5.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 4.707zm4-9.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5"/>
             </svg>
                </button>
                <Toaster
                  position="bottom-center"
                  reverseOrder={false}
                />
            </th>
            <th scope="col">
              Name
              <button className='btn btn-outline-secondary sort' onClick={() =>{
                sortByName();
                notify("Name sorted!");
                }}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up-alt" viewBox="0 0 16 16">
                <path d="M3.5 13.5a.5.5 0 0 1-1 0V4.707L1.354 5.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 4.707zm4-9.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5"/>
             </svg>
                </button>
            </th>
            <th scope="col">
              Marks
              <button className='btn btn-outline-secondary sort' onClick={() => {
                sortByMarks();
                notify("Marks Sorted!");
                }}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up-alt" viewBox="0 0 16 16">
                <path d="M3.5 13.5a.5.5 0 0 1-1 0V4.707L1.354 5.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 4.707zm4-9.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5"/>
             </svg>
                </button>
            </th>
            <th scope="col">Action</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                  {student.RollNum}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedStudent.Name}
                    onChange={(event) =>
                      handleInputChange(event, "Name")
                    }
                  />
                ) : (
                  student.Name
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={editedStudent.Marks}
                    onChange={(event) =>
                      handleInputChange(event, "Marks")
                    }
                  />
                ) : (
                  student.Marks
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <button onClick={() => {
                    handleUpdate(index);
                 // toast.success('Successfully Updated!');
                  }}>Update</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
              </td>
              <td>
                <button 
                 onClick={ () => handleDelete(index)} 
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
