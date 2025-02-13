const formulario = document.querySelector('#task-form');
const input = document.querySelector('#task-input');

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
        const editButton = document.createElement('button');
        editButton.innerText = "Edit";


        task.innerHTML = `${taskText}`;

        const tasksList = document.querySelector('#task-list');
        tasksList.appendChild(task);

        task.addEventListener('click', () => {
            task.classList.toggle('completed');
        })

        task.appendChild(eliminateButton); 
        task.appendChild(editButton);

        eliminateButton.addEventListener('click', () => {
            task.remove();
        });

        editButton.addEventListener('click', () => {
            
        });

        input.value = "";
    }
});


