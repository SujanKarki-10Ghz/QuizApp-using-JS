// Dom
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterEl = document.getElementById('questionCounter');
const scoreCounterEl = document.getElementById('score');    
// console.log(choices);

// Variable declaration
let currentQuestion ={};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1:"<script>",
        choice2:"<javaScript>",
        choice3:"<js>",
        choice4:"<scripting>",
        answer:1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1:"<script href='xxx.js'>",
        choice2:"<script name = 'xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4:"<script file = 'xxx.js'>",
        answer:3,
    },
    {
        question: "how do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    }
];


//Constants

const Correct_Bonus = 10;
const Max_Questions = 3;

startGame = ()=>{
    //resets
    questionCounter = 0;
    score=0;
    availableQuestions = [...questions]; //=>spread operator
    console.log(availableQuestions);
    getNewQuestions();
};
getNewQuestions = ()=>{
    if(availableQuestions.length === 0 || questionCounter >= Max_Questions){
        //goto end page
        return window.location.assign('/end.html');
    }
   questionCounter++;

   questionCounterEl.innerText = `${questionCounter}/${Max_Questions}`
   
   const questionIndex = Math.floor(Math.random()* availableQuestions.length);
   currentQuestion = availableQuestions[questionIndex];
   question.innerText = currentQuestion.question; 

   choices.forEach(choice=>{
    const number = choice.dataset['number'];
    //send choices to innerText
    choice.innerText = currentQuestion['choice' + number];
   })

   availableQuestions.splice(questionIndex, 1);
   acceptingAnswers =true;

}
choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        console.log(e.target);
        if(!acceptingAnswers){
            return ;
        }
        acceptingAnswers =false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        //check if the asnwer is correct or not
        //ternary
        const classToApply = selectedAnswer == currentQuestion.answer ? "Correct" : "Incorrect";
        console.log(classToApply);

        //if answer is correct increment the score by Correct_Bonus constant
        if(classToApply === 'Correct'){
            //calling the function incrementScore
            incrementScore(Correct_Bonus);
        }
        //get the clicked container (whole element) and add class to that element
        selectedChoice.parentElement.classList.add(classToApply);
        //as it will add and remove very quickly, we do a timeout
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        },1000); 
    })
})

//function to increment the score
incrementScore = (num)=>{
    score+=num;
    scoreCounterEl.innerText =score;
}
startGame();

