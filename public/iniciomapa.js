let map = L.map('map').setView([11.019067669425738,-74.85135899187047],50)
var polyline;

//Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let Icon = L.icon({
  iconUrl: '/marca2.png',
  iconSize: [90, 90],
  iconAnchor: [25, 90],
});
let marker = L.marker([11.019067669425738,-74.85135899187047],{icon:Icon}).addTo(map);
vector=[[11.0071,-74.8092]]
polyline = L.polyline(vector, {color: 'green'}).addTo(map);



function historico() {
  const startDateInput0 = document.querySelector('input[type="datetime-local"][id="start"]').value;
  const startDateInput = startDateInput0.split("T")[0];
  const startTimeInput = startDateInput0.split("T")[1];
  const endDateInput0 = document.querySelector('input[type="datetime-local"][id="end"]').value;
  const endDateInput = endDateInput0.split("T")[0];
  const endTimeInput = endDateInput0.split("T")[1];
  const startDateParts = startDateInput.split('-');
  const endDateParts = endDateInput.split('-');
  //const startTimeInput = document.querySelector('start-time').value;
  //const endTimeInput = document.querySelector('end-time').value;
  const startTime = startTimeInput.padStart(5, '0');
  const endTime = endTimeInput.padStart(5, '0');
  const startDate = `'${startDateParts[0]}-${startDateParts[1]}-${startDateParts[2]}'`;
  const endDate = `'${endDateParts[0]}-${endDateParts[1]}-${endDateParts[2]}'`;
  
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
    
   
