var express    = require('express');
var path       = require('path');
var fs         = require('fs');
var bodyParser = require('body-parser');
var app     = express();

app.use('/css', express.static(__dirname + '/css'));
app.use('/libs', express.static(__dirname + '/libs'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/images', express.static(__dirname + '/images'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/todos', function(req, res) {
  res.sendFile(path.join(__dirname + '/libs/todos.json'));
});

app.post('/todos', function(req, res) {
  console.log(new Date());
  console.log(req.body);
  fs.writeFile(path.join(__dirname + '/libs/todos.json'), JSON.stringify(req.body), function(error) {
    if(error) {
      console.log(error);
    }

    console.log('File was written successfully!\n');
  });
});

app.listen(8888, function() {
  console.log('Server is running on localhost:8888');
});
