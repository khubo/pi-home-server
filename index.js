const grpc = require('grpc')
const sensor = require('node-dht-sensor')
const express = require('express')
const protoLoader = require('@grpc/proto-loader')


const PROTO_PATH = './scheme.proto'
const app = express()

const sensorTypeValue = 11
const gpioPin = 4

// Result port.
const port = 3000
const grpcPort = 9119

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

// grpc.
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepcase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)

const rpi = grpc.loadPackageDefinition(packageDefinition).rpi

const getDHTSensorReading = (call, cb) => {
    sensor.read(sensorTypeValue, gpioPin, (err, temprature, humidity) => {
        if(err) return cb(err)

        cb(null, {
            temprature,
            humidity
        })
    })
}

const server = new grpc.Server()
server.addService(rpi.Sensors.service, {getDHTSensorReading})
server.bind(`0.0.0.0:${grpcPort}`, grpc.ServerCredentials.createInsecure())
server.start()