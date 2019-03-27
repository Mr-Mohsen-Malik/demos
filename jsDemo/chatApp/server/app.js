import express from 'express';
import http from 'http';
import socket from 'socket.io';
import bodyParser from 'body-parser';

import loginRoute from './login/loginRoute';
import registerRoute from './register/registerRoute';
import chat from './chat/chatModel';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.Server(app);
const io = socket(server);
let PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("listening at port no. ", PORT)
});

app.use(cors());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use('/login', loginRoute);
app.use('/register', registerRoute);
// export default io;
chat(io);
// io.on('connection', function (socket) {
//  console.log('a user connected');
//   socket.emit('news', { hello: 'world' });
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// io.on('connection', function (socket) {
//   console.log('a user connected');
//   socket.on('add-message', function (msg) {
//     io.emit('message', msg);
//     socket.on('disconnect', function () {
//       console.log('user disconnected');
//     });
//   });
// });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });


