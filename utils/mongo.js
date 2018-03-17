const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

const dbName = 'hurry-up'


module.exports =  function () {
	return new Promise((resolve, reject) => {
			MongoClient.connect(url, (err, client) => {
				const db = client.db(dbName)
				resolve(db)
			})
	}) 
}