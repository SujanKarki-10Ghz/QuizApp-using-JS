const highScoreList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScore")) || [];
console.log(highScores);

highScoreList.innerHTML = highScores.map((highScore) => {
  //map gives a new array of items and doesn't change the original array
  return `<li class="high-score"> ${highScore.name} ${highScore.score}</li>`;
});
