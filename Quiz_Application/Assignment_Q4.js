const questions = [
  {
    question: "What is Virat Kohli’s highest score in ODI cricket ?",
    answers: [
      { text: 123, correct: false },
      { text: 183, correct: true },
      { text: 144, correct: false },
      { text: 156, correct: false },
    ],
  },
  {
    question: "Which Australian ground is known for Kohli’s famous 2014 Test performances?",
    answers: [
      { text: "MCG", correct: false },
      { text: "SCG", correct: false },
      { text: "Perth Stadium", correct: false },
      { text: "Adelaide Oval", correct: true },
    ],
  },
  {
    question: "How many centuries did Kohli score in the 2023 ODI World Cup?",
    answers: [
      { text: 2, correct: false },
      { text: 3, correct: true },
      { text: 4, correct: false },
      { text: 5, correct: false },
    ],
  },
  {
    question: "Virat Kohli broke whose record for most ODI centuries in 2023?",
    answers: [
      { text: "Ricky Ponting", correct: false },
      { text: "Brian Lara", correct: false },
      { text: "Jacques Kallis", correct: false },
      { text: "Sachin Tendulkar", correct: true },
    ],
  },
  {
    question: "What is the name of Virat Kohli’s fitness and lifestyle brand?",
    answers: [
      { text: "VK18", correct: false },
      { text: "Fit18", correct: false },
      { text: "One8", correct: true },
      { text: "PowerPlayr", correct: false },
    ],
  },
  {
    question: "Who is Virat Kohli married to?",
    answers: [
      { text: "Deepika Padukone", correct: false },
      { text: "Anushka Sharma", correct: true },
      { text: "Alia Bhatt", correct: false },
      { text: "Katrina Kaif", correct: false },
    ],
  },
  {
    question: "Which shot is considered Virat Kohli’s signature shot?",
    answers: [
      { text: "Pull Shot", correct: false },
      { text: "Sweep Shot", correct: false },
      { text: "Cover Drive", correct: true },
      { text: "Reverse Sweep", correct: false },
    ],
  },
  {
    question: "Who was the coach of the Indian U-19 team when Kohli won the World Cup in 2008?",
    answers: [
      { text: "Rahul Dravid", correct: false },
      { text: "Dav Whatmore", correct: true },
      { text: "Gary Kirsten", correct: false },
      { text: "Anil Kumble", correct: false },
    ],
  },
  {
    question: "Against which team did Virat Kohli score his first international century?",
    answers: [
      { text: "Australia", correct: false },
      { text: "Sri Lanka", correct: true },
      { text: "Pakistan", correct: false },
      { text: "England", correct: false },
    ],
  },
  {
    question: "Which IPL team is Virat Kohli associated with?",
    answers: [
      { text: "Royal Challengers Bangalore", correct: true },
      { text: "Mumbai Indians", correct: false },
      { text: "Chennai Super Kings", correct: false },
      { text: "Delhi Capitals", correct: false },
    ],
  },
];

const questionElement = document.querySelector(".question");
const answerButtons = document.querySelector(".answers-button");
const nextBtn = document.querySelector(".nextBtn");
const scoreDisplay = document.querySelector("h4:first-child");
const progressDisplay = document.querySelector("h4:last-child");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next Question";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Update Score 
  scoreDisplay.innerHTML = `Score: ${score}`;
  progressDisplay.innerHTML = `Question-${questionNo}/${questions.length}`;


  //adding all the options to the question from  array of object
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn", "border", "py-4", "flex", "justify-center", "rounded-xl", "border-blue-400", "hover:bg-gray-50", "cursor-pointer", "w-full");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    scoreDisplay.innerHTML = `Score: ${score}`;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
    button.classList.remove("hover:bg-gray-50", "cursor-pointer");
  });

  nextBtn.style.display = "flex";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "flex";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();