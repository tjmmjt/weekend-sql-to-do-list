/** ---------- EXPRESS & BODY PARSER ---------- **/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/** ---------- ROUTE(S) ---------- **/
const todos = require('./routes/todos.router.js');

/** ---------- PORT ---------- **/
let PORT = process.env.PORT || 5001;

/** ---------- TEST ---------- **/
// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

/** ---------- MIDDLEWARE ---------- **/
// added bodyParser.json and urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./server/public'));
app.use(express.json());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/todos', todos);

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
