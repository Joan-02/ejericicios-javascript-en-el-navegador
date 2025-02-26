const startButton = document.querySelector('#start-button');
let intervalID;

startButton.addEventListener('click', function () {
    console.log('start clicked');
    const counter = document.querySelector('#counter');
    intervalID = setInterval(function() {
        let count = parseInt(counter.value); // Convertimos el texto a número
        count--; // Restamos 1
        counter.value = count;

        if (count === 0) {
            clearInterval(intervalID);
            return;
        }
    }, 1000); 
});

const stopButton = document.querySelector('#stop-button');

stopButton.addEventListener('click', function () {
    clearInterval(intervalID);
});

const resetButton = document.querySelector('#reset-button');

resetButton.addEventListener('click', function () {
    clearInterval(intervalID);
    let count = parseInt(counter.innerText);
    counter.innerText = count;
});