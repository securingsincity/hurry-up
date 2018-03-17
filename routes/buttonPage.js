var express = require('express');
var router = express.Router();
const mongo =  require('../utils/mongo.js')
/* GET home page. */
router.get('/:id', function (req, res, next) {
	mongo().then((db) => {
		const gameCollection = db.collection('games')
		return gameCollection.findOne({id: req.params.id})
	}).then((game) => {
		if (game) {
			res.render('buttonPage', { title: 'Express', id: req.params.id, game, buttonWasLastPressed: null });
		} else {
			res.json({status: 'oh no'})
		}
	})
});

router.post('/:id', function(req, res, next) {
	const date = new Date().getTime() / 1000
	mongo()
		.then((db) => {
			const collection = db.collection('reports')
			return collection.insert({
				date,
				gameId: req.params.id
			}).then(() => {
				return db
			})
		}).then((db) => {
			const gameCollection = db.collection('games')
			return gameCollection.findOne({ id: req.params.id })
		}).then((game) => {
			if (game) {
				res.render('buttonPage', { title: 'Express', id: req.params.id, game, buttonWasLastPressed: date });
			} else {
				res.json({ status: 'oh no' })
			}
		}).catch((err) => {
			res.json({status: 'oh no', erro: err})
		})
});

module.exports = router;
