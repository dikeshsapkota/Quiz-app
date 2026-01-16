import { questionEl, optionsEl, nextBtn } from "./dom.js";
import { state } from "./state.js";
import { selectAnswer } from "./quiz.js";

export function showQuestion() {
  const q = state.questions[state.currentQuestionIndex];

  questionEl.innerHTML = q.question;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.innerHTML = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(option, button));
    optionsEl.appendChild(button);
  });
}

export function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";
  document.getElementById("score").innerText =
    `${state.score} / ${state.questions.length}`;
}
