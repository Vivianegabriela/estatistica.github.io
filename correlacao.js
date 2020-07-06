function correlacao() {
    var x = document.getElementById('independente').value
    var y = document.getElementById('dependente').value

    // SEPARADOR POR ';'
    var vetorX = []
    var vetorY = []
    vetorX = x.split(";");
    vetorY = y.split(";");

    // STRING PARA NUMBER
    for (let i = 0; i < vetorX.length; i++) {
        vetorX[i] = Number(vetorX[i])
        vetorY[i] = Number(vetorY[i])
    }

    // TABELA INVISÍVEL 
    var somaX = 0
    var somaY = 0
    var multiXeY, somaXeY = 0
    var x2 = 0, xElevado
    var y2 = 0, yElevado

    for (let i = 0; i < vetorX.length; i++) {
        // SOMA DOS ELEMENTOS INDEPENDENTES
        somaX += parseFloat(vetorX[i])

        // SOMA DOS ELEMENTOS DEPENDENTES
        somaY += parseFloat(vetorY[i])

        // MULTIPLICA X e Y - FAZ O SOMATÓRIO 
        multiXeY = vetorX[i] * vetorY[i]
        somaXeY += multiXeY

        // ELEVA X AO QUADRADO
        xElevado = vetorX[i] * vetorX[i]
        x2 += xElevado

        // ELEVA Y AO QUADRADO
        yElevado = vetorY[i] * vetorY[i]
        y2 += yElevado
    }

    // ENCONTRAR O COEFICIENTE DE CORRELAÇÃO
    var n = vetorX.length
    var dividendo = ((n * somaXeY) - (somaX * somaY))
    var divisor = (Math.sqrt((n * x2) - (somaX * somaX))) * (Math.sqrt((n * y2) - (somaY * somaY)))
    var r = Math.round((dividendo / divisor) * 100)

    // REGRESSÃO - y = a * x + b
    // ENCONTRANDO O VALOR DE a
    var a = (((n * somaXeY) - (somaX * somaY)) / ((n * x2) - Math.pow(somaX, 2))).toFixed(3)

    // ENCONTRANDO O VALOR DE b
    // b = y - a * x
    var valorY = somaY / n
    var valorX = somaX / n
    var b = Number((valorY - (a * valorX)).toFixed(3))

    // ENCONTRANDO EQUAÇÃO DE PROJEÇÃO FUTURA
    var regressao = `y = ${a} * x + ${b}`

    // FAZER PROJEÇÃO
    var projetar = document.getElementById('projecao').value
    var numProjecao = document.getElementById('valorProjecao').value
    var projecao = 0
    var xOUy = ''

    switch (projetar) {
        case 'projetarX':
            projecao = (a * numProjecao + b).toFixed(2)
            xOUy = 'X'
            break
        case 'projetarY':
            projecao = ((b - numProjecao) / a).toFixed(2)
            xOUy = 'Y'
            break
    }

    if (projecao < 0) {
        projecao = projecao * -1
    }
    // MONTA LINHA DO GRAFICO
    var linha = []
    var menor = vetorY[0]
    var maior = vetorY[0]

    for (let i = 0; i < vetorY.length; i++) {
        if (vetorY[i] > maior) {
            maior = vetorY[i]
        }
        if (vetorY[i] < menor) {
            menor = vetorY[i]
        }
    }

    var yI = menor
    var yII = maior

    linha = [
        { x: (yI - b) / a, y: yI },
        { x: (yII - b) / a, y: yII }
    ]

    var scattered = []

    for (let i = 0; i < vetorY.length; i++) {
        scattered.push({ x: vetorX[i], y: vetorY[i] });
    }

    // MONTA LISTA
    var lista = `
    <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
            Coeficiente de Correlação:
            <span class="badge badge-dark badge-pill">${r}%</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
            Equação:
            <span class="badge badge-dark badge-pill">${regressao}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
            Projeção em ${xOUy}:
            <span class="badge badge-dark badge-pill">${projecao}</span>
        </li>
    </ul>`

    document.getElementById('equacao').innerHTML = lista
    criarGrafico(linha, scattered)
}

function criarGrafico(linha, scattered) {
    // GERANDO O GRÁFICO
    document.getElementById("grafico").innerHTML = '&nbsp;'
    document.getElementById("grafico").innerHTML = '<canvas id="myChart" width="600" height="400"></canvas>'

    var ctx = document.getElementById('myChart').getContext('2d');
    var CHART = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                type: 'line',
                label: 'X',
                data: linha,
                fill: false,
                backgroundColor: "#651fff",
                borderColor: "#651fff",
                showLine: true,
            }, {
                type: 'scatter',
                label: 'Y',
                data: scattered,
                backgroundColor: "#e65100",
                borderColor: "#e65100"
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }],
            }
        }
    });
}

// EX:
// x = 20;16;34;23;27;32;18;22
// y = 64;61;84;70;88;92;72;77