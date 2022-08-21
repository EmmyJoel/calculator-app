class Calculator {
    constructor(operationTextElement, resultTextElement) {
        this.operationTextElement = operationTextElement
        this.resultTextElement = resultTextElement
        this.clear()
    }

clear() {
    this.result = ''
    this.operation = ''
    this.operator = undefined
}

delete() {
    this.result = this.result.toString().slice(0, -1)
}

appendNumber(number) {
    if (number === '.' && this.result.includes('.')) return
    this.result = this.result.toString() + number.toString()
}

chooseOperator(operator) {
    if (this.result === '') return
    if (this.operation !== ''){
        this.compute()
    }
    this.operator = operator
    this.operation =  this.result
    this.result = ''
}
compute() {
    let computation
    const prev = parseFloat(this.operation)
    const current = parseFloat(this.result)
    if (isNaN(prev) || isNaN(current)) return
    switch(this.operator) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:
            return
    }
    this.result = computation
    this.operator = undefined
    this.operation = ''
}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

updateDisplay() {
        this.resultTextElement.innerText = 
        this.getDisplayNumber(this.result)
        if (this.operator != null) {
        this.operationTextElement.innerText =
            `${this.getDisplayNumber(this.operation)} ${this.operator}`
        } else {
            this.operationTextElement.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const operationTextElement = document.querySelector('[data-operation]')
const resultTextElement = document.querySelector('[data-result]')

const calculator = new Calculator (operationTextElement, resultTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})

