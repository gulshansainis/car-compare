const express = require('express')
const router = express.Router()
const { filterModels } = require('../controllers/models')

// filter model by features
router.get('/models', filterModels)

module.exports = router
