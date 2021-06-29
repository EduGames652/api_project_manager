const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors")
const { normalize } = require("path");
const routes = require("./routes/routes")

require('./config/connection/connection')

const api = express();

api.use(cors())
api.use(express.json())
api.use(routes,)

const port = normalize(process.env.PORT || '3333');
api.set('port', port);

/* Listen Port and Host */
api.listen(port, (err) => {
  if(err) {
    console.log('[-] | Servidor Parado! ==>' + err);
  } else {
    console.log(`[+] Servidor Iniciado | URL: http://localhost:${port}`)
  }
})