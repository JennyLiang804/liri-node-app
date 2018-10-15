require("dotenv").config();

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var search = process.argv[2];

if (search === "movie-this") {
    var movie = process.argv.slice(3).join(" ");

    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            // console.log(JSON.parse(body));
            var bodyData = JSON.parse(body);
            //  console.log(bodyData);

            var showName = bodyData.name;
            var showGenres = bodyData.genres;
            var showRating = bodyData.rating;
            var showSummary = bodyData.summary;

            var searchResult = `Show Name: ${showName} \n Genre: ${showGenres} \n Rating: ${showRating} \n Summary: ${showSummary} \n  \n  \n`;
            console.log(searchResult);
        };
    })
};
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
var spotifyThis = function () {
    if (search === "spotify-this-song") {
        var song = process.argv.slice(3).join("");
        spotify.search({
            type: 'track',
            query: song,
            limit: 1
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var result = data.tracks.items[0];
            var name = result.artists[0].name;
            var songName = result.name;
            var albumName = result.album.name;
            var url = result.external_urls.spotify;
            console.log("Name: " + name);
            console.log("Song: " + songName);
            console.log("Album: " + albumName);
            console.log("URL: " + url);

        });
    };
}

if (search === "concert-this") {
    var artist = process.argv.slice(3).join("");
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            // console.log(JSON.parse(body));
            var result = JSON.parse(body);

            for (var i = 0; i < result.length; i++) {
                var name = result[i].venue.name;
                var location = result[i].venue.city + ", " + result[i].venue.country;
                var date = result[i].datetime;
                console.log("---------------------");
                console.log("Name: " + name);
                console.log("Location: " + location);
                console.log("Date: " + moment(date).format("L"));

            };
        };
    })
};





spotifyThis();
if (search === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
        var random = data.split(",").join(" ");
        console.log(random);
    });

}