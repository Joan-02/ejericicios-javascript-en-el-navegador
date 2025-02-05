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
    <button class="fav-icon ${task.isFav ? 'fav' : ''}" style="display:none"> ${task.isFav ? '💝' : '💔'} </button>`;

  const tasksNode = document.querySelector('#tasks');

  if (addToEnd) {
    tasksNode.appendChild(taskNode);
  } else {
    tasksNode.prepend(taskNode);
  }

  taskNode.addEventListener('click', function () {
    console.log('hola', task.text);
  });

  taskNode.addEventListener('click', function (event) {
    event.stopPropagation();
    const taskTextNode = taskNode.querySelector('span');
    const isCurrentlyCompleted = taskTextNode.classList.contains('completed');
    taskTextNode.classList.toggle('completed');
    taskNode.querySelector('.status').innerText = isCurrentlyCompleted ? 'pending' : 'completed';
  });

  taskNode.querySelector('button').addEventListener('click', (event) => {
    event.stopPropagation();
    const taskIcon = taskNode.querySelector('.fav.icon');
    const isCurrentlyCompleted = taskIcon.classList.contains('fav');
    taskIcon.classList.toggle('fav');
    taskNode.querySelector('.fav').innerText = isCurrentlyCompleted ? '💔' : '💝';
  });

  taskNode.addEventListener('mouseover', () => {
    console.log("El cursor ha entrado en el elemento");
    const taskIcon = taskNode.querySelector('button');  
    taskIcon.style.display = 'inline';
  })  

  taskNode.addEventListener('mouseout', () => {
    console.log("El cursor ha salido del elemento");
    const taskIcon = taskNode.querySelector('button');  
    taskIcon.style.display = 'none';
  }); 
};

function addTask(addToEnd) {
  const task = generateRandomTask();
  createTaskNode(task, addToEnd);
};

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

