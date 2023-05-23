let map = L.map('map').setView([11.019067669425738,-74.85135899187047],50)
var polyline;
let array_todo=[[]]
let x=[[]]
let circle;
let radio=100
var Datafound = document.getElementById('Datafound');
var heatLayer = null;
var latitud = 0;
var longitud = 0;
var coordenadas;


//Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


let Icon = L.icon({
  iconUrl: '/icono2.png',
  iconSize: [54, 40],
  iconAnchor: [29, 40],
});


let marker = L.marker([11.019067669425738,-74.85135899187047],{icon:Icon}).addTo(map);
vector=[[]]
polyline = L.polyline(vector, {color: 'purple'}).addTo(map);

const slider = document.getElementById("mySlider");
slider.addEventListener("input", function() {
  radio = slider.value;
  if (circle) {
    circle.setRadius(radio);
    x=array_todo.filter(p => obtener_radio(p, coordenadas,radio));
    Datafound.max=x.length-1
  }
});

map.on('click', function(e) {
  latitud = e.latlng.lat;
  longitud = e.latlng.lng;
  if (circle) {
    circle.remove();
  }
  // Crea un círculo en el  mapa 
  circle = L.circle(e.latlng, {
  radius: radio, // Radio en metros
  color: '#553184', // Color del borde del círculo
  fillColor: '#BEAED3', // Color de relleno del círculo
  fillOpacity: 0.5 // Opacidad del relleno del círculo
}).addTo(map);  

  // Guardar la latitud y longitud en un objeto
  coordenadas = {latitud: latitud, longitud: longitud};
  x=array_todo.filter(p => obtener_radio(p, coordenadas,radio));
  Datafound.max=x.length-1
});


// RECUADRO INFORMACIÓN HORA-FECHA-SONIDO
// Obtén el elemento "selected-info"
const selectedInfo = document.querySelector('.selected-info');

// Función para actualizar la posición de "selected-info"
function updateSelectedInfoPosition(lat, lng) {
  // Calcula la posición en píxeles del punto en el mapa
  const pointPos = map.latLngToContainerPoint([lat, lng]);

  // Calcula el desplazamiento en píxeles desde el punto de referencia en el mapa
  const offsetX = -60; // Ajusta el valor según sea necesario
  const offsetY = -200; // Ajusta el valor según sea necesario

  // Establece la posición de "selected-info"
  selectedInfo.style.left = pointPos.x + offsetX + 'px';
  selectedInfo.style.top = pointPos.y + offsetY + 'px';
}

// Suscribe el evento de actualización de posición cuando se hace clic en el mapa
map.on('click', function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  updateSelectedInfoPosition(lat, lng);
});

// Suscribe el evento de actualización de posición cuando se cambia el valor del slider
slider.addEventListener('input', function() {
  const lat = x[x.length - 1 - Datafound.value][0];
  const lng = x[x.length - 1 - Datafound.value][1];
  updateSelectedInfoPosition(lat, lng);
});


function updateheatmap(rows) {
  heatdata = rows.map(item => [item[0], item[1], item[4]]);
  var newHeatLayer = L.heatLayer(heatdata, {
      radius: 30,
      blur: 15,
      gradient: {0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red'},
      maxZoom: 17,
      max: 80, 
      min: 40   })

      if (heatLayer !== null) { // Si la capa actual existe, la removemos antes de agregar la nueva capa
        map.removeLayer(heatLayer);
      }
      
      heatLayer = newHeatLayer;  // Actualizamos la referencia de la capa actual
      heatLayer.addTo(map);
  console.log(heatdata)
  } 

function obtener_radio(todo, coordenadas,radio) {
  return (todo[0] - coordenadas.latitud) ** 2 + (todo[1] - coordenadas.longitud) ** 2 <= (radio/(1000*111.10)) ** 2;
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

//Valor del radio
const radioValueElement = document.getElementById("radioValue");
radioValueElement.textContent = parseInt(slider.value); // Muestra el valor inicial del slider

slider.addEventListener("input", function() {
  radioValueElement.textContent = parseInt(this.value); // Actualiza el valor del radio mientras se mueve el slider
});