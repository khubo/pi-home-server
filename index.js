const sensor = require('node-dht-sensor')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    sensor.read(11, 4, (err, temp, humidity) => {
        if (err) return next(err)

        return res.send({
            temp,
            humidity
        })
    })
})

app.listen(3000)