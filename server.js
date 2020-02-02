// **********************************************
// dependencies 
// **********************************************
var express = require("express");
var path = require("path");
var fs = require ("fs"); 
var db = require ("./assets/db/db.json")

var app = express();
var PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// **********************************************
// routes 
// **********************************************

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "./assets/public/index.html"));
});

// open the notes maintenance page
app.get("/notes", function(req, res) {
   res.sendFile(path.join(__dirname, "./assets/public/notes.html"));
});

// get the latest db
app.get("/api/notes", function(req, res) {

   console.log ("here"); 
   fs.readFile ("./assets/db/db.json", function (err, data){
      if (err){
         console.log (err); 
         throw (err); 
      }
   let notes = JSON.parse(data); 
   return res.json(notes);
   //return data;
   });
});


// **********************************************
// listen 
// **********************************************

app.listen(PORT, function() {
   console.log("App listening on PORT " + PORT);
});
