//Require express
var express = require('express');
var app = express();
//Require Cors
var cors = require('cors');
app.use(cors());
var router = express.Router();
const { querySearch, queryPreview, queryPreviewDescription } = require('./controllers/search/search.controller');
//Set Routers
router.get('/api/items', querySearch);
router.get('/api/items/:id', queryPreview);
//Export Routers
module.exports = router;