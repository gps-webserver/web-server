let map = L.map('map').setView([11.019067669425738,-74.85135899187047],50)
var heatLayer;
//Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let Icon = L.icon({
  iconUrl: '/CARROGPS2.png',
  iconSize: [59, 43],
  iconAnchor: [32, 43], 
});

let marker = L.marker([11.019067669425738,-74.85135899187047],{icon:Icon}).addTo(map);
vector=[[11.0071,-74.8092]]
heatLayer = L.heatLayer(vector, {radius: 25, blur: 15, maxZoom:17, }).addTo(map);

function updateLastLocation(lat,lng){
  //mover el marcador
  marker.setLatLng([lat, lng]);
  //centrar el mapa
  map.panTo([lat, lng]);
  // crear la polilinea en tiempo real
  heatLayer.addLatLng([lat, lng, son]);
}

setInterval(() => {
  fetch('/coords')
    .then(response => response.json())
    .then(data => {
      
      updateLastLocation(data.lat, data.long, data.song);
      
    });
}, 1001);

