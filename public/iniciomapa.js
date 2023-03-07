let map = L.map('map').setView([4.639386,-74.082412],6)


//Agregar tilelAyer mapa base desde openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker = L.marker([0, 0]).addTo(map);


// function updateMarker(lat, lng) {
//   marker.setLatLng([lat, lng]);
  
// }
const updateMarker = (lat, lng) => {
  marker.setLatLng([lat, lng]);
}

setInterval(() => {
  fetch('/coords')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateMarker(data.lat, data.long);
    });
}, 1000);