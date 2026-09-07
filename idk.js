const screen = document.querySelector(".screen");

let buffer = "0";
let operator = null;
let previousNumber = null;

function handleInput(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function calculateAnswer() {
    if (operator === null || previousNumber === null) {
        return;
    }

    const firstNumber = Number(previousNumber);
    const secondNumber = Number(buffer);

    switch (operator) {
        case "+":
            buffer = firstNumber + secondNumber;
            break;

        case "-":
            buffer = firstNumber - secondNumber;
            break;

        case "*":
            buffer = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                buffer = "Error";
            } else {
                buffer = firstNumber / secondNumber;
            }
            break;
    }

    operator = null;
    previousNumber = null;

    rerender();
}

function handleSymbol(value) {
    switch (value) {
        case "/":
        case "*":
        case "-":
        case "+":
            operator = value;
            previousNumber = buffer;
            buffer = "0";
            rerender();
            break;

        case "C":
            buffer = "0";
            previousNumber = null;
            operator = null;
            rerender();
            break;

        case "<-":
            if (buffer === "Error") {
                buffer = "0";
            } else if (buffer.length <= 1) {
                buffer = "0";
            } else {
                buffer = buffer.slice(0, -1);
            }

            rerender();
            break;

        case "=":
            calculateAnswer();
            break;
    }
}

function handleNumber(value) {
    if (buffer === "Error") {
        buffer = value;
    } else if (buffer === "0") {
        buffer = value;
    } else {
        buffer = buffer + value.toString();
    }

    rerender();
}

function rerender() {
    screen.innerText = buffer;
}

function init() {
    document
        .querySelector(".button-sections")
        .addEventListener("click", function (e) {
            if (e.target.tagName !== "BUTTON") {
                return;
            }

            handleInput(e.target.innerText.trim());
        });
}

init();
