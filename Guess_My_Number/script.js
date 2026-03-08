const questions = [
  //at 0th position
  {
    question: "What is Virat Kohli’s highest score in ODI cricket ?",
    answers: [
      { text: 123, correct: false },
      { text: 183, correct: true },
      { text: 144, correct: false },
      { text: 156, correct: false },
    ],
  },
  //1
  {
    question:
      "Which Australian ground is known for Kohli’s famous 2014 Test performances?",
    answers: [
      { text: "MCG", correct: false },
      { text: "SCG", correct: false },
      { text: "Perth Stadium", correct: false },
      { text: "Adelaide Oval", correct: true },
    ],
  },
  //2
  {
    question: "How many centuries did Kohli score in the 2023 ODI World Cup?",
    answers: [
      { text: 2, correct: false },
      { text: 3, correct: true },
      { text: 4, correct: false },
      { text: 5, correct: false },
    ],
  },
  //3
  {
    question: "Virat Kohli broke whose record for most ODI centuries in 2023?",
    answers: [
      { text: "Ricky Ponting", correct: false },
      { text: "Brian Lara", correct: false },
      { text: "Jacques Kallis", correct: false },
      { text: "Sachin Tendulkar", correct: true },
    ],
  },
  //4
  {
    question: "What is the name of Virat Kohli’s fitness and lifestyle brand?",
    answers: [
      { text: "VK18", correct: false },
      { text: "Fit18", correct: false },
      { text: "One8", correct: true },
      { text: "PowerPlayr", correct: false },
    ],
  },
  //5
  {
    question: "Who is Virat Kohli married to?",
    answers: [
      { text: "Deepika Padukone", correct: false },
      { text: "Anushka Sharma", correct: true },
      { text: "Alia Bhatt", correct: false },
      { text: "Katrina Kaif", correct: false },
    ],
  },
  //6
  {
    question: "Which shot is considered Virat Kohli’s signature shot?",
    answers: [
      { text: "Pull Shot", correct: false },
      { text: "Sweep Shot", correct: false },
      { text: "Cover Drive", correct: true },
      { text: "Reverse Sweep", correct: false },
    ],
  },
  //7
  {
    question:
      "Who was the coach of the Indian U-19 team when Kohli won the World Cup in 2008?",
    answers: [
      { text: "Rahul Dravid", correct: false },
      { text: "Dav Whatmore", correct: true },
      { text: "Gary Kirsten", correct: false },
      { text: "Anil Kumble", correct: false },
    ],
  },
  //8
  {
    question:
      "Against which team did Virat Kohli score his first international century?",
    answers: [
      { text: "Australia", correct: false },
      { text: "Sri Lanka", correct: true },
      { text: "Pakistan", correct: false },
      { text: "England", correct: false },
    ],
  },
  //9
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

const quest = document.querySelector(".question");
const answerButtons = document.querySelector(".answers-button");
const nextBtn = document.querySelector(".nextBtn");


let curIndex=0;
function showQuestion() {
  let curIndex=0;
  const{question,answers}=questions[curIndex];

  quest.textContent =question;
}