const salvarRecorde = () => {
    const nomeElement = document.getElementById("name");
    const nome = nomeElement.value;

    const dataToSend = {
        nome: nome,
        ponto: ponto,
        linha: linha,
        nivel: nivel
    };

    const apiUrl = 'http://localhost:8080/';

    axios.post(apiUrl, dataToSend)
        .then(response => {
            console.log('Acesso aprovado!');
            console.log(response.data);
        })
        .catch(error => {
            console.error('Acesso negado！');
            console.error(error.message);
        });
    nomeElement.value = "";
}

const listarRecorde = () => {
    const apiUrl = 'http://localhost:8080/';

    axios.get(apiUrl)
        .then(response => {
            const data = response.data;

            for (let i = 0; i < 5; i++) {
                const rankDiv = document.createElement("div");
                rankDiv.id = `rank${i + 1}`;
                rankDiv.classList.add("rankNumeros");
                const rankNomeElement = document.createElement("p");
                const rankPontoElement = document.createElement("p");
                const rankLinhaElement = document.createElement("p");
                const rankNivelElement = document.createElement("p");
                const rankDataElement = document.createElement("p");

                rankNomeElement.textContent = data[i].nome;
                rankPontoElement.textContent = data[i].ponto;
                rankLinhaElement.textContent = data[i].linha;
                rankNivelElement.textContent = data[i].nivel;
                rankDataElement.textContent = data[i].data.substring(0, 10);

                rankDiv.appendChild(rankNomeElement);
                rankDiv.appendChild(rankPontoElement);
                rankDiv.appendChild(rankLinhaElement);
                rankDiv.appendChild(rankNivelElement);
                rankDiv.appendChild(rankDataElement);

                rankInfoPlayer.appendChild(rankDiv);
            }
        })
}