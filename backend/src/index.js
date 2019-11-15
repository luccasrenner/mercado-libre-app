//Require Express
const express = require('express');
const app = express();
//Require CORS
var cors = require('cors')
app.use(cors())
//Require Routers module
const router = require('./routes');
app.use(router);
//Use json response
app.use(express.json());
//Listen App
app.listen(3333, () => {
    console.log("----> live on:: http://localhost:3333");
})