// Selectors for elements
const mathContainer = document.getElementById("mathContainer");
const historyContainer = document.getElementById("historyContainer");
const quizContainer = document.getElementById("quizContainer");
const mathQuestionElement = document.getElementById("mathQuestion");
const historyQuestionElement = document.getElementById("historyQuestion");
const mathAnswerButtons = document.getElementById("mathAnswerButtons");
const historyAnswerButtons = document.getElementById("historyAnswerButtons");
const nextButtonMath = document.getElementById("nextBtnMath");
const nextButtonHistory = document.getElementById("nextBtnHistory");
const restartButtonMath = document.getElementById("restartBtnMath");
const restartButtonHistory = document.getElementById("restartBtnHistory");
const resultDiv = document.getElementById("result");
const mathBtn = document.getElementById("mathBtn");
const historyBtn = document.getElementById("historyBtn");

let shuffledQuestionsMath, currentQuestionIndexMath, scoreMath;
let shuffledQuestionsHistory, currentQuestionIndexHistory, scoreHistory;

const mathQuestions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
      { text: "84", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "Which is PI?",
    answers: [
      { text: "4.14", correct: false },
      { text: "2.2", correct: false },
      { text: "3.14", correct: true },
      { text: "1", correct: false },
    ],
  },
  {
    question: "What is 6 + 3?",
    answers: [
      { text: "9", correct: true },
      { text: "22", correct: false },
      { text: "84", correct: false },
      { text: "1", correct: false },
    ],
  },
  {
    question: "If x + 5 = 12, what is the value of x?",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: false },
      { text: "84", correct: false },
      { text: "7", correct: true },
    ],
  },
  {
    question: "How many degrees are in a right angle?",
    answers: [
      { text: "4°", correct: false },
      { text: "90°", correct: true },
      { text: "84°", correct: false },
      { text: "1°", correct: false },
    ],
  },
];

const historyQuestions = [
  {
    question: "Who was the first President of the United States?",
    answers: [
      { text: "George Washington", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "Abraham Lincoln", correct: false },
      { text: "John Adams", correct: false },
    ],
  },
  {
    question: "In which year did World War II end?",
    answers: [
      { text: "1939", correct: false },
      { text: "1942", correct: false },
      { text: "1945", correct: true },
      { text: "1955", correct: false },
    ],
  },
  {
    question: "What ancient civilization built the pyramids in Egypt?",
    answers: [
      { text: "Egyptians", correct: true },
      { text: "Babylonians", correct: false },
      { text: "Romans", correct: false },
      { text: "Greeks", correct: false },
    ],
  },
  {
    question: "Who discovered America in 1492?",
    answers: [
      { text: "Ferdinand Magellan", correct: false },
      { text: "Leif Erikson", correct: false },
      { text: "Marco Polo", correct: false },
      { text: "Christopher Columbus", correct: true },
    ],
  },
  {
    question:
      "What was the name of the ship that carried the Pilgrims to America in 1620?",
    answers: [
      { text: "Santa Maria", correct: false },
      { text: "Mayflower", correct: true },
      { text: "Titanic", correct: false },
      { text: "HMS Beagle", correct: false },
    ],
  },
];

// Event listeners for theme selection
mathBtn.addEventListener("click", startMathQuiz);
historyBtn.addEventListener("click", startHistoryQuiz);

// Event listeners for restart buttons
restartButtonMath.addEventListener("click", startMathQuiz);
restartButtonHistory.addEventListener("click", startHistoryQuiz);

function startMathQuiz() {
  scoreMath = 0;
  shuffledQuestionsMath = mathQuestions.sort(() => Math.random() - 0.5);
  currentQuestionIndexMath = 0;
  quizContainer.style.display = "none";
  mathContainer.classList.remove("hide");
  historyContainer.classList.add("hide");
  nextButtonMath.classList.remove("hide");
  restartButtonMath.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestionMath();
}

function startHistoryQuiz() {
  scoreHistory = 0;
  shuffledQuestionsHistory = historyQuestions.sort(() => Math.random() - 0.5);
  currentQuestionIndexHistory = 0;
  quizContainer.style.display = "none";
  historyContainer.classList.remove("hide");
  mathContainer.classList.add("hide");
  nextButtonHistory.classList.remove("hide");
  restartButtonHistory.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestionHistory();
}

function setNextQuestionMath() {
  resetState();
  showQuestion(
    shuffledQuestionsMath[currentQuestionIndexMath],
    mathQuestionElement,
    mathAnswerButtons,
    "math"
  );
}

function setNextQuestionHistory() {
  resetState();
  showQuestion(
    shuffledQuestionsHistory[currentQuestionIndexHistory],
    historyQuestionElement,
    historyAnswerButtons,
    "history"
  );
}

function showQuestion(question, questionElement, answerButtonsElement, type) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = createAnswerInput(answer, index, type);
    answerButtonsElement.appendChild(inputGroup);
  });
}

function createAnswerInput(answer, index, type) {
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("input-group");

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.id = `${type}Answer${index}`;
  radio.name = `${type}Answer`;
  radio.value = index;

  const label = document.createElement("label");
  label.htmlFor = `${type}Answer${index}`;
  label.innerText = answer.text;

  inputGroup.appendChild(radio);
  inputGroup.appendChild(label);
  return inputGroup;
}

function resetState() {
  mathAnswerButtons.innerHTML = "";
  historyAnswerButtons.innerHTML = "";
}

function handleAnswerSelection(type) {
  const selectedRadio = document.querySelector(
    `input[name='${type}Answer']:checked`
  );
  if (!selectedRadio) {
    alert("Please select an answer.");
    return false;
  }
  return parseInt(selectedRadio.value);
}

function handleNextQuestion(type) {
  let questions, currentIndex, score, setNextQuestion, endQuiz;
  if (type === "math") {
    questions = shuffledQuestionsMath;
    currentIndex = currentQuestionIndexMath++;
    score = scoreMath;
    setNextQuestion = setNextQuestionMath;
    endQuiz = endMathQuiz;
  } else {
    questions = shuffledQuestionsHistory;
    currentIndex = currentQuestionIndexHistory++;
    score = scoreHistory;
    setNextQuestion = setNextQuestionHistory;
    endQuiz = endHistoryQuiz;
  }

  const selectedAnswerIndex = handleAnswerSelection(type);
  if (selectedAnswerIndex === false) return;

  const currentQuestion = questions[currentIndex];
  if (currentQuestion.answers[selectedAnswerIndex].correct) {
    if (type === "math") scoreMath++;
    else scoreHistory++;
  }

  if (currentIndex < questions.length - 1) {
    setNextQuestion();
  } else {
    endQuiz();
  }
}

function endMathQuiz() {
  nextButtonMath.classList.add("hide");
  restartButtonMath.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${scoreMath} / ${shuffledQuestionsMath.length}`;
}

function endHistoryQuiz() {
  nextButtonHistory.classList.add("hide");
  restartButtonHistory.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${scoreHistory} / ${shuffledQuestionsHistory.length}`;
}

// Next button listeners
nextButtonMath.addEventListener("click", () => handleNextQuestion("math"));
nextButtonHistory.addEventListener("click", () =>
  handleNextQuestion("history")
);
