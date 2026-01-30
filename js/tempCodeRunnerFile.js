import { beginBtn, nextBtn, restartBtn, leaderboardBtn, backBtn, homeBtn } from "./ui/elements.js";
import { getCategories } from "./services/api.js";
import { startQuiz, nextQuestion, restartQuiz, openLeaderboard, closeLeaderboard, goHome } from "./core/game.js";
import { populateCategories, getSelectedCategoryID } from "./ui/view.js";
import { startTimer } from './core/timer.js';

async function init() {
  //Load categories
  const categories = await getCategories();
  if(categories){
    populateCategories(categories);
  }

  // Event Listener
  beginBtn.addEventListener("click", () => {
  const categoryID = getSelectedCategoryID();
  if (!categoryID) return alert("Please select a category");
  
  startQuiz(categoryID);

  // Show screens
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('quiz-wrapper').style.display = 'block';
  document.getElementById('quiz-header').style.display = 'flex'; // SHOW the header

  // Start the timer AFTER the header is visible
  const QUIZ_TIME = 30; // seconds
  startTimer(QUIZ_TIME, () => {
      alert("Time's up!");
      // handle end-of-quiz logic here
  });
});

  
  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", restartQuiz);
  
  if(leaderboardBtn) leaderboardBtn.addEventListener("click", openLeaderboard);
  if(backBtn) backBtn.addEventListener("click", closeLeaderboard);
  if(homeBtn) homeBtn.addEventListener("click", goHome);

}

init();

