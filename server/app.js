var express = require('express')
var Info = require('../model/info.js')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var port = 5000
app.get('/', function(req, res) {
    Info.find(function(error, info) {
        if (error) {

            res.status(500).json({
                err_code: 0,
                message: '服务区出错了'
            })
        } else {
            console.log(info)
            res.status(200).json({
                err_code: 1,
                message: info
            })
        }
    })
})
app.post('/save', function(req, res) {
    // 首先清空数据库，然后在存入新数据
    Info.remove({}, function(err) {
        if (!err) {
            req.body.forEach(item => {
                new Info(item).save(function(err, data) {
                    if (!err) {
                        console.log(data)
                    }
                })
            })
        }
    })
})

app.listen(port, function(err) {
    console.log('server is running')
})