const {Movies,validateMovie}=require('../models/movie');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get('/', async (req,res)=>{
const movie= await Movies.find().sort('name');
res.send(movie);
});

router.post('/', async (req,res)=>{
const {error} = validateMovie(req.body);
if (error) return res.status(400).send(error.details[0].message);

const gener = await Gener.finById(req.body.generId);
if(!gener)return res.status(404).send('the generId not existe');


let movie = new Movies({
 title: req.body.title,
  gener:{
    _id:genre._id,
    name:genre.name    
  },
  NumberInStock:req.body.NumberInStock,
  dailyRentalRate:req.body.dailyRentalRate
 
});
await movie.save();
res.send(movie);
});

router.put('/:id', async (req,res) => {
const {error} = validateMovie(req.body);
if (error) return res.status(400).send(error.details[0].message);

const movie= await Movies.findOneAndUpdate(req.params.id,{name: req.params.name, new:true});

 if (!movie) return res.status(404).send('the gener with given id is not fond ');
 
 movie.title=req.body.title;
 movie.generId=req.body.generId;
 NumberInStock=req.body.NumberInStock;
 dailyRentalRate=req.body.dailyRentalRate;
 movie.save();
 res.send(movie);
});

router.delete('/:id', async (req,res)=>{
const movie= await Movies.findOneAndDelete(req.params.id);
if(!movie) return res.status(404).send('gener with the given id is not fond ');
res.send(movie);
});

router.get('/:id', async (req,res)=>{
const movie= await Movies.findById(req.params.id);
if(!movie) return res.status(404).send('gener with the given id is not fond'); 
res.send(movie);
});


module.exports = router;