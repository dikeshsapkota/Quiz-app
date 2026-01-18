import { beginBtn, nextBtn, restartBtn, selectCategory } from "./ui/elements.js";
import { getCategories } from "./services/api.js";
import { startQuiz, nextQuestion, restartQuiz } from "./core/game.js";
import { populateCategories } from "./ui/view.js";

async function init() {
  //Load categories
  const categories = await getCategories();
  if(categories){
    populateCategories(categories);
  }

  // Event Listener
  beginBtn.addEventListener("click", () => {
    const categoryID = selectCategory.value;
    if (!categoryID) return alert("Please select category");
    startQuiz(categoryID);
  });

  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", restartQuiz);

}

init();




// import * as dom from "./ui/elements.js";
// import { getCategories, getQuestions } from "./services/api.js";
// import { setupQuestions, nextQuestion } from "./core/game.js";
// import { showQuestion } from "./ui/view.js";
// import { state } from "./state/state.js";

// // Load categories
// (async function initCategories() {
//   const categories = await getCategories();
//   if (!categories) return;
//   categories.forEach(cat => {
//     const option = document.createElement("option");
//     option.value = cat.id;
//     option.textContent = cat.name;
//     dom.selectCategory.appendChild(option);
//   });
// })();

// // Start quiz
// dom.beginBtn.addEventListener("click", async () => {
//   const categoryID = dom.selectCategory.value;
//   if (!categoryID) return alert("Please select a category");

//   const apiQuestions = await getQuestions(categoryID);
//   console.log(apiQuestions.length);
//   // if (!apiQuestions || apiQuestions.length === 0) return alert("No questions found");

//   setupQuestions(apiQuestions);
//   state.currentQuestionIndex = 0;
//   state.score = 0;

//   dom.startScreen.style.display = "none";
//   dom.quizContainer.style.display = "block";

//   showQuestion();
// });

// // Next
// dom.nextBtn.addEventListener("click", nextQuestion);

// // Restart
// dom.restartBtn.addEventListener("click", () => {
//   dom.resultContainer.style.display = "none";
//   dom.startScreen.style.display = "block";
//   dom.selectCategory.value = "";
// });
