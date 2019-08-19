const {Customer,validate}=require('../models/customer');
const auth = require('../middleware/auth');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get('/', async (req,res)=>{
const customer= await Customer.find().sort('name');
res.send(customer);
});

router.post('/',  async (req,res)=>{
const {error} = validate(req.body);
if (error) return res.status(400).send(error.details[0].message);

let customer = new Customer({
 name: req.body.name,
 phone:req.body.phone,
 isGold:req.body.isGold
});
await customer.save();
res.send(customer);
});

router.put('/:id', async (req,res) => {
const {error} = validate(req.body);
if (error) return res.status(400).send(error.details[0].message);

const customer= await Customer.findOneAndUpdate(req.params.id,{name: req.params.name, new:true});

 if (!customer) return res.status(404).send('the gener with given id is not fond ');
 
 customer.name=req.body.name;
 customer.phone=req.body.phone;
 customer.isGold=req.body.isGold;
 customer.save();
 res.send(customer);
});

router.delete('/:id', async (req,res)=>{
const customer= await Customer.findOneAndDelete(req.params.id);
if(!customer) return res.status(404).send('gener with the given id is not fond ');
res.send(customer);
});

router.get('/:id', async (req,res)=>{
const customer= await Customer.findById(req.params.id);
if(!customer) return res.status(404).send('gener with the given id is not fond'); 
res.send(customer);
});


module.exports = router;