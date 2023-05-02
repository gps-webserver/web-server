let map = L.map('map').setView([11.019067669425738,-74.85135899187047],50)
let dataheat = [];
let heat = L.heatLayer(dataheat, {
  radius: 50,
  blur: 15,
  gradient: {0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red'},
  maxZoom: 17,
  max: 80, 
  min: 40}).addTo(map);

function updateHeatmap(calor) {
  // crea un nuevo arreglo de datos de calor
  point = [calor.lat, calor.long, parseFloat(calor.sonido)];
  // actualiza la capa de calor con los nuevos datos
  dataheat.push(point);
}

var polyline;
//Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let Icon = L.icon({
  iconUrl: '/CARROGPS2.png',
  iconSize: [58, 40],
  iconAnchor: [29, 40],
});

let marker = L.marker([11.019067669425738,-74.85135899187047],{icon:Icon}).addTo(map);
vector=[[]]
polyline = L.polyline(vector, {color: 'purple'}).addTo(map);

function updateLastLocation(lat,lng){
  //mover el marcador
  marker.setLatLng([lat, lng]);
  // crear la polilinea en tiempo real
  polyline.addLatLng([lat, lng]);
  map.panTo([lat, lng]);
}

setInterval(() => {
  fetch('/coords')
    .then(response => response.json())
    .then(data => {
      updateLastLocation(data.lat, data.long);
    });
}, 2001);

setInterval(() => {
  fetch('/coords')
    .then(response => response.json())
    .then(data => {
      updateHeatmap(data);
      console.log(dataheat);
    });
}, 10001);
