
    // Criar uma variável para armazenar o ID do temporizador
    var temporizador;
    // Criar uma variável para armazenar o valor da aposta
    var aposta = 0;

    // Criar uma variável para armazenar o valor do multiplicador
    var multiplicador = 1;

    // Criar uma variável para armazenar o estado do jogo (rodando ou parado)
    var jogo = false;

    var totalGanho = 0

    // Modificar a função iniciar para iniciar o temporizador com um tempo aleatório
    function iniciar() {
        // Verificar se o valor da aposta é válido
        if (aposta > 0) {
            // Mudar o estado do jogo para rodando
            jogo = true;
            // Chamar a função para gerar o boneco
            gerarBoneco();
            // Chamar a função para atualizar o multiplicador
            atualizarMultiplicador();
            // Calcular um tempo aleatório entre 10 segundos e 2 minutos
            var tempoAleatorio = Math.floor(Math.random() * 10000);

            console.log(tempoAleatorio)
            // Iniciar o temporizador
            temporizador = setTimeout(verificarPerda, tempoAleatorio);
        } else {
            // Mostrar uma mensagem de erro
            alert("Você precisa apostar um valor maior que zero!");
        }
    }


    // Criar uma função para gerar o boneco
    function gerarBoneco() {
        // Criar uma variável para armazenar o elemento HTML do boneco
        var boneco = document.getElementById("boneco");
        // Criar uma variável para armazenar a posição inicial do boneco
        var posicao = 0;
        // Criar uma função para mover o boneco
        function mover() {
            // Verificar se o jogo está rodando
            if (jogo) {
                // Incrementar a posição do boneco
                posicao++;
                // Alterar o estilo do boneco para mudar a sua posição
                boneco.style.left = posicao + "px";
                // Verificar se o boneco chegou ao final da tela
                if (posicao > window.innerWidth - 100) {
                    // Mudar a direção do boneco
                    posicao = -100;
                }
                // Chamar a função mover novamente após um intervalo de tempo
                setTimeout(mover, 10);
            }
        }
        // Chamar a função mover pela primeira vez
        mover();
    }

    // Criar uma função para atualizar o multiplicador
    function atualizarMultiplicador() {
        // Criar uma variável para armazenar o elemento HTML do multiplicador
        var elemento = document.getElementById("multiplicador");
        // Criar uma função para aumentar o multiplicador
        function aumentar() {
            // Verificar se o jogo está rodando
            if (jogo) {
                // Incrementar o multiplicador
                multiplicador++;

                // Alterar o texto do elemento para mostrar o valor do multiplicador
                elemento.innerHTML = multiplicador + "x";
                // Chamar a função aumentar novamente após um intervalo de tempo
                setTimeout(aumentar, 1000);
            }
        }
        // Chamar a função aumentar pela primeira vez
        aumentar();
    }

    // Criar uma variável para armazenar o elemento HTML do total ganho
    var elementoTotalGanho = document.getElementById("totalGanho");
    // Modificar a função descontar para atualizar o elemento HTML do total ganho
    function descontar() {
        // Verificar se o jogo está rodando
        if (jogo) {
            // Mudar o estado do jogo para parado
            jogo = false;
            // Calcular o valor do lucro
            var lucro = aposta * multiplicador;

            // Atualizar o valor total ganho
            totalGanho += lucro;

            // Atualizar o elemento HTML do total ganho
            elementoTotalGanho.innerHTML = "Ganho total: " + totalGanho + " reais";
            // Resetar o valor da aposta
            aposta = 0;
            // Resetar o valor do multiplicador
            multiplicador = 1;
            // Cancelar o temporizador
            clearTimeout(temporizador);
        } else {
            // Mostrar uma mensagem de erro
            alert("Você precisa iniciar o jogo antes de descontar!");
        }
    }

    // Criar uma função para capturar o valor da aposta
    function capturarAposta() {
        // Obter o valor do campo de texto
        var valor = document.getElementById("valor").value;
        // Converter o valor para número
        valor = Number(valor);
        // Verificar se o valor é válido
        if (valor > 0) {
            // Atribuir o valor à variável aposta
            aposta = valor;
            // Mostrar uma mensagem de confirmação
            alert("Você apostou " + aposta + " reais!");
        } else {
            // Mostrar uma mensagem de erro
            alert("Você precisa digitar um valor maior que zero!");
        }
    }



    // Criar uma função para verificar se o jogador perdeu
    function verificarPerda() {


        var elemento = document.getElementById("multiplicador");
        let valorMultiplicador = elemento.textContent.replace(/x/g, "");

        var valor = document.getElementById("valor").value;
        var elementoTotalGanho = document.getElementById("totalGanho");
        let totalQueGanhou = elementoTotalGanho.textContent.replace(/[^\d,-]/g, "");

        // Verificar se o jogo está rodando
        if (jogo) {
            // Mudar o estado do jogo para parado
            jogo = false;
            // Subtrair o valor da aposta do total ganho
            // totalGanho -= aposta;
            let totalMultiplicadoValor = (valorMultiplicador * valor)

            // Atualizar o elemento HTML do total ganho
            elementoTotalGanho.innerHTML = "Ganho total: " + ((totalQueGanhou) - totalMultiplicadoValor) + " reais";
            // Mostrar uma mensagem de perda
            alert("Você perdeu! Seu ganho total agora é " + ((totalQueGanhou) - totalMultiplicadoValor) + " reais.");
            // Resetar o valor da aposta
            aposta = 0;
            // Resetar o valor do multiplicador
            multiplicador = 1;
        }

    }