var express = require('express');
var _ = require('underscore');
var trip = require('./models/voyage.js');
var indexController = require('./controllers/index.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// Helper search function
function search(nameKey, myArray){
  return _.find(myArray, function(obj){
    return obj.name.toLowerCase() === nameKey.toLowerCase();
  });
}


// Set starting 'index' as Seville
app.get('/', indexController.index);


// Get each location
app.get('/place/:location', indexController.getLocation);


// Give users a JSON response on /next query
app.get('/next', indexController.getNext);


var server = app.listen(5213, function() {
	console.log('Express server listening on port ' + server.address().port);
});
