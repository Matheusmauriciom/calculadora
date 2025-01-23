const display = document.querySelector('.display');
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('button:not(.dark-mode-toggle)');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const sunIcon = darkModeToggle.querySelector('.fa-sun');
const moonIcon = darkModeToggle.querySelector('.fa-moon');

document.documentElement.classList.add('dark-mode');
sunIcon.style.display = 'none';
moonIcon.style.display = 'inline-block';

function processPercentage(operation) {
  const percentMatch = operation.match(/(\d+(\.\d+)?)\s*-\s*(\d+(\.\d+)?)%/);
  if (percentMatch) {
    const baseNumber = parseFloat(percentMatch[1]);
    const percentValue = parseFloat(percentMatch[3]);
    const result = baseNumber - (baseNumber * percentValue / 100);
    return result;
  }
  return operation;
}

function processInput(input) {
  switch (input) {
    case 'Escape':
    case 'C':
      display.value = '';
      resultDisplay.textContent = '';
      break;
    case 'Enter':
    case '=':
      try {
        const processedValue = processPercentage(display.value);
        const result = eval(
          String(processedValue)
            .replace('×', '*')
            .replace('÷', '/')
        );
        resultDisplay.textContent = `= ${Number(result.toFixed(6))}`;
      } catch {
        resultDisplay.textContent = 'Erro';
      }
      break;
    case 'Backspace':
      display.value = display.value.slice(0, -1);
      break;
    default:
      const validKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
        '+', '-', '*', '/', '.', '×', '÷', '%'
      ];
      
      if (validKeys.includes(input)) {
        display.value += input;
      }
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    processInput(buttonText);
  });
});

document.addEventListener('keydown', (event) => {
  if (['Backspace', 'Enter', 'Escape'].includes(event.key)) {
    event.preventDefault();
  }

  const keyMap = {
    'Enter': '=',
    'Backspace': 'Backspace',
    'Escape': 'C',
    '*': '×',
    '/': '÷'
  };

  const input = keyMap[event.key] || event.key;
  processInput(input);
});

darkModeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');

  if (document.documentElement.classList.contains('dark-mode')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline-block';
  } else {
    sunIcon.style.display = 'inline-block';
    moonIcon.style.display = 'none';
  }
});