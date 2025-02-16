const formulario = document.querySelector('#task-form');
const input = document.querySelector('#task-input');

function getTasks() {
    const tasksAsString = localStorage.getItem('task'); // Recupera el string almacenado
  
    if (!tasksAsString) { 
      return []; // Si no hay tareas almacenadas, devuelve un array vacío
    }
  
    return JSON.parse(tasksAsString); // Convierte el string JSON a un array de objetos y lo devuelve
};

getTasks ();

formulario.addEventListener('submit', function(event) {

    event.preventDefault();
    const taskText = input.value;

    if (taskText === "") {
        document.querySelector("#error-message").innerText = 'Rellena la tarea para agreagar tarea';
    } else {
        document.querySelector("#error-message").innerText = '';
        const task = document.createElement('li');
        const eliminateButton = document.createElement('button');
        eliminateButton.innerText = "Eliminar";
        
        task.innerHTML = `${taskText}`;

        const tasksList = document.querySelector('#task-list');
        tasksList.appendChild(task);

        task.addEventListener('click', () => {
            task.classList.toggle('completed');
        })

        task.appendChild(eliminateButton); 

        eliminateButton.addEventListener('click', () => {
            task.remove();
        });

        const arrayTasks = getTasks();
        arrayTasks.push(taskText);
        localStorage.setItem('task', JSON.stringify(arrayTasks));
        
        input.value = "";
    }
});





