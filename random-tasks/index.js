// Obtiene las tareas guardadas en localStorage
function getTasks() {
  const tasksAsString = localStorage.getItem('tasks'); // Recupera el string almacenado

  if (!tasksAsString) { 
    return []; // Si no hay tareas almacenadas, devuelve un array vacío
  }

  return JSON.parse(tasksAsString); // Convierte el string JSON a un array de objetos y lo devuelve
}

// Carga las tareas desde localStorage al iniciar
const tasks = getTasks();

// Obtiene el estado del filtro de completados desde localStorage
let isCompletedFilterSelected = localStorage.getItem('isCompletedFilter') === 'true';

// Renderiza las tareas en pantalla, aplicando el filtro si está activado
function renderTasksArray() {
  const completedFilterButtonNode = document.querySelector('#completed-filter');

  // Añade o quita la clase del botón según si el filtro está activado o no
  if (isCompletedFilterSelected) {
    completedFilterButtonNode.classList.add('button-selected');
  } else {
    completedFilterButtonNode.classList.remove('button-selected');
  }

  // Filtra las tareas dependiendo de si el filtro de completadas está activado o no
  const filteredTasks = isCompletedFilterSelected
    ? tasks.filter((task) => task.isCompleted)
    : tasks;

  // Borra las tareas actuales en el contenedor antes de renderizar
  document.querySelector('#tasks').innerHTML = '';

  // Crea y muestra cada tarea filtrada
  filteredTasks.forEach((task) => {
    createTaskNode(task, true);
  });
}

// Guarda las tareas en localStorage convirtiéndolas en un string JSON
function saveTasks() {
  const tasksAsString = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksAsString);
}

// Renderiza las tareas al cargar la página
renderTasksArray();

// Modifica una tarea en el array según su id y las propiedades a cambiar
function editTask(taskId, propsToChange) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId); // Busca la tarea por id
  tasks[taskIndex] = {
    ...tasks[taskIndex], // Copia la tarea original
    ...propsToChange // Aplica los cambios
  };
  saveTasks(); // Guarda el array actualizado en localStorage
}

// Alternativa para modificar una tarea cambiando una única propiedad
function editTaskByPropName(taskId, propName, propValue) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks[taskIndex][propName] = propValue; // Modifica solo la propiedad indicada
  saveTasks();
}

// Crea un nodo HTML para una tarea y la agrega al DOM
function createTaskNode(task, addToEnd) {
  const taskNode = document.createElement('div');
  taskNode.className = 'task';

  // Define el contenido HTML de la tarea
  taskNode.innerHTML = `
    <span class="${task.isCompleted ? 'completed' : ''}">${task.text}</span> - 
    <span class="status">${task.isCompleted ? 'completed' : 'pending'}</span>
    <button class="fav-button ${task.isFav ? 'fav' : ''}">${task.isFav ? '💝' : '💔'}</button>
  `;

  const tasksNode = document.querySelector('#tasks');

  // Agrega la tarea al final o al principio según la opción
  if (addToEnd) {
    tasksNode.appendChild(taskNode);
  } else {
    tasksNode.prepend(taskNode);
  }

  // Evento para marcar la tarea como completada al hacer clic en ella
  taskNode.addEventListener('click', function () {
    const taskTextNode = taskNode.querySelector('span');
    const isCurrentlyCompleted = taskTextNode.classList.contains('completed');
    taskTextNode.classList.toggle('completed'); // Alterna la clase de completado
    taskNode.querySelector('.status').innerText = isCurrentlyCompleted ? 'pending' : 'completed';

    // Edita la tarea en localStorage y en el array
    editTask(task.id, { isCompleted: !isCurrentlyCompleted });
    editTaskByPropName(task.id, 'isCompleted', !isCurrentlyCompleted);
  });

  // Evento para marcar o desmarcar la tarea como favorita
  const favButtonNode = taskNode.querySelector('button');
  favButtonNode.addEventListener('click', function (event) {
    event.stopPropagation(); // Evita que el evento de click se propague al contenedor de la tarea
    const isCurrentlyFav = favButtonNode.classList.contains('fav');
    favButtonNode.classList.toggle('fav'); // Alterna la clase de favorito
    favButtonNode.innerText = isCurrentlyFav ? '💔' : '💝';

    // Edita la tarea en localStorage y en el array
    editTask(task.id, { isFav: !isCurrentlyFav });
  });
}

// Maneja el envío del formulario para agregar una nueva tarea
const formButton = document.querySelector('#create-task button');
document.querySelector('#create-task').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página

  const formData = new FormData(event.target);
  const taskText = formData.get('taskText');

  // Crea un objeto con la nueva tarea
  const task = {
    text: taskText,
    isFav: false,
    isCompleted: false,
    id: Date.now() // Genera un id único con la fecha actual
  };

  // Si el filtro de completadas está activado, no se renderiza la nueva tarea en la lista
  if (!isCompletedFilterSelected) {
    createTaskNode(task, false);
  }

  // Agrega la nueva tarea al principio del array y la guarda en localStorage
  tasks.unshift(task);
  saveTasks();

  // Resetea el formulario y deshabilita el botón de envío
  event.target.reset();
  formButton.disabled = true;
});

// Activa o desactiva el botón de creación de tareas según si hay texto en el input
const taskTextNode = document.querySelector('[name=taskText]');
taskTextNode.addEventListener('input', function (event) {
  formButton.disabled = event.target.value === '';
});

// Maneja el evento del botón de filtro de tareas completadas
const completedFilterButtonNode = document.querySelector('#completed-filter');
completedFilterButtonNode.addEventListener('click', function () {
  isCompletedFilterSelected = !isCompletedFilterSelected; // Cambia el estado del filtro
  renderTasksArray(); // Vuelve a renderizar la lista de tareas
  localStorage.setItem('isCompletedFilter', isCompletedFilterSelected); // Guarda el estado en localStorage
});