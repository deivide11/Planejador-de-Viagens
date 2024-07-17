const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana:{
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),

            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}

const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"), // new Date é pra mostrar a data, precisa ser colocado certo (yyyy,mm,dd) pra funcionar
    finalizada: true // Mostra se a atividade foi finalizada ou não
}

// lista, array, vetor []
let atividades = [
    atividade,
    {
        nome: "Academia em grupo",
        data: new Date("2024-07-09 12:00"),
        finalizada: true
    },

    {
        nome: "Gamming session",
        data: new Date("2024-07-10 16:00"),
        finalizada: true
    }
]

// atividades = []


// arrou function
const criarItemDeAtividade = (atividade) => {

    let input = `<input onchange="concluirAtividade(event) value="${atividade.data}" type="checkbox" `

    // += ele vai somar o anterior e vai atribuir o novo valor
    // Poderia ser também input = input + 'checked'

    if(atividade.finalizada){
        input += 'checked' // o input vai receber o input antigo e vai concatenar com o sinal de mais e colocar 'checked'
    }

    input += '>' // input recebe o input e concatena com '>' pra finalizar
    // ou seja, vai adicionar os 3 input e vai ficar "<input type="checkbox" checked>" se o finalizada for true

    const formatar = formatador(atividade.data);

    return `
    <div class="card-bg">
        ${input}

        <div>
            <svg class="active" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.50008 9.00002L8.16675 10.6667L11.5001 7.33335M17.3334 9.00002C17.3334 13.6024 13.6025 17.3334 9.00008 17.3334C4.39771 17.3334 0.666748 13.6024 0.666748 9.00002C0.666748 4.39765 4.39771 0.666687 9.00008 0.666687C13.6025 0.666687 17.3334 4.39765 17.3334 9.00002Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <svg class="inactive" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.41664 0.818364C8.46249 0.615965 9.53745 0.615965 10.5833 0.818364M10.5833 17.1817C9.53745 17.3841 8.46249 17.3841 7.41664 17.1817M13.6741 2.10086C14.5587 2.70022 15.3197 3.46409 15.9158 4.35086M0.818303 10.5834C0.615904 9.53751 0.615904 8.46255 0.818303 7.4167M15.8991 13.6742C15.2998 14.5588 14.5359 15.3198 13.6491 15.9159M17.1816 7.4167C17.384 8.46255 17.384 9.53751 17.1816 10.5834M2.1008 4.32586C2.70016 3.44131 3.46403 2.68026 4.3508 2.0842M4.3258 15.8992C3.44124 15.2998 2.6802 14.536 2.08414 13.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>


            <span>${atividade.nome}</span>
        </div>
        <time class="short">
            ${formatar.dia.semana.curto}, dia ${formatar.dia.numerico} <br> ${formatar.hora}h
        </time>

        <time class="full">
            ${formatar.dia.semana.longo}, dia ${formatar.dia.numerico} de ${formatar.mes} às ${formatar.hora}h
        </time>
    </div>
    `
}

const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section')
    section.innerHTML = ''

    // verificiar se a minha lista está vazia
    if(atividades.length == 0){ // Se estiver vazia ele vai parar nesse if
        section.innerHTML = `<p> Nenhuma atividade cadastrada. </p>`
        return // por isso do return
    }

    for(let atividade of atividades) { // Estou criando uma atividade e retirando 1 da lista e colocando no criarItemDeAtividade assim fazendo um loop
        section.innerHTML += criarItemDeAtividade(atividade)
    }
}

atualizarListaDeAtividades()

const salvarAtividade = (event) =>{
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome,
        data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste){
        return alert('Dia/Hora não disponível')
    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}


const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-02-01",
        "2024-02-02",
        "2024-02-03",
    ]

    let diasSelecao = ''

    for(let dia of dias) {
        const formatar = formatador(dia)
        const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`

        diasSelecao += `
        <option value="${dia}">${diaFormatado}</option>
        `
    }

    document.querySelector('select[name="dia"]').innerHTML = diasSelecao // coloca na interface
}
criarDiasSelecao();

const criarHoraSelecao = () => {
    let horasDisponiveis = ''

    for(let i = 6; i < 23; i++){
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}
criarHoraSelecao();

const concluirAtividade = (event) => { // Coleta os dados
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataDesteInput
    })

    if(!atividade){ // se não for igual faz tal coisa
        return
    }

    atividade.finalizada = !atividade.finalizada
}

ScrollReveal({
    reset: true,
    distance: '50px',
    duration: 2000,
    delay: 100
});

ScrollReveal().reveal('section', { origin: 'right'});
ScrollReveal().reveal('h1', { origin: 'top' });
ScrollReveal().reveal('form', { origin: 'left' });