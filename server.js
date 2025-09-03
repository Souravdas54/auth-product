require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs')
const cookieParser = require('cookie-parser')

const Dbconnection = require('./app/config/dbCon');
Dbconnection();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json()); // Middleware JSON data parse 
app.use(express.urlencoded({ extended: true })); // URL-encoded form data parse ({ extended: true } it means - nested object)
// app.use(express.urlencoded({ extended: false })); // URL-encoded form data parse ({ extended: false } it means - not a nested object)

app.use('./uploads', express.static(path.join(__dirname, '/uploads')))

app.use(cookieParser())

const userRouter = require("./app/router/userRouter");
app.use('/auth', userRouter)

const productRouter = require("./app/router/productRouter");
app.use('/auth', productRouter)

// EJS ROUTER
const ejsRouter=require('./app/router/authEjsRouter/AuthEjsRouter')
app.use('/auth',ejsRouter,(req,res)=>{
    res.send("Authentication")
});

const PORT = process.env.PORT || 8500;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/auth`));
