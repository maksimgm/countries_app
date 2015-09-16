var mongoose = require("mongoose");

var countrySchema = new mongoose.Schema({
                   name: {type:String, required:true},
                   population: {type:Number, required:true},
                   img: {type:String, required:true},
                   cities: Array
                  });


var Country = mongoose.model("Country", countrySchema);

module.exports = Country;