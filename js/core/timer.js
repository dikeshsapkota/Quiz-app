import { getTimerElements } from "../ui/elements.js";

let timerInterval = null;
let timeLeft = 0;
let totalTime = 0;

export function startTimer(seconds, onTimeUp) {
  seconds = Number(seconds);

  if (isNaN(seconds) || seconds <= 0) {
    console.error("Invalid timer seconds:", seconds);
    return;
  }

  const { timerContainer, timerText, timerFill } = getTimerElements();
  if (!timerContainer || !timerText || !timerFill) return;

  stopTimer();
  timerContainer.classList.remove("warning");

  totalTime = seconds;
  timeLeft = seconds;
  updateUI();

  timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 5) {
      timerContainer.classList.add("warning");
    }

    updateUI();

    if (timeLeft <= 0) {
      stopTimer();
      onTimeUp?.();
    }
  }, 1000);
}

export function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export function resetTimer() {
  const { timerContainer, timerText, timerFill } = getTimerElements();
  if (!timerContainer || !timerText || !timerFill) return;

  stopTimer();
  timerContainer.classList.remove("warning");
  timerText.innerText = "0 s";
  timerFill.style.width = "100%";

  timeLeft = 0;
  totalTime = 0;
}

function updateUI() {
  const { timerText, timerFill } = getTimerElements();
  if (!timerText || !timerFill) return;

  if (totalTime <= 0) {
    timerText.innerText = "0 s";
    timerFill.style.width = "100%";
    return;
  }

  timerText.innerText = `${timeLeft} s`;

  const percent = Math.max((timeLeft / totalTime) * 100, 0);
  timerFill.style.width = `${percent}%`;
}