const express = require('express')
const router = express.Router()

// health check ping
router.get('/ping', function (req, res) {
    res.json('ok')
})

module.exports = router
