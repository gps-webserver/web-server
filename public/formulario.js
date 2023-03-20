// obtener referencias a los elementos del formulario
const form = document.querySelector("#formulario");
const fechaInicioInput = document.querySelector("#fechaInicio");
const fechaFinInput = document.querySelector("#fechaFin");
const horaInicioInput = document.querySelector("#horaInicio");
const horaFinInput = document.querySelector("#horaFin");

// agregar un event listener para el submit del formulario
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevenir el envío del formulario por defecto
  const fechaInicio = fechaInicioInput.value; 
  const fechaFin = fechaFinInput.value;
  const horaInicio = horaInicioInput.value;
  const horaFin = horaFinInput.value;
  console.log("Fecha de inicio: " + fechaInicio);
  console.log("Fecha de fin: " + fechaFin);
  console.log("Hora de inicio: " + horaInicio);
  console.log("Hora de fin: " + horaFin);
});
