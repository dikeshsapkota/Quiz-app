import * as dom from "./dom.js";
import { getCategories, getQuestions } from "./api.js";
import { setupQuestions, nextQuestion } from "./quiz.js";
import { showQuestion } from "./ui.js";
import { state } from "./state.js";

// Load categories
(async function initCategories() {
  const categories = await getCategories();
  if (!categories) return;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    dom.selectCategory.appendChild(option);
  });
})();

// Start quiz
dom.beginBtn.addEventListener("click", async () => {
  const categoryID = dom.selectCategory.value;
  if (!categoryID) return alert("Please select a category");

  const apiQuestions = await getQuestions(categoryID);
  console.log(apiQuestions.length);
  // if (!apiQuestions || apiQuestions.length === 0) return alert("No questions found");

  setupQuestions(apiQuestions);
  state.currentQuestionIndex = 0;
  state.score = 0;

  dom.startScreen.style.display = "none";
  dom.quizContainer.style.display = "block";

  showQuestion();
});

// Next
dom.nextBtn.addEventListener("click", nextQuestion);

// Restart
dom.restartBtn.addEventListener("click", () => {
  dom.resultContainer.style.display = "none";
  dom.startScreen.style.display = "block";
  dom.selectCategory.value = "";
});
