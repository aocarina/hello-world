var http = require('http')
var MongoClient = require('mongodb').MongoClient
var connected = false
var db

var respond = function(res, what) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('v0.2\n' + what)
}

MongoClient.connect('mongodb://mongo:27017/docker', function(err, dbi) {
  if(err) connected = err

  connected = true

  db = dbi
})

var app = http.createServer(function(req, res) {
  if (connected !== true) {
    return respond(res, 'Errrrrou:' + connected)
  }

  db.collection('counter').insert({ hey: true }, function(err, result) {
    if (err) respond(res, err)

    db.collection('counter').find().count(function(err, count) {
      if (err) respond(res, err)

      respond(res, 'Vocêêêê acessou ' + count + ' vezeeeeeees')
    })
  })
}).listen(1337, "0.0.0.0")

//sets port and IP address of the server
console.log('Server running at http://0.0.0.0:1337/')
