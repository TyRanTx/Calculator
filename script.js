let operandA = '';
let operator = null;
let operandB = '';
let equal = false;

let bool = true;


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function modulo(a, b) {
    return a % b;
}

function operate(a, operator, b) {
    return (operator === "+") ? add(a, b) :
        (operator === "-") ? subtract(a, b) :
            (operator === "*") ? multiply(a, b) :
                (operator === "/") ? divide(a, b) :
                (operator === "%") ? modulo(a, b) :
                    null;
}

const digits = document.querySelectorAll('.buttons-container > .operand');
const arithmetic = document.querySelectorAll('.buttons-container > .arithmetic');
const result = document.querySelector('.buttons-container > #result');
const ac = document.querySelector('.buttons-container > #ac');
const display = document.querySelector('.display');

function delAll(){
    operandA = '';
    operator = null;
    operandB = '';
    display.textContent = '';
}

digits.forEach(digit => digit.addEventListener('click', () => {
    bool = true;
    display.textContent += digit.textContent;

    if (operator === null) {
        operandA += digit.textContent;
    }
    else {
        operandB += digit.textContent;
        equal = true;
    }
}));

arithmetic.forEach(arith => arith.addEventListener('click', () => {
    if (bool === true) {
        if (operandB !== '') {
            let op = operate(Number(operandA), operator, Number(operandB));
            display.textContent = `${op} ${arith.textContent}`;
            operandA = op;
            operator = arith.textContent;
            operandB = '';
        }
        else if(operandA !== ''){
            display.textContent += arith.textContent;
            operator = arith.textContent;
        }
    }
    bool = false;
}));


result.addEventListener('click', () => {
    if(equal === true){
    display.textContent = operate(Number(operandA), operator, Number(operandB));
    }
    equal = false;
})

ac.addEventListener('click', delAll);
