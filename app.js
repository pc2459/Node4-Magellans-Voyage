var express = require('express');

var trip = require('./public/voyage.js')

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/place/:location', function(req, res){

  function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

  
  // If the :location exists in the trip database ...
  var resultObject = search(req.params.location, trip);
  console.log(resultObject);

  res.render('index',
    { locationName : resultObject.name,
      locationDescrip : resultObject.description,
      nextPort : resultObject.nextPort
  })
  // Look it up in the data file
  // Inject the data??
})

var server = app.listen(5213, function() {
	console.log('Express server listening on port ' + server.address().port);
});
