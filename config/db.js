const mongoose = require('mongoose')
const config = require('config')
const dbUri = config.get('mongoRemoteUri')

const connectDB = async () => {
    try {
        await mongoose.connect(dbUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
        console.log('mongoDB connected..')
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

module.exports = connectDB