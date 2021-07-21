function load_home() {
  document.getElementById("wrapper").innerHTML = "";
  document.getElementById("wrapper").innerHTML =
    '<object type="text/html" data="game.html" ></object>';
}

document.getElementById("play-btn").onclick = load_home;

fetch(
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
)
  .then((res) => res.json())
  .then((json) => {
    let arr = json.results;
    let questions = [];
    for (let i = 0; i < arr.length; i++) {
      questions.push(arr[i].question);
    }
    let corectAnswers = [];
    for (let i = 0; i < arr.length; i++) {
      corectAnswers.push(arr[i].correct_answer);
    }
    let incorrectAnswers = [];
    for (let i = 0; i < arr.length; i++) {
      incorrectAnswers.push(arr[i].incorrect_answers);
    }

    class quizQuestions {
      constructor(question, correctAnswer, incorrectAnswers) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.incorrectAnswers = incorrectAnswers;
      }
    }
    let quiz = [];
    for (let i = 0; i < arr.length; i++) {
      quiz.push(
        new quizQuestions(questions[i], corectAnswers[i], incorrectAnswers[i])
      );
    }
    console.log(quiz[0].question);
})
.catch((err) => {
    console.log(err);
});