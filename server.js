require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

const Dbconnection = require('./app/config/dbCon');
Dbconnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, './uploads')))



const userRouter = require("./app/router/userRouter");
app.use(userRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
