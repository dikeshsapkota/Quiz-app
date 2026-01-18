import { state } from "../state/state.js";
import * as view from "../ui/view.js";
import { getQuestions } from "../services/api.js";

function processQuestions(apiQuestions) {
  return apiQuestions.map(q => {
    const options = [...q.incorrect_answers];
    options.splice(Math.floor(Math.random() * 4), 0, q.correct_answer);

    return {
      question: q.question,
      options,
      correct: q.correct_answer
    };
  });
}


export async function startQuiz(categoryID){
  const apiQuestions = await getQuestions(categoryID);
  if (!apiQuestions || apiQuestions.length === 0){
    alert("No questions Found");
    return;
  }

  state.questions = processQuestions(apiQuestions);
  state.currentQuestionIndex = 0;
  state.score = 0;

  displayCurrentQuestion();
}

function displayCurrentQuestion(){
  const currentQuestion= state.questions[state.currentQuestionIndex];
  view.showQuestion(currentQuestion, handleAnswerSelection);
}

function handleAnswerSelection(selectedOption, buttonElement){
  const currentQuestion= state.questions[state.currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correct;

  if(isCorrect){
    state.score++;
  }

  view.updateAnswerFeedback(buttonElement, isCorrect, currentQuestion.correct)
}


export function nextQuestion(){
  state.currentQuestionIndex++;
  if(state.currentQuestionIndex < state.questions.length){
    displayCurrentQuestion();
  } else {
    view.showResult(state.score, state.questions.length);
  }
}

export function restartQuiz(){
  view.resetCategorySelect();
  view.toggleScreen('start');
}


// export function selectAnswer(selected, button) {
//   const q = state.questions[state.currentQuestionIndex];
//   const buttons = document.querySelectorAll(".option-btn");

//   buttons.forEach(btn => (btn.disabled = true));

//   if (selected === q.correct) {
//     state.score++;
//     button.classList.add("correct");
//   } else {
//     button.classList.add("incorrect");
//     buttons.forEach(btn => {
//       if (btn.innerHTML === q.correct) btn.classList.add("correct");
//     });
//   }

//   document.getElementById("next-btn").style.display = "inline-block";
// }

// export function nextQuestion() {
//   state.currentQuestionIndex++;
//   if (state.currentQuestionIndex < state.questions.length) {
//     showQuestion();
//   } else {
//     showResult();
//   }
// }
