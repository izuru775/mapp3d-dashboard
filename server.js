require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const path = require('path');
const connectDB = require('./dbConnect');
const routes = require('./routes')
var expressLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var session = require('express-session');

const app = express();
// EJS added as view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(session({
    secret:'cat',
    resave:true,
    saveUninitialized:true
  }))
// const cros = require('cors');
var cors = require('cors')

app.use(cors());

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cros);

// connect flash
app.use(flash());

// Global Vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
  })
  
app.use("/api", routes.projectService);
app.use("/aws", routes.AWS);
app.use("/objects", routes.dbObjects);
app.use("/environments", routes.dbEnvironments);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'public','404.html'));
});

connectDB();
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{  
    console.log(`Server listening on ${PORT}`)
});