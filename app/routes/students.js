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



module.exports = router;
