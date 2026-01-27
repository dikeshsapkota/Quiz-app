import { getTimerElements } from "../ui/elements.js";

let timerInterval = null;
let timeLeft = 0;
let totalTime = 0;

export function startTimer(seconds, onTimeUp) {
  const { timerContainer, timerText, timerFill } = getTimerElements();
  if (!timerContainer || !timerText || !timerFill) return;

  stopTimer();
  totalTime = seconds;
  timeLeft = seconds;
  updateUI();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateUI();

    if (timeLeft <= 5) {
      timerContainer.classList.add("warning");
    }

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
}

function updateUI() {
  const { timerText, timerFill } = getTimerElements();
  if (!timerText || !timerFill) return;

  timerText.innerText = `${timeLeft} s`;
  const percent = (timeLeft / totalTime) * 100;
  timerFill.style.width = `${percent}%`;
}
