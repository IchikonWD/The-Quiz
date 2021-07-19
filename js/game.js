const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = [];
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which of the following is not a fruit?",
    choice1: "Banana",
    choice2: "Apple",
    choice3: "Orange",
    choice4: "Strawberry",
    correctAnswer: 1,
  },
  {
    question: "Como me llamo?",
    choice1: "Ezequiel",
    choice2: "Gonzalo",
    choice3: "Leonardo",
    choice4: "Eustaquio",
    correctAnswer: 1,
  },
  {
    question: "Which of the following is not a fruit?",
    choice1: "Bananar",
    choice2: "Appler",
    choice3: "Oranger",
    choice4: "Strawberryr",
    correctAnswer: 3,
  },
  {
    question: "Which of the following is not a fruit?",
    choice1: "Bananag",
    choice2: "Appleg",
    choice3: "Orangeg",
    choice4: "Strawberryg",
    correctAnswer: 2,
  },
  {
    question: "Which of the following is not a fruit?",
    choice1: "Bananaf",
    choice2: "Applef",
    choice3: "Orangef",
    choice4: "Strawberryf",
    correctAnswer: 1,
  }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [ ...questions ];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
   
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter * 100) / MAX_QUESTIONS}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', event => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply =
      selectedAnswer == currentQuestion.correctAnswer
        ? "correct"
        : "incorrect";

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
