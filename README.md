# 🏋️‍♂️ Apex Fitness | Simulador de Assistente IA para WhatsApp

(https://viniciusiandoli7.github.io/bot-demo/)

## 📖 Sobre o Projeto

O **Apex Fitness IA Bot** é um estudo de caso interativo desenvolvido para demonstrar o poder das automações de WhatsApp para ginásios, estúdios de fitness e *personal trainers*. 

Em vez de apenas descrever o serviço, este projeto apresenta um **simulador funcional construído em código** que permite aos potenciais clientes testarem a experiência do utilizador final. O bot simula a captação de *leads*, o agendamento de aulas experimentais e a apresentação de planos sem intervenção humana.

## ✨ Funcionalidades e UI/UX

- **Simulador Realista de Interface:** Réplica fiel da interface do WhatsApp em *Dark Mode*, incluindo o notch do telemóvel e o cabeçalho de contacto.
- **Interatividade Dinâmica (JavaScript):** O simulador responde aos cliques do utilizador, criando balões de mensagens em tempo real.
- **Animações de "A Escrever...":** Implementação de animações CSS (*keyframes*) para os três pontos flutuantes, simulando o delay natural de uma IA a processar a resposta.
- **Dashboard de Métricas (ROI):** Painel lateral que destaca os resultados de negócio (ex: +120% em agendamentos), provando o Retorno sobre o Investimento ao dono do ginásio.
- **Design Responsivo:** O layout em grelha (*CSS Grid*) adapta-se perfeitamente, empilhando o texto e o simulador em ecrãs mais pequenos.

## 🛠️ Tecnologias Utilizadas

Este simulador foi construído focando na leveza e na manipulação do DOM em tempo real:

- **HTML5:** Estruturação semântica do estudo de caso e do *mockup* do telemóvel.
- **CSS3:** - Animações complexas (`@keyframes`) para o efeito de "fade-in" das mensagens e o indicador de digitação.
  - **CSS Grid** e **Flexbox** para a estrutura e alinhamento dos elementos.
  - Estilização de botões e *badges* com a paleta de cores energéticas (Âmbar/Laranja e Preto).
- **JavaScript (Vanilla):** - Lógica assíncrona com `setTimeout` para criar fluxos de conversação naturais.
  - Criação e injeção de elementos no DOM dinamicamente (`document.createElement`, `insertBefore`).
- **Google Fonts:** Utilização da fonte `Inter` para máxima legibilidade.

## 🚀 Como Executar o Projeto

Como este simulador é feito integralmente em Front-end Vanilla, não requer a instalação de pacotes ou servidores complexos:
