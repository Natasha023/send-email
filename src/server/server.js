
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');
const ServerPortRouter = require('./route/ServerRoute');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', ServerPortRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, function(){
  console.log('Server is running on port: ',PORT);
});