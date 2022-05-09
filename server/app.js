const express = require('express')
const bodyParser = require('body-parser')
// const fetch = require('node-fetch')
const { createServer } = require("http");
const { Server } = require("socket.io");
const compression = require('compression')
require('dotenv').config();

const diceUrl = 'http://roll.diceapi.com/json/d6/d6';
const app = express()

app
  .use(express.static('public'))
  .use(compression())
  .set('view engine', 'pug')
  .set('views', './server/views')
  .use(bodyParser.urlencoded({ extended: true }))

app
  .get('/', (req,res) => {
    res.render('index')
  })
  .get('/game', (req, res) => {
    res.render('game')
  })
  .get('/join', (req, res) => {
    res.render('join')
  })


const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`a user connected with id: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(process.env.PORT, () => {
  console.log(`server listening at port: ${process.env.PORT}`)
});