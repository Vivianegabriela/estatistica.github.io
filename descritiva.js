var medsep = 0
function iniciar() {
    var range = document.querySelector('div.separatriz input')
    var numRange = document.querySelector('span.valor')
    var medidaSep = document.getElementById("medidaSep")

    range.addEventListener('input', function () {
        numRange.textContent = this.value;
        if (medidaSep.value == "quartil") {
            range.min = 25
            range.max = 100
            range.step = 25
        } else if (medidaSep.value == "quintil") {
            range.min = 20
            range.max = 100
            range.step = 20
        } else if (medidaSep.value == "decil") {
            range.min = 10
            range.max = 100
            range.step = 10
        } else if (medidaSep.value == "porcentil") {
            range.min = 1
            range.max = 100
            range.step = 1
        }

        medsep = range.value
    })

}

function entrada() {
    var tipoDados = document.getElementsByName('tipoDados') // AMOSTRA OU POPULAÇÃO
    var tipoVar = document.getElementById('tipoVar').value // QUALI OU QUANTI
    var dados = (document.getElementById('dados').value) // INSERÇÃO DE DADOS

    calcular(tipoDados, tipoVar, dados)
}

function calcular(tipoDados, tipoVar, dados) {
    // SEPARADOR POR ';'
    var vetor = [];
    vetor = dados.split(";");

    // CERTIFICAR QUE O USUÁRIO SELECIONOU AMOSTRA OU POPULAÇÃO
    if (tipoDados[0].checked == false && tipoDados[1].checked == false) {
        alert('Seleção de dados incompleta. Selecione Amostra ou População!')
    }

    // TIPO VARIÁVEL
    switch (tipoVar) {
        case 'nominal':
            qualitativa(vetor)
            break;
        case 'ordinal':
            qualitativa(vetor)
            break;
        case 'discreta':
            quantitativa(vetor, tipoVar, tipoDados)
            break;
        case 'continua':
            quantitativa(vetor, tipoVar, tipoDados)
            break;
        default:
            alert('Seleção de dados incompleta. Selecione o tipo da variável pesquisada!')

    }
}

function qualitativa(vetor) {
    // TESTE NOMINAL: pg;pg;pg;pg;pg;pg;em;em;em;em;em;em;em;em;em;ef;ef;ef;ef;ef;ef;es;es;es;es;es;es;es;es;es

    // DADOS EM LETRA MAIÚSCULA
    for (var i = 0; i < vetor.length; i++) {
        vetor[i] = vetor[i].toUpperCase();
    }
    // ORDENAR
    vetor.sort();

    // TOTAL RECEBE O TAMANHO DO VETOR (QUANTIDADE DE ELEMENTOS)
    var total = vetor.length

    // PASSA OS VALORES DO VETOR PARA VET2
    var vet2 = []
    for (let i = 0; i < vetor.length; i++) {
        vet2[i] = vetor[i]
    }

    // EXCLUI ELEMENTOS REPETIDOS
    var vet2 = [...new Set(vetor)]

    // DESCOBRIR A FREQUÊNCIA DE CADA ELEMENTO
    var freq = []
    for (let i = 0; i < vet2.length; i++) {
        cont = 0;
        for (let j = 0; j < vetor.length; j++) {
            if (vet2[i] == vetor[j]) {
                cont++
            }
        }
        freq[i] = cont
    }

    // MAIOR VALOR DE FREQUÊNCIA
    var max = Math.max(...freq)

    var freqR = [], fac = [], ax = 0, facP = [], ay = 0, moda = []
    // FREQUÊNCIA RELATIVA (%)
    for (let i = 0; i < freq.length; i++) {
        freqR[i] = Number((freq[i] * 100 / total).toFixed(2))

        // FREQUÊNCIA ACUMULADA
        ax += freq[i]
        fac.push(ax)

        // FREQUÊNCIA ACUMULADA PERCENTUAL (%)
        ay += freqR[i]
        facP.push(ay)

        // MODA
        if (freq[i] == max) {
            moda.push(vet2[i])
        }
    }

    // VALIDAR MODA
    if (moda.length == freq.length) {
        moda = '- - -'
    }

    // MÉDIA
    var media = "- - -"

    // MEDIANA
    var md = 0
    if (total % 2 == 0) {
        var posicao = (total * 0.5) - 1
        if (vetor[posicao] == vetor[posicao + 1]) {
            md = `${vetor[posicao]}`
        } else {
            md = `${vetor[posicao]} e ${vetor[posicao + 1]}`
        }
    } else {
        var posicao = Math.round(total * 0.5)
        md = `${vetor[posicao - 1]}`
    }

    // MEDIDAS SEPARATRIZES
    var position = Math.floor(total * (medsep / 100))
    var medidaSep = document.getElementById('medidaSep').value
    var separatriz

    switch (medidaSep) {
        case 'quartil':
            separatriz = `Q${medsep}: ${vetor[position]}`
            break;
        case 'quintil':
            separatriz = `K${medsep}: ${vetor[position]}`
            break;
        case 'decil':
            separatriz = `D${medsep}: ${vetor[position]}`
            break;
        case 'porcentil':
            separatriz = `P${medsep}: ${vetor[position]}`
            break;
    }

    // MEDIDAS DE DISPERSÃO
    var variancia = '- - -'
    var dp = '- - -'
    var cv = '- - -'


    // CRIANDO A TABELA
    criarTabela(vet2, freq, freqR, fac, facP, media, md, moda, separatriz, variancia, dp, cv)


    console.log(vetor)
    console.log(`Total ${total}`)
    console.log(vet2)
    console.log(freq)
    console.log(freqR)
    console.log(fac)
    console.log(facP)
    console.log(`Media: ${media}`)
    console.log(`Mediana: ${md}`)
    console.log(`Moda: ${moda}`)
    console.log(separatriz)
}

function quantitativa(vetor, tipoVar, tipoDados, vet2, freq, freqR, fac, facP) {
    // STRING PARA NUMBER
    for (let i = 0; i < vetor.length; i++) {
        vetor[i] = Number(vetor[i])
    }

    // ORDENAR
    vetor.sort(function (a, b) {
        return a - b;
    });

    // TOTAL RECEBE O TAMANHO DO VETOR (QUANTIDADE DE ELEMENTOS)
    var total = vetor.length

    // PASSA OS VALORES DO VETOR PARA VET2
    var vet2 = []
    for (let i = 0; i < vetor.length; i++) {
        vet2[i] = vetor[i]
    }

    // EXCLUI ELEMENTOS REPETIDOS
    var vet2 = [...new Set(vetor)]

    // QUANTITATIVA DISCRETA
    //50;50;52;52;52;52;52;52;54;53;53;53;53;53;53;51;51;51;51;51

    switch (tipoVar) {
        case 'discreta':
            // DESCOBRIR A FREQUÊNCIA DE CADA ELEMENTO
            var freq = [], cont
            for (let i = 0; i < vet2.length; i++) {
                cont = 0;
                for (let j = 0; j < vetor.length; j++) {
                    if (vet2[i] == vetor[j]) {
                        cont++
                    }
                }
                freq[i] = cont
            }

            // MAIOR VALOR DE FREQUÊNCIA
            var max = Math.max(...freq)

            var freqR = [], fac = [], ax = 0, facP = [], ay = 0, moda = []
            cont = 0
            // FREQUÊNCIA RELATIVA (%)
            for (let i = 0; i < freq.length; i++) {
                freqR[i] = Number((freq[i] * 100 / total).toFixed(2))

                // FREQUÊNCIA ACUMULADA
                ax += freq[i]
                fac.push(ax)

                // FREQUÊNCIA ACUMULADA PERCENTUAL (%)
                ay += freqR[i]
                facP.push(ay)

                //  INÍCIO MÉDIA
                cont += (vet2[i] * freq[i])

                // MODA
                if (freq[i] == max) {
                    moda.push(vet2[i])
                }
            }

            // VALIDAR MODA
            if (moda.length == freq.length) {
                moda = '- - -'
            }

            // CONT. MÉDIA
            var media = (cont / total).toFixed(2)

            // MEDIANA
            var md = 0
            if (total % 2 == 0) {
                var posicao = (total * 0.5) - 1
                md = (vetor[posicao] + vetor[posicao + 1]) / 2
            } else {
                var posicao = Math.round(total * 0.5)
                md = vetor[posicao - 1]
            }

            // MEDIDAS SEPARATRIZES
            var position = Math.floor(total * (medsep / 100))
            var medidaSep = document.getElementById('medidaSep').value
            var separatriz

            switch (medidaSep) {
                case 'quartil':
                    separatriz = `Q${medsep}: ${vetor[position]}`
                    break;
                case 'quintil':
                    separatriz = `K${medsep}: ${vetor[position]}`
                    break;
                case 'decil':
                    separatriz = `D${medsep}: ${vetor[position]}`
                    break;
                case 'porcentil':
                    separatriz = `P${medsep}: ${vetor[position]}`
                    break;
            }

            // MEDIDAS DE DESPERSÃO
            var variancia, acu = 0, dp, cv
            for (let i = 0; i < freq.length; i++) {
                acu += (Math.pow((vet2[i] - media), 2)) * freq[i]
            }

            if (tipoDados[0].checked) {
                variancia = (acu / total).toFixed(2)
                dp = (Math.sqrt(variancia)).toFixed(2)
                cv = ((dp / media) * 100).toFixed(2)
            } else {
                variancia = (acu / (total - 1)).toFixed(2)
                dp = (Math.sqrt(variancia)).toFixed(2)
                cv = ((dp / media) * 100).toFixed(2)
            }
            // CRIANDO A TABELA
            criarTabela(vet2, freq, freqR, fac, facP, media, md, moda, separatriz, variancia, dp, cv)

            console.log(vetor)
            console.log(`Total ${total}`)
            console.log(vet2)
            console.log(freq)
            console.log(freqR)
            console.log(fac)
            console.log(facP)
            console.log(cont)
            console.log(`Media: ${media}`)
            console.log(`Mediana: ${md}`)
            console.log(`Moda: ${moda}`)
            console.log(separatriz)
            break;
        case 'continua':
            // QUANTITATIVA CONTÍNUA 
            // 29;18;30;20;27;19;19;28;18;19;45;22;27;28;39;19;19;23;19;20;19;18;32;56;22;21;20;21;24;26;30;18;28;26;20;21;29
            // AMPLITUDE
            var min = Math.min(...vetor)
            var max = Math.max(...vetor)
            var at = max - min

            // CLASSES/LINHAS
            var cl = Math.floor(Math.sqrt(total))
            var vetClass = [cl - 1, cl, cl + 1]

            // INTERVALO DE CLASSES
            for (let i = at + 1; i != 0; i++) {
                if (i % vetClass[0] == 0) {
                    at = i;
                    cl = vetClass[0];
                    break;
                } else if (i % vetClass[1] == 0) {
                    at = i;
                    cl = vetClass[1];
                    break;
                } else if (i % vetClass[2] == 0) {
                    at = i;
                    cl = vetClass[2];
                    break;
                }
            }
            var ic = at / cl

            // GERANDO TABELA
            var tabela = ''
            tabela += '<table class="table"><thead class="thead-dark">'
            tabela += '<tr>'
            tabela += '<th>Variável </th>'
            tabela += '<th>Fi </th>'
            tabela += '<th>FR (%) </th>'
            tabela += '<th>FAC </th>'
            tabela += '<th>FAC (%) </th>'
            tabela += '</tr> </thead>'
            tabela += '<tbody>'

            var menor = vet2[0]
            var maior = menor + ic
            var freq = [], cont, pMedio = [], cont2 = 0, md, vetMin = [], vetMax = []

            for (let i = 0; i < cl; i++) {

                // INCREMENTANDO VETOR
                vetMin.push(menor) // LIMITE INFERIOR DA LINHA
                vetMax.push(maior) // LIMITE SUPERIOR DA LINHA

                // FREQUÊNCIA SIMPLES
                cont = 0
                for (let j = 0; j < vetor.length; j++) {
                    if (vetor[j] >= menor && vetor[j] < maior) {
                        cont++
                    }
                }
                freq[i] = cont

                var freqR = [], fac = [], ax = 0, facP = [], ay = 0
                // FREQUÊNCIA RELATIVA (%)
                for (let j = 0; j < freq.length; j++) {
                    freqR[j] = Number((freq[j] * 100 / total).toFixed(2))

                    // FREQUÊNCIA ACUMULADA
                    ax += freq[j]
                    fac.push(ax)

                    // FREQUÊNCIA ACUMULADA PERCENTUAL (%)
                    ay += freqR[j]
                    facP.push(ay)
                }

                tabela += '<tr>'
                tabela += `<td> ${menor} |----- ${maior} </td>`
                tabela += `<td> ${freq[i]} </td>`
                tabela += `<td> ${freqR[i]} % </td>`
                tabela += `<td> ${fac[i]} </td>`
                tabela += `<td> ${Number(facP[i].toFixed(2))} % </td>`
                tabela += '</tr>'

                // INÍCIO MEDIA
                pMedio[i] = (menor + maior) / 2
                cont2 += (pMedio[i] * freq[i])

                // INCREMENTO COLUNA VARIÁVEL 
                menor = maior
                maior += ic
            }

            // CONT. MÉDIA
            var media = (cont2 / total).toFixed(2)

            // MEDIANA
            var posicao = (total * 0.5)
            for (let i = 0; i < ic; i++) {
                if (fac[0] >= posicao) {
                    md = Number(vetMin[i] + ((posicao - 0) / freq[i]) * ic).toFixed(2)
                    break
                } else if (fac[i] >= posicao) {
                    md = Number(vetMin[i] + ((posicao - fac[i - 1]) / freq[i]) * ic).toFixed(2)
                    break
                }
            }

            // MAIOR VALOR DE FREQUÊNCIA
            var maxFreq = Math.max(...freq)

            // MODA
            var moda = []
            for (let i = 0; i <= pMedio.length; i++) {
                if (freq[i] == maxFreq) {
                    moda.push(pMedio[i])
                }
            }

            // VALIDAR MODA
            if (moda.length == freq.length) {
                moda = '- - -'
            }

            // MEDIDAS SEPARATRIZES
            var position = Math.floor(total * (medsep / 100))
            var medidaSep = document.getElementById('medidaSep').value
            var separatriz

            switch (medidaSep) {
                case 'quartil':
                    separatriz = `Q${medsep}: ${vetor[position]}`
                    break;
                case 'quintil':
                    separatriz = `K${medsep}: ${vetor[position]}`
                    break;
                case 'decil':
                    separatriz = `D${medsep}: ${vetor[position]}`
                    break;
                case 'porcentil':
                    separatriz = `P${medsep}: ${vetor[position]}`
                    break;
            }

            // MEDIDAS DE DESPERSÃO
            var variancia, acu = 0, dp, cv
            for (let i = 0; i < freq.length; i++) {
                acu += (Math.pow((pMedio[i] - media), 2)) * freq[i]
            }

            if (tipoDados[0].checked) {
                variancia = (acu / total).toFixed(2)
                dp = (Math.sqrt(variancia)).toFixed(2)
                cv = ((dp / media) * 100).toFixed(2)
            } else {
                variancia = (acu / (total - 1)).toFixed(2)
                dp = (Math.sqrt(variancia)).toFixed(2)
                cv = ((dp / media) * 100).toFixed(2)
            }


            tabela += '</tbody> </table>'


            var list = ''
            list += '<ul class="list-group">'
            list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
            list += 'Média'
            list += `<span class="badge badge-dark badge-pill">${media}</span> </li>`
            list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
            list += 'Mediana'
            list += `<span class="badge badge-dark badge-pill">${md}</span></li>`
            list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
            list += 'Moda'
            list += `<span class="badge badge-dark badge-pill">${moda}</span></li>`
            list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
            list += 'Separatrizes'
            list += `<span class="badge badge-dark badge-pill" > ${separatriz}</span></li>`
            list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
            list += 'Variância'
            list += `<span class="badge badge-dark badge-pill">${variancia}</span></li>`
            list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
            list += 'Desvio Padrão'
            list += `<span class="badge badge-dark badge-pill">${dp}</span></li>`
            list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
            list += 'Coeficiente Variação'
            list += `<span class="badge badge-dark badge-pill">${cv}%</span></li>`
            list += '</ul>'

            document.getElementById('tab').innerHTML = tabela
            document.getElementById('list').innerHTML = list


            console.log('Vetor ordenado: ' + vetor)
            console.log('Vetor sem repetições: ' + vet2)
            console.log('Total de elementos: ' + total)
            console.log(`Menor: ${min}, Maior: ${max}`)
            console.log('Amplitude: ' + at)
            console.log("N° de linhas: " + cl)
            console.log('Intervalo de classe: ' + ic)
            console.log('Frequência simples: ' + freq)
            console.log('Ponto médio: ' + pMedio)
            console.log('Média Ponderada: ' + media)
            console.log('Mediana: ' + md)
            console.log('Moda: ' + moda)
            console.log(posicao)
            console.log(vetMin)
            console.log(vetMax)
            break;
    }
}

function criarTabela(vet2, freq, freqR, fac, facP, media, md, moda, separatriz, variancia, dp, cv) {
    // GERANDO TABELA
    var tabela = ''
    tabela += '<table class="table"><thead class="thead-dark">'
    tabela += '<tr>'
    tabela += '<th>Variável </th>'
    tabela += '<th>Fi </th>'
    tabela += '<th>FR (%) </th>'
    tabela += '<th>FAC </th>'
    tabela += '<th>FAC (%) </th>'
    tabela += '</tr> </thead>'
    tabela += '<tbody>'

    for (let i = 0; i < vet2.length; i++) {
        tabela += '<tr>'
        tabela += `<td> ${vet2[i]} </td>`
        tabela += `<td> ${freq[i]} </td>`
        tabela += `<td> ${freqR[i]} % </td>`
        tabela += `<td> ${fac[i]} </td>`
        tabela += `<td> ${facP[i]} % </td>`
        tabela += '</tr>'
    }
    tabela += '</tbody></table>'

    var list = ''
    list += '<ul class="list-group">'
    list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    list += 'Média'
    list += `<span class="badge badge-dark badge-pill">${media}</span> </li>`
    list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    list += 'Mediana'
    list += `<span class="badge badge-dark badge-pill">${md}</span></li>`
    list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    list += 'Moda'
    list += `<span class="badge badge-dark badge-pill">${moda}</span></li>`
    list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    list += 'Separatrizes'
    list += `<span class="badge badge-dark badge-pill" > ${separatriz}</span></li>`
    list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    list += 'Variância'
    list += `<span class="badge badge-dark badge-pill">${variancia}</span></li>`
    list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    list += 'Desvio Padrão'
    list += `<span class="badge badge-dark badge-pill">${dp}</span></li>`
    list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    list += 'Coeficiente de Variação'
    list += `<span class="badge badge-dark badge-pill">${cv}%</span></li>`
    list += '</ul>'

    document.getElementById('tab').innerHTML = tabela
    document.getElementById('list').innerHTML = list
}

//32;40;22;11;34;40;16;26;23;31;27;10;38;17;13;45;25;10;18;23;35;22;30;14;18;20;13;24;35;29;33;48;20;12;31;39;17;58;19;16;12;21;15;12;20;51;12;19;15;41;29;25;13;23;32;14;27;43;37;21;28;37;26;44;11;53;38;46;17;36;28;49;56;19;11