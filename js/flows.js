/* ============ roteador ============ */
async function route(raw) {
    const t = norm(raw);

    if (S.step === 'modalidade') { const m = lerModalidade(t); if (m) return escolherModalidade(m); }
    if (S.step === 'dia')        { const d = lerDia(t);        if (d) return escolherDia(d); }
    if (S.step === 'hora')       { const h = lerHora(t);       if (h) return escolherHora(h); }
    if (S.step === 'nome' && !PEDE_OUTRA_COISA.test(t)) return escolherNome(raw);

    if (/humano|atendente|recepcao|pessoa|consultor/.test(t)) return recepcao();
    if (/anual|mensal/.test(t)) return escolherPlano(/anual/.test(t) ? 'anual' : 'mensal');
    if (/preco|plano|valor|quanto|mensalidade|custa/.test(t)) return planos();
    if (/horario|funciona|abre|turma|vaga/.test(t)) return horarios();
    if (/aula|experimental|agendar|marcar|testar|conhecer/.test(t)) return agenda(lerModalidade(t));
    if (lerModalidade(t)) return agenda(lerModalidade(t));
    if (/^(oi|ola|opa|bom dia|boa tarde|boa noite|e ai)/.test(t)) return saudacao();
    if (/obrigad|valeu|brigad/.test(t)) { await say('Por nada! Se precisar de mais alguma coisa, é só chamar.'); return chips(MENU); }
    return naoEntendi();
}

const MENU = ['Quero agendar uma aula experimental', 'Quanto custa?', 'Quais os horários?'];

/* ============ fluxos ============ */
async function saudacao() {
    await say('Oi! Aqui é o assistente da <b>Apex Fitness</b>. Respondo na hora, a qualquer hora. Posso mostrar os planos, agendar uma aula experimental ou chamar a recepção.');
    chips(MENU);
}
async function naoEntendi() {
    await say('Essa pergunta eu passo para a recepção. Enquanto isso, posso resolver uma destas:');
    chips([...MENU, 'Falar com a recepção']);
}

async function agenda(modalidade) {
    S.step = 'modalidade';
    setLead('interesse', 'Aula experimental');
    setStage(2);
    if (modalidade) return escolherModalidade(modalidade);
    await say('Boa! A primeira aula é por nossa conta. Qual modalidade você quer conhecer?');
    chips(Object.values(MODALIDADES).map((m) => m.nome));
}
async function escolherModalidade(m) {
    S.mod = m; S.step = 'dia';
    setLead('interesse', 'Aula experimental');
    setLead('modalidade', MODALIDADES[m].nome);
    setStage(3);
    await say(`<b>${MODALIDADES[m].nome}</b>, ótima escolha. Qual dia fica melhor para você?`);
    chips(proximosDias().map((d) => d.label));
}
async function escolherDia(d) {
    S.dia = d; S.step = 'hora';
    await say(`Para <b>${d.label}</b> tenho estes horários de ${MODALIDADES[S.mod].nome}:`);
    chips(MODALIDADES[S.mod].horas);
}
async function escolherHora(h) {
    S.hora = h; S.step = 'nome';
    setLead('horario', `${S.dia.label}, ${h}`);
    await say('Fechado. Qual é o seu nome para eu reservar a vaga?');
}
async function escolherNome(raw) {
    const limpo = raw.replace(/^(meu nome (e|é)|me chamo|sou (o|a)?|eu sou)\s+/i, '').trim();
    const nome = limpo.split(/\s+/)[0].replace(/[^\p{L}'-]/gu, '');
    if (nome.length < 2) { await say('Não consegui ler o seu nome. Pode escrever só o primeiro nome?'); return; }
    S.nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
    S.step = 'done';
    setLead('nome', S.nome);
    setLead('status', 'Aula agendada');
    setStage(4);
    await say(`Pronto, <b>${esc(S.nome)}</b>! Sua vaga está reservada.`);
    await say(`<div class="ticket"><h3>Aula experimental</h3><dl>
        <dt>Modalidade</dt><dd>${MODALIDADES[S.mod].nome}</dd>
        <dt>Dia</dt><dd>${S.dia.label}</dd>
        <dt>Horário</dt><dd>${S.hora}</dd>
        <dt>Nome</dt><dd>${esc(S.nome)}</dd></dl></div>
        Chegue 10 minutos antes e traga uma toalha. A recepção confirma com você aqui na véspera.`);
    chips(['Quanto custa o plano?', 'Falar com a recepção']);
}

async function planos() {
    if (!S.mod) setLead('interesse', 'Planos e valores');
    setStage(2);
    await say(`Temos dois planos:
        <div class="plans">
            <div><b>Mensal</b><strong>R$ 120</strong><small>por mês, sem fidelidade</small></div>
            <div><b>Anual</b><strong>R$ 89</strong><small>por mês, com um amigo 4x no mês</small></div>
        </div>Qual combina mais com você?`);
    chips(['Quero o Anual', 'Prefiro o Mensal', 'Agendar aula experimental']);
}
async function escolherPlano(p) {
    S.plano = p;
    setLead('plano', `${PLANOS[p].nome}, ${PLANOS[p].preco}`);
    setStage(3);
    await say(`<b>${PLANOS[p].nome}</b> anotado. Antes de assinar, que tal testar? A primeira aula é por nossa conta.`);
    chips(['Agendar aula experimental', 'Falar com a recepção']);
}
async function horarios() {
    setStage(2);
    const linhas = Object.values(MODALIDADES).map((m) => `<b>${m.nome}:</b> ${m.horas.join(', ')}`).join('<br>');
    await say(`Estes são os horários das turmas:<br>${linhas}`);
    chips(['Agendar aula experimental', 'Quanto custa?']);
}
async function recepcao() {
    setLead('status', 'Recepção chamada');
    setStage(4);
    const resumo = [S.mod && MODALIDADES[S.mod].nome, S.plano && PLANOS[S.plano].nome].filter(Boolean);
    await say(`Chamei a recepção. Um consultor responde nesta mesma conversa${resumo.length ? `, já sabendo do seu interesse em <b>${resumo.join(' e ')}</b>` : ''}. Você não precisa repetir nada.`);
    chips(['Quanto custa?', 'Quais os horários?']);
}
