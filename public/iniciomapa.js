const { Sequelize } = require("sequelize");
punto = Sequelize.query('SELECT latitud,longitud FROM test.coords WHERE id = (SELECT MAX(id) FROM test.coords)', { raw: true });
vector = punto.map(obj => [parseFloat(obj.latitud), parseFloat(obj.longitud)]);
let map = L.map('map').setView(vector,50)
var polyline;
//Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let Icon = L.icon({
  iconUrl: '/CARROGPS2.png',
  iconSize: [59, 43],
  iconAnchor: [32, 43], 
});

let marker = L.marker(vector ,{icon:Icon}).addTo(map);
//[11.019067669425738,-74.85135899187047]
//[[11.0071,-74.8092]]
polyline = L.polyline(vector, {color: 'purple'}).addTo(map);

function updateLastLocation(lat,lng){
  //mover el marcador
  marker.setLatLng([lat, lng]);
  //centrar el mapa
  map.panTo([lat, lng]);
  // crear la polilinea en tiempo real
  polyline.addLatLng([lat, lng]);
}

setInterval(() => {
  fetch('/coords')
    .then(response => response.json())
    .then(data => {
      
      updateLastLocation(data.lat, data.long);
      
    });
}, 1001);

