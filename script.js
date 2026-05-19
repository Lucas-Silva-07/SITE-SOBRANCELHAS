// faz uma lista com todos os itens com classe = btn
const botoes = document.querySelectorAll('.btn');

// percorrendo a lista de botões
botoes.forEach(botao => {

  // adicionando o evento de click
  botao.addEventListener('click', (event) => {

    // pega o card que foi clicado
    const card = event.target.closest('.card');

    // criando variaveis com os textos 
    const titulo = card.querySelector('h3').textContent;
    const tempo = card.querySelector('span').textContent;
    const valor = card.querySelector('strong').textContent;

    // salva os dados no navegador
    const dados = { titulo, tempo, valor };
    localStorage.setItem('agendamento', JSON.stringify(dados));

    // vai para outra página
    window.location.href = 'agendamento.html';
  });
});

// ---PAGINA DE AGENDAMENTO---

// pegar os dados salvo e atribui em variaveis 
const tituloAgendamento = document.getElementById('tituloAgendamento');

const tempoValor = document.getElementById('tempoValor');

// valida se pegou os dados salvo no navegador
if (tituloAgendamento) {
  const dados = JSON.parse(localStorage.getItem('agendamento'));

  // valida se pegou os dados
  if (dados) {
    // coloca os textos no formulario
    tituloAgendamento.textContent = `${dados.titulo}`;
    tempoValor.textContent = `${dados.tempo} • ${dados.valor}`
  }
}

// lista de botões de horários
const horarioBotoes = document.querySelectorAll('.horario');

horarioBotoes.forEach(horario => {

  // adicionar evento de click
  horario.addEventListener('click', (event) => {

    // remove ativo de todos botões
    horarioBotoes.forEach(b => b.classList.remove('ativo'));

    // adiciona o ativo no botão clicado
    horario.classList.add('ativo');
  });
});
