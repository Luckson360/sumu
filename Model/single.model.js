const mongoose = require("mongoose");

//the schema to get the data
const singleSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	singleNumber : Number,
	audio : String,
	singleTitle : {
		type : String
	},
	albumTitle : String,
	artistName : String,
	coverArt : {
		type : String,
	},
	downloads : {
		type : Number,
		default : 0
	},
	streams : {
		type : Number,
		default : 0,
		timestamp : true
	},
	singlename : String,
	government : String,
	releaseDate : Date,
	genre : String,
	country : String,
	featuredArtists : Array,
	isFeatured : Boolean,
	ISRC : String,//its gonna be using the international standards for the special traq identification 
	
});

mongoose.model("single", singleSchema);

	singleSchema.index({
		singleTitle:"text",
		description: "text"
	});
//ASAP TO BE ATTENDED TO 
//have the validators in their places so to avoid the errors
//for the cover art have jpeg png or ohters and the same for the mp3s
//have a powerful system of storing the government names for security maybe use the 
//crypto and others outher3 

//have the RD as a field too
//use this model for the album too for easy rendering and querying
//for the more functionality too