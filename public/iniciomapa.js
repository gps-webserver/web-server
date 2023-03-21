let map = L.map('map').setView([11.0071,-74.8092],50)
var polyline;

//Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker = L.marker([11.0071,-74.8092]).addTo(map);
vector=[[11.0071,-74.8092]]
polyline = L.polyline(vector, {color: 'red'}).addTo(map);

function updatePolyline(rows) {
  var coordsArray =rows
 
  if (polyline) {
    polyline.setLatLngs(coordsArray);
  } else {
    polyline = L.polyline(coordsArray, {color: 'red'}).addTo(map);
    console.log('fcn')
  }
}
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
      console.log(data);
      updateLastLocation(data.lat, data.long);
      
    });
    
    
  fetch('/linea')
    .then(response => response.json())
    .then(data => {
      console.log(data.rows);
      //updatePolyline(data.rows);
    }); 
}, 1000);
    
   
