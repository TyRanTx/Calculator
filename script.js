const digits = document.querySelectorAll('.buttons-container > .operand');
const arithmetic = document.querySelectorAll('.buttons-container > .arithmetic');
const result = document.querySelector('.buttons-container > #result');
const allclear = document.querySelector('.buttons-container > #allclear');
const display = document.querySelector('.display');
const decimal = document.querySelector('.buttons-container > #decimal');
const del = document.querySelector('.buttons-container > #delete');

digits.forEach(digit => digit.addEventListener('click', inputDigit));
arithmetic.forEach(arith => arith.addEventListener('click', inputArithmetic));
result.addEventListener('click', showResult);
allclear.addEventListener('click', delAll);
decimal.addEventListener('click', inputDecimal);
del.addEventListener('click', deleteInteger);

let operandA = '';
let operator = null;
let operandB = '';
let equalAllowed = false;
let operatorAllowed = true;
let side = 'left';

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
    return (operator === "+") ? add(+a, +b) :
        (operator === "-") ? subtract(+a, +b) :
            (operator === "*") ? multiply(+a, +b) :
                (operator === "/") ? divide(+a, +b) :
                    (operator === "%") ? modulo(+a, +b) :
                        null;
}

function delAll() {
    display.textContent = '';
    operandA = '';
    operator = null;
    operandB = '';
    side = 'left';
}

function inputDecimal() {
    if (side === 'left') {
        if (!operandA.includes('.')) {
            display.textContent += '.';
            operandA += '.';
        }
    }

    if (side === 'right') {
        if (!operandB.includes('.')) {
            display.textContent += '.';
            operandB += '.';
        }
    }
}

function deleteInteger() {
    if (side === 'left') {
        if (operandA !== '') {
            let delLastChar = operandA.slice(0, -1);
            operandA = delLastChar;
            let delLastCharFromDisplay = display.textContent.slice(0, -1);
            display.textContent = delLastCharFromDisplay;
        }
    }

    if (side === 'right') {
        if (operandB !== '') {
            let delLastChar = operandB.slice(0, -1);
            operandB = delLastChar;
            let delLastCharFromDisplay = display.textContent.slice(0, -1);
            display.textContent = delLastCharFromDisplay;
        }
    }
}

function showResult() {
    if (equalAllowed === true) {
        let result = operate(operandA, operator, operandB);
        display.textContent = result;
        operandA = result.toString();
        operandB = '';
        operator = null;
        side = 'left';
    }
    equalAllowed = false;
}

function inputArithmetic() {
    if (operatorAllowed === true) {

        if (side === 'left') {
            display.textContent += this.textContent;
            operator = this.textContent;
            side = 'right';
        }

        else {
            let op = operate(operandA, operator, operandB);
            display.textContent = `${op} ${this.textContent}`;
            operandA = op.toString();
            operator = this.textContent;
            operandB = '';
        }
    }
    operatorAllowed = false;
}

function inputDigit() {
    display.textContent += this.textContent;
    operatorAllowed = true;

    if (side === 'left') {
        operandA += this.textContent;
    }

    else {
        operandB += this.textContent;
        equalAllowed = true;
    }
}
