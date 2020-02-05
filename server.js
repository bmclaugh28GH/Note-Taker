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
app.use (express.static(path.join(__dirname, 'public'))); 

// **********************************************
// globals
// **********************************************
var maxID = 0; 

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

   //console.log ("here"); 
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

app.delete ("/api/notes/:id", function (req, res){

   console.log ('delete ' + req.params.id); 
   fs.readFile ("./assets/db/db.json", function (err, data){
      if (err) throw (err); 
      let notes = JSON.parse(data); 
      console.log(notes);

      for (let i=0;i<notes.length;i++){
         if (notes[i].id==req.params.id){

            notes.splice(i,1);  
            console.log (" "); 
            console.log (notes); 

            let noteStr = JSON.stringify(notes);
            fs.writeFile ("./assets/db/db.json", noteStr, (err)=>{
               if (err) throw err; 
               return res.json (true); 
            }); 
         }
      }
   }); 
});

app.post("/api/notes", function(req, res) {

   fs.readFile ("./assets/db/db.json", function (err, data){
      if (err) throw (err); 
      let notes = JSON.parse(data); 

      // this is clunky, but we'll use FOR to get the maxID. Remember, the 
      // function returns the max ID, not the NEXT ID, so increment!
      let nextID = getNextID(notes) + 1;  

      let newNote = {
         id: nextID, 
         title: req.body.title, 
         text: req.body.text
      }
      notes.push(newNote); 

      let noteStr = JSON.stringify(notes);
      fs.writeFile ("./assets/db/db.json", noteStr, (err)=>{
         if (err) throw err; 
         return res.json (newNote); 
      }); 
   });
}); 

// **********************************************
// functions 
// **********************************************

function getNextID (notes){
   var maxID = 0; 
   for (let i=0;i<notes.length;i++){
      maxID = Math.max(notes[i].id, maxID); 
   }
   return maxID; 
}

// **********************************************
// listen 
// **********************************************

app.listen(PORT, function() {
   console.log("App listening on PORT " + PORT);
});
