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
    // coloca os textos no formulário
    tituloAgendamento.textContent = `${dados.titulo}`;
    tempoValor.textContent = `${dados.tempo} • ${dados.valor}`
  }
}
// ---BOTÕES DE HORARIO---
let horarioSelecionado = ""

// lista de botões de horários
const horarioBotoes = document.querySelectorAll('.horario');

horarioBotoes.forEach(horario => {

  // adicionar evento de click
  horario.addEventListener('click', (event) => {

    // remove ativo de todos botões
    horarioBotoes.forEach(b => b.classList.remove('ativo'));

    // adiciona o ativo no botão clicado
    horario.classList.add('ativo');

    // hora do botão selecionado
    horarioSelecionado = horario.textContent;
  });
});

// ---MENSAGEM PARA WHATSAPP---

function enviarWhatsapp(){
  // dados preenchido no formulário
  const nome = document.getElementById("nome").value;

  const telefone = document.getElementById("telefone").value;

  const data = document.getElementById("data").value;

  // numéro da Designer 
  const numeroDesigner = "5511999999999";

  // Mensagem a ser enviada para a designer
  const mensagem =
`Olá, gostaria de confirmar um agendamento:

Nome: ${nome}
Telefone: ${telefone}
Serviço: Design de Sobrancelhas
Data: ${data}
Horário: ${horarioSelecionado}

Pagamento PIX realizado.`;

  // link para entrar no whatsapp ja com mensagem escrita
  const url =
`https://wa.me/${numeroDesigner}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}
