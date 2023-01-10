const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const expresshandlerbars = require('express-handlebars');
const artist = require("./artist.model");
const single = require("./single.model");
const album = require("./album.model")
const albumSingle = require("./albumSingle.model")
const genre = require("./genre.model")



//const mongoURI = "mongodb://localhost:27017/SICKO_DB";

//const conn = mongoose.createConnection(mongoURI);
mongoose.connect('mongodb+srv://luckson:pa$$3orD@cluster0.3fghbe9.mongodb.net/SAHARA', { useNewUrlParser: true, useUnifiedTopology: true }, (error) =>{
	if(!error)
	{
		console.log('success');
	}
	else
	{
		console.log('not c0nnexted');
	}
});
//module.exports = conn
/*
the database issue is a fix now andthe thing remaining is to 
print the data on to the home page and configure the other 
apis for each song displayed 

deal with the display and sending data from the diaplayed file tonight look
up on this and then the rest and fix those at night

//then in the next phase 
1.create the read stream for the audio file place it onthe 
page in a controlled way with a good low data player for the web
2.the download file feature which shud luk like the usual music app way
3.deal with the stats func to keep tarq of the 
	.number of songs sold
	.the downloads
	.the streams 
	.the shares and the likes
	.have a whats p0pp1n feature to knoe how much a user loves the music
4.using the stats create a model for the best performing songs on the site 
and put those alphabetically so that the pages use the one model that has evarything
5.then deal with the browse feature according to 
	.the genres
	.the trending 
	.the top artists
6.the search box 
*/