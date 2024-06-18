const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');


const PORT = process.env.PORT || 8000;

const app = express();


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
      }
  });

app.use(cors())


io.on('connection', (socket) => {
    console.log('We have a new connection!');

    socket.on('create-something', (msg) => {
        console.log('message received: ' + msg);
        // Optionally, you can emit the message to all clients
        io.emit('create-something', msg);
    });
    
    socket.on('disconnect', () => {
        console.log('User had left!');
    });
    }
);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));