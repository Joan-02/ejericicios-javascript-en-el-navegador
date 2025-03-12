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
