let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let screen = document.querySelector(".calculator__screen p");

document
  .querySelector(".calculator__buttons")
  .addEventListener("click", (e) => {
    handleButtonClicked(e.target.textContent);
  });

function handleButtonClicked(value) {
  if (isNaN(parseInt(value))) {
    handleSymbolClicked(value);
  } else {
    handleNumberClicked(value);
  }
  displayOperation();
}

function handleSymbolClicked(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) return;
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleCalculation(symbol);
      break;
  }
}

function handleNumberClicked(num) {
  if (buffer === "0") {
    buffer = num;
  } else {
    buffer += num;
  }
}

function displayOperation() {
  screen.textContent = buffer;
}

function handleCalculation(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    default:
      runningTotal /= intBuffer;
      break;
  }
}
