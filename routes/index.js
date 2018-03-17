var express = require('express');
var router = express.Router();
var mongo = require('../utils/mongo')
/* GET home page. */
router.get('/', function (req, res, next) {
  mongo().then((db) => {
    const collection = db.collection('games')
    return collection.find().toArray()
  }).then((games) => {
    console.log(games)
    res.render('index.html', { title: 'Express', games });
  })
});

module.exports = router;
