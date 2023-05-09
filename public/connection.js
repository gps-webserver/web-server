function cora(){
  console.log("Prueba conn")
  fetch('/coords')
    .then(response => response.json())
    .then(data => {
      if (data.id==1){
      document.getElementById('lat').innerText = data.lat;
      document.getElementById('long').innerText = data.long;
      document.getElementById('date').innerText = data.date;
      document.getElementById('time').innerText = data.time;
      document.getElementById('sonido').innerText = data.sonido;
      }
      if (data.id==2){
      document.getElementById('lat2').innerText = data.lat;
      document.getElementById('long2').innerText = data.long;
      document.getElementById('date2').innerText = data.date;
      document.getElementById('time2').innerText = data.time;
      document.getElementById('sonido2').innerText = data.sonido;}

    })
    .catch(error => console.error(error));
}

  

cora()
setInterval(cora,2000)
 
