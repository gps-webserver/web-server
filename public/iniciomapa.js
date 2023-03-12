

let map = L.map('map').setView([4.639386,-74.082412],100)
var polyline;





//Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker = L.marker([0, 0]).addTo(map);



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

  marker.setLatLng([lat, lng]);
  map.panTo([lat, lng]);
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
      updatePolyline(data.rows);
    });  

}, 500);

