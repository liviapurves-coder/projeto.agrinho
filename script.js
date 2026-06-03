// 1. Função obrigatória para permitir que o item seja solto
function allowDrop(ev) {
    ev.preventDefault();
}

// 2. Função disparada quando você começa a arrastar
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var target = ev.target.closest('.dropzone'); 

    // Validação do Alvo e do Match
    if (target && target.getAttribute('data-match') === data) {
        // Se estiver correto
        target.appendChild(draggedElement);
        target.style.background = "var(--sucesso)"; // Usando suas variáveis CSS
        target.style.borderColor = "transparent";
        draggedElement.style.cursor = "default";
        draggedElement.draggable = false; 
        
        checkWin();
    } else {
        // Se estiver errado
        const feedback = document.getElementById('feedback');
        feedback.innerText = "Tente novamente! 💧";
        feedback.style.color = "var(--erro)";
        
        // Limpa o feedback de erro após 2 segundos
        setTimeout(() => {
            if (feedback.innerText.includes("Tente")) {
                feedback.innerText = "";
            }
        }, 2000);
    }
}

function checkWin() {
    const feedback = document.getElementById('feedback');
    // Conta quantos itens ainda restam na coluna inicial
    const remaining = document.querySelectorAll('.column .draggable').length;

    if (remaining === 0) {
        feedback.innerText = "Parabéns! Você é um mestre da economia! 🌊🏆";
        feedback.style.color = "#55efc4";
    } else {
        feedback.innerText = "Correto! Continue assim. 🎉";
        feedback.style.color = "#55efc4";
    }
} // Fechamento da função que faltava
