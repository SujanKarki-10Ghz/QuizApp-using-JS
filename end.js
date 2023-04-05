const userName = document.getElementById("userName");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

//CONSTANTS
const MAX_HIGHSCORE = 5;

console.log(highScore);
finalScore.innerText = mostRecentScore;

userName.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !userName.value;
});

saveHighScore = (e) => {
  // console.log('clicked');
  e.preventDefault();
  const score = {
    score: Math.floor(Math.random() * 100),
    name: userName.value,
  };
  highScore.push(score);
  highScore.sort((a, b) => b.score - a.score); //=> bydefault it sorts in alphabetic order. for numeric value => we use fxn
  //sorting in descending order
  highScore.splice(5); //splice the extra ones

  localStorage.setItem("highScore", JSON.stringify(highScore));
  window.location.assign("/");
  //   console.log(highScore);
};
