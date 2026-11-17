/* ============ chat ============ */
function append(tipo, html, texto) {
    const m = document.createElement('div');
    m.className = 'msg ' + tipo;
    if (texto !== undefined) { const p = document.createElement('div'); p.textContent = texto; m.append(p); }
    else m.insertAdjacentHTML('beforeend', html);
    m.insertAdjacentHTML('beforeend', `<time>${hora()}</time>`);
    chat.append(m);
    chat.scrollTop = chat.scrollHeight;
}
function digitando(on) {
    statusEl.textContent = on ? 'digitando…' : 'online';
    statusEl.classList.toggle('typing-on', on);
    if (on) {
        const t = document.createElement('div');
        t.className = 'typing'; t.id = 'typing'; t.setAttribute('aria-hidden', 'true');
        t.innerHTML = '<i></i><i></i><i></i>';
        chat.append(t); chat.scrollTop = chat.scrollHeight;
    } else $('#typing')?.remove();
}
async function say(html) {
    chips([]);
    digitando(true);
    await sleep(450 + Math.min(html.replace(/<[^>]+>/g, '').length * 12, 1000));
    digitando(false);
    append('bot', html);
}
function chips(lista) {
    chipsEl.innerHTML = '';
    lista.forEach((label) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'chip'; b.textContent = label;
        b.addEventListener('click', () => enviar(label));
        chipsEl.append(b);
    });
    chat.scrollTop = chat.scrollHeight;
}
function travar(on) {
    S.busy = on;
    field.disabled = on; sendBtn.disabled = on; resetBtn.disabled = on;
    chipsEl.querySelectorAll('button').forEach((b) => (b.disabled = on));
}

async function enviar(texto) {
    texto = texto.trim();
    if (!texto || S.busy) return;
    travar(true);
    field.value = '';
    append('user', null, texto);
    setStage(1);
    try { await route(texto); }
    finally {
        travar(false);
        if (!matchMedia('(pointer: coarse)').matches) field.focus();
    }
}
$('#composer').addEventListener('submit', (e) => { e.preventDefault(); enviar(field.value); });

/* ============ entendimento do texto ============ */
function lerModalidade(t) {
    if (/fit ?dance|danca|ritmo/.test(t)) return 'fitdance';
    if (/cross|funcional/.test(t)) return 'crossfit';
    if (/muscula|peso|academia/.test(t)) return 'musculacao';
    return null;
}
function proximosDias() {
    return [1, 2, 3].map((n) => {
        const d = new Date(); d.setDate(d.getDate() + n);
        const sem = d.toLocaleDateString('pt-BR', { weekday: 'long' }).replace('-feira', '');
        const curto = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
        return { sem: norm(sem), label: `${n === 1 ? 'Amanhã, ' : ''}${curto} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`, data: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`, amanha: n === 1 };
    });
}
function lerDia(t) {
    return proximosDias().find((d) => (d.amanha && /amanha/.test(t)) || t.includes(d.sem) || t.includes(d.data) || new RegExp('\\b' + d.sem.slice(0, 3) + '\\b').test(t)) || null;
}
function lerHora(t) {
    const m = t.match(/(\d{1,2})\s*(?:h|:)?\s*(\d{2})?/);
    if (!m) return null;
    const hh = pad(+m[1]), mm = m[2] || null;
    return MODALIDADES[S.mod].horas.find((h) => (mm ? h === `${hh}:${mm}` : h.startsWith(hh + ':'))) || null;
}
const PEDE_OUTRA_COISA = /humano|atendente|recepcao|preco|plano|valor|horario|experimental|agendar/;
