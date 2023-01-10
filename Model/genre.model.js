const mongoose = require("mongoose");

//the schema to get the data
const genreSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	genreName : String,
});

mongoose.model("genre", genreSchema);
