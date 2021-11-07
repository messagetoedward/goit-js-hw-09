function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const docBody = document.querySelector('body');
let timer = null;

startButton.addEventListener('click', handleStart);
stopButton.addEventListener('click', handleStop);

function handleStart() {
    docBody.style.backgroundColor = getRandomHexColor();
    startButton.disabled = true;
    timer = setInterval(() => {
        docBody.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function handleStop() {
    clearInterval(timer);
    startButton.disabled = false;
}

