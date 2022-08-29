var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");


var quizQuestions = [{
    question: "How many members of BTS are there?",
    choiceA: "1. two",
    choiceB: "2. four",
    choiceC: "3. seventeen",
    choiceD: "4. seven",
    correctAnswer: "d"},
  {
    question: "Who is the leader of BTS?",
    choiceA: "1. Kim Namjoon",
    choiceB: "2. Jung Hoseok",
    choiceC: "3. Park Jimin ",
    choiceD: "4. Kim Taehyung",
    correctAnswer: "a"},
   {
    question: "Who is the youngest in BTS?",
    choiceA: "1. Park Jimin",
    choiceB: "2. Min Yoongi",
    choiceC: "3. Kim Seokjin",
    choiceD: "4. Jeon Jungkook",
    correctAnswer: "d"},
    {
    question: "Who is the oldest in BTS?",
    choiceA: "1. Jeon Jungkook",
    choiceB: "2. Kim Seokjin",
    choiceC: "3. Min Yoongi",
    choiceD: "4. Jung Hoseok",
    correctAnswer: "b"},
    {
    question: "When did BTS come out with the song 'Dope'?",
    choiceA: "1. 2015",
    choiceB: "2. 2022",
    choiceC: "3. 2000",
    choiceD: "4. 2014",
    correctAnswer: "a"},  
    {
    question: "Who are the three main rappers of the group?",
    choiceA: "1. Jung Hoseok, Kim Seokjin, Park Jimin",
    choiceB: "2. Park Jimin, Kim Namjoon, Min Yoongi",
    choiceC: "3. Kim Namjoon, Jung Hoseok, Min Yoongi",
    choiceD: "4. Kim Taehyung, Jeon Jungkook, Kim Seokjin",
    correctAnswer: "c"},
    {
    question: "Are all members of BTS South Korean?",
    choiceA: "1. Maybe",
    choiceB: "2. Yes",
    choiceC: "3. Park Jimin is not South Korean",
    choiceD: "4. None of them are South Korean",
    correctAnswer: "b"},
    {
    question: "When did BTS first debut?",
    choiceA: "1. 2022",
    choiceB: "2. 2009",
    choiceC: "3. 2017",
    choiceD: "4. 2013",
    correctAnswer: "d"},
        
    
    ];
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 75;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};


function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time:  " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "Your final score is " + score + ". ";
}


submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);
