const questions = [
{
question:"¿Cuál de estos dispositivos permite ingresar información al computador?",
answers:["Monitor","Impresora","Teclado","Parlantes"],
correct:2
},
{
question:"¿Cuál es un periférico de salida?",
answers:["Mouse","Escáner","Monitor","Micrófono"],
correct:2
},
{
question:"¿Qué tipo de periférico es el mouse?",
answers:["Entrada","Salida","Procesamiento","Almacenamiento"],
correct:0
},
{
question:"¿Qué tipo de periférico es la impresora?",
answers:["Entrada","Salida","Procesamiento","Ninguno"],
correct:1
},
{
question:"¿Cuál captura sonido para enviarlo al computador?",
answers:["Parlantes","Monitor","Micrófono","Impresora"],
correct:2
},
{
question:"¿Qué dispositivo digitaliza documentos?",
answers:["Escáner","Monitor","Parlantes","Mouse"],
correct:0
},
{
question:"¿Cuál permite visualizar la información?",
answers:["Teclado","Monitor","Micrófono","Escáner"],
correct:1
},
{
question:"¿Qué periférico se utiliza para grabar video?",
answers:["Parlantes","Monitor","Cámara web","Impresora"],
correct:2
},
{
question:"Los parlantes son periféricos de:",
answers:["Entrada","Salida","Almacenamiento","Procesamiento"],
correct:1
},
{
question:"¿Cuál afirmación es correcta?",
answers:[
"El teclado es de salida",
"La impresora es de entrada",
"El monitor es de entrada",
"El micrófono es de entrada"
],
correct:3
}
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const counterEl = document.getElementById("question-counter");
const finalScoreEl = document.getElementById("final-score");
const timerBar = document.getElementById("timer-bar");

document.getElementById("start-btn")
.addEventListener("click", startGame);

function startGame(){
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
}

function loadQuestion(){

    clearInterval(timer);

    timeLeft = 15;
    timerBar.style.width = "100%";

    startTimer();

    const q = questions[currentQuestion];

    counterEl.textContent =
    `Pregunta ${currentQuestion+1}/${questions.length}`;

    questionEl.textContent = q.question;

    answersEl.innerHTML = "";

    q.answers.forEach((answer,index)=>{

        const btn = document.createElement("button");

        btn.classList.add("answer-btn");

        btn.textContent = answer;

        btn.onclick = ()=>selectAnswer(index);

        answersEl.appendChild(btn);

    });
}

function startTimer(){

    timer = setInterval(()=>{

        timeLeft--;

        timerBar.style.width =
        (timeLeft/15)*100 + "%";

        if(timeLeft <= 0){

            clearInterval(timer);

            nextQuestion();
        }

    },1000);

}

function selectAnswer(index){

    clearInterval(timer);

    const correct =
    questions[currentQuestion].correct;

    const buttons =
    document.querySelectorAll(".answer-btn");

    buttons.forEach((btn,i)=>{

        if(i===correct)
            btn.classList.add("correct");

        if(i===index && i!==correct)
            btn.classList.add("wrong");

        btn.disabled = true;

    });

    if(index===correct){

        score += 100;

        scoreEl.textContent =
        `Puntos: ${score}`;
    }

    setTimeout(nextQuestion,1500);
}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();

    }else{

        finishGame();

    }
}

function finishGame(){

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    finalScoreEl.textContent =
    `Tu puntuación final fue: ${score} puntos`;
}
