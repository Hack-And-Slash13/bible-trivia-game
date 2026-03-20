let questions = [];
let currentQuestionIndex = 0;
let score = 0

const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

async function loadQuestions() {
  const response = await fetch("questions.json");
  questions = await response.json();
  questions = shuffleArray(questions);
  showQuestion();
}

loadQuestions();

function showQuestion() {
  answerBtns.forEach(btn => {
  btn.classList.remove("correct", "wrong");
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
    score ++
  } else {
    feedbackEl.textContent = "Wrong!";
    feedbackEl.classList.add("wrong-feedback");
    feedbackEl.classList.remove("correct-feedback");
  }
}

nextBtn.onclick = () => {
  nextBtn.textContent = "Next Question➡️";
  feedbackEl.textContent = "";
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    feedbackEl.textContent = `Game over. Your score: ${score}`;
    feedbackEl.classList.add("correct-feedback");
    feedbackEl.classList.remove("wrong-feedback");
    currentQuestionIndex = 0;
    score = 0;
    questions = shuffleArray(questions);
    nextBtn.textContent = "play again";
  }
  showQuestion();
};

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
loadQuestions();
