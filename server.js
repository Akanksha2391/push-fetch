
const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const User = require('./models/profile');

require('dotenv').config();

 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.json());


 mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

 const db = mongoose.connection;

 db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 db.once('open', () => console.log('connected to database') );

//create one user
app.post('/new',async(req,res)=>{
  
   console.log(req.body)
    const user = new User({
        firstName : req.body.firstName,
        secondName : req.body.secondName,
        address : req.body.address
    })
      try {
        const newUser = await user.save()
        res.json(newUser)
      } catch (err) {
        res.json({ message: err.message })
      }

})

//find one by first and last name
app.post('/find', async(req,res) =>{

    try {
        const user = await User.find({firstName : req.body.firstName, secondName : req.body.secondName})
        if (user == null) {
          return res.json({ message: 'Cannot find user' })

        }
        res.json(user)
      } catch (err) {
        return res.status(500).json({ message: err.message })
      }
    


})




app.listen(3000 ,() => console.log("server running"));

