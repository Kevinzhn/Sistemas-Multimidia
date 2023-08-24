class Peca {
    constructor(peca, cor, imagem) {
        this.peca = peca;
        this.cor = cor;
        this.imagem = imagem;
        this.pecaEstado = 0;
        this.pecaAtual = this.peca[this.pecaEstado]
        this.x = 3;
        this.y = -3;
    }

    fill(cor) {
        for (let x = 0; x < this.pecaAtual.length; x++) {
            for (let y = 0; y < this.pecaAtual.length; y++) {
                if (this.pecaAtual[x][y]) pintarPixel(this.y + x, this.x + y, cor);
            }
        }
    }

    pintar() {
        this.fill(this.cor);
    }

    apagar() {
        this.fill(corPadrao);
    }

    moverDireita() {
        if (!this.colisao(-1, 0, this.pecaAtual)) {
            this.apagar();
            this.x--;
            this.pintar();
        }
    }

    moverEsquerda() {
        if (!this.colisao(1, 0, this.pecaAtual)) {
            this.apagar();
            this.x++;
            this.pintar();
        }
    }

    moverBaixo() {
        if (!this.colisao(0, 1, this.pecaAtual)) {
            this.apagar();
            this.y++;
            this.pintar();
            return;
        }
        this.trava();
        peca = proximaPeca1;
        proximaPeca1elemento.src = `../imagens/${proximaPeca2.imagem}`;
        proximaPeca1 = proximaPeca2;
        gerarProximaPeca2();
    }

    rotacao() {
        let proximoEstado = this.peca[(this.pecaEstado + 1) % this.peca.length];
        let espaco = 0;
        if (this.colisao(0, 0, proximoEstado)) {
            espaco = 1;

            if (this.x > COLUNA / 2) {
                espaco = -1;
            }
        }
        if (!this.colisao(espaco, 0, proximoEstado)) {
            this.apagar();
            this.x += espaco;
            this.pecaEstado = (this.pecaEstado + 1) % this.peca.length;
            this.pecaAtual = this.peca[this.pecaEstado];
            this.pintar();
        }

    }

    colisao(x, y, futuroPeca) {
        for (let i = 0; i < futuroPeca.length; i++) {
            for (let j = 0; j < futuroPeca.length; j++) {
                if (!futuroPeca[i][j]) continue;
                const newX = this.x + j + x;
                const newY = this.y + i + y;
                if (newX < 0 || newX >= COLUNA || newY >= LINHA) return true;
                if (newY < 0) continue;
                if (tela[newY][newX] !== corPadrao) return true;
            }
        }
        return false;
    }

    trava() {
        for (let x = 0; x < this.pecaAtual.length; x++) {
            for (let y = 0; y < this.pecaAtual.length; y++) {
                if (!this.pecaAtual[x][y]) continue;
                if (this.y + y <= 0) {
                    fimJogo();
                    return;
                }
                tela[this.y + x][this.x + y] = this.cor;
            }
        }
        ponto += 5;
        let linhasCompletas = 0;
        for (let x = 0; x < LINHA; x++) {
            let temLinhaCompleta = true;
            for (let y = 0; y < COLUNA; y++) {
                const atualQuadradoCor = tela[x][y];
                temLinhaCompleta = temLinhaCompleta && (atualQuadradoCor !== corPadrao);
            }
            if (temLinhaCompleta) {
                linhasCompletas++;
                atualizarTelaPontos(x, linhasCompletas);
            }

        }
        linha += linhasCompletas;
        linhaNivel += linhasCompletas;
        if (linhaNivel >= 10) {
            nivel++;
            linhaNivel -= 10;
            speed = speed * (0.90 ** (nivel - 1));
        }
        pintarTela();
    }
}
