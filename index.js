const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require("mongoose")
const UserSchema =require("./schema/userSchema")

mongoose.connect("mongodb+srv://vimal-db:vimal4757@cluster0.bnowb.mongodb.net/users?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true},()=>{
  console.log("db connected");
})

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// connecting front and back end
app.use(cors()); 
// router for home page
app.get("/", (req, res) => {
  res.send("Server is up and running." ).status(200);
});

// connecting to chat
io.on('connect', (socket) => {
  // user joining room
  
  socket.on('signin', async({socketID,name,useremail,password }) => {
    console.log(socketID,"...",name,",,,,,,,",useremail,",,,,,",password,",,,,,,")
    const newUser = await new UserSchema({
      id:socketID,
      name:name,
      userEmail:useremail,
      password:password
      
    })
    const saveUser=await newUser.save()
    console.log(saveUser)
    
  });
  socket.on('check', async({name,password }) => {
    console.log(name,",,,,,",password)
    const db = await UserSchema.findOne({userEmail:name})
    
    console.log()

    socket.emit('menu',db)
  });
  socket.emit("getUser",async(id)=>{
    const db = await UserSchema.findOne({userEmail:name})
  })

  
  // user disconnect
  socket.on('disconnect', () => {
    
  })
});

server.listen(process.env.PORT || 3001, () => console.log(`Server has started.`));