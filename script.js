let isRunning = false;
let startTime;
let interval;
let lapCounter = 1;

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = startTime ? Date.now() - (Date.now() - startTime) : Date.now();
        interval = setInterval(updateDisplay, 10);
        document.getElementById("startStop").textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("display").textContent = "00:00.0";
    document.getElementById("laps").textContent = "";
    isRunning = false;
    lapCounter = 1;
}

function lap() {
    if (!isRunning) return;
    const lapTime = (Date.now() - startTime) / 10;
    const display = document.getElementById("laps");
    const lapDiv = document.createElement("div");
    lapDiv.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
    display.appendChild(lapDiv);
    lapCounter++;
}

function updateDisplay() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 10;
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const tenths = time % 100;
    return (
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (tenths < 10 ? "0" : "") + tenths
    );
}
