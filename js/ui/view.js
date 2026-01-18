import { questionEl, optionsEl, nextBtn, quizContainer, resultContainer, scoreEl, startScreen, selectCategory } from "./elements.js";
// import { state } from "../state/state.js";
// import { selectAnswer } from "../core/quiz.js";

export function showQuestion(questionData, onAnswerSelect) {
  // const q = state.questions[state.currentQuestionIndex];

  questionEl.innerHTML = questionData.question;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  questionData.options.forEach(option => {
    const button = document.createElement("button");
    button.innerHTML = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => onAnswerSelect(option, button));
    optionsEl.appendChild(button);
  });
}

export function showResult(score, totalQuestions) {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreEl.innerText =
    `${score} / ${totalQuestions}`;
}

export function toggleScreen(screen){
  if(screen === 'start'){
    startScreen.style.display= "block";
    quizContainer.style.display = "none";
    resultContainer.style.display = "none";

  }else if (screen === 'quiz'){
    startScreen.style.display= "none";
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
  } else if (screen === 'result'){
    startScreen.style.display= "none";
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
  }
}

export function updateAnswerFeedback(button, isCorrect, correctOptionsText){
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => (btn.disabled = true));
  if(isCorrect){
    button.classList.add("correct");
  }else {
    button.classList.add("incorrect");
    buttons.forEach(btn => {
      if (btn.innerHTML == correctOptionsText) btn.classList.add("correct");
    });
  }
  nextBtn.style.display = "inline-block";
}

export function resetCategorySelect(){
  selectCategory.value = "";
}

export function populateCategories(categories){
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    selectCategory.appendChild(option);
  });
}