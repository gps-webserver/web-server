let map = L.map('map').setView([11.019067669425738,-74.85135899187047],50)

let dataheat1 = [];
let heat1 = L.heatLayer(dataheat1, {
  radius: 50,
  blur: 15,
  gradient: { 0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red' },
  maxZoom: 17,
  max: 80,
  min: 40
}).addTo(map);

let dataheat2 = [];
let heat2 = L.heatLayer(dataheat2, {
  radius: 50,
  blur: 15,
  gradient: { 0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red' },
  maxZoom: 17,
  max: 80,
  min: 40
}).addTo(map);

function updateHeatmap(calor) {
  // crea un nuevo arreglo de datos de calor
  const point = [calor.lat, calor.long, parseFloat(calor.sonido)];
  // actualiza la capa de calor con los nuevos datos
  if (calor.id == 1) {
    dataheat1.push(point);
    heat1.setLatLngs(dataheat1);
  } else if (calor.id == 2) {
    dataheat2.push(point);
    heat2.setLatLngs(dataheat2);
  }
}

let polyline1, polyline2;
// Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let Icon = L.icon({
  iconUrl: '/CARROGPS2.png',
  iconSize: [58, 40],
  iconAnchor: [29, 40],
});

let marker1 = L.marker([11.019067669425738, -74.85135899187047], { icon: Icon }).addTo(map);
let marker2 = L.marker([11.019067669425738, -74.85135899187047], { icon: Icon }).addTo(map);
let vector1 = [[]], vector2 = [[]];
polyline1 = L.polyline(vector1, { color: 'purple' }).addTo(map);
polyline2 = L.polyline(vector2, { color: 'orange' }).addTo(map);

function updateLastLocation(lat, lng, id) {
  if (id == 1) {
    // mover el marcador
    marker1.setLatLng([lat, lng]);
    // crear la polilinea en tiempo real
    polyline1.addLatLng([lat, lng]);
    map.panTo([lat, lng]);
  } else if (id == 2) {
    // mover el marcador
    marker2.setLatLng([lat, lng]);
    // crear la polilinea en tiempo real
    polyline2.addLatLng([lat, lng]);
    map.panTo([lat, lng]);
  }
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
    heat2.addTo(map);
    marker2.addTo(map);
    polyline2.addTo(map);
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