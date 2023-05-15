let map = L.map('map').setView([11.019067669425738,-74.85135899187047],50)
let polyline1, polyline2;
let array_todo1=[[]], array_todo2=[[]]
let circle1, circle2;
let radio1=50, radio2=50
var Datafound = document.getElementById('Datafound'); 
var heatLayer1 = null;
var heatLayer2 = null;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(map);
let Icon1 = L.icon({
  iconUrl: '/icono1.png',
  iconSize: [58, 40],
  iconAnchor: [29, 40],
});

let Icon2 = L.icon({
  iconUrl: '/icono2.png',
  iconSize: [54, 40],
  iconAnchor: [29, 40],
});

let marker1 = L.marker([11.019067669425738, -74.85135899187047], { icon: Icon1 }).addTo(map);
let marker2 = L.marker([11.019067669425738, -74.85135899187047], { icon: Icon2 }).addTo(map);
let vector1 = [[]], vector2 = [[]];
polyline1 = L.polyline(vector1, { color: 'blue' }).addTo(map);
polyline2 = L.polyline(vector2, { color: 'purple' }).addTo(map);

const slider1 = document.getElementById("mySlider1");
slider1.addEventListener("input", function() {
  radio1 = slider1.value;
});

const slider2 = document.getElementById("mySlider2");
slider2.addEventListener("input", function() {
  radio2 = slider1.value;
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
  heatdata1 = rows.map(item => [item[0], item[1], item[4]]);
  var newHeatLayer1 = L.heatLayer(heatdata1, {
      radius: 30,
      blur: 15,
      gradient: {0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red'},
      maxZoom: 17,
      max: 80, 
      min: 40   })

      if (heatLayer1 !== null) { // Si la capa actual existe, la removemos antes de agregar la nueva capa
        map.removeLayer(heatLayer1);
      }
      
      heatLayer1 = newHeatLayer1;  // Actualizamos la referencia de la capa actual
      heatLayer1.addTo(map);
  console.log(heatdata1)
  } 
  
  function updateheatmap(rows1) {
  heatdata2 = rows2.map(item => [item[0], item[1], item[4]]);
  var newHeatLayer2 = L.heatLayer(heatdata2, {
      radius: 30,
      blur: 15,
      gradient: {0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red'},
      maxZoom: 17,
      max: 80, 
      min: 40   })

      if (heatLayer2 !== null) { // Si la capa actual existe, la removemos antes de agregar la nueva capa
        map.removeLayer(heatLayer2);
      }
      
      heatLayer2 = newHeatLayer2;  // Actualizamos la referencia de la capa actual
      heatLayer2.addTo(map);
  console.log(heatdata2)
  } 
  
function obtener_radio1(todo, coordenadas,radio1) {
  return (todo[0] - coordenadas.latitud) ** 2 + (todo[1] - coordenadas.longitud) ** 2 <= (radio1/(100*111.10)) ** 2;
}  
function obtener_radio2(todo, coordenadas,radio2) {
  return (todo[0] - coordenadas.latitud) ** 2 + (todo[1] - coordenadas.longitud) ** 2 <= (radio2/(100*111.10)) ** 2;
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

function historico2() {
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
      
      updatePolyline(data.rows1);
      array_todo2=data.todo
      updateheatmap (array_todo);
      if (array_todo.length === 0) {
        alert("No hay datos que mostrar entre "+startDateInput+" "+startTimeInput+" y "+endDateInput+" "+endTimeInput);
      }
    
    });
}

function updatePolyline(rows) {
  var coordsArray =rows
  if (polyline) {
    polyline1.setLatLngs(coordsArray);
  } else {
    polyline1 = L.polyline(coordsArray, {color: 'red'}).addTo(map);
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
  marker1.setLatLng([lat,lng]);
  map.panTo([lat,lng]);
});

function updatePolyline2(rows2) {
  var coordsArray2 =rows2
  if (polyline2) {
    polyline.setLatLngs(coordsArray2);
  } else {
    polyline2 = L.polyline(coordsArray2, {color: 'purple'}).addTo(map);
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
  marker2.setLatLng([lat,lng]);
  map.panTo([lat,lng]);
});

function updateMap(selectedId) {
  // Ocultar todas las capas
  heatLayer1.removeFrom(map);
  heatLayer2.removeFrom(map);
  marker1.removeFrom(map);
  marker2.removeFrom(map);
  polyline1.removeFrom(map);
  polyline2.removeFrom(map);
  
  // Mostrar capas según la ID seleccionada
  if (selectedId === "0") {
    // Mostrar todas las capas
    heatLayer1.addTo(map);
    heatLayer2.addTo(map);
    marker1.addTo(map);
    marker2.addTo(map);
    polyline1.addTo(map);
    polyline2.addTo(map);
  } else if (selectedId === "1") {
    heatLayer1.addTo(map);
    marker1.addTo(map);
    polyline1.addTo(map);
  } else if (selectedId === "2"){
    // Mostrar todas las capas
    heatLayer2.addTo(map);
    marker2.addTo(map);
    polyline2.addTo(map);
  }
}

document.getElementById("id-selector").addEventListener("change", function() {
  const selectedId = this.value;
  updateMap(selectedId);
});



    