// faz uma lista com todos os itens com classe = btn
const botoes = document.querySelectorAll('.btn');

// percorrendo a lista de botões
botoes.forEach(botao => {

  // adicionando o evento de click
  botao.addEventListener('click', (event) => {

    // pega o card que foi clicado
    const card = botao.closest('.card');

    // criando variaveis com os textos 
    const titulo = card.querySelector('h3').textContent;
    const tempo = card.querySelector('span').textContent;
    const valor = card.querySelector('strong').textContent;

    // salva os dados no navegador
    const dados = { titulo, tempo, valor };
    sessionStorage.setItem('agendamento', JSON.stringify(dados));

    // vai para outra página
    window.location.href = 'scheduling.html';
  });
});

