import { 
    questionEl, optionsEl, nextBtn, quizContainer, resultContainer, scoreEl, startScreen, 
    quizHeader, quizCategoryTitle, liveScoreVal, leaderboardContainer, highScoresList,
    categoryGrid, categoryModal, subcategoryList, modalTitle, closeModalBtn
} from "./elements.js";

let selectedCategoryID = null;
let selectedCategoryName = "";

export function getSelectedCategoryID() {
    return selectedCategoryID;
}

export function setSelectedCategoryID(id, name) {
    selectedCategoryID = id;
    selectedCategoryName = name || "";
    document.querySelectorAll('.category-card, .subcategory-btn').forEach(el => {
        el.classList.remove('selected');
        if (el.dataset.id == id) {
            el.classList.add('selected');
            if (!selectedCategoryName) selectedCategoryName = el.textContent;
        }
    });
}

export function setQuizTitle(title) {
    quizCategoryTitle.innerText = title || selectedCategoryName || "Quiz";
}

export function showQuestion(questionData, onAnswerSelect) {
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

export function showResult(score, totalQuestions, highScoreMsg = "") {
  quizContainer.style.display = "none";
  quizHeader.style.display = "none";
  resultContainer.style.display = "block";
  scoreEl.innerText = `${score} / ${totalQuestions}`;
  
  const msgEl = document.getElementById('high-score-msg');
  if (msgEl) {
      msgEl.innerText = highScoreMsg;
  }
}

export function updateLiveScore(score) {
    liveScoreVal.innerText = score;
}

export function showLeaderboard(scores) {
    highScoresList.innerHTML = scores.map((s, index) => 
        `<li>
            <span>#${index + 1} Score: ${s.score}</span>
            <span>${new Date(s.date).toLocaleDateString()}</span>
         </li>`
    ).join('');
}

export function toggleScreen(screen){
  startScreen.style.display = "none";
  quizContainer.style.display = "none";
  resultContainer.style.display = "none";
  leaderboardContainer.style.display = "none";
  quizHeader.style.display = "none";
  const quizWrapper = document.getElementById("quiz-wrapper");
  if (quizWrapper) quizWrapper.style.display = "none";

  if(screen === 'start'){
    startScreen.style.display = "block";
  } else if (screen === 'quiz'){
    if (quizWrapper) {
        quizWrapper.style.display = "block";
    }
    quizContainer.style.display = "block";
    quizHeader.style.display = "flex";
  } else if (screen === 'result'){
    resultContainer.style.display = "block";
  } else if (screen === 'leaderboard') {
    leaderboardContainer.style.display = "block";
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
  setSelectedCategoryID(null);
}

// Group categories helper
function groupCategories(categories) {
    const groups = {};
    
    categories.forEach(cat => {
        if (cat.name.includes(': ')) {
            const [main, sub] = cat.name.split(': ');
            if (!groups[main]) {
                groups[main] = {
                    id: null,
                    name: main,
                    subcategories: []
                };
            }
            groups[main].subcategories.push({ id: cat.id, name: sub });
        } else {
            groups[cat.name] = {
                id: cat.id,
                name: cat.name,
                subcategories: []
            };
        }
    });
    
    return Object.values(groups);
}

export function populateCategories(categories) {
    categoryGrid.innerHTML = "";
    const grouped = groupCategories(categories);

    grouped.forEach(group => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.textContent = group.name;

        if (group.subcategories.length > 0) {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = group.subcategories.length;
            card.appendChild(badge);

            card.addEventListener('click', () => {
                openSubcategoryModal(group.name, group.subcategories);
            });
        } else {
            card.dataset.id = group.id;
            card.addEventListener('click', () => {
                setSelectedCategoryID(group.id, group.name);
            
            });
        }
        categoryGrid.appendChild(card);
    });
}

function openSubcategoryModal(title, subcategories) {
    modalTitle.textContent = title;
    subcategoryList.innerHTML = "";
    
    subcategories.forEach(sub => {
        const btn = document.createElement('button');
        btn.className = 'subcategory-btn';
        btn.textContent = sub.name;
        btn.dataset.id = sub.id;
        
        btn.addEventListener('click', () => {
            const fullName = `${title}: ${sub.name}`;
            setSelectedCategoryID(sub.id, fullName);
            //modal will close after 3 sec
            setTimeout(closeModal,300);
        });
        
        subcategoryList.appendChild(btn);
    });
    
    categoryModal.style.display = "flex";
}

function closeModal() {
    categoryModal.style.display = "none";
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === categoryModal) {
        closeModal();
    }
});
