




// Start quiz
beginBtn.addEventListener("click", async () => {
    const categoryId = selectCategory.value;
    if (!categoryId) {
        alert("Please select a category");
        return;
    }

    try {
        const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${categoryId}&type=multiple`);
        const data = await res.json();

        questions = data.results.map(q => {
            const options = [...q.incorrect_answers];
            options.splice(Math.floor(Math.random() * 4), 0, q.correct_answer); // randomize correct answer position
            return {
                question: q.question,
                options: options,
                correct: q.correct_answer
            };
        });

        startScreen.style.display = "none";
        quizContainer.style.display = "block";
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    } catch (err) {
        console.error(err);
    }
});

// Show question
function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionEl.innerHTML = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(option, button));
        optionsEl.appendChild(button);
    });

    nextBtn.style.display = "none";
}
// Handle answer selection
function selectAnswer(selected, button) {
    const q = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach(btn => btn.disabled = true);

    if (selected === q.correct) {
        score++;
        button.classList.add("correct");
    } else {
        button.classList.add("incorrect");
        // highlight correct answer
        optionButtons.forEach(btn => {
            if (btn.innerHTML === q.correct) {
                btn.classList.add("correct");
            }
        });
    }

    nextBtn.style.display = "inline-block";
}

// Next question
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Show result
function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreEl.innerText = `${score} / ${questions.length}`;
}

// Restart quiz
restartBtn.addEventListener("click", () => {
    resultContainer.style.display = "none";
    startScreen.style.display = "block";
    selectCategory.value = "";
});
