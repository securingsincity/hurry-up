const mongo = require('./utils/mongo')
const moment = require('moment')
const testData = require('./testData2.json').game

const homeTeam = `${testData.scoring.home.market} ${testData.scoring.home.name}`;
const awayTeam = `${testData.scoring.away.market} ${testData.scoring.away.name}`;
const gameId = testData.id
const innings = testData.innings

const result = innings.reduce((acc, inning) => {
  const inningNumber = inning.number

  inning.halfs.forEach(half => {
    const inningId = `${inning.number}${half.half}`
    const events = half.events.reduce((accum, event) => {
      const masterEvent = Object.keys(event)[0]
      const pitchEvents = event[masterEvent].events;
      const description = event[masterEvent].description;
      if (pitchEvents) {
        accum = accum.concat(pitchEvents.map((event) => ({
          ...event,
          description,
          masterEvent
        })))
      }

      return accum
    }, [])
    const pitchEvents  = events.map((event) => ({
      ...event,
      inningId,
      homeTeam,
      awayTeam,
      gameId}) )
    acc = acc.concat(pitchEvents)
  });
  return acc
}, [])


mongo().then((db) => {
  const collection = db.collection('gameData')
  collection.insertMany(result).then(() => {
    console.log("success")
  })
    .catch((err) => {
      console.error(err)
  })
})
