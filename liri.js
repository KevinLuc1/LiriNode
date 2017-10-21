var keys = require("./key.js");
var twitter = require("twitter");
var spotify = require("spotify");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var omdb = require("omdb");

var action = process.argv[2];
var thirdParam = process.argv[3];


var twitterKeys = keys.twitterKeys;
 
switch(action) {
		
	case "my-tweets": 
	myTweets(); 
	break;

	case "spotify-this-song":
	spotifyThisSong();
	break;
		
	case "movie-this":
	movieThis();
	break;
		
	case "do-what-it-says": 
	doWhatItSays(); 
	break;

	};

function spotifyThisSong(nameOfSong){

	var spotify = new Spotify(keys.spotifyKeys)
	

	params = thirdParam;
	spotify.search({ type: "track", query: params }, function(err, data) {
		
		if(!err){
			spotify.search({type: "track", query: params}, function(err, data){
				console.log("artist : " + data.tracks.items[0].artists[0].name);
                console.log("song : " + data.tracks.items[0].name);
                console.log("link: " + data.tracks.items[0].preview_url);
                console.log("album : " + data.tracks.items[0].album.name);
			})
		}	
		else {
			console.log("Error :");
			return;
		}
	})
};

function myTweets() {
	var twitter = require("twitter");
		var client = new twitter(keys.twitterKeys)
		
		params = {screen_name: "kkll29443325", count: 20, trim_user: true, exclude_replies: true};
		client.get("statuses/user_timeline.json", params, function(error, tweets, response){
			if (!error) {
				for(var i = 0; i < tweets.length; i++) {
					console.log(tweets[i].created_at);
					console.log(tweets[i].text);
				}
			}  
			else {
				console.log("Error " + error);
				return;
			}
		});
	}

function movieThis() {
	if (thirdParam === undefined) {
		request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=40e9cece", function (error, response, body) {
		 	console.log("DEFAULT MOVIE")
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log("Rating: " +JSON.parse(body).Rated);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            
           
		 })

	}
	
	else {
		 request("http://www.omdbapi.com/?t=" + thirdParam + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
		 	
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log("Rating: " +JSON.parse(body).Rated);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            
           
		 })
	}
}

function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(err, data){
		console.log(JSON.parse(data)
		var results = data.split(",");
		spotifyThisSong(results[1]);
	})
}

