const express = require('express')
const router = require('./routes')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(router)

const server = app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

// stop server gracefully
process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)

function shutDown() {
    server.close(() => {
        console.log('Stopping server')
        process.exit(0)
    })
}

module.exports = {
    server,
}
