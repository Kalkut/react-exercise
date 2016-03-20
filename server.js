var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var config = require('./webpack.config');

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var compiler = webpack(config);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var commentSchema = mongoose.Schema({
    username: String,
    email: String,
    content: String,
    creationDate: Date
})

var Comment = mongoose.model('Comment', commentSchema);

var postIt = new Comment({
    username: 'Rachel Sanders',
    email: 'rachel.sanders@verizon.com',
    content: 'Had a great day !',
    creationDate: Date.now()
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  // postIt.save(function (err, postIt) {
  //   if(err) return console.error(err);
  //   console.log('sent to '+postIt.username);
  // })
});

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
  
app.listen(8000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:8000');
});

app.route('/comments')
    .get(function (req, res) {
        Comment.find(function(err, comments) {
            if(err) return console.error(err);
            res.send(comments);
        })
    })
    .post(function (req, res) {
        var newComment = new Comment(req.body);
        newComment.save(function (err, newComment) {
            if(err) {
                res.sendStatus(500);
                return console.dir(err);
            }
            res.sendStatus(200);
        })
    })