const request=require('supertest');
const {Genre}=require('../../models/gener');
let server =require('../../app');;
describe('/api/geners', ()=>{
 beforeEach(()=>{server});
 afterEach( async ()=>{ server.close();
  await Genre.remove({});

});
 
 describe('GET / ', ()=>{
 it ('should return all geners' , async ()=>{
  await Genre.collection.insertMany([
    {name:'genre1'},
    {name:'genre2'}
  ]);
  
  const res= await request(server).get('/api/geners');
  expect(res.status).toBe(200); 
  expect(res.body.length).toBe(2);
});
});
});