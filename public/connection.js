console.log("Prueba conn")
cora()
setInterval(cora,5000)
function cora(){
  
  fetch('/coords')
    .then(response => response.json())
    .then(data => {
      document.getElementById('long').innerText = data.long;
      document.getElementById('lat').innerText = data.lat;
      
      document.getElementById('date').innerText = data.date;
      document.getElementById('time').innerText = data.time;
    })
    .catch(error => console.error(error));
   
  }

