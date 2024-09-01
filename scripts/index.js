class Activity {
	// Constructor de la clase Activity que inicializa las propiedades de la actividad.
	constructor(id, title, description, imgUrl) {
			this.id = id; // Asigna el identificador único de la actividad.
			this.title = title; // Asigna el título de la actividad.
			this.description = description; // Asigna la descripción de la actividad.
			this.imgUrl = imgUrl; // Asigna la URL de la imagen asociada con la actividad.
	}
}

class Repository {
	// Constructor de la clase Repository que inicializa un array vacío de actividades y un contador de ID.
	constructor() {
			this.activities = []; // Inicializa el array para almacenar las actividades.
			this.id = 0; // Inicializa el contador de ID en 0.
	}

	// Método que devuelve todas las actividades almacenadas en el repositorio.
	getAllActivities() { 
			return this.activities; // Retorna la lista de actividades.
	}

	// Método que crea una nueva actividad y la añade al repositorio.
	createActivity(title, description, imgUrl) { 
			const id = this.id++; // Asigna un ID único a la nueva actividad y lo incrementa para la siguiente.
			const activity = new Activity(id, title, description, imgUrl); // Crea una nueva instancia de Activity.
			this.activities.push(activity); // Añade la nueva actividad al array de actividades.
	}

	// Método que elimina una actividad del repositorio dado su ID.
	deleteActivity(id) {
			this.activities = this.activities.filter(activity => activity.id !== id); 
			// Filtra las actividades para eliminar la que coincide con el ID dado.
	}
}

// Crea una instancia de la clase Repository.
const repository = new Repository();

// Función que crea un elemento HTML para representar una actividad.
function createActivityCard(activityInstance) {
	const {title, description, imgUrl} = activityInstance; // Extrae el título, descripción e imagen de la instancia de Activity.

	const cardDiv = document.createElement('div'); // Crea un nuevo div para la tarjeta de actividad.
	cardDiv.classList.add('tarjeta'); // Añade una clase CSS al div.

	const titleHeading = document.createElement('h2'); // Crea un elemento de encabezado h2 para el título.
	titleHeading.textContent = title; // Asigna el título de la actividad al texto del encabezado.

	const imageElement = document.createElement('img'); // Crea un elemento de imagen img.
	imageElement.src = imgUrl; // Asigna la URL de la imagen como fuente de la imagen.
	imageElement.alt = title; // Asigna el título como texto alternativo de la imagen.

	const descriptionParagraph = document.createElement('p'); // Crea un párrafo para la descripción.
	descriptionParagraph.textContent = description; // Asigna la descripción de la actividad al texto del párrafo.

	cardDiv.appendChild(titleHeading); // Añade el encabezado a la tarjeta.
	cardDiv.appendChild(imageElement); // Añade la imagen a la tarjeta.
	cardDiv.appendChild(descriptionParagraph); // Añade la descripción a la tarjeta.

	return cardDiv; // Retorna la tarjeta completa.
}

// Función que renderiza las actividades en la pantalla.
function renderActivities() {
	const containerElement = document.querySelector('.contenedorTarjetas'); // Selecciona el contenedor de tarjetas en el DOM.
	containerElement.innerHTML = ''; // Limpia el contenido del contenedor.

	const activities = repository.getAllActivities(); // Obtiene todas las actividades del repositorio.

	activities.forEach(activity => { // Recorre todas las actividades.
			const activityCard = createActivityCard(activity); // Crea una tarjeta para cada actividad.
			containerElement.appendChild(activityCard); // Añade la tarjeta al contenedor.
	});
}

// Función que maneja el evento de envío del formulario para agregar una nueva actividad.
function handleFormSubmit(event) {
	event.preventDefault(); // Previene el envío por defecto del formulario.

	const title = document.getElementById('actividad').value.trim(); // Obtiene el valor del campo título.
	const description = document.getElementById('comentarios').value.trim(); // Obtiene el valor del campo descripción.
	const imgUrl = document.getElementById('imagen').value.trim(); // Obtiene el valor del campo URL de la imagen.

	// Verifica que todos los campos estén completos antes de continuar.
	if (!title || !description || !imgUrl) {
			alert('Por favor, complete todos los campos.'); // Muestra una alerta si falta algún campo.
			return; // Detiene la ejecución si hay campos vacíos.
	}

	repository.createActivity(title, description, imgUrl); // Crea una nueva actividad y la añade al repositorio.

	renderActivities(); // Vuelve a renderizar las actividades para mostrar la nueva.

	event.target.reset(); // Resetea el formulario.
}

// Asocia la función handleFormSubmit al evento de envío del formulario.
const form = document.querySelector('.formulario');
form.addEventListener('submit', handleFormSubmit); 

// Renderiza las actividades al cargar la página.
renderActivities(); 

// Exporta las clases Activity y Repository para su uso en otros módulos.
module.exports = {
	Activity,
	Repository,
};
