const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const artistModel = mongoose.model("artist");
const singleModel = mongoose.model("single");
const genreModel = mongoose.model("genre");


router.get("/add", (req, res) =>{
	//setting
	

	//getting
	artistModel.find((error, artist) =>{
		if(!error){
			genreModel.find((error, genre) =>{
				if(!error){
					res.render("another",{artists: artist, genres: genre});
					console.log(genre);
				}else{
					res.send("thar");
				}
			});
		}else{
			res.send("thar");
		}
	});
});
/*
router.post("/add", (req,res) =>{
	var artist = new artistModel();
	console.log(req.body);
	//course.courseName = "mongo";
	//course.courseId = "djljdkjf"
	//course.save();
	artist._id = new mongoose.Types.ObjectId();
	artist.artistName = req.body.artistName;
	artist.save((err, doc) =>{
		if(!err){
			//res.redirect("/course/list");
			console.log("therew was an error");
		}else{
			console.log("added course")
		}
	});
	//then before the single creation the grid magic to work on this part
	//and then include the file id on the file field in the single model
	var single = new singleModel();
	console.log(req.body);
	//course.courseName = "mongo";
	//course.courseId = "djljdkjf"
	//course.save();
	single.singleTitle = req.body.singleTitle;
	single.artist = artist._id;
	single.save((err, doc) =>{
		if(!err){
			res.redirect("/course/list");
			console.log("therew was an error");
		}else{
			console.log("added course")
		}
	});

});*/


module.exports = router;