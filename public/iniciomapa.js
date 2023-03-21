let map = L.map('map').setView([11.019067669425738,-74.85135899187047],50)
var polyline;

//Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker = L.marker([11.019067669425738,-74.85135899187047]).addTo(map);
vector=[[11.0071,-74.8092]]
polyline = L.polyline(vector, {color: 'red'}).addTo(map);

function historico() {
  const startDateInput = document.querySelector('#start').value;
  const endDateInput = document.querySelector('#end').value;
  const startDateParts = startDateInput.split('-');
  const endDateParts = endDateInput.split('-');
  const startDate = "'"+startDateParts[2] + '/' + startDateParts[1] + '/' + startDateParts[0]+"'";
  const endDate = "'"+endDateParts[2] + '/' + endDateParts[1] + '/' + endDateParts[0]+"'";
  console.log (startDate,endDate)
  fetch(`/historico?inicio=${startDate}&final=${endDate}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updatePolyline(data.rows);
    });


}

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


}, 1001);
    
   
