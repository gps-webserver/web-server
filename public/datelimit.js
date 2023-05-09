function setDateInputs() {
  const startDateInput = document.querySelector('#start');
  const endDateInput = document.querySelector('#end');

  startDateInput.addEventListener('input', () => {
    endDateInput.min = startDateInput.value;
    if (new Date(endDateInput.value) < new Date(startDateInput.value)) {
      endDateInput.value = startDateInput.value;
    }
  });

  endDateInput.addEventListener('input', () => {
    if (new Date(endDateInput.value) < new Date(startDateInput.value)) {
      endDateInput.value = startDateInput.value;
    }
  });

  endDateInput.min = new Date().toISOString().slice(0, 16);
}
  
function setCurrentDate() {
  const startDatePicker = document.getElementById("start");
  const endDatePicker = document.getElementById("end");
  const fechaHoy = new Date();
  const timeZoneOffset = -5 * 60; // 4 horas menos que GMT para Colombia
  fechaHoy.setTime(fechaHoy.getTime() + timeZoneOffset * 60 * 1000);
  const anio = fechaHoy.getFullYear();
  const mes = fechaHoy.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
  const dia = fechaHoy.getDate();
  const hora = fechaHoy.getHours();
  const minutos = fechaHoy.getMinutes();
  const fechaActual = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}T${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  console.log("Today in Colombia: ", fechaActual);
  startDatePicker.setAttribute("max", fechaActual);
  endDatePicker.setAttribute("max", fechaActual);
}
  
  module.exports = {
    setDateInputs,
    setCurrentDate
  };
