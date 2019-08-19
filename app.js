const winston=require('winston');
//const jwt=require('jsonwebtoken');

const express=require('express');
const app=express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const port=process.env.PORT || 4000;
const server=app.listen(port,()=> winston.info(`connected with port ${port} ...`));

module.exports=server;