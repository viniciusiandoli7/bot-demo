/* ============ utilidades ============ */
const $ = (s) => document.querySelector(s);
const chat = $('#chat'), chipsEl = $('#chips'), field = $('#field'), sendBtn = $('#send');
const statusEl = $('#status'), feedEl = $('#feed'), resetBtn = $('#reset');

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const hora = () => { const d = new Date(); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
const sleep = (ms) => new Promise((r) => setTimeout(r, REDUZIDO ? 30 : ms));

/* ============ estado ============ */
let S;
function novoEstado() { return { step: 'idle', stage: 0, mod: null, dia: null, hora: null, plano: null, nome: null, busy: false }; }
