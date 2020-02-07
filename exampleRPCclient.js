const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = './temp.proto'

var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })

const Rpi = grpc.loadPackageDefinition(packageDefinition).rpi

const client = new Rpi.Sensors('192.168.1.2:9119', grpc.credentials.createInsecure())

client.getDhtSensorReading(null, (err, data) => {
  if (err) {
    console.log('err', err)
  }

  console.log('data is', data)
})
