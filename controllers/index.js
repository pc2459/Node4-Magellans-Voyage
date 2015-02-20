var _ = require('underscore');
var trip = require('../models/voyage.js');

// Helper search function
function search(nameKey, myArray){
  return _.find(myArray, function(obj){
    return obj.name.toLowerCase() === nameKey.toLowerCase();
  });
}

var indexController = {

  // Set starting 'index' as Seville
  index : function(req, res){
    res.redirect('/place/Seville');
  },

  // Get each location and treat 404s
  getLocation: function(req, res){
    var resultObject = search(req.params.location, trip);

    // If the :location exists in the trip database ...
    if(resultObject){
      // Render it
      res.render('index',
        { locationName : resultObject.name,
          locationDescrip : resultObject.description,
          nextPort : resultObject.nextPort,
          tripImage : resultObject.image
      });    
    }
    // Else send them to the 404
    else {
      res.render('404');
    }
  },

  // Give users a JSON response on /next?location=SOMEPLACE query
  getNext: function(req, res){
    var currentLocation = req.query.location;
    var resultObject = search(currentLocation, trip);

    res.jsonp({ location      : resultObject.name, 
                nextLocation  : resultObject.nextPort });
  }

};

module.exports = indexController;