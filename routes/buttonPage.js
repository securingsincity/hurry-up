var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.render('buttonPage', { title: 'Express', id: req.params.id, buttonWasLastPressed: null });
});

router.post('/:id', function(req, res, next) {
	const date = new Date().getTime() /1000

	console.log(`Button Pressed: ${date}`)
	res.render('buttonPage',{ title: 'Express', id: req.params.id, buttonWasLastPressed: date })
});

module.exports = router;
