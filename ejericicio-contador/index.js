const startButton = document.querySelector('#start-button');
let intervalID;
let initialValue = parseInt(counter.value);

startButton.addEventListener('click', function () {
    console.log('start clicked');

    if (!initialValue || isNaN(initialValue)) {
        initialValue = parseInt(counter.value);
    }
    
    intervalID = setInterval(function() {
        const counter = document.querySelector('#counter');
        let count = parseInt(counter.value); // Convertimos el texto a número
        count--; // Restamos 1
        counter.value = count;

        if (count <= 0) {
            clearInterval(intervalID);
            alert("¡Tiempo agotado! ⏳");
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
    console.log('reset button');
    clearInterval(intervalID);
    counter.value = initialValue;
    console.log(initialValue);
});