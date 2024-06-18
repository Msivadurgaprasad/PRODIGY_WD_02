let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];

const timerElement = document.getElementById('timer');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsElement = document.getElementById('laps');

if (startStopBtn) {
    startStopBtn.addEventListener('click', () => {
        if (!running) {
            startTime = new Date().getTime();
            tInterval = setInterval(getShowTime, 10);
            startStopBtn.textContent = 'Stop';
            running = true;
        } else {
            clearInterval(tInterval);
            startStopBtn.textContent = 'Start';
            running = false;
        }
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        clearInterval(tInterval);
        timerElement.textContent = '00:00:00.00';
        startStopBtn.textContent = 'Start';
        running = false;
        laps = [];
        updateLaps();
    });
}

if (lapBtn) {
    lapBtn.addEventListener('click', () => {
        if (running) {
            laps.push(timerElement.textContent);
            updateLaps();
        }
    });
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    timerElement.textContent = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

function updateLaps() {
    lapsElement.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${lap}`;
        lapElement.classList.add('lap');
        lapsElement.appendChild(lapElement);
    });
}
