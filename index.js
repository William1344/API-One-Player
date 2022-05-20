'use strict'
// constantes
const express     = require('express');
const http        = require('http');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const routes      = require('./routes');
const { 
  Users, Users_Game, Users_Liga, Ligas, Ligas_has_Users, Jogos, Planos
  }  = require('./models');
const modelsSeq = require('./models');
const { Op }      = require('sequelize');
const conetion_sequelize  = require('./database');

const app = express();

//app.use(conetion_sequelize);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes);
const server = http.createServer(app);
// start server
const port = normalizePort(process.env.PORT || 3001);
server.listen(port, () => {
  console.log("Server is running on port " + port);
});

server.on('error', onError);


function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

function onError(error){
  if (error.syscall !== 'listen') {
    throw error;
  }
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}