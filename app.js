const botoes = document.querySelectorAll('.btn');

botoes.forEach(botao => {
  botao.addEventListener('click', (event) => {

    const card = event.target.closest('.card');

    const titulo = card.querySelector('h3').textContent;
    const descricao = card.querySelector('p').textContent;

    // salva os dados
    localStorage.setItem('titulo', titulo);
    localStorage.setItem('descricao', descricao);

    // vai para outra página
    window.location.href = 'agendamento.html';
  });
});