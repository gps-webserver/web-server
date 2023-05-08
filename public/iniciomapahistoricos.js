let map = L.map('map').setView([11.019067669425738,-74.85135899187047],50)
var polyline;
let array_todo=[[]]
let x=[[]]
let circle;
let radio=50
var Datafound = document.getElementById('Datafound');

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

const slider = document.getElementById("mySlider");
slider.addEventListener("input", function() {
  radio = slider.value;
});

map.on('click', function(e) {
  let latitud = e.latlng.lat;
  let longitud = e.latlng.lng;
  if (circle) {
    circle.remove();
  }
  // Crea un círculo en el centro del mapa con un radio de 500 metros
  circle = L.circle(e.latlng, {
  radius: radio/100*1000, // Radio en metros
  color: '#553184', // Color del borde del círculo
  fillColor: '#BEAED3', // Color de relleno del círculo
  fillOpacity: 0.5 // Opacidad del relleno del círculo
}).addTo(map);  

  // Guardar la latitud y longitud en un objeto
  let coordenadas = {latitud: latitud, longitud: longitud};
  x=array_todo.filter(p => obtener_radio(p, coordenadas,radio));
  console.log('array_todo',array_todo)
  console.log('es la x',x)
  Datafound.max=x.length-1
});

function updateheatmap(rows) {
  heatdata = rows.map(item => [item[0], item[1], item[4]]);
  L.heatLayer(heatdata, {
      radius: 30,
      blur: 15,
      gradient: {0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red'},
      maxZoom: 17,
      max: 80, 
      min: 40 
  }).addTo(map);
  console.log(heatdata)
  } 
function obtener_radio(todo, coordenadas,radio) {
  return (todo[0] - coordenadas.latitud) ** 2 + (todo[1] - coordenadas.longitud) ** 2 <= (radio/(100*111.10)) ** 2;
}  


function historico() {
  const startDateInput0 = document.querySelector('input[type="datetime-local"][id="start"]').value;
  const startDateInput = startDateInput0.split("T")[0];
  const startTimeInput = startDateInput0.split("T")[1];
  const endDateInput0 = document.querySelector('input[type="datetime-local"][id="end"]').value;
  const endDateInput = endDateInput0.split("T")[0];
  const endTimeInput = endDateInput0.split("T")[1];
  const startDate = startDateInput+' '+startTimeInput+':00'
  const endDate = endDateInput+' '+endTimeInput+':00'
  
  fetch(`/historico?inicio=${startDate}&final=${endDate}`)
    .then(response => response.json())
    .then(data => {
      
      updatePolyline(data.rows);
      array_todo=data.todo
      updateheatmap (array_todo);
      if (array_todo.length === 0) {
        alert("No hay datos que mostrar entre "+startDateInput+" "+startTimeInput+" y "+endDateInput+" "+endTimeInput);
      }
    
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
Datafound.addEventListener("input", function() {
  let selectedDate = document.getElementById("selected-date")
  let selectedHour = document.getElementById("selected-hour")
  let selectedSound = document.getElementById("selected-sound");
  let lat = x[x.length - 1 - Datafound.value][0]
  let lng = x[x.length - 1 - Datafound.value][1]
  selectedDate.innerHTML = x[x.length - 1 - Datafound.value][2]
  selectedHour.innerHTML = x[x.length - 1 - Datafound.value][3]
  selectedSound.innerHTML = x[x.length - 1 - Datafound.value][4];
  marker.setLatLng([lat,lng]);
  map.panTo([lat,lng]);
});
