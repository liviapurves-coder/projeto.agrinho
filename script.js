// Banco de dados de perguntas do Quiz
const quizData = [
    {
        question: "Qual atividade doméstica consome mais água de forma direta se não controlada?",
        options: [
            "Lavar as mãos na torneira.",
            "Deixar o chuveiro aberto por longos banhos.",
            "Utilizar o filtro de água para beber.",
            "Regar uma planta pequena com regador."
        ],
        correct: 1,
        explanation: "O chuveiro é um dos maiores vilões do consumo. Um banho de 15 minutos pode gastar mais de 135 litros de água!"
    },
    {
        question: "Qual a melhor alternativa ecológica para limpar a calçada?",
        options: [
            "Usar a mangueira em alta pressão diária.",
            "Varrer com vassoura e reutilizar água da máquina de lavar.",
            "Jogar baldes de água potável limpa.",
            "Deixar a torneira correndo para empurrar as folhas."
        ],
        correct: 1,
        explanation: "Usar a vassoura remove a sujeira grossa e a água de reuso da lavadora evita o desperdício de água potável."
    },
    {
        question: "Quanto da água do planeta Terra está disponível e acessível para o consumo humano?",
        options: [
            "Cerca de 70%",
            "Aproximadamente 50%",
            "Menos de 1%",
            "Toda a água existente"
        ],
        correct: 2,
        explanation: "A maior parte da água do planeta é salgada ou está congelada em geleiras. Apenas menos de 1% está disponível em rios e lagos acessíveis."
    }
];

// Estado atual do jogo
let currentQuestionIndex = 0;
let score = 0;

// Referências dos elementos do DOM
const progressEl = document.getElementById("progress");
const scoreDisplayEl = document.getElementById("score-display");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultBoxEl = document.getElementById("result-box");
const questionBoxEl = document.getElementById("question-box");
const restartBtn = document.getElementById("restart-btn");

// Inicializa o Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBoxEl.classList.add("hidden");
    questionBoxEl.classList.remove("hidden");
    scoreDisplayEl.textContent = `Pontos: ${score}`;
    loadQuestion();
}

// Carrega a pergunta atual na tela
function loadQuestion() {
    resetState();
    
    const currentQuestion = quizData[currentQuestionIndex];
    progressEl.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    questionTextEl.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainerEl.appendChild(button);
    });
}

// Limpa os feedbacks e alternativas anteriores
function resetState() {
    nextBtn.classList.add("hidden");
    feedbackEl.classList.add("hidden");
    feedbackEl.className = "hidden"; // Limpa as classes de estilo adicionais
    while (optionsContainerEl.firstChild) {
        optionsContainerEl.removeChild(optionsContainerEl.firstChild);
    }
}

// Processa a escolha do usuário
function selectOption(selectedIndex, selectedButton) {
    const currentQuestion = quizData[currentQuestionIndex];
    const allButtons = optionsContainerEl.querySelectorAll(".option-btn");
    
    // Desativa todos os botões após o clique para evitar trapaças
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuestion.correct) {
        // Resposta Correta
        selectedButton.classList.add("correct");
        score += 10;
        scoreDisplayEl.textContent = `Pontos: ${score}`;
        feedbackEl.textContent = `Correto! 🎉 ${currentQuestion.explanation}`;
        feedbackEl.classList.remove("hidden");
        feedbackEl.classList.add("correct-msg");
    } else {
        // Resposta Errada
        selectedButton.classList.add("wrong");
        // Destaca a correta para o usuário aprender
        allButtons[currentQuestion.correct].classList.add("correct");
        feedbackEl.textContent = `Ops! 💧 ${currentQuestion.explanation}`;
        feedbackEl.classList.remove("hidden");
        feedbackEl.classList.add("wrong-msg");
    }

    nextBtn.classList.remove("hidden");
}

// Controla o clique do botão "Avançar"
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Mostra a pontuação final
function showResults() {
    questionBoxEl.classList.add("hidden");
    nextBtn.classList.add("hidden");
    feedbackEl.classList.add("hidden");
    progressEl.textContent = "Quiz Concluído!";
    
    const maxScore = quizData.length * 10;
    resultBoxEl.classList.remove("hidden");
    
    if (score === maxScore) {
        document.getElementById("final-score").textContent = `Incrível! Você acertou tudo e fez ${score} pontos. Você é um verdadeiro guardião da água! 🌊`;
    } else if (score > 0) {
        document.getElementById("final-score").textContent = `Muito bom! Você fez ${score} de ${maxScore} pontos. Continue praticando hábitos conscientes! 🌱`;
    } else {
        document.getElementById("final-score").textContent = `Você fez ${score} pontos. Que tal ler as dicas acima e tentar novamente para melhorar sua pontuação? 🔄`;
    }
}

// Botão de reiniciar o jogo
restartBtn.addEventListener("click", startQuiz);

// Executa o jogo assim que a página carrega
document.addEventListener("DOMContentLoaded", startQuiz);
