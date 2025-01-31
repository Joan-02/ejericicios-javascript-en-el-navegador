function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomTask() {
  return {
    text: `Texto aleatorio número ${getRandomInt(1, 1000)}`,
    isCompleted: getRandomInt(0, 1) === 1
  };
}

function getRandomArray() {
  const randomTasks = [];
  for (let i = 0; i < 10; i++) {
    randomTasks.push(generateRandomTask());
  }
  return randomTasks;
}

// Estas funciones serán las que iremos cambiando con los ejemplos
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
    <span class="status">${task.isCompleted ? 'completed' : 'pending'}</span>`;

  const tasksNode = document.querySelector('#tasks');

  if (addToEnd) {
    tasksNode.appendChild(taskNode);
  } else {
    tasksNode.prepend(taskNode);
  }

  taskNode.addEventListener('click', function () {
    console.log('hola', task.text);
  });
}

function addTask(addToEnd) {
  const task = generateRandomTask();
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