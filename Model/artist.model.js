const mongoose = require("mongoose");

//the schema to get the data
const singleSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	artistName : String,
	
});

mongoose.model("artist", singleSchema);