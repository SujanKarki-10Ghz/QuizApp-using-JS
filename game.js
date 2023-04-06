// Dom
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressTextEl = document.getElementById("progressText");
const scoreCounterEl = document.getElementById("score");
const progressBarFull = document.getElementById("progress-bar-full");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

// console.log(choices);

// Variable declaration
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

//API fetch
fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    // console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
        // console.log(choice);
      });

      return formattedQuestion;
    });

    // questions = loadedQuestion;
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

//Constants
const Correct_Bonus = 10;
const Max_Questions = 3;

//Game start function
startGame = () => {
  //resets
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; //=>spread operator
  console.log(availableQuestions);
  getNewQuestions();

  //As questions load, hidden class is removed from game and hidden class is added to loader

  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

//getting new Questions function
getNewQuestions = () => {
  if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    localStorage.setItem("mostRecentScore", score);
    //goto end page
    return window.location.assign("/end.html");
  }
  questionCounter++;

  progressTextEl.innerText = ` Question: ${questionCounter}/${Max_Questions}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / Max_Questions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    //send choices to innerText
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    console.log(e.target);
    if (!acceptingAnswers) {
      return;
    }
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    //check if the asnwer is correct or not
    //ternary
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "Correct" : "Incorrect";
    console.log(classToApply);

    //if answer is correct increment the score by Correct_Bonus constant
    if (classToApply === "Correct") {
      //calling the function incrementScore
      incrementScore(Correct_Bonus);
    }
    //get the clicked container (whole element) and add class to that element
    selectedChoice.parentElement.classList.add(classToApply);
    //as it will add and remove very quickly, we do a timeout
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestions();
    }, 1000);
  });
});

//function to increment the score
incrementScore = (num) => {
  score += num;
  scoreCounterEl.innerText = score;
};

// startGame();
