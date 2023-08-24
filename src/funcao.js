const comecarJogo = () => {
    gameElement.classList.remove("hidden");
    homeElement.classList.add("hidden");
    gameOverElement.classList.add("hidden");
    nivel = 1;
    speed = 1000;
    linha = 0;
    ponto = 0;
    dropStart = Date.now();
    linhaNivel = 0;
    mover = true;
    definirCorTela();
    pintarTela();
    gerarProximaPeca1();
    gerarProximaPeca2();
    queda();
}
const comecarJogoFacil = () => {
    comecarJogo();
    pecaElement.classList.remove("hidden");
    proximaPeca1elemento.classList.remove("hidden");
    proximaPeca2elemento.classList.remove("hidden");
}
const comecarJogoMedio = () => {
    comecarJogo();
    pecaElement.classList.remove("hidden");
    proximaPeca1elemento.classList.remove("hidden");
    proximaPeca2elemento.classList.add("hidden");
}

const comecarJogoDificil = () => {
    comecarJogo();
    pecaElement.classList.add("hidden");

}

const menu = () => {
    rankInfoPlayer.innerHTML = '';
    rankConteinerElement.classList.add("hidden");
    homeElement.classList.remove("hidden");
}
const rank = () => {
    homeElement.classList.add("hidden");
    rankConteinerElement.classList.remove("hidden");
    listarRecorde();
}

const sairDojogo = () => {
    homeElement.classList.remove("hidden");
    gameElement.classList.add(("hidden"));
    resetarJogo();
}
const pintarPixel = (y, x, cor) => {
    jogoCtx.fillStyle = cor;
    jogoCtx.fillRect(x * PX, y * PX, PX, PX);
    jogoCtx.strokeStyle = "#1e1f20";
    jogoCtx.strokeRect(x * PX, y * PX, PX, PX);
}
const definirCorTela = () => {
    for (let x = 0; x < LINHA; x++) {
        tela[x] = [];
        for (let y = 0; y < COLUNA; y++) tela[x][y] = corPadrao;
    }
}
const pintarTela = () => {
    for (let i = 0; i < LINHA; i++) {
        for (let j = 0; j < COLUNA; j++) {
            const corAtual = tela[i][j];
            pintarPixel(i, j, corAtual);
        }
    }
    pontoElemento.innerHTML = ponto;
    nivelElemento.innerHTML = nivel;
    linhaElemento.innerHTML = linha;
}

const gerarPeca = () => {
    const pecaNumero = Math.floor(Math.random() * PECAS.length);
    return new Peca(...PECAS[pecaNumero]);
}

const gerarProximaPeca1 = () => {
    proximaPeca1 = gerarPeca();
    proximaPeca1elemento.src = `../imagens/${proximaPeca1.imagem}`;
}

const gerarProximaPeca2 = () => {
    proximaPeca2 = gerarPeca();
    proximaPeca2elemento.src = `../imagens/${proximaPeca2.imagem}`;
}

const queda = () => {
    const now = Date.now();
    const delta = now - dropStart;

    if (delta > speed && mover) {
        peca.moverBaixo();
        dropStart = Date.now();
    }

    requestAnimationFrame(queda);
}
const moverDireita = () => {
    if (!mover) return;
    peca.moverDireita();
}

const moverEsquerda = () => {
    if (!mover) return;
    peca.moverEsquerda();
}

const rotacao = () => {
    if (!mover) return;
    peca.rotacao();
}

const moverBaixo = () => {
    if (!mover) return;
    peca.moverBaixo();
}

function controle(event) {
    const moverFuncao = {
        ArrowLeft: moverDireita,
        ArrowRight: moverEsquerda,
        ArrowUp: rotacao,
        ArrowDown: moverBaixo,
        KeyA: moverDireita,
        KeyD: moverEsquerda,
        KeyW: rotacao,
        KeyS: moverBaixo,
    };
    const moverPeca = moverFuncao[event.code];
    if (moverPeca) {
        moverPeca();
    }
}

const atualizarTelaPontos = (linha, peso) => {
    for (let a = linha; a > 1; a--) {
        for (let y = 0; y < COLUNA; y++) {
            tela[a][y] = tela[a - 1][y];
        }
    }
    for (let y = 0; y < COLUNA; y++) {
        tela[0][y] = corPadrao;
    }

    switch (peso) {
        case 1:
            ponto += 20;
            break;
        case 2:
            ponto += 30;
            break;
        case 3:
            ponto += 60;
            break;
        case 4:
            ponto += 120;
            break;
    }
}
const sair = () => {
    salvarRecorde();
    gameElement.classList.add("hidden");
    gameOverElement.classList.add("hidden");
    homeElement.classList.remove("hidden");
}
const fimJogo = () => {
    ponto1Elemento.innerHTML = ponto;
    mover = false;
    gameElement.classList.add("hidden");
    gameOverElement.classList.remove("hidden");
}
const resetarJogo = () => {
    nivel = 1;
    speed = 1000;
    linha = 0;
    ponto = 0;
    dropStart = Date.now();
    linhaNivel = 0;
    mover = false;
    definirCorTela();
    peca = gerarPeca();
    queda();
    pintarTela();
}
const jogarNovamente = () => {
    gameElement.classList.remove("hidden");
    gameOverElement.classList.add("hidden");
    resetarJogo();
    mover = true;
}