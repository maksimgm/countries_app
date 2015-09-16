var express = require("express"),
  app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var morgan = require('morgan');
app.use(morgan('tiny'));

var db = require("./models");


app.get("/",function(req,res){
  db.Country.find({},function(err,countries){
    if (err) {
      res.render("404");
    }else{
      res.render("index",{countries:countries});
    }
  });
});

// finds book by ID
// render to edit
// pass in keys & values after render
app.get("/countries/:id/edit/",function(req,res){
  db.Country.findById(req.params.id,function(err,country){
    if(err){
      res.render("404");
    }else{
      res.render("edit",{country:country});
    }
  });
});


// render show
// found country
app.get("/countries/:id",function(req,res){
  db.Country.findById(req.params.id,function(err,country){
    if(err){
      res.render("404");
    }else{
      res.render("show",{country:foundCountry});
    }
  });
});


app.put("/countries/:id",function(req,res){
  db.Country.findAndUpdateById(req.params.id,req.body.id,function(err,country){
    if (err) {
      res.render("404");
    }else{
      res.render("/");
    }
  });
});

app.delete("/remove/:id",function(req,res){
  db.Country.findByIdAndRemove(req.params.id,function(err,country){
    if (err) {
      res.render("404");
    }else if(country){
      res.redirect("/");
    }
  });
});

app.post("/countries",function(req,res){
  db.Country.create(req.body.country,function(err,country){
    if (err) {
      var errorText = "Please Try Again. Text Cannot be Blank.";
      res.render("new",{error:errorText});
    }else if(country){
      res.redirect("/");
    }
  });
});

app.get("/new",function(req,res){
  res.render("new");
});


app.listen(3000,function(){
  console.log("Got to localhost:3000/");
});