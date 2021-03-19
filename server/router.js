var express = require('express')
var router = express.Router()
var Info = require('../model/info.js')
console.log('1')
router.get('/', function(req, res) {
    console.log('2')

})
module.exports = router;