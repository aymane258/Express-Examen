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
  db.collection('exam').find().toArray((err,result) => {
      console.log(result.naam)
    if (err) return
    res.render('list',{students:result})
  })
})

/* SHOW ADD PRODUCT FORM */
router.get('/add', (req, res) => {
  res.render('add.ejs', {})
})
  
  router.post('/add',(req,res)=> {

    db.collection('students').find(req.body).toArray((err,result)=> {
      if(err) return console.log(err)
      if(result != '') {
      res.render('error') 
      console.log(result)
    }
      else {
      db.collection('students').insertOne({
     naam:req.body.naam,
      geboortedatum:req.body.datum,
      studierichting: req.body.studierichting
    }
      )
        res.redirect('/')
    }}) 
    
  })


module.exports = router;
