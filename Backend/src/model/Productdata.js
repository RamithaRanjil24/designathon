const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Products');
const Schema = mongoose.Schema;

var NewProductSchema = new Schema({
    companyId : Number,
    companyName : String,
    position : String,
    vacancy : Number,
    // description : String,
    experience : Number,
    qualification :String,
    // imageUrl : String
});

var Productdata = mongoose.model('product', NewProductSchema);                        //UserData is the model and NewBookData is the schema

module.exports = Productdata;