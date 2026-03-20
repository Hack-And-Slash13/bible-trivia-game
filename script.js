let questions = [];
let currentQuestionIndex = 0;

const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("next-btn");

async function loadQuestions() {
  const response = await fetch("questions.json");
  questions = await response.json();
  questions = shuffleArray(questions);
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;

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
  if (selected === correct) {
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    alert("Game over!");
    currentQuestionIndex = 0;
    questions = shuffleArray(questions);
  }
  showQuestion();
};

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
loadQuestions();
