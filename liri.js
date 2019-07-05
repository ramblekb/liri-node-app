require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const axios = require('axios');


var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ").trim();

console.log(command)
console.log(searchTerm)

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
   console.log(data); 
  });

 
// Make a request for a user with a given ID
axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
  .then(function (response) {
    // handle success
    console.log(response.data[0].venue.name);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })