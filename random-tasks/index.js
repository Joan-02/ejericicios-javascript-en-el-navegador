function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomTask() {
  return {
    text: `Texto aleatorio número ${getRandomInt(1, 1000)}`,
    isCompleted: getRandomInt(0, 1) === 1,
    isFav: getRandomInt(0, 1) === 1
  };
}

function getRandomArray() {
  const randomTasks = [];
  for (let i = 0; i < 10; i++) {
    randomTasks.push(generateRandomTask());
  }
  return randomTasks;
}

function regenerateArray() {
  const tasks = getRandomArray();
  document.querySelector('#tasks').innerHTML = '';

  tasks.forEach((task) => {
    createTaskNode(task, true);
  });
}

function createTaskNode(task, addToEnd) {
  const taskNode = document.createElement('div');
  taskNode.className = 'task';

  taskNode.innerHTML = `
    <span class="${task.isCompleted ? 'completed' : ''}">${task.text}</span> -
    <span class="status">${task.isCompleted ? 'completed' : 'pending'}</span>
    <button class="fav-button ${task.isFav ? 'fav' : ''}">${task.isFav ? '💝' : '💔'}</button>
    `;

  const tasksNode = document.querySelector('#tasks');

  if (addToEnd) {
    tasksNode.appendChild(taskNode);
  } else {
    tasksNode.prepend(taskNode);
  }

  taskNode.addEventListener('click', function () {
    console.log('contenedor tarea');
    const taskTextNode = taskNode.querySelector('span');
    const isCurrentlyCompleted = taskTextNode.classList.contains('completed');
    taskTextNode.classList.toggle('completed');
    taskNode.querySelector('.status').innerText = isCurrentlyCompleted ? 'pending' : 'completed';
  });

  const favButtonNode = taskNode.querySelector('button');
  favButtonNode.addEventListener('click', function (event) {
    console.log('botón fav');
    event.stopPropagation();
    const isCurrentlyFav = favButtonNode.classList.contains('fav');
    favButtonNode.classList.toggle('fav');
    favButtonNode.innerText = isCurrentlyFav ? '💔' : '💝';
  });
}

function addTask(addToEnd) {
  const task = generateRandomTask();
  console.log(task, addToEnd);
  createTaskNode(task, addToEnd);
}

// event listeners para que los botones llamen a las funciones anteriores
document.querySelector('#regenate').addEventListener('click', () => {
  regenerateArray();
});

document.querySelector('#add-first').addEventListener('click', () => {
  addTask(false);
});

document.querySelector('#add-last').addEventListener('click', () => {
  addTask(true);
});

const formButton = document.querySelector('#create-task button');
document.querySelector('#create-task').addEventListener('submit', function (event) {
  console.log(event);
  event.preventDefault();

  // se utiliza para extraer los datos del formulario
  const formData = new FormData(event.target);
  const taskText = formData.get('taskText');
  //
  const task = {
    text: taskText,
    isFav: false,
    isCompleted: false,
    id: Date.now()
  };
  createTaskNode(task, false);
  
  let tasks = [{task}];
  let tasksToString = JSON.stringify(tasks);
  localStorage.setItem('tasksArray', tasksToString);

  

  event.target.reset();
  formButton.disabled = true;
});

// activar o desactivar el boton si el input tiene texto
const taskTextNode = document.querySelector('[name=taskText]');
taskTextNode.addEventListener('input', function (event) {
  console.log(event.target.value);
  formButton.disabled = event.target.value === '';
});