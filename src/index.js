function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let operation = {
        '1': '/',
        '2': '*',
        '3': '+',
        '4': '-'
    };
    let expression = [];
    let operations = [];
    let output = [];
    let str = '';
    let zeroDivError = new Error('TypeError: Devision by zero.');
    let bracketsError = new Error('ExpressionError: Brackets must be paired'); 

    function isNumber(el) {
        let counter = 0;

        for (key in operation) {
            if (el !== operation[key] && el !=='(' && el !==')') {
                counter++;
            }
        }
        if (counter === 4) {
            return true;
        }
        else if (counter < 4) {
            return false;
        }
        else {
            return false;
        }
    }

    function isLowPrior(curr, prev) {
        let currIndex = 0;
        let prevIndex = 0;
        let len = operations.length - 1;

        if (operations[len] === '(') {
            return false;
        }

        for (key in operation) {
            if (operation[key] === curr) {
                currIndex = key;
            }
            if (operation[key] === prev) {
                prevIndex = key;
            }
        }

        if (currIndex >= prevIndex && currIndex !== 0 && prevIndex !== 0) {
            return true;
        }
        else if (currIndex === '1' && prevIndex === '2') {
            return true;
        }
        else if (currIndex === '2' && prevIndex === '1') {
            return true;
        }
        else if (currIndex === '3' && prevIndex === '4') {
            return true;
        }
        else if (currIndex === '4' && prevIndex === '3') {
            return true;
        }
        else {
            return false;
        }
    }

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] !== ' ') {
            str += expr[i];
        }
    }

    for (let k = 0; k < str.length; k++) {
        let sym = '';

        if (str[k] !== '/' && str[k] !== '*' && str[k] !== '+' && str[k] !== '-' && str[k] !== '(' && str[k] !== ')') {
            while (isNumber(str[k])) {
                if (str[k]) {
                    sym += str[k];
                    k++;
                }
                else {
                    break;
                }
            }
            k--;     
            expression.push(sym);
        }
        else if (str[k] === '(') {
            expression.push(str[k]);
        }
        else if (str[k] === ')') {
            expression.push(str[k]);
        }
        else {
            expression.push(str[k]);
        }
    }

    function algorithm(stack) {
        let openCounter = 0;
        let closeCounter = 0;

        for (let i = 0; i < stack.length; i++) {
            
            if (stack[i] === '0' && stack[i-1] === '/') {
                throw zeroDivError;
            }

            if (stack[i] === '(') {
                openCounter++;
            }
            else if (stack[i] === ')') {
                closeCounter++;
            }

            if (stack[i] !== '/' && stack[i] !== '*' && stack[i] !== '+' && stack[i] !== '-' && stack[i] !== '(' && stack[i] !== ')') {
                output.push(stack[i]);
            }
            else {
                let len = operations.length - 1;

                if (operations.length === 0 || stack[i] === '(') {
                    operations.push(stack[i]);
                }
                else if (stack[i] === ')') {
                    let index = operations.lastIndexOf('(');
                    for (let j = (operations.length - 1); j >= index; j--) {
                        if (operations[j] !== '(') {    
                            output.push(operations[j]);
                        }
                        operations.pop();
                    }
                }
                else {
                    if (isLowPrior(stack[i], operations[len])) {
                        output.push(operations[len]);
                        operations[len] = stack[i];
                        while (isLowPrior(operations[len], operations[len-1])) {
                            output.push(operations[len-1]);
                            operations[len-1] = operations[len];
                            operations.pop();
                        }
                    }
                    else {
                        operations.push(stack[i]);
                    }
                }
            }
        }

        if (closeCounter !== openCounter) {
            throw bracketsError;
        }

        for (let j = (operations.length - 1); j >= 0; j--) {
            output.push(operations[j]);
        }
    }

    function calculate(output) {
        let stack = [];

        for (let i = 0; i < output.length; i++) {
            if (output[i] !== '/' && output[i] !== '*' && output[i] !== '-' && output[i] !== '+') {
                stack.push(output[i]);
            }
            else {
                let len = stack.length - 1;
                if (output[i] === '+') {
                    let el = (stack[len-1]*1 + stack[len]*1);
                    stack.pop();
                    stack.pop();
                    stack.push(el);
                }
                else if (output[i] === '-') {
                    let el = (stack[len-1]*1 - stack[len]*1);
                    stack.pop();
                    stack.pop();
                    stack.push(el);
                }
                else if (output[i] === '*') {
                    let el = (stack[len-1] * stack[len]);
                    stack.pop();
                    stack.pop();
                    stack.push(el);
                }
                else {
                    let el = (stack[len-1] / stack[len]);
                    stack.pop();
                    stack.pop();
                    stack.push(el);
                }
            }
        }

        return stack[0];
    }

    algorithm(expression);

    return calculate(output);
}

module.exports = {
    expressionCalculator
}
