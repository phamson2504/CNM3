const mysql = require('mysql');  
const express = require('express');  
var app = express();  
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const personsRoute = require('./persons.route');
const http = require("http");
const server= http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
});

var db= mysql.createConnection({
    host: "baitapnhomcnm.crkxbwz5flrz.ap-southeast-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "Nhatban1",
    database: "baitap"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

global.db = db;
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/persons', personsRoute);

io.on('connection', (socket) => {
    console.log('a user connected');
});
server.listen(process.env.PORT||PORT, function(){
    console.log('Server is running on Port:',PORT);
});