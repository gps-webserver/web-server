function cora(){
  console.log("Prueba conn")
  fetch('/coords')
    .then(response => response.json())
    .then(data => {
      console.log("ESTA ES UNA PUREBAAAA: "+(data.time))
      document.getElementById('lat').innerText = data.lat;
      document.getElementById('long').innerText = data.long;
      document.getElementById('date').innerText = data.date;
      document.getElementById('time').innerText = data.time;
    })
    .catch(error => console.error(error));
   
  }

cora()
setInterval(cora,5000)

