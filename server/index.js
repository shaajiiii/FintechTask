require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose')

//Database connection
mongoose.connect(process.env.DATABASE_URL,(err)=>{ 
    if(err){
        console.log("someting went wrong with the database connection");
        console.log(err);
        return;
    }
    console.log("database connection successful");
});

const userSignup = require('./routes/user-signup');
const userLogin = require('./routes/user-login');

// Middlewares
app.use(express.json());

// Routing
app.use('/signup',userSignup);
app.use('/login',userLogin);



app.listen(PORT,()=>{console.log(`server is listening.... to port ${PORT}`);})


