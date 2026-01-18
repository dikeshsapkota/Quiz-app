import { beginBtn, nextBtn, restartBtn, leaderboardBtn, backBtn, homeBtn } from "./ui/elements.js";
import { getCategories } from "./services/api.js";
import { startQuiz, nextQuestion, restartQuiz, openLeaderboard, closeLeaderboard, goHome } from "./core/game.js";
import { populateCategories, getSelectedCategoryID } from "./ui/view.js";

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
  });

  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", restartQuiz);
  
  if(leaderboardBtn) leaderboardBtn.addEventListener("click", openLeaderboard);
  if(backBtn) backBtn.addEventListener("click", closeLeaderboard);
  if(homeBtn) homeBtn.addEventListener("click", goHome);

}

init();
