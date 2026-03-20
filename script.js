let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("next_button");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

async function loadQuestions() {
  const response = await fetch("./questions.json");
  questions = await response.json();
  questions = shuffleArray(questions);
  showQuestion();
}

function showQuestion() {
  answerBtns.forEach(btn => {
  btn.classList.remove("correct", "wrong");
  btn.style.display = "flex";
  });
  feedbackEl.textContent = "";
  feedbackEl.classList.remove("correct-feedback", "wrong-feedback");
  const q = questions[currentQuestionIndex];
  answerBtns.forEach(btn => btn.disabled = false);
  questionEl.textContent = q.question;
  scoreEl.textContent = `Score: ${score}`;

  let answers = [
    q.correct_answer,
    q.incorrect_answer1,
    q.incorrect_answer2,
    q.incorrect_answer3
  ];

  answers = shuffleArray(answers);

  answerBtns.forEach((btn, i) => {
    btn.textContent = answers[i];
    btn.onclick = () => checkAnswer(btn.textContent, q.correct_answer);
  });
}

function checkAnswer(selected, correct) {
  answerBtns.forEach(btn => btn.disabled = true);
  answerBtns.forEach(btn => {
  if (btn.textContent === correct) {
    btn.classList.add("correct");
  } else if (btn.textContent === selected) {
    btn.classList.add("wrong");
  }
});
  if (selected === correct) {
    feedbackEl.textContent = "Correct!";
    feedbackEl.classList.add("correct-feedback");
    feedbackEl.classList.remove("wrong-feedback");
    score ++;
  } else {
    feedbackEl.textContent = "Wrong!";
    feedbackEl.classList.add("wrong-feedback");
    feedbackEl.classList.remove("correct-feedback");
  }
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length-1) {
  nextBtn.textContent = "Submit";
} else {
  nextBtn.textContent = "Next Question➡️";
}
  if (currentQuestionIndex >= questions.length) {
    answerBtns.forEach((btn, i) => {
      btn.style.display = "none";
    })
    feedbackEl.textContent = "";
    questionEl.textContent = `Game over. Your score: ${score}`;
    answerBtns.forEach(btn => btn.disabled = true);
    currentQuestionIndex = 0;
    score = 0;
    questions = shuffleArray(questions);
    nextBtn.textContent = "Play Again";
    scoreEl.textContent = `Score: ${score}`;
    return;
  }

  feedbackEl.textContent = "";
  showQuestion();
};

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
loadQuestions();
