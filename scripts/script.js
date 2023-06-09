// FUNCTIONALITY
let firstNumber = ''
let operator = ''
let secondNumber = ''
let reset = false

// DISPLAY
const lastOpDisplay = document.querySelector('.last-op')
const currentOpDisplay = document.querySelector('.current-op')

// NUMBER BUTTONS
const numButtons = document.querySelectorAll('[data-number]')
numButtons.forEach(btn => btn.addEventListener('click', () => appendNum(btn.textContent)))

// OPERATION BUTTONS
const opEvaluate = document.getElementById('evaluate')
const opDecimal = document.getElementById('decimal')
const opClear = document.getElementById('clear')
const opPosOrNeg = document.getElementById('pos-neg') // Needs work
const opButtons = document.querySelectorAll('[data-operation]')
opButtons.forEach(btn => btn.addEventListener('click', () => {
    operator = btn.textContent
    operation(operator)
    currentOpDisplay.textContent = ''
}))





// EVENT LISTENERS
opClear.addEventListener('click', () => {
    clearOps()
})

opEvaluate.addEventListener('click', () => evaluate())


// FUNCTIONS
const clearOps = () => {
    lastOpDisplay.textContent = ''
    currentOpDisplay.textContent = 0
}

const appendNum = (num) => {
    if (currentOpDisplay.textContent.length === 20) return
    if (lastOpDisplay.textContent.includes('=')) {
        lastOpDisplay.textContent = ''
    } 
    if (currentOpDisplay.textContent == 0 || reset) {
        currentOpDisplay.textContent = ''
        reset = false
    } 

    currentOpDisplay.textContent += num
}

const operation = (operation) => {
    firstNumber = Number(currentOpDisplay.textContent)
    lastOpDisplay.textContent = `${currentOpDisplay.textContent} ${operation}`
}

const evaluate = () => {
    if (lastOpDisplay.textContent.length === 0 || lastOpDisplay.textContent.includes('=')) return
    secondNumber = Number(currentOpDisplay.textContent)
    lastOpDisplay.textContent += ` ${secondNumber} =`
    reset = true

    switch(operator) {
        case '%':
            lastOpDisplay.textContent = `${firstNumber} ${operator}`
            return currentOpDisplay.textContent = percent(firstNumber)
        case '÷':
            return currentOpDisplay.textContent = divide(firstNumber, secondNumber)
        case '*':
            return currentOpDisplay.textContent = multiply(firstNumber, secondNumber)
        case '-':
            return currentOpDisplay.textContent = subtract(firstNumber, secondNumber)
        case '+':
            return currentOpDisplay.textContent = add(firstNumber, secondNumber)
        default: 
            break
    }
}

    // MATH 
function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function percent(num1) {
    return num1 * 0.01
}


