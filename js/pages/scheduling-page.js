import { createAppointment, getDateHours } from "../api/appointments.js";

// ---PAGINA DE AGENDAMENTO---

// pegar os dados salvo e atribui em variaveis 
const tituloAgendamento = document.getElementById('tituloAgendamento');

const tempoValor = document.getElementById('tempoValor');

// valida se pegou os dados salvo no navegador
let dados = null
if (tituloAgendamento) {
  dados = JSON.parse(sessionStorage.getItem('agendamento'));

  // valida se pegou os dados
  if (dados) {
    // coloca os textos no formulário
    tituloAgendamento.textContent = `${dados.titulo}`;
    tempoValor.textContent = `${dados.tempo} • ${dados.valor}`
  }
}

// ---CRIAR BOTÕES DE HORÁRIOS
let horarioSelecionado = "";

const horariosDoDia = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
let horariosOcupados = []; // Vem do banco de dados
const inputData = document.getElementById('date');

// Evento quando selecionar a data
inputData.addEventListener('change', async (event) => {
  const data = event.target.value;

  horariosOcupados = [];

  const hoursList = await getDateHours(data);

  hoursList.forEach(hour => {
    horariosOcupados.push(hour)
  });

// gerar botões de horários
const containerHorarios = document.getElementById("container-botoes");

containerHorarios.innerHTML = ""

horariosDoDia.forEach(horario => {
  const botao = document.createElement("button");
  botao.type = 'button';
  botao.classList.add("horario");
  botao.innerText = horario;

  // desabilitar horário ocupado
  if (horariosOcupados.includes(horario)) {
    botao.disabled = true;
  } else {
    // evento de clique
    botao.addEventListener("click", () => {
      // remove a classe ativo de todos os botões
      document.querySelectorAll(".horario").forEach(b =>
        b.classList.remove("ativo")
      );

      // adiciona a classe ativo ao botão clicado
      botao.classList.add("ativo");

      // salva o horário selecionado
      horarioSelecionado = horario;

      console.log("Horário selecionado:", horarioSelecionado);
    });
  };
  containerHorarios.appendChild(botao);
  });  
});

// ---MENSAGEM PARA WHATSAPP---
function enviarWhatsapp({
  nome,
  telefone,
  data,
  horario,
  valor,
  service
}) {
  const numeroDesigner = "5511999999999";

  const mensagem =
`Olá, gostaria de confirmar um agendamento:

Nome: ${nome}
Telefone: ${telefone}
Serviço: ${service}
Data: ${data}
Horário: ${horario}
Valor: ${valor}

Pagamento PIX realizado.`;

  const url =
`https://wa.me/${numeroDesigner}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}

// ---CONFIRMAR AGENDAMENTO---
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  if (!horarioSelecionado) {
    alert("Selecione um horário!");
    return;
  };
  // dados preenchido no formulário
  const nome = document.getElementById("name").value;
  const telefone = document.getElementById("telefone").value;
  const data = document.getElementById("date").value;
  
  const valor = Number(dados.valor.match(/\d+/g)[0]);
  const service = dados.titulo;
  
  const client = {
        name: nome,
        phone: telefone,
        date: data,
        hour: horarioSelecionado,
        price: valor,
        service: service
    };
    console.log(client)
    try {
        const appointment = await createAppointment(client);

        console.log(appointment);

        enviarWhatsapp({
            nome,
            telefone,
            data,
            horario: horarioSelecionado,
            valor,
            service
        });

    } catch (error) {
        console.error(error);
        alert("Erro ao salvar agendamento.");
    }
});