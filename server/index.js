/* create new express application and logic for our first route handler
*/

// can't use import syntax bc we only have "common js modules"
const express = require('express');

// init a Express app
const app = express();

// app object sets up configuration that listens for incoming requests, then routes them to different route handlers

// our first route handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.get('/dogs', (req, res) => {
  res.send({ dogs: ['lab','retriever'] });
});

// also have app.post, app.put, etc; all the crud stuff, but so far we just have get

// express listens to port; then tells node what port to listen to for HTTP traffic
app.listen(5000);
