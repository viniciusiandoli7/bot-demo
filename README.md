# Apex Fitness | Assistente de WhatsApp

Demo interativa de um assistente de WhatsApp para academias. O visitante conversa com o bot (digitando ou tocando nas respostas) e acompanha, em um painel ao lado, o cadastro do lead que a recepção receberia.

Demo online: https://viniciusiandoli7.github.io/bot-demo/

## O que a demo mostra

- Conversa com texto livre e respostas rápidas: planos, horários, agendamento de aula experimental e chamada da recepção.
- Agendamento completo: modalidade, dia (datas reais dos próximos dias), horário, nome e ingresso de confirmação no chat.
- Painel da recepção preenchido ao vivo, com registro de eventos.
- Barra de anilhas que ganha uma anilha a cada etapa do funil: contato, interesse, escolha e agendado.
- Acessível: foco visível no teclado, `aria-live` no chat e `prefers-reduced-motion` respeitado.

## Estrutura

```
index.html        marcação da página
css/styles.css    tokens de cor e tipografia, layout, celular e painel
js/data.js        modalidades, horários e planos
js/util.js        helpers (normalização de texto, hora) e estado da conversa
js/panel.js       barra de anilhas, cadastro do lead e registro de eventos
js/chat.js        mensagens, digitação, respostas rápidas e leitura do texto
js/flows.js       roteador de intenções e fluxos da conversa
js/main.js        início e reinício da demo
```

Os scripts são clássicos (sem módulos), carregados em ordem pelo `index.html`, então a página também abre direto pelo arquivo, sem servidor.

## Como rodar

Abra o `index.html` no navegador. Não precisa instalar nada.

## Para adaptar a outro cliente

Troque modalidades, horários e planos em `js/data.js`, os textos dos fluxos em `js/flows.js` e as cores das anilhas em `css/styles.css`.
