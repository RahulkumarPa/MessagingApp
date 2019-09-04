var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')  //require mongoose


var dbUrl = 'mongodb+srv://gopal:Rahul123@cluster0-jkzbk.mongodb.net/Lerning-node?retryWrites=true&w=majority' //set mongoose connection link

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//Message model
var Message = mongoose.model('Message',{
    name : String,
    message : String
})

var messages = [
    {name: 'jai', message: 'mata ji'},
    {name: 'jai', message: 'Ganesh'}
]
app.get('/messages', (req, res)=>{
    res.send(messages)
})

app.post('/messages', (req, res)=>{
    var message = new Message (req.body)  //object of message model
    message.save((err) =>{
        if(err){ sendStatus(500)}
        else{
            messages.push(req.body)
            io.emit('message',req.body)
            res.sendStatus(200)
        }
    }) 
})

io.on('connection',(Socket)=>{

})

//connect database
mongoose.connect(dbUrl,{useNewUrlParser: true},(err)=>{
    console.log('database connected yesd',err)
})
var server = http.listen(3000,()=>{

})

