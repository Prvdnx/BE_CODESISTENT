// dom elements
const [startScreen, quizScreen, resultScreen, startButton, questionText, answersContainer, currentQuestionSpan, totalQuestionsSpan, scoreSpan, finalScoreSpan, maxScoreSpan, resultMessage, restartButton, progressBar, themeToggle] =
  ['start-screen', 'quiz-screen', 'result-screen', 'start-btn', 'question-text', 'answers-container', 'current-question', 'total-questions', 'score', 'final-score', 'max-score', 'result-message', 'restart-btn', 'progress', 'theme-toggle']
    .map(id => document.getElementById(id));

// quiz questions data
const quizQuestions = [
  { question: "What does HTML stand for?", answers: [{ text: "Hyper Text Markup Language", correct: true }, { text: "High Tech Modern Language", correct: false }, { text: "Home Tool Markup Language", correct: false }, { text: "Hyperlinks and Text Markup Language", correct: false }] },
  { question: "What is the smallest unit of life?", answers: [{ text: "Atom", correct: false }, { text: "Molecule", correct: false }, { text: "Cell", correct: true }, { text: "Organ", correct: false }] },
  { question: "Which company created JavaScript?", answers: [{ text: "Microsoft", correct: false }, { text: "Netscape", correct: true }, { text: "Google", correct: false }, { text: "Apple", correct: false }] },
  { question: "How many planets are in our solar system?", answers: [{ text: "7", correct: false }, { text: "8", correct: true }, { text: "9", correct: false }, { text: "10", correct: false }] },
  { question: "What does CSS stand for?", answers: [{ text: "Computer Style Sheets", correct: false }, { text: "Cascading Style Sheets", correct: true }, { text: "Creative Style System", correct: false }, { text: "Colorful Style Sheets", correct: false }] },
  { question: "What is the speed of light?", answers: [{ text: "299,792 km/s", correct: true }, { text: "150,000 km/s", correct: false }, { text: "500,000 km/s", correct: false }, { text: "1,000,000 km/s", correct: false }] },
  { question: "Which is NOT a JavaScript framework?", answers: [{ text: "React", correct: false }, { text: "Django", correct: true }, { text: "Vue", correct: false }, { text: "Angular", correct: false }] },
  { question: "What is the chemical symbol for water?", answers: [{ text: "H2O", correct: true }, { text: "CO2", correct: false }, { text: "O2", correct: false }, { text: "NaCl", correct: false }] },
  { question: "What year was GitHub founded?", answers: [{ text: "2005", correct: false }, { text: "2008", correct: true }, { text: "2010", correct: false }, { text: "2012", correct: false }] },
  { question: "Who developed the theory of relativity?", answers: [{ text: "Isaac Newton", correct: false }, { text: "Albert Einstein", correct: true }, { text: "Stephen Hawking", correct: false }, { text: "Galileo Galilei", correct: false }] }
];

// quiz state variables
let currentQuestionIndex = 0, score = 0, answersDisabled = false;

// Initialize display values
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// theme toggle functionality
const setTheme = (isDark) => {
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// load saved theme or default to light
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'dark');

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
themeToggle.addEventListener("click", () => {
  setTheme(!document.body.classList.contains('dark-mode'));
});

// start the quiz and reset state
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}

// display the current question and answers
function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  progressBar.style.width = ((currentQuestionIndex / quizQuestions.length) * 100) + "%";
  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  // create answer buttons dynamically
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

// handle answer selection
function selectAnswer(event) {
  if (answersDisabled) return; // prevent multiple clicks
  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // highlight correct answer and mark selected answer
  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) scoreSpan.textContent = ++score; // update score if correct

  // move to next question after delay
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

// display final results
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;
  const percentage = (score / quizQuestions.length) * 100;

  // select message based on percentage score
  const messages = [
    [100, "Perfect! You're a genius!"],
    [80, "Great job! You know your stuff!"],
    [60, "Good effort! Keep learning!"],
    [40, "Not bad! Try again to improve!"],
    [0, "Keep studying! You'll get better!"]
  ];
  resultMessage.textContent = messages.find(([limit]) => percentage >= limit)[1];
}

// restart the quiz
function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
