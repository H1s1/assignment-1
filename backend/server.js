const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const port = 5000
const util = require('./util');
const {Student} = require('./one');

//Establish connection with DataBase
util.connectDataBase();

// enabling CORS for some specific origins only. 
let corsOptions = { 
  origin : ['http://localhost:3000'], 
} 
app.use(cors(corsOptions)) 
 

//Parsing the data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//getting student data 
app.get('/getdata', async (req, res) => {
  try {
    const data = await Student.findAll({attributes:{exclude:['createdAt','updatedAt']}});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({error: "Internal Server Error "});
  }  
});

//Creating student data
app.post('/create', async (req,res) =>{
  const {RollNum, Name, Marks} = req.body;
  console.log(RollNum, Name, Marks);
  const lastStudent = await Student.findOne({order: [['Sno' , 'DESC']]});
  const lastSno = lastStudent.dataValues.Sno;
  if(lastSno){
    nextSno = lastSno + 1
  }else{
    nextSno = 1;
  };
  try {
    const data = await Student.create({ Sno: nextSno ,RollNum: RollNum, Name: Name, Marks: Marks})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
   res.status(500).json({error:"Internal server error !"});
  }
});

//Updating student data
app.post('/update', async (req, res) => {
  const { RollNum, Name, Marks } = req.body;
  try {
   const response = await Student.update({ RollNum: RollNum, Name: Name, Marks: Marks },{ where: {RollNum: RollNum, },},);
  res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ' Internal Server Error ' });
  }
});

//deleteing student data 
app.post('/delete', async (req,res) => {
  const {RollNum} = req.body;
  try {
  await Student.destroy({where: {RollNum: RollNum,},});
  res.status(200).json({message: 'Deletion Sucessfull '});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server Error '});
  }
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});