var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var db;

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err)
  db = database.db('exam')
})


/* GET ALL PRODUCTS */
router.get('/', (req, res) => {
  db.collection('students').find().toArray((err,result) => {
    if (err) return
    res.render('list',{students:result})
  })
})

/* SHOW ADD PRODUCT FORM */
router.get('/add', (req, res) => {
  res.render('add.ejs', {})
})
  
  router.post('/add',(req,res)=> {

    db.collection('students').find().sort({naam:1}).toArray((err,result) => {
      if(err) return console.log(err)
      if(result != '') {
      res.render('error') 
    }
      else {
          console.log(req.body.datum)
      db.collection('students').insertOne({
     naam:req.body.naam,
      geboortedatum:new Date(req.body.datum),
      studierichting: req.body.studierichting
    }
      )
        res.redirect('/')
    }}) 
    
  })


module.exports = router;
