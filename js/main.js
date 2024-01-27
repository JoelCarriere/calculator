let num1 = ""
let num2 = ""
let operator = ""
let result = ""

function add(num1,num2) {
    addResult = num1 + num2;
    return addResult;
}

function subtract(num1,num2) {
    subtractResult = num1 - num2;
    return subtractResult;
}

function multiply (num1,num2) {
    multiplyResult = num1 * num2;
    return multiplyResult;
}

function divide (num1,num2) {
    if (num2 === 0) {
        return "Divide by zero error."
    }
    divideResult = num1/num2;
    return divideResult;
}

function operate (operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
          
        case '-':
            return subtract(num1, num2);
        case '+':
            return add(num1, num2);
        case '/':
            return divide(num1, num2);
        case '*':
            return multiply(num1, num2);  
        default:
            return('no operator');
    }

}

const numButtons = document.querySelectorAll('.numpad > button');
const operatorButtons = document.querySelectorAll('.operator > button');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('#equal');
const display = document.querySelector('#result');

numButtons.forEach(button => {
    button.addEventListener('click', function(){       
        if (operator === ""){
            num1 += button.value;
            display.value = num1;
        }
        else
        {
            num2 += button.value;
            display.value = num2;
        }
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', function(){
        if (num1 !== "" && num2 !== "" && operator !== "") {
            display.value = operate(operator, num1, num2);
            operator = button.value;
            num1 = display.value;
            num2 = ""
        }
        else if (num1 !== "" && num2 === ""){
            operator = button.value;
        }   
    });
});

equalButton.addEventListener('click', function(){
    display.value = operate(operator, parseFloat(num1), parseFloat(num2));
});

clearButton.addEventListener('click', function() {
    display.value = "";
    num1 = "";
    num2 = "";
    operator = "";
});

document.addEventListener('keydown', function (event) {
    const key = event.key;

    // Check if the pressed key is a number (0-9)
    if (/[0-9,'.']/.test(key)) {
        if (operator === "") {
            num1 += key;
            display.value = num1;
        } else {
            num2 += key;
            display.value = num2;
        }
    }

    // Check if the pressed key is an operator
    if (['+', '-', '*', '/'].includes(key)) {
        if (num1 !== "" && num2 !== "") {
            display.value = operate(operator, num1, num2);
            operator = key;
            num1 = display.value;
            num2 = "";
        } else if (num1 !== "" && num2 === "") {
            operator = key;
        }
    }

    // Check if the pressed key is Enter (equals)
    if (key === 'Enter') {
        if (num1 !== "" && num2 !== "") {
            display.value = operate(operator, parseFloat(num1), parseFloat(num2));
            num1 = display.value;
            num2 = "";
            operator = "";
        }
    }

    // Check if the pressed key is Delete (clear)
    if (key === 'Delete') {
        display.value = "";
        num1 = "";
        num2 = "";
        operator = "";
    }

        // Check if the pressed key is Backspace
        if (key === 'Backspace') {
            if (operator === "") {
                num1 = num1.slice(0, -1);
                display.value = num1;
            } else {
                num2 = num2.slice(0, -1);
                display.value = num2;
            }
        }
});
