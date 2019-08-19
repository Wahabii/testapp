require('express-async-errors');
const winston=require('winston');
//require('winston-mongodb');
/*
module.exports=function(){
process.on('uncaughtException',(ex)=> {
console.log('we got an uncaught exception');
winston.error(ex.message, ex);
});

winston.handelException(
new winston.transports.Console({colorize:true , prettyPrint:true}),
new winston.transports.File({filename:'uncaughtException.log'}));

process.on('unhandledRejection',(ex)=> {
console.log('we got an unhandled rejection');
winston.error(ex.message, ex);
process.exit(1);
});
const p= Promise.reject(new Error('somthing failed miserably!'));
p.then(()=> console.log('done'));
winston.add(winston.transports.File, {filename:'logfile.log'});
//winston.add(winston.transports.MongoDB,{db:'mongodb://localhost/playground',
//level:'error'});
}
*/

module.exports=function(){
winston.exceptions.handle(new winston.transports.File({filename:'uncaughtException.log'}));
process.on('unhandledRejection',(ex)=>{
throw ex;
});
}