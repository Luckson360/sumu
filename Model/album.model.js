const mongoose = require("mongoose");

//the schema to get the data
const albumSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	albumTitle : {
		type : String
	},
	albumArtist : String,
	albumSingles : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "albumTrack"
	}],
	albumTracklist : Number,
	albumname : Number,
	albumType : String,
	coverArt : String,
	government : String,
	releaseDate : Date,
	year : String,
	genre : String,
	isFeatured : Boolean,
	recordLabel : String,
	copyright : String,
	explicit : Boolean
});

mongoose.model("album", albumSchema);