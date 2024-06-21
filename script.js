document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('calculator-screen');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const buttonContent = this.textContent;
            
            if (!action) {
                if (currentInput.includes('.') && buttonContent === '.') return;
                currentInput += buttonContent;
                updateScreen();
            } else {
                switch (action) {
                    case 'clear':
                        currentInput = '';
                        previousInput = '';
                        operator = '';
                        updateScreen();
                        break;
                    case 'delete':
                        currentInput = currentInput.slice(0, -1);
                        updateScreen();
                        break;
                    case 'operator':
                        if (previousInput && currentInput === '') {
                            operator = buttonContent; // Update operator if current input is empty
                        } else {
                            if (currentInput === '') return;
                            if (previousInput === '') {
                                previousInput = currentInput;
                                currentInput = '';
                            } else {
                                previousInput = operate(operator, parseFloat(previousInput), parseFloat(currentInput)).toString();
                                currentInput = '';
                            }
                            operator = buttonContent;
                        }
                        updateScreen();
                        break;
                    case 'equals':
                        if (previousInput === '' || currentInput === '') return;
                        currentInput = operate(operator, parseFloat(previousInput), parseFloat(currentInput)).toString();
                        previousInput = '';
                        operator = '';
                        updateScreen();
                        break;
                }
            }
        });
    });

    function updateScreen() {
        screen.innerHTML = `<span>${previousInput || currentInput}</span><span class="calculator-sign">${operator}</span>`;
    }

    function operate(operator, num1, num2) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return 0;
        }
    }
});
