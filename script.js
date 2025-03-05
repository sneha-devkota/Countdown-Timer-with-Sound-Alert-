let countdown;
let timeLeft = 0;
let alarmPlaying = false;

const startButton = document.getElementById("startBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");
const displayTime = document.getElementById("display-time");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const timerSound = document.getElementById("timerSound");

function updateDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    displayTime.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startCountdown() {
    timeLeft = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert("Please enter a valid time!");
        return;
    }
    
    updateDisplay();
    
    countdown = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            updateDisplay();
            timerSound.play(); // Play sound immediately
            alarmPlaying = true; // Set alarm as playing

            // Delay alert so the sound starts playing
            setTimeout(() => {
                alert("This page says Time's up!"); // Custom message
                stopAlarm(); // Stop the alarm after the alert is dismissed
                resetTimer();
            }, 100); // 100ms delay
        }
    }, 1000);

    startButton.disabled = true;
    pauseButton.disabled = false;
}

function pauseCountdown() {
    clearInterval(countdown);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = 0;
    updateDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function stopAlarm() {
    if (alarmPlaying) {
        timerSound.pause(); // Pause the alarm sound
        timerSound.currentTime = 0; // Reset the sound to the beginning
        alarmPlaying = false; // Reset alarm playing status
    }
}

startButton.addEventListener("click", startCountdown);
pauseButton.addEventListener("click", pauseCountdown);
resetButton.addEventListener("click", resetTimer);
