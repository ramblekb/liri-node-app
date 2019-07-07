require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const axios = require('axios');
var moment = require('moment');
moment().format();
var fs = require('fs');


var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ").trim();

console.log(command);
console.log(searchTerm);

UserInput(command, searchTerm);

function UserInput(command, searchTerm) {
  switch (command) {
    case "spotify-this-song":
      spotifySong(searchTerm);
      break;
    case "concert-this":
      concertThis(searchTerm);
      break;
    case "movie-this":
      movieThis(searchTerm);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;

    default: console.log("\n" + "after 'node liri.js' type one of the following and your search: " + "\n" +
    "spotify-this-song 'add song title' " + "\n" +
    "concert-this 'add artist name' " + "\n" +
    "movie-this 'add movie title' " + "\n" +
    "do-what-it-says " + "\n" 
    // +
    // "use quotes for multi word titles"
    );
  };


function spotifySong(searchTerm) {
  if (!searchTerm) {
    searchTerm = "The Sign";
  }

  spotify.search({
      type: 'track',
      query: searchTerm
    })
    .then(function (response) {
      for (var i = 0; i < 5; i++) {
        var spotifyResults =
          "--------------------------------------------------------------------" +
          "\nArtist(s): " + response.tracks.items[i].artists[0].name +
          "\nSong Name: " + response.tracks.items[i].name +
          "\nAlbum Name: " + response.tracks.items[i].album.name +
          "\nPreview Link: " + response.tracks.items[i].preview_url;

        console.log(spotifyResults);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};


function concertThis(searchTerm) {
  // Make a request for a user with a given ID
  axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // handle success
      for (var i = 0; i < response.data.length; i++) {
        var datetime = response.data[i].datetime;
        var dateArr = datetime.split("T");

        var concertResults =
          "--------------------------------------------------------------------" +
          "\nVenue Name: " + response.data[i].venue.name +
          "\nVenue Location: " + response.data[i].venue.city +
          "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY"); //dateArr[0] should be the date separated from the time
        console.log(concertResults);
      }
    })
    .catch(function (err) {
      
      console.log(err);
    })
}

function movieThis(searchTerm) {
  if (!searchTerm) {
    searchTerm = "Mr Nobody";
  }
  axios.get("https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
      var movieResults =
        "--------------------------------------------------------------------" +
        "\nMovie Title: " + response.data.Title +
        "\nYear of Release " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
        "\nCountry Produced: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nActors/Actresses: " + response.data.Actors;
      console.log(movieResults);
    })
    .catch(function (error) {
      console.log(error);
    })
}


function doWhatItSays() {
  fs.writeFile('random.txt', 'I Want It That Way', function (err, data) {
   
    
  });
}
}

