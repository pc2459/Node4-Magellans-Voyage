var express = require('express');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(5213, function() {
	console.log('Express server listening on port ' + server.address().port);
});
