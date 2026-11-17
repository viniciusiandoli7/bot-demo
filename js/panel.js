/* ============ barra com anilhas (uma por etapa) ============ */
const PLACAS = [
    { cor: 'var(--p-green)',  h: 44, x: 34 },
    { cor: 'var(--p-yellow)', h: 62, x: 54 },
    { cor: 'var(--p-blue)',   h: 80, x: 74 },
    { cor: 'var(--p-red)',    h: 98, x: 94 }
];
(function montarPlacas() {
    const g = $('#plates'), W = 16, NS = 'http://www.w3.org/2000/svg';
    PLACAS.forEach((p, i) => {
        [['l', p.x], ['r', 520 - p.x - W]].forEach(([lado, x]) => {
            const grp = document.createElementNS(NS, 'g');
            grp.setAttribute('class', 'plate ' + lado);
            grp.dataset.stage = i + 1;
            const r = document.createElementNS(NS, 'rect');
            r.setAttribute('x', x); r.setAttribute('y', 55 - p.h / 2);
            r.setAttribute('width', W); r.setAttribute('height', p.h);
            r.setAttribute('rx', 3); r.setAttribute('fill', p.cor);
            const hub = document.createElementNS(NS, 'rect');
            hub.setAttribute('x', x + 5); hub.setAttribute('y', 49);
            hub.setAttribute('width', W - 10); hub.setAttribute('height', 12);
            hub.setAttribute('fill', 'rgba(0,0,0,.28)');
            grp.append(r, hub); g.append(grp);
        });
    });
})();

function setStage(n) {
    if (n <= S.stage) return;
    S.stage = n;
    document.querySelectorAll('.plate').forEach((p) => p.classList.toggle('on', +p.dataset.stage <= n));
    document.querySelectorAll('#steps li').forEach((li, i) => li.classList.toggle('on', i < n));
    log(['Lead criado a partir do WhatsApp', 'Interesse identificado', 'Escolha registrada', 'Lead pronto para a recepção'][n - 1]);
}

/* ============ painel: cadastro e registro ============ */
const VAZIOS = { nome: 'Ainda não informou', interesse: 'Aguardando', modalidade: 'Aguardando', plano: 'Aguardando', horario: 'Aguardando', status: 'Sem conversa' };

function setLead(k, v) {
    const el = document.querySelector(`[data-k="${k}"]`);
    if (el.textContent === v) return;
    el.textContent = v;
    el.classList.remove('empty', 'flash');
    void el.offsetWidth;
    el.classList.add('flash');
}
function log(texto) {
    feedEl.querySelector('.none')?.remove();
    const li = document.createElement('li');
    li.innerHTML = `<time>${hora()}</time><span>${esc(texto)}</span>`;
    feedEl.prepend(li);
    while (feedEl.children.length > 7) feedEl.lastChild.remove();
}
function limparPainel() {
    document.querySelectorAll('[data-k]').forEach((el) => { el.textContent = VAZIOS[el.dataset.k]; el.className = 'empty'; });
    document.querySelectorAll('.plate').forEach((p) => p.classList.remove('on'));
    document.querySelectorAll('#steps li').forEach((li) => li.classList.remove('on'));
    feedEl.innerHTML = '<li class="none"><time></time><span>Nenhuma atividade ainda.</span></li>';
}
