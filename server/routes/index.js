const express = require('express')
const router = express.Router()
const models = require('./models')
const ping = require('./ping')

router.use(models)
router.use(ping)

module.exports = router
