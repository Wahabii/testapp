const Joi =require('joi');
const mongoose=require('mongoose');
const GenerSchema=require('./gener');
const MovieSchema= new mongoose.Schema({

    title:{
   
   type:String,
   required:true,
   trim:true,
   minlength:5,
   maxlength:255
    },
   
    genre:{
      type:GenerSchema,
      required:true
    },
   
   NumberInStock:{
    type:Number,
    required:true,
    min:0,
    max:255
   },

  dailyRentalRate:{
    type:Number,
    required:true,
    min:0,
    max:255
  }
   });
   
const Movies=new mongoose.model('Movies', MovieSchema);

function validateMovie(movie){
const schema ={
 title:Joi.string().min(3).max(50).required(),
 genreId:Joi.string().required(),
 NumberInStock:Joi.number().min(0).required(),
 dailyRentalRate:Joi.number().min(0).required()
};
}

exports.Movies=Movies;
exports.validateMovie=validateMovie;