function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var target = ev.target.closest('.dropzone'); // Ensures it finds the zone

    if (target && target.getAttribute('data-match') === data) {
        target.appendChild(draggedElement);
        target.style.background = "#27ae60";
        target.style.border = "none";
        draggedElement.style.cursor = "default";
        draggedElement.draggable = false; // Stop dragging once matched
        
        checkWin();
    } else {
        document.getElementById('feedback').innerText = "Tente novamente! 💧";
        document.getElementById('feedback').style.color = "#ff7675";
    }
}

function checkWin() {
    const remaining = document.querySelectorAll('.column .draggable').length;
    if (remaining === 0) {
        document.getElementById('feedback').innerText = "Parabéns! Você é um mestre da economia! 🌊🏆";
        document.getElementById('feedback').style.color = "#55efc4";
    } else {
        document.getElementById('feedback').innerText = "Correto! Continue assim. 🎉";
        document.getElementById('feedback').style.color = "#55efc4";
    }
}
