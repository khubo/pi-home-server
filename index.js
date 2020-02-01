const sensor = require('node-dht-sensor')
const express = require('express')
const app = express()

const sensorTypeValue = 11
const gpioPin = 4

// Result port.
const port = 3000

app.get('/', (req, res) => {
    sensor.read(sensorTypeValue, gpioPin, (err, temp, humidity) => {
        if (err) return next(err)

        return res.send({
            temp,
            humidity
        })
    })
})

console.log('serving result at port %d', port)
app.listen(port)
