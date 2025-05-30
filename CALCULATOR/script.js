const display = document.getElementById('display');
const miniDisplay = document.getElementById('miniDisplay');
const historyList = document.getElementById('historyList');
const historyPanel = document.getElementById('historyPanel');

let justCalculated = false;
let isError = false;  // New flag to track errors

function insertAtCursor(value) {
  if (isError) {
    display.innerText = value;
    isError = false;
    justCalculated = false;
  } else if (justCalculated) {
    if (!isNaN(value) || value === '.') {
      display.innerText = value;
    } else {
      display.innerText += value;
    }
    justCalculated = false;
  } else if (display.innerText.trim() === '0') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
  updateMini();
}

function backspace() {
  if (isError) {
    display.innerText = '0';
    isError = false;
    justCalculated = false;
  } else {
    let text = display.innerText;
    display.innerText = text.slice(0, -1) || '0';
    updateMini();
  }
}

function updateMini() {
  if (isError) {
    miniDisplay.innerText = '';
    return;
  }
  let expr = display.innerText
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/π/g, Math.PI)
    .replace(/√/g, 'Math.sqrt')
    .replace(/\^/g, '**')
    .replace(/(\d|\))\(/g, '$1*(');
  try {
    const res = eval(expr);
    miniDisplay.innerText = isNaN(res) ? '' : res;
  } catch {
    miniDisplay.innerText = '';
  }
}

function calculate() {
  let expr = display.innerText
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/π/g, Math.PI)
    .replace(/√/g, 'Math.sqrt')
    .replace(/\^/g, '**')
    .replace(/(\d|\))\(/g, '$1*(');
  try {
    const res = eval(expr);
    display.innerText = res;
    miniDisplay.innerText = '';
    addToHistory(expr + ' = ' + res);
    justCalculated = true;
    isError = false;
  } catch {
    display.innerText = 'Error';
    miniDisplay.innerText = '';
    justCalculated = false;
    isError = true;
  }
}

function factorial() {
  try {
    let n = eval(display.innerText);
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
    display.innerText = res;
    miniDisplay.innerText = '';
    addToHistory(n + '! = ' + res);
    justCalculated = true;
    isError = false;
  } catch {
    display.innerText = 'Error';
    miniDisplay.innerText = '';
    isError = true;
  }
}

function addToHistory(entry) {
  const li = document.createElement('li');
  li.innerText = entry;
  historyList.prepend(li);
}

function clearHistory() {
  historyList.innerHTML = '';
}

document.querySelectorAll('.buttons button').forEach(btn => {
  if (btn.dataset.value) {
    btn.addEventListener('click', () => insertAtCursor(btn.dataset.value));
  }
});

document.getElementById('delete').addEventListener('click', backspace);
document.getElementById('clear').addEventListener('click', () => {
  display.innerText = '0';
  miniDisplay.innerText = '';
  justCalculated = false;
  isError = false;
});

document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});
document.getElementById('historyToggle').addEventListener('click', (e) => {
  e.stopPropagation();
  historyPanel.classList.toggle('hidden');
});
document.getElementById('closeHistory').addEventListener('click', (e) => {
  e.stopPropagation();
  historyPanel.classList.add('hidden');
});

document.addEventListener('click', (e) => {
  if (!historyPanel.contains(e.target) && e.target.id !== 'historyToggle') {
    historyPanel.classList.add('hidden');
  }
});

document.addEventListener('keydown', e => {
  if (isError && (e.key.length === 1 || e.key === 'Backspace')) {
    display.innerText = '0';
    isError = false;
  }
  if (!isNaN(e.key) || ['+', '-', '*', '/', '.', '%', '^', '(', ')'].includes(e.key)) {
    insertAtCursor(e.key);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    backspace();
  }
});
