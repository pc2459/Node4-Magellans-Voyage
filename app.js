var express = require('express');
var indexController = require('./controllers/index.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.get('/', indexController.index);

app.get('/place/:location', indexController.getLocation);

app.get('/next', indexController.getNext);

var server = app.listen(5213, function() {
	console.log('Express server listening on port ' + server.address().port);
});
