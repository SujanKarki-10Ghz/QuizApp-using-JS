const userName = document.getElementById("userName");
const saveScoreBtn =document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');

const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

userName.addEventListener('keyup', ()=>{
    console.log(userName.value);
    saveScoreBtn.disabled = !userName.value;
})


saveHighScore = (e)=>{
    
}