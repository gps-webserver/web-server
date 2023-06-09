let map = L.map('map').setView([11.019067669425738,-74.85135899187047],20)

let dataheat1 = [];
let heat1 = L.heatLayer(dataheat1, {
  radius: 50,
  blur: 15,
  gradient: { 0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red' },
  maxZoom: 17,
  max: 80,
  min: 45
}).addTo(map);


let dataheat2 = [];
let heat2 = L.heatLayer(dataheat2, {
  radius: 50,
  blur: 15,
  gradient: { 0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red' },
  maxZoom: 17,
  max: 80,
  min: 50
}).addTo(map);

function updateHeatmap(calor) {
  // crea un nuevo arreglo de datos de calor
  const point = [calor.lat, calor.long, parseFloat(calor.sonido)];
  // actualiza la capa00 de calor con los nuevos datos
  if (calor.id == 1) {
    dataheat1 = [point];
    heat1.setLatLngs(dataheat1);
  } else if (calor.id == 2) {
    dataheat2 = [point];
    heat2.setLatLngs(dataheat2);
  }
}
let polyline1, polyline2;
// Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


let Icon1 = L.icon({
  iconUrl: '/icono1.png',
  iconSize: [58,40],
  iconAnchor: [20,32],
});

let scaleFactor = 0.9; // Ajusta este valor para reducir el tamaño del Icon2

let Icon2 = L.icon({
  iconUrl: '/icono2.png',
  iconSize: [58 * scaleFactor, 40 * scaleFactor],
  iconAnchor: [20 * scaleFactor, 32 * scaleFactor],
});

let marker1 = L.marker([11.019067669425738, -74.85135899187047], { icon: Icon1 }).addTo(map);
let marker2 = L.marker([11.019067669425738, -74.85135899187047], { icon: Icon2 }).addTo(map);
let vector1 = [[]], vector2 = [[]];
polyline1 = L.polyline(vector1, { color: 'blue' }).addTo(map);
polyline2 = L.polyline(vector2, { color: 'purple' }).addTo(map);

function updateLastLocation(lat, long, id) {
  if (id == 1) {
    // mover el marcador
    marker1.setLatLng([lat, long]);
    // crear la polilinea en tiempo real
    polyline1.addLatLng([lat, long]);
    
  } else if (id == 2) {
    // mover el marcador
    marker2.setLatLng([lat, long]);
    // crear la polilinea en tiempo real
    polyline2.addLatLng([lat, long]);
    
  }
}

setInterval(() => {
  fetch('/coords')
    .then(response => response.json())
    .then(data => {
      updateLastLocation(data.lat, data.long, data.id);
      updateHeatmap(data);
    });
}, 3001);

function updateMap(selectedId) {
  // Ocultar todas las capas
  heat1.removeFrom(map);
  heat2.removeFrom(map);
  marker1.removeFrom(map);
  marker2.removeFrom(map);
  polyline1.removeFrom(map);
  polyline2.removeFrom(map);
  
  // Mostrar capas según la ID seleccionada
  if (selectedId === "0") {
    // Mostrar todas las capas
    heat1.addTo(map);
    heat2.addTo(map);
    marker1.addTo(map);
    marker2.addTo(map);
    polyline1.addTo(map);
    polyline2.addTo(map);
  } else if (selectedId === "1") {
    heat1.addTo(map);
    marker1.addTo(map);
    polyline1.addTo(map);
  } else if (selectedId === "2"){
    // Mostrar todas las capas
    heat2.addTo(map);
    marker2.addTo(map);
    polyline2.addTo(map);
  }
}

document.getElementById("id-selector").addEventListener("change", function() {
  const selectedId = this.value;
  updateMap(selectedId);
});


//Selector 
function updateMap(selectedId) {
  // Ocultar todas las capas
  heat1.removeFrom(map);
  heat2.removeFrom(map);
  marker1.removeFrom(map);
  marker2.removeFrom(map);
  polyline1.removeFrom(map);
  polyline2.removeFrom(map);
  
  // Mostrar capas según la ID seleccionada
  if (selectedId === "0") {
    // Mostrar todas las capas
    heat1.addTo(map);
    heat2.addTo(map);
    marker1.addTo(map);
    marker2.addTo(map);
    polyline1.addTo(map);
    polyline2.addTo(map);
  } else if (selectedId === "1") {
    heat1.addTo(map);
    marker1.addTo(map);
    polyline1.addTo(map);
  } else if (selectedId === "2"){
    // Mostrar todas las capas
    heat2.addTo(map);
    marker2.addTo(map);
    polyline2.addTo(map);
  }
}

document.getElementById("id-selector").addEventListener("change", function() {
  const selectedId = this.value;
  updateMap(selectedId);
});

