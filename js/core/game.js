import { state } from "../state/state.js";
import * as view from "../ui/view.js";
import { getQuestions } from "../services/api.js";
import { startTimer, stopTimer, resetTimer } from "../core/timer.js";
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
  
  view.updateLiveScore(0);
  view.setQuizTitle();
  view.toggleScreen('quiz');

  resetTimer();
  startTimer(nextQuestion); // ⬅ callback when time ends

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
    view.updateLiveScore(state.score);
  }

  view.updateAnswerFeedback(buttonElement, isCorrect, currentQuestion.correct)
}

export function nextQuestion(){
  stopTimer();
  state.currentQuestionIndex++;
  if(state.currentQuestionIndex < state.questions.length){
    resetTimer();
    startTimer(nextQuestion);
    displayCurrentQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
   stopTimer();
    const isNewHigh = saveScore(state.score);
    const msg = isNewHigh ? "New High Score! 🏆" : "Good Job! 👍";
    view.showResult(state.score, state.questions.length, msg);
}

export function restartQuiz(){
  view.resetCategorySelect();
  view.toggleScreen('start');
}

export function goHome() {
    view.resetCategorySelect();
    view.toggleScreen('start');
}

const MAX_HIGH_SCORES = 5;

function saveScore(score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = { score, date: new Date() };
    
    let isNewHigh = false;
    if (highScores.length < MAX_HIGH_SCORES || score > highScores[highScores.length - 1].score) {
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(MAX_HIGH_SCORES); // Keep top 5
        localStorage.setItem('highScores', JSON.stringify(highScores));
        
        if (highScores.some(s => s === newScore)) { 
        }
    }
    return isNewHigh;
}

export function openLeaderboard() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    view.showLeaderboard(highScores);
    view.toggleScreen('leaderboard');
}

export function closeLeaderboard() {
    view.toggleScreen('start');
}
