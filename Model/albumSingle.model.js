const mongoose = require("mongoose");

//the schema to get the data
const textSearch = require("mongoose-partial-full-search")

const singleSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	singleNumber : Number,
	audio : String,
	singleTitle : {
		type : String
	},
	artists : String,
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
	albumType: String,
	albumTitle: String,
	government : String,
	releaseDate : Date,
	genre : String,
	featuredArtists : String,
	isFeatured : Boolean,
	duration : Number
});

//singleSchema.plugin(textSearch);


/*singleSchema.index({
	singleTitle:"text",
	description: "text"
});*/

const single = mongoose.model("albumTrack", singleSchema)

module.exports = single
