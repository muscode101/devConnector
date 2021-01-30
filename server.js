const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')

const app = express()
app.use(cors())
// const PORT = process.env.port || 5000
const PORT = process.env.port

connectDB()
app.use(express.json())

serveStaticAsserts()
app.use('/api/user', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))

app.listen(PORT, () => console.log(`sever started on port ${PORT} `))

function serveStaticAsserts() {
    // if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'))
        app.get('*  ', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        })
    // }
}