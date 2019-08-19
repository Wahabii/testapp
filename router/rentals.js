const {Rental,validate}=require('../models/rental');
const {Movies,validateMovie}=require('../models/movie');
const {Customer,validateCustomer}=require('../models/customer');
const mongoose=require('mongoose');
const fawn =require('fawn');
const express=require('express');
const router=express.Router();

fawn.init(mongoose);

router.get('/', async (req,res)=>{
const rentals= await Rental.find().sort('-dateOut');
res.send(rentals);
});

router.post('/', async (req,res)=>{
 const  {error} = validate(req.body);
 if(error) return res.status(400).send(error.details[0].message)
 const customer = await Customer.findById(req.body.customerId);
 if (!customer) return res.status(400).send('invalid customer');
 const movie = await Movies.findById(req.body.movieId);
 if(!movie) return res.status(400).send('invalid movie');

 if(movie.NumberInStock === 0) return res.status(400).send('movie not existe in stock');
 let rental=new Rental({
 customer:{
 _id:customer._id,
 name:customer.name,
 phone:customer.phone

 },
 movie:{
 _id:movie._id,
 title:movie.title,
 dailyRentalRate:movie.dailyRentalRate
}
});

try{
    new Fawn.Task().save('rental',rental)
    .update('movies',{_id:movie._id},{
        $inc:{NumberInStock:-1}
    }).run();
    res.send(rental);

}catch(ex){


res.status(500).send('samthing fieald .. ');

}

});

module.exports=router;