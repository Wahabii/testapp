const Joi =require('joi');
const mongoose=require('mongoose');

const GenerSchema= new mongoose.Schema({

name:{   
type:String,
required:true,
minlength:5,
maxlength:10
}
});
   
const Geners=new mongoose.model('Geners',GenerSchema);

function validateGeners(genere){
const schema ={
 name:Joi.string().min(3).max(50).required(),
};
 return Joi.validate(genere,schema);
}

exports.GenerSchema=GenerSchema;
exports.Geners=Geners;
exports.validate=validateGeners;