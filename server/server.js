var express = require('express');
var app = express();
var yelp = require('./yelp');
//require request handler


// serves static pages
// unsure if this will work with angular routing for views at the moment*******
app.use(express.static(__dirname + '/../client/'))


//post request for food search. needs to send back top 3 results as JSON
// app.post('/getmefood', function (req, res) {
//   var url = req.param('url');
//   request.getHtmlAndCssLinks(url, req, res);
// });



app.listen(3000);





//users should be able to access all functionality without signing in
//index.html
//likes
//login
//signup