const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const db_uri = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

mongoose.connect(db_uri).then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error)
})

process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
})