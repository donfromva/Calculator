// HOLDERS
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
const opPercent = document.getElementById('percent')

const opButtons = document.querySelectorAll('[data-operation]')
opButtons.forEach(btn => btn.addEventListener('click', () => {
    operator = btn.textContent
    operation(operator)
    currentOpDisplay.textContent = ''
}))

// EVENT LISTENERS
opClear.addEventListener('click', () => clearOps())
opEvaluate.addEventListener('click', () => evaluate())
opDecimal.addEventListener('click', () => appendDecimal())

const percentSymbol = opPercent.textContent
opPercent.addEventListener('click', () => {
    if (currentOpDisplay.textContent == 0) return
    reset = true
    operation(percentSymbol)
    return currentOpDisplay.textContent = percent(firstNumber)
})

opPosOrNeg.addEventListener('click', () => {
    if (currentOpDisplay.textContent == 0) {
        currentOpDisplay.textContent = '-'
    } else if (!currentOpDisplay.textContent.includes('-')) {
        currentOpDisplay.textContent = '-' + currentOpDisplay.textContent
    } else if (currentOpDisplay.textContent.includes('-')) {
        let displayArrayed = currentOpDisplay.textContent.split('')
        let minusIndex = displayArrayed.indexOf('-')
        delete displayArrayed[minusIndex]
        currentOpDisplay.textContent = displayArrayed.join('')
    }
    if (currentOpDisplay.textContent == '') currentOpDisplay.textContent = 0
})

// GENERAL FUNCTIONS
const clearOps = () => {
    lastOpDisplay.textContent = ''
    currentOpDisplay.textContent = 0
}

const appendNum = (num) => {
    if (currentOpDisplay.textContent.length === 20) return
    if (lastOpDisplay.textContent.includes('=') || lastOpDisplay.textContent.includes('%')) {
        lastOpDisplay.textContent = ''
    } 
    if ((currentOpDisplay.textContent == 0 && currentOpDisplay.textContent.length === 1) || reset) {
        currentOpDisplay.textContent = ''
        reset = false
    }

    currentOpDisplay.textContent += num
}

const appendDecimal = () => {
    if (!currentOpDisplay.textContent.includes('.')) {
        currentOpDisplay.textContent += '.'
    }
}

const operation = (operation) => {
    firstNumber = Number(currentOpDisplay.textContent)
    if (currentOpDisplay.textContent == 0) {
        alert('Please enter a number greater than or less than 0 before choosing an operation')
        return
    }
    lastOpDisplay.textContent = `${currentOpDisplay.textContent} ${operation}`
}

const evaluate = () => {
    if (lastOpDisplay.textContent.length === 0 || lastOpDisplay.textContent.includes('=') || lastOpDisplay.textContent.includes('%')) return
    secondNumber = Number(currentOpDisplay.textContent)
    lastOpDisplay.textContent += ` ${secondNumber} =`
    reset = true

    switch(operator) {
        case '÷':
            return currentOpDisplay.textContent = Math.round((divide(firstNumber, secondNumber) + Number.EPSILON) * 100) / 100
        case '*':
            return currentOpDisplay.textContent = Math.round((multiply(firstNumber, secondNumber) + Number.EPSILON) * 100) / 100
        case '-':
            return currentOpDisplay.textContent = Math.round((subtract(firstNumber, secondNumber) + Number.EPSILON) * 100) / 100
        case '+':
            return currentOpDisplay.textContent = Math.round((add(firstNumber, secondNumber) + Number.EPSILON) * 100) / 100
        default: 
            break
    }
}

// MATH FUNCTIONS 
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