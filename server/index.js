const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'this is a redeploy!' });
});


// heroku port; use uppercase for const that shouldn't change
// whenever heroku runs our app, it has the option to inject environment variables. BASICALLY IT'S HEROKU'S OPPORTUNTIY TO SEND US RUNTIME CONFIGURATION (process is available when app is running in heroku) (E.G. AFTER APP IS STARTING TO EXECUTE) if we run it in a development environment, process.env won't work, so you add the || 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
