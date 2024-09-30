         //Declare dependancies/Variables.
         
         const express = require('express');
         const app= express();
         const mysql= require ('mysql2');
         const dotenv=require('dotenv');
const cors=require('cors');

         app.use(express.json());
         app.use(cors());
         dotenv.config();

         //connect to database

const db=mysql.createConnection(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
    }
);

//Check if db connection works
db.connect((err)=>{
    //no wedding today
    if(err)return console.log("Error connecting to the mySQL database");
//yes wedding connected
console.log("Connected to mySQL succesfully as id:",db.threadId)

//Your code goes here
//GET method example

app.set('view engine','ejs');
app.set('views',__dirname +'/views');

//Data is the name of the file inside views folder
app.get('/data',(req,res)=>{
    //Retrive all patients
    db.query('SELECT * FROM patients',(err,results)=>{
        if (err){
            console.error(err);
            res.status(500).send('Error retrieving data');
        }
        
        else{
            //Display the records to the browser
            res.render('data',{results:results});
        }
    });
});
app.get('/data',(req,res)=>{
    //Retrieve all providers
    db.query('SELECT * FROM providers',(err,results)=>{
        if (err){
            console.error(err);
            res.status(500).send('Error retrieving data');
        }
    });
});

app.get('/data',(req,res)=>{
    //Filter patients by first name
    db.query('SELECT * FROM patientsWHERE first_name = ?',(err,results)=>{
        if (err){
            console.error(err);
            res.status(500).send('Error retrieving data');
        }
    });
});

app.get('/data',(req,res)=>{
    //Retrieve all providers by speciality
    db.query('SELECT * FROM providersWHERE provider_specialty = ? ',(err,results)=>{
        if (err){
            console.error(err);
            res.status(500).send('Error retrieving data');
        }
    });
});


app.listen(process.env.PORT,()=>{
console.log(`server listening on port${process.env.PORT}`);

//send message to the browser
console.log('Sending message to browser...');
app.get('/',(req,res)=>{
    res.send('Sever started succesfully!Wedding can begin!!')
})
});
});