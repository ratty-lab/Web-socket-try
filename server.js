

import express from "express";
import http from 'http';
import { Server} from 'socket.io';


const app=express();
const server=http.createServer(app);
app.set('view engine', 'ejs');
app.use(express.static('public'))


const io=new Server(server)
const users={};


app.get("/",(req,res)=>{
    res.render('index.ejs');
})
io.on('connection',(socket)=>{
    socket.on('adduser',(username)=>{
        users[socket.id]= username;
        
        if(users[socket.id].username==='' || users[socket.id].username===null){
            users[socket.id].username='Anonymous';
        }
        console.log(users);
        io.emit('new-user-joined',`${users[socket.id].username} joined the chat`)
        
        
        
    })
    socket.on('user-message',(message)=>{
        const socketId=socket.id;
        const username = users[socketId]?.username;
        console.log('message by:',username);
        io.emit('message',`${username} : ${message}`);
        
        
    })
    
})
server.listen( 3000,()=>{
    console.log('server is running at port 3000');
    
})