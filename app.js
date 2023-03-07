const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const fs = require('fs');


var dataf=''

//settings
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
app.use((req, res, next) => {
  console.log(`${req.url} - ${req.method}`);
  next();
} );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use(routes);


//static files
app.use(express.static(path.join(__dirname, 'public')));


//start the server
app.listen(app.get('port'), () =>{
  console.log('Server on port', app.get('port'))
});

//sniffer
const dgram = require('dgram');
const PORT = 52000;
const socket = dgram.createSocket('udp4');
socket.bind(PORT);
socket.on('listening', () =>{
  console.log('En funcionamiento')
});





socket.on('message', (info) => {
dataf = JSON.parse(info);
console.log(dataf)  // recibo el mennsaje y lo guardo
const content = `Latitud: ${dataf.latitud}, Longitud: ${dataf.longitud}, Fecha: ${dataf.fecha}, Hora: ${dataf.hora}\n`;
fs.appendFile('received_data.txt', content, (err) => {
  if (err) throw err;
  console.log('Data saved into received_data.txt');})


});




app.get('/', (req, res) => {
  res.render('pagina-principal', {
    
    lat: dataf.latitud,
    long: dataf.longitud,
    date: dataf.fecha,
    time: dataf.hora,
  });
});

app.get('/coords', (req, res) => {
  res.json({
    lat: dataf.latitud,
    long: dataf.longitud,
    date: dataf.fecha,
    time: dataf.hora,
  });
});
//npm run dev