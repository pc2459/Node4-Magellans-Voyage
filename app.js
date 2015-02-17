var express = require('express');
var _ = require('underscore');
var trip = require('./public/voyage.js')

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.redirect('/place/Seville');
});

  function search(nameKey, myArray){

    return _.find(myArray, function(obj){
      // console.log(obj.name, nameKey);
      return obj.name.toLowerCase() === nameKey.toLowerCase();
    });
  }
app.get('/place/:location', function(req, res){


  
  // If the :location exists in the trip database ...
  var resultObject = search(req.params.location, trip);

  if(resultObject){
    res.render('index',
      { locationName : resultObject.name,
        locationDescrip : resultObject.description,
        nextPort : resultObject.nextPort,
        tripImage : resultObject.image

    })    
  }
  // Else send them to the 404
  else {
    res.render('404');
  }
})

app.get('/next', function(req, res){
  var currentLocation = req.query.location;
  var resultObject = search(currentLocation, trip);
  var nextLocation = resultObject.nextPort;

  res.jsonp({ location: currentLocation, 
              nextLocation: nextLocation });

})



var server = app.listen(5213, function() {
	console.log('Express server listening on port ' + server.address().port);
});
