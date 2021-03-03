const express = require('express');
let app = express();
let path = require('path');
let port = 7546;

app.get('/', (req, res)=> res.sendFile(path.join(__dirname + '/index.html')));

app.listen(port, ()=>console.log('le serveur de fichier HTML fonctionne sur le port : '+ port ))