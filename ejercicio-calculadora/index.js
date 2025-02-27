const numberButtons = document.querySelectorAll('.number-button');  // Selecciona todos los botones

numberButtons.forEach(button => {
    button.addEventListener('click', function () {
        console.log('click en un número');
        addNumberToResult(button);  // Pasamos el botón actual
    });
});

const operators = document.querySelectorAll('.operator');  // Selecciona todos los operadores

operators.forEach(operator => {
    operator.addEventListener('click', function () {
        console.log('click en un operator');
        addOperatorToResult(operator);  // Pasamos el operator actual
    });
});

const result = document.querySelector('#result');

function addNumberToResult(button) {
    result.textContent += button.textContent;  // Agrega el contenido del botón presionado al resultado
}

function addOperatorToResult(operator) {
    result.textContent += operator.textContent;  // Agrega el contenido del botón presionado al resultado
}

document.querySelector('#equals').addEventListener('click', function () {
    console.log('igual')
    operationNumbers();
})

function operationNumbers () {
    let expression = result.textContent;
    console.log(expression);
    let operationResult = eval(expression);
    console.log(operationResult);
    result.textContent = operationResult;
}

document.querySelector('.ac-button').addEventListener('click', function () {
    result.textContent = '';
});