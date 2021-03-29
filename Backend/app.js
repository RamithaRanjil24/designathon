const express = require('express');
const ProductData = require('./src/model/Productdata');
const cors = require('cors');
var bodyparser=require('body-parser');
const jwt = require('jsonwebtoken')
var app = new express();
app.use(cors());
app.use(express.json());
username='admin';
password='1234';


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

app.post('/insert',verifyToken,function(req,res){
   
    console.log(req.body);
   
    var product = {       
        companyId : req.body.product.companyId,
        companyName : req.body.product.companyName,
        position : req.body.product.companyPosition,
        vacancy : req.body.product.vacancy,
        // description : req.body.product.description,
        experience : req.body.product.experience,
        qualification : req.body.product.qualification,
  
   }       
   var product = new ProductData(product);
   product.save();
});
app.get('/products',function(req,res){
    
    ProductData.find()
                .then(function(products){
                    res.send(products);
                });
});
app.get('/:id',  (req, res) => {
  
  const id = req.params.id;
    ProductData.findOne({"_id":id})
    .then((product)=>{
        res.send(product);
    });
})

app.post('/login', (req, res) => {
    let userData = req.body
    
      
        if (!username) {
          res.status(401).send('Invalid Username')
        } else 
        if ( password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: username+password}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      
    })

    app.put('/update',(req,res)=>{
      console.log(req.body)
      id=req.body._id,
      companyId= req.body.companyId,
      companyName = req.body.companyName,
      position = req.body.position,
      vacancy = req.body.vacancy,
      // description = req.body.description,
      experience = req.body.experience,
      qualification = req.body.qualification,
      // imageUrl = req.body.imageUrl
     ProductData.findByIdAndUpdate({"_id":id},
                                  {$set:{"companyId":companyId,
                                  "companyName":companyName,
                                  "position":position,
                                  "vacancy":vacancy,
                                  // "description":description,
                                  "experience":experience,
                                  "qualification":qualification,
                                  // "imageUrl":imageUrl
                                }})
     .then(function(){
         res.send();
     })
   })
   
app.delete('/remove/:id',(req,res)=>{
   
     id = req.params.id;
     ProductData.findByIdAndDelete({"_id":id})
     .then(()=>{
         console.log('success')
         res.send();
     })
   })
     

app.listen(3000, function(){
    console.log('listening to port 3000');
});

