const admin =require('../middleware/admin');
const auth =require('../middleware/auth');
const Joi =require('joi');
const mongoose=require('mongoose');
const {Geners, validate}=require('../models/gener');
const express=require('express');
const router=express.Router();


router.get('/',async (req , res)=>{
//throw new Error('could not get the geners . ');
const gener= await Geners.find().sort('name');
res.send(gener);
});

router.post('/', auth, async (req,res)=>{
const {error} = validateGener(req.body);
if (error) return res.status(400).send(error.details[0].message);

let gener = new Geners({ name: req.body.name});
await gener.save();
res.send(gener);
});

router.put('/:id',async (req,res) => {
const {error} = validateGener(req.body);
if (error) return res.status(400).send(error.details[0].message);

const gener= await Geners.findOneAndUpdate(req.params.id,{name: req.params.name, new:true});

 if (!gener) return res.status(404).send('the gener with given id is not fond ');
 
 gener.name=req.body.name;
 gener.save();
 res.send(gener);
});

router.delete('/:id', [auth,admin], async (req,res)=>{
const gener= await Geners.findOneAndDelete(req.params.id);
if(!gener) return res.status(404).send('gener with the given id is not fond ');
res.send(gener);
});

router.get('/:id',async (req,res)=>{
const gener= await Geners.findById(req.params.id);
if(!gener) return res.status(404).send('gener with the given id is not fond'); 
res.send(gener);
});

function validateGener(gener){

const schema ={

    name:Joi.string().min(3).max(10).required()

};

return Joi.validate(gener,schema);


}


module.exports = router;