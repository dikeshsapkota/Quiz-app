import { state } from "./state.js";
import { showQuestion, showResult } from "./ui.js";

export function setupQuestions(apiQuestions) {
  state.questions = apiQuestions.map(q => {
    const options = [...q.incorrect_answers];
    options.splice(Math.floor(Math.random() * 4), 0, q.correct_answer);

    return {
      question: q.question,
      options,
      correct: q.correct_answer
    };
  });
}

export function selectAnswer(selected, button) {
  const q = state.questions[state.currentQuestionIndex];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => (btn.disabled = true));

  if (selected === q.correct) {
    state.score++;
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
    buttons.forEach(btn => {
      if (btn.innerHTML === q.correct) btn.classList.add("correct");
    });
  }

  document.getElementById("next-btn").style.display = "inline-block";
}

export function nextQuestion() {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex < state.questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}
