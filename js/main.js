import * as dom from "./dom.js";
import { fetchCategories, fetchQuestions } from "./api.js";
import { setupQuestions, nextQuestion } from "./quiz.js";
import { showQuestion } from "./ui.js";
import { state } from "./state.js";

// Load categories
(async function initCategories() {
  const categories = await fetchCategories();
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    dom.selectCategory.appendChild(option);
  });
})();

// Start quiz
dom.beginBtn.addEventListener("click", async () => {
  const categoryId = dom.selectCategory.value;
  if (!categoryId) return alert("Please select a category");

  const apiQuestions = await fetchQuestions(categoryId);

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
