function buscarCommits(repositorio, dataInicial, dataFinal) {
    const url = `https://api.github.com/repos/${repositorio}/commits?since=${dataInicial}&until=${dataFinal}&per_page=100`;

    // Faz a chamada para a api do GIT
    fetch(url).then(response => response.json()).then(commits => {
        console.log(commits);
        
        // Função para verificar e guardar as mensagens dos commits
        verificarMensagensCommits(commits);
    })
}

function verificarMensagensCommits(commits) {
    // Cria um vetor vazio para acrescentar as mensagens
    const messageCommitDescritas = [];

    // Percorre a resposta passada por parâmetro para separar as mensagens
    commits.forEach(element => {
        // Guardar a mensagem do commit
        const commitsMessage = element.commit.message;

        // Adicionar a mensagem coletada anteriormente no vetor
        messageCommitDescritas.push(commitsMessage);
    });

    // Apresenta no console o conteúdo do vetor
    console.log(messageCommitDescritas);

    // Função para pegar o vetor e apresentar na tela
    mostrarTela(messageCommitDescritas);
}

function mostrarTela(messageCommit) {
    // Encontra o ID onde vai ficar as mensagens dos commits
    const dados = document.querySelector("#dados");

    const uniqueMessages = new Set();

    // Percorre o vetor que foi passado por parâmetro
    messageCommit.forEach(element => {

        // Aqui ele retira as mensagens informadas nas condições
        if (element.includes("Ignore-revision") || element.includes("Merge branch")){
            return;
        }

        // Adiciona o elemento
        uniqueMessages.add(element);
    });

    // Percorre o conjunto para criar os elementos na tela
    uniqueMessages.forEach(message => { 
        const h3 = document.createElement("h3");
        h3.innerHTML = message;
        dados.appendChild(h3);
    });
}