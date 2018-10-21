'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
var firebase = require("firebase");
// 
var config = require("./firebase");
var scrapeSelectBy = require("./rateScape");
firebase.initializeApp(config);

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

router.get('/rates', (req, res) => {
  scrapeSelectBy().then(list => {
    console.log("done!");
    
    saveToDatabase(list);     
  });
})

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda


function saveToDatabase(data) {
  console.log('saving..');
  //Insert key,value pair to database
  firebase
    .database()
    .ref("/CurrencyRate")
    .set(data);
}

module.exports = app;
module.exports.handler = serverless(app);
