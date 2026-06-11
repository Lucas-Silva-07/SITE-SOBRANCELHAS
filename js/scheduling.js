// ---PAGINA DE AGENDAMENTO---

// pegar os dados salvo e atribui em variaveis 
const tituloAgendamento = document.getElementById('tituloAgendamento');

const tempoValor = document.getElementById('tempoValor');

// valida se pegou os dados salvo no navegador
if (tituloAgendamento) {
  const dados = JSON.parse(sessionStorage.getItem('agendamento'));

  // valida se pegou os dados
  if (dados) {
    // coloca os textos no formulário
    tituloAgendamento.textContent = `${dados.titulo}`;
    tempoValor.textContent = `${dados.tempo} • ${dados.valor}`
  }
}
// ---BOTÕES DE HORARIO---
let horarioSelecionado = "";

const horariosDoDia = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
const horariosOcupados = []; // Vem do banco de dados

const containerHorarios = document.getElementById("container-botoes");

// Gerar botões de horários
horariosDoDia.forEach(horario => {
  const botao = document.createElement("button");
  botao.classList.add("horario");
  botao.innerText = horario;

  // Desabilitar horário ocupado
  if (horariosOcupados.includes(horario)) {
    botao.disabled = true;
  } else {
    // Evento de clique
    botao.addEventListener("click", () => {
      // Remove a classe ativo de todos os botões
      document.querySelectorAll(".horario").forEach(b =>
        b.classList.remove("ativo")
      );

      // Adiciona a classe ativo ao botão clicado
      botao.classList.add("ativo");

      // Salva o horário selecionado
      horarioSelecionado = horario;

      console.log("Horário selecionado:", horarioSelecionado);
    });
  }

  containerHorarios.appendChild(botao);
});

// ---MENSAGEM PARA WHATSAPP---

function enviarWhatsapp(){
  // dados preenchido no formulário
  const nome = document.getElementById("name").value;

  const telefone = document.getElementById("telefone").value;

  const data = document.getElementById("date").value;
  
  // valida se selecionou um horário
  if(horarioSelecionado === ""){
    alert("Selecione um horário!");
    return;
  }

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

  // window.open(url, "_blank");

  alert("Horário agendado!");
}
  // conecta o botão à função
document.getElementById("btnConfirmar").addEventListener("click", enviarWhatsapp);

