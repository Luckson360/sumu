const connection = require("./Model");
/*const artists = require("./model/artist.model.js");
const singles = require("./model/single.model.js");*/
const mongoose = require("mongoose");
const express = require("express");
const application = express();
const path = require("path");
//const io = require("socket.io")(3000);
//const jquery = require("jquery")
//const popper = require("popper.js")
//const bootstrap = require("bootstrap")
const crypto = require("crypto")
const bodyparser = require('body-parser');
const multer = require("multer")
const GridFsStorage = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")
const expresshandlerbars = require('express-handlebars');
const search = require("mongoose-partial-full-search")
const artistcontroller = require("./controllers/artistlist.js");
const addartistcontroller = require("./controllers/add-artist.js");
const artistModel = mongoose.model("artist");
//const singleModel = mongoose.model("single");
const genreModel = mongoose.model("genre");
const albumModel = mongoose.model("album")
const albumtrackModel = mongoose.model("albumTrack", single)



application.use(bodyparser.urlencoded({
	extended: true
}));

const mongoURI = "mongodb+srv://luckson:pa$$3orD@cluster0.3fghbe9.mongodb.net/SAHARA"
/* || "mongodb://localhost:27017/SAHARA_DB";*/
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
	if (!error)
		console.log("ait")
	else
		console.log("no")
});

application.use(express.static(__dirname + "/public"));
/*const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true }, (error) =>{
	if(!error)
	{
		console.log('success');
	}
	else
	{
		console.log('not c0nnexted');
	}
});*/
const PORT = process.env.port || 5000

application.listen(PORT, (error) =>{
	console.log(`server started on port 5000 admn`);
});



/*if (process.env.NODE_ENV === 'production') {
	app.use(express.static('public/build'))
}*/

function getAudioUrl (url) {
	//console.log("right")
}
var single;
var url;
var albumTitle;
var artist = {
	artistName: this.name,
	singles: [
	{
		singletitle: this.singleTitle,
		audioUrl: getAudioUrl(url),
		singleArtist: this.singleArtist
	}
	],
	albums: [albumTitle]
}

//the views 
/*application.set("views", path.join(__dirname, "/views/"));

application.engine("hbs", expresshandlerbars({
	extname : "hbs",
	defaultLayout : "mainlayouts",
	layoutsDir : __dirname + "/views/layouts"
}));*/

application.set("view engine", "ejs");


let gfs;
conn.once("open", () => {
  //init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
})

//the storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) =>{
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if(err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({storage});


//THIS IS THE API FOR THE SEARCH BOX ITS PARTIAL NOW THOE SO YOU KONW WHATS UP
application.get("/text", (req,res) =>{
	var genre = new genreModel();
	console.log(req.query.that)
	var q = req.query.that
	albumtrackModel.find({singleTitle: {$regex: new RegExp(q)}},{_id: 0, __v: 0}, function (err,result) {
		if (err) return handleError(err);

    if (result.length > 0) {
    	console.log(result)
      res.render("searchresult", {results: result})
    } else {
    	res.json({
    		message: "No results found"
    	})
    }
	})
})
//END THE API
application.get("/image/:filename", (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    //check if file 
    if(!file || file.length === 0) {
      return res.status(404).json({
        err:"no files exist"
      })
    }
    //read
    //check if image
    if(file.contentType === "image/jpeg" || file.contentType === "image/png"){
    	console.log("right");
    	const readstream = gfs.createReadStream(file.filename);
    	readstream.pipe(res);
    }else{
    	console.log("is an audio file");
    }
  })
})

//theAPI for the audio
application.get("/audio/:filename", (req, res) => {
	  	albumtrackModel.findOneAndUpdate({audio: req.params.filename}, {$inc : {streams : 1},Date: Date.now()},{new : true}, (err,single) =>{
  		if(!err){
  			console.log(single)
  		}else{
  			console.log(err)
  		}
  	})
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    //check if file 
    if(!file || file.length === 0) {
      return res.status(404).json({
        err:"no files exist"
      })
    }
    //read
    //check if audio
    if(file.contentType === "audio/mpeg" || file.contentType === "audio/wav"){
    	console.log("right");
    	const readstream = gfs.createReadStream(file.filename);
    	readstream.pipe(res);
    }else{
    	console.log("is an image file");
    }
  })
})


// #albums page: render the top 100 albums

application.get("/albums", (req,res) =>{
	//album = albumModel()
  //well output the album.albumtitle plus change it in models and admin too
	albumtrackModel.find({albumType: "album"}, (err,album) =>{
		if(!err){
			if(album.length > 0) {
			albumtrackModel.find({isfeatured: true}, (err,featuredAlbum) =>{
				if(!err){
					if (featuredAlbum.length > 0) {
					console.log(featuredAlbum)
					console.log(album)
					res.render("albums", {albums: album, featuredAlbums: featuredAlbum})
				} else {
					res.redirect("/")
				}
				}
				else{
					console.log(err)
				}
			})
		} else {
			res.redirect("/")
		}
		}
		else{
			console.log(err)
		}
	}).sort( {streams: -1} ).limit(100)
})
//END ROUTE


// #singles page: render the top 100 tracks
application.get("/singles", (req,res) =>{
	//album = albumModel()

	albumtrackModel.find({}, (err,single) =>{
		if(!err){
			albumtrackModel.find({isfeatured: false}, (err,featuredTrack) =>{
				if(!err){
					console.log(featuredTrack)
					console.log(single)
					res.render("singles", {singles: single, featuredTracks: featuredTrack})
				}
				else{
					console.log(err)
				}
			})
		}
		else{
			console.log(err)
		}
	}).sort( {downloads: -1} ).limit(100)
})
//END ROUTE

//# render the stream albumType: "Album"
application.get("/album/:government", (req,res) =>{
	//single = albumtrack()
			/*gfs.files.findOne({id: single.file}, (err,file) =>{
			if(!err)
				console.log("err",file.filename)
			else
				console.log(err)
		});*/
	albumModel.findOne({government: req.params.government}, (err,album) =>{
		if(!err){
			//console.log(album.government)
			albumtrackModel.find({government: req.params.government}, (err,albumtrack) =>{
				if(!err){
					console.log(albumtrack)
					res.render("album", {album: album, albumtracks: albumtrack})
				}
				else{
					console.log(err)
				}
			});
			console.log("album")
		}
		else{
			console.log(err)
		}
	}).populate("albumSingles");
})
//END ROUTE
//ROUTE TO RENDER THE HOME PAGE
application.get("/", (req,res) =>{
	//have the front page print only up to 20 cds singles and albums those tha
	//are perfoming well and hvly and the top ten genres on the site 
	//****//
	//we filter by Release Date $gt present date
	albumtrackModel.find({}, (err,albumtrack) =>{
		if(!err){
			albumtrackModel.find({isFeatured: true}, (err,featuredTrack) =>{
				if(!err){
					res.render("sliderfile", {albumtracks: albumtrack, featuredTracks: featuredTrack})
				}
				else{
					console.log(err)
				}
			})
		}
		else{
			console.log(err)
		}
	}).sort( {downloads: -1} ).limit(100);
})


//THE API FOR THE TOP 200 CHART CDs
application.get("/charts", (req,res) =>{
	//single = singleModel()
	//have the front page print only up to 20 cds singles and albums those tha
	//are perfoming well and hvly and the top ten genres on the site 
	//****//
	//we filter by Release Date $gt present date
	albumtrackModel.find({}, (err,single) =>{
		if(!err){
			//genre : singles: single
			if (single.length > 0) {
				res.render("charts", {singles: single})
			} else {
				res.json({
					err: "No tracks To display"
				})
			}
		}
		else{
			console.log(err)
		}
	}).sort( {downloads: -1} ).limit(200);
})
//END API

//THE API FOR THE TOP 200 CHART CDs = charts/genrename
application.get("/charts/:genre", (req,res) =>{
	single = singleModel()
	albumtrackModel.find({genreName:req.params.genre}, (err,single) =>{
		if(!err){
			res.render("cdgenrefilter", {singles: single})
		}
		else{
			console.log(err)
		}
	}).sort( {streams: -1} ).limit(200);
})
//END API

//THE API FOR THE TOP 200 CHART ALBUMS
application.get("/albumschart", (req,res) =>{
	//have the front page print only up to 20 cds singles and albums those tha
	//are perfoming well and hvly and the top ten genres on the site 
	//****//
	//we filter by Release Date $gt present date
	albumModel.find({}, (err,album) =>{
		if(!err){
			res.render("albumschart",{albums: album});
		}
		else{
			console.log(err)
		}
	}).sort( {streams: -1} ).limit(200);
})
//END API

//THE API FOR THE TOP 200 CHART ALBUMS = charts/genrename
application.get("albums/charts/:genre", (req,res) =>{
	//single = singleModel()
	albumtrackModel.find({genreName:req.params.genre}, (err,album) =>{
		if(!err){
			res.render("albumgenrefilter", {albums: album})
		}
		else{
			console.log(err)
		}
	}).sort( {streams: -1} ).limit(200);
})
//END API


//to update the download 
application.get("/downloads/:filename", (req, res) => {
	//single = singleModel()
	//var desk = req.body.downloadcount;
  	albumtrackModel.findOneAndUpdate({audio: req.params.filename}, {$inc : {downloads : 1}},{new : true}, (err,single) =>{
  		if(!err){
  			console.log(single)
  		}else{
  			console.log(err)
  		}
  	})

  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    //check if file 
    if(!file || file.length === 0) {
      return res.status(404).json({
        err:"no files exist"
      })
    }
    //read
    //check if image
    if(file.contentType === "audio/mpeg" || file.contentType === "image/png"){
    	console.log("right");
    	const readstream = gfs.createReadStream(file.filename);
    	readstream.pipe(res);
    }else{
    	console.log("is an audio file");
    }
  })
})

//GET ROUTE ARTISTS
///artist FOR THE ARTIST PAGE 
application.get("/artists", (req,res) =>{

	albumtrackModel.find({}, (err,artist) =>{
		if(!err){
			console.log(artist)
			res.render("allArtists", {artists: artist})
		}
		else{
			console.log(err)
		}
	})


	//console.log(single.file);
})
//THE API FOR ARTISTS ALL PROJECTS
//ARTISTNAME/ALL 
application.get("/:artistName", (req,res) => {
	albumtrackModel.find({artists: req.params.artistName}, (err,single) =>{
		if(!err && single.length > 0){
			albumModel.find({albumArtist: req.params.artistName}, (err,album) =>{
				if(!err){
					console.log(album)
					res.render("artistpage", {albums:album, singles:single})

				}
				else{
					console.log(err)
				}
			})
		}
		else{
			console.log(err)
			res.redirect("/artists")
		}
	})
})
//END API


//THE API TO HANDLE THE DELETE REQUEST FOR THE COVER ART
application.post("/cover/:coverArt", (req,res) =>{
	gfs.remove({filename: req.params.coverArt, root:"uploads"}, (err,Grid) =>{
		if(err){
			return res.status(404).json({err : err})
		}else{
			res.redirect("/")
		}
	})
})
//END API

//THE API TO HANDLE THE DELETE REQUEST FOR THE AUDIO
application.post("/cover/:audio", (req,res) =>{
	gfs.remove({filename: req.params.audio, root:"uploads"}, (err,Grid) =>{
		if(err){
			return res.status(404).json({err : err})
		}else{
			singleModel.findOneAndRemove({audio: req.params.audio}, (err,deletedSingle) =>{
				if(!err){
					console.log(deletedSingle)
					res.redirect("/")
				}
				else{
					console.log(err)
				}
			})

		}
	})
})
//END API

//THE API TO HANDLE THE DELETE REQUEST FOR THE AUDIO
application.post("/delete/:id", (req,res) =>{
	singleModel.deleteOne({_id:  req.params.id}, (err,deletedSingle) =>{
		if(!err){
			console.log(deletedSingle)
			res.redirect("/")
		}
		else{
			console.log(err)
		}
	})
})
//END API



