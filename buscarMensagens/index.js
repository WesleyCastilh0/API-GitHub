function buscarCommits(repositorio, dataInicial, dataFinal) {
    const url = `https://api.github.com/repos/${repositorio}/commits?since=${dataInicial}&until=${dataFinal}&per_page=100`;

    fetch(url).then(response => response.json()).then(commits => {
        console.log(commits);
        
        verificarMensagensCommits(commits);
    })
}

function verificarMensagensCommits(commits) {
    const messageCommitDescritas = [];

    commits.forEach(element => {
        const commitsMessage = element.commit.message;

        messageCommitDescritas.push(commitsMessage);
    });

    console.log(messageCommitDescritas);

    // const messageCommitDescritasArray = Object.keys(messageCommit).map(commitMessage => {
    //     return {mensagem:commitMessage};
    // });


    mostrarTela(messageCommitDescritas);
}

function mostrarTela(messageCommit) {
    const dados = document.querySelector("#dados");

    const uniqueMessages = new Set();

    messageCommit.forEach(element => {

        if (element.includes("Ignore-revision") || element.includes("Merge branch")){
            return;
        }

        uniqueMessages.add(element);
    });

    uniqueMessages.forEach(message => { // percorre o conjunto para criar os elementos na tela
        const h3 = document.createElement("h3");
        h3.innerHTML = message;
        dados.appendChild(h3);
    });

    //return dados.innerHTML;
}