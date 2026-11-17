/* ============ início e reinício ============ */
async function iniciar() {
    S = novoEstado();
    chat.innerHTML = '<div class="day">Hoje</div>';
    chips([]); limparPainel();
    travar(true);
    await sleep(REDUZIDO ? 0 : 1300);
    await saudacao();
    travar(false);
}
resetBtn.addEventListener('click', iniciar);
iniciar();
