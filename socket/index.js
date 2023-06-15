const { Server } = require("socket.io");

const io = new Server({ cors: "http://127.0.0.1:5173/" });

let onlineUser = []

io.on("connection", (socket) => {
  console.log("new connection ",socket.id)
  //listen to connection
  socket.on("addNewUser" , (userId) => {
    !onlineUser.some(user => user.userId === userId) &&
    onlineUser.push({
      userId,
      socketId : socket.id,
    })

    io.emit("getOnlineUsers" , onlineUser)
  } )


  //add message
  socket.on("sendMessage" , (message) =>{
    const user = onlineUser.find(user => user.userId === message.recipientId) 
    if(user){
      io.to(user.socketId).emit("getMessage" , message)

      io.to(user.socketId).emit("getNotification" , {
        senderId : message.senderId,
        isRead : false ,
        date : new Date(),
      })
    }
  } )

  socket.on("disconnect" , () => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers",onlineUser);
  })
});



io.listen(3000);