var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var config = require('./webpack.config');

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var compiler = webpack(config);

var mongoose = require('mongoose'); // Without mongo this back-end currently fails
var __mangoIsUp; // I'm so not proud of that
var _db;


var db_path = 'mongodb://localhost/test'

if(process.env.APP_CONFIG) { // Evennode production environment hack 
  var app_config = JSON.parse(process.env.APP_CONFIG);
  db_path = "mongodb://" + app_config.mongo.user + ":<c7752f62d3af35e76d4e913bc35f6d24>@" +
      app_config.mongo.hostString
}

mongoose.connect(db_path);

var db = mongoose.connection;
db.on('error', function () {
  __mangoIsUp = false;
  console.log('MongoDB is not launched, the app is now launched without it.')
  console.error.bind(console, 'connection error:');
});
db.on('open', function () {
  console.log('Connection to MongoDB is successful')
  __mangoIsUp = true;
})

var commentSchema = mongoose.Schema({ // Schema of our comments
    username: String,
    email: String,
    content: String,
    creationDate: Date
})

var Comment = mongoose.model('Comment', commentSchema); // Model

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

port = process.env.PORT || 8000; // Heroku and Evennode use random ports

app.listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:'+port);
});

app.route('/comments')
    .get(function (req, res) {
        if(!__mangoIsUp) {
          res.sendStatus(503); // Not proud of that at all
          return
        }
        Comment.find(function(err, comments) {
            if(err) return console.error(err);
            res.status(200).send(comments);
        })
    })
    .post(function (req, res) {
        if(!__mangoIsUp) {
          res.sendStatus(503); // Not proud of that either
          return 
        }
        
        var newComment = new Comment(req.body);
        newComment.save(function (err, newComment) {
            if(err) {
                res.sendStatus(500);
                return console.dir(err);
            }
            res.sendStatus(200);
        })
    })