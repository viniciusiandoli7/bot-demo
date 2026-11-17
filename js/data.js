/* ============ dados do negócio ============ */
const MODALIDADES = {
    musculacao: { nome: 'Musculação',     horas: ['07:00', '12:00', '19:30'] },
    crossfit:   { nome: 'Cross Training', horas: ['06:00', '18:00', '20:00'] },
    fitdance:   { nome: 'FitDance',       horas: ['09:00', '19:00'] }
};
const PLANOS = {
    mensal: { nome: 'Plano Mensal', preco: 'R$ 120/mês' },
    anual:  { nome: 'Plano Anual',  preco: 'R$ 89/mês' }
};
const ETAPAS = ['Contato', 'Interesse', 'Escolha', 'Agendado'];
const REDUZIDO = matchMedia('(prefers-reduced-motion: reduce)').matches;
