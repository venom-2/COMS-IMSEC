const express = require('express');
const connectToDatabase = require('./db.js');
const cors = require('cors');

connectToDatabase();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cors());

app.get('/',(req,res)=>{
    res.send("<h1>Hello IMSEC</h1>");
})

app.use('/login', require('./Routes/Login'));

app.use('/addData', require('./Routes/AddData'));

app.use('/fetch', require('./Routes/Fetch'));

app.use('/assign', require('./Routes/Assign.js'));

app.listen(port,()=>{
    console.log(`Server running on Port ${port}`)
});
