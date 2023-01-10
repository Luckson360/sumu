const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const artistModel = mongoose.model("artist");



/*router.get("/list", (req, res) =>{
	//setting
	/*var course = new courseModel();
	course.courseName = "ome";
	course.courseId = "hnfhg"
	course.save();*/
	//getting
	/*artistModel.find((error, docs) =>{
		if(!error){
			res.render("yea");
			console.log(docs);
		}else{
			res.send("error");
		}
	});
});*/



module.exports = router;