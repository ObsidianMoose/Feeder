var express = require('express');
var app = express();
var yelp = require('./yelp');
var geocoder = require('./geocoder');
var db = require('./databaseHelpers');
var bodyParser = require('body-parser');
var util = require('./authHelpers');
var auth = require('./auth');


// serves static pages
app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



// post request for food search. sends back top 3 results as JSON
app.post('/imhungry', function (req, res) {
  var search = req.param('search');
  var distance = req.param('distance');
  var stars = req.param('stars');
  var location = req.param('loc');
  var lat = location.latitude;
  var lon = location.longitude;

  //searches yelp, gets businesses and replies with reponse 200 and data
  yelp.searchYelp(search, distance, stars, lat, lon, req, res);
});

// //takes an object of the form: {username: bob, password: 123}

// app.post('/signup', function(req, res) {
// 	var userObject = {username: 'am', password: 1234} || req.body;
// 	db.addUserToDatabase(userObject, function(){res.end('success')});
// 	//search to see if user already exists
// });


app.post('/signin', auth.login);
app.post('/signup', auth.signup);
app.get('/signedin', auth.checkAuth);

//takes object of form {username: jon, restaurant: yum}
//adds to likes if not already there
app.post('/like', function (req, res, next) {
  console.log(req.body);
  var username = req.body.username || 'kim';
  console.log(1234, req.body.foodPlace)
  var restaurant = req.body.foodPlace || 'hi there';
  console.log(username, restaurant);
  db.isInLikes(username, restaurant, function (result) {
    if (!result) {
      db.addRestaurantToLikes(username, restaurant)
    } else {
      console.log('already in likes')
    }
  });
});


//takes object of form {username: jon, restaurant: yum}
//adds to dislikes if not already there
app.post('/dislike', function (req, res, next) {
  console.log(req.body);
  var username = req.body.username || 'kim';
  var restaurant = req.body.restaurant || 'hi';
  console.log(username, restaurant);
  db.isInDislikes(username, restaurant, function (result) {
    if (!result) {
      db.addRestaurantToDislikes(username, restaurant)
    } else {
      console.log('already in dislikes')
    }
  });
});

app.post('/likes', function (req, res, next) {
  console.log('USERNAME', req.body.username);
  var username = req.body.username || 'kim';
  db.getLikes(username, function (likes) {
    console.log('THESE ARE THE LIKES', likes);
    res.send(likes);
  });
});

app.get('/dislikes', function (req, res, next) {
  var username = 'kim';
  db.getDislikes(username, function (dislikes) {
    res.send(dislikes)
  });
});

var port = process.env.PORT || 3000;
app.listen(port);



// app.get('/login', loggedIn, function(req, res, next) {
//     // req.user - will exist
//     // load user orders and render them
// });

// app.get('/signup', loggedIn, function(req, res, next) {
//     // req.user - will exist
//     // load user orders and render them
// });