var yelp = require("yelp").createClient({
  consumer_key: "RTmlWWKM1e0yJ03HBRNcrA", 
  consumer_secret: "Li3ZTBFFqygbBKfwdedQR5MCYFQ",
  token: "lUakp9DqE6NVwNKNtqybo-qt6-ymqfwY",
  token_secret: "UgCZb8K5vHzaHMTvhr8_uNNG7rs"
});


  yelp.search({term: "burrito", location: "944 Market Street, #8, San Francisco, CA 94102", limit: 8, lat: 48.838685180566785, lon: 2.2835185700225713}, function(error, data) {
    console.log(error);
    console.log(data);
  });


// // See http://www.yelp.com/developers/documentation/v2/business
// yelp.business("yelp-san-francisco", function(error, data) {
//   console.log(error);
//   console.log(data);
// });