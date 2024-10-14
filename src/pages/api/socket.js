import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('Initializing new Socket.IO server');
    const io = new Server(res.socket.server, {
      path: '/api/socket',
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('User connected to the socket');

      socket.on('message', (msg) => {
        io.emit('message', msg);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected from socket');
      });
    });
  } else {
    console.log('Socket.IO server is already active');
  }
  res.end();
};

export default SocketHandler;
