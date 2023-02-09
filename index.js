const path = require('path');
const express = require('express');
const cors = require('cors') // -<
const dotenv  = require('dotenv').config();

const port = process.env.PORT || 5000;


const app = express();

// Enable body  parser
app.use(cors()); // -< 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Set static folder
app.use(express.static(path.join(__dirname,'/public/')))

app.get('/backend',(req,res)=>{
    res.send("hello");
})
app.use('/backend/openai',require('./routes/openaiRoutes'));

app.listen(port,() => console.log(`Server started on port ${port}`));

