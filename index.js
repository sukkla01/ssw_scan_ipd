const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const mysql = require('mysql')
// const myConnection = require('express-myconnection')
const http = require('http')
const socketIO = require('socket.io')
const path = require("path")
const moment = require('moment')
const errorHandler = require('./middleware/errorHandler')
const cron = require('node-cron')

const config = require('./config')
const routes = require('./routes')


const PORT = 4013
const strQrcode = '';


// our server instance
const server = http.createServer(app)
// This creates our socket using the instance of the server
const io = socketIO.listen(server)

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: '*/*' }))


app.use("/images", express.static(path.join(__dirname, "images")))

/// socket io
io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('insert-card', (msg) => {
        console.log(msg);
        io.emit('insert', msg);
    });

    socket.on('remove-card', (msg) => {
        console.log(msg);
        io.emit('remove', msg);
    });

    // socket.on('insert-card', function name(data) {
    //     // event
    //     console.log('insert')
    //     // io.emit('insert-card', data)
    //     io.emit("insert", "world");


    // })
});




// io.on('connection', function (client) {

//     console.log('client connect...', client.id);


//     client.on('typing', function name(data) {
//         console.log(data);
//         io.emit('typing', data)
//     })


//     client.on('insert-card', function () {



//     })

//     client.on('disconnect', function () {

//         // console.log('disconnect '+ onnectCounter)



//         // handleDisconnect()
//     })




//     client.on('error', function (err) {
//         console.log('received error from client:', client.id)
//         console.log(err)
//     })


//     // insert card 
//     client.on('insert-card', function name(data) {
//         // event
//         console.log('insert')
//         // io.emit('insert-card', data)
//         io.emit("insert", "world");


//     })


//     // remove card 
//     client.on('remove-card', function name(data) {
//         console.log('remove')
//         io.emit('remove', data)
//     })

//     client.on('insert', async function name(data) {
//         console.log('insert new')
//         io.emit('remove', data)
//     })







// })



routes(app)





app.use(errorHandler)


server.listen(PORT, () => {
    console.log('test')
})
server.timeout = 20000