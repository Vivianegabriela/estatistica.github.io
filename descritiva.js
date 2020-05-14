function entrada() {
    var tipoDados = document.getElementsByName('tipoDados') // AMOSTRA OU POPULAÇÃO
    var tipoVar = document.getElementsByName('tipoVar') // QUALI OU QUANTI
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

    // CERTIFICAR QUE O USUÁRIO SELECIONOU ALGUM TIPO DE VARIÁVEL(quali NOMINAL ou ORDINAL / quanti DISCRETA ou CONTÍNUA)
    if (tipoVar[0].checked || tipoVar[1].checked) {
        qualitativa(vetor)
    } else if (tipoVar[2].checked || tipoVar[3].checked) {
        quantitativa(vetor, tipoVar)
    } else {
        alert('Seleção de dados incompleta. Selecione o tipo da variável pesquisada!')
    }
}

function qualitativa(vetor, vet2, freq, freqR, fac, facP) {
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

    // CRIANDO A TABELA
    criarTabela(vet2, freq, freqR, fac, facP, media, md, moda)


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
}

function quantitativa(vetor, tipoVar, vet2, freq, freqR, fac, facP) {
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

    if (tipoVar[2].checked) {
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
        var media = cont / total

        // MEDIANA
        var md = 0
        if (total % 2 == 0) {
            var posicao = (total * 0.5) - 1
            md = (vetor[posicao] + vetor[posicao + 1]) / 2
        } else {
            var posicao = Math.round(total * 0.5)
            md = vetor[posicao - 1]
        }

        // CRIANDO A TABELA
        criarTabela(vet2, freq, freqR, fac, facP, media, md, moda)

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

    } else {    // QUANTITATIVA CONTÍNUA 
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
        tabela += '<th>Frequência Simples </th>'
        tabela += '<th>Frequência Relativa (%) </th>'
        tabela += '<th>Frequência Acumulada </th>'
        tabela += '<th>Frequência Acumulada (%) </th>'
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


        tabela += '</tbody> </table>'
        tabela += `<p> Media: ${media}  |   Mediana: ${md}  |   Moda: ${moda} </p>`
        document.getElementById('tab').innerHTML = tabela


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
    }
}

function criarTabela(vet2, freq, freqR, fac, facP, media, md, moda) {
    var tabela = ''
    tabela += '<table><thead>'
    tabela += '<tr>'
    tabela += '<th>Variável </th>'
    tabela += '<th>Frequência Simples </th>'
    tabela += '<th>Frequência Relativa (%) </th>'
    tabela += '<th>Frequência Acumulada </th>'
    tabela += '<th>Frequência Acumulada (%) </th>'
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
    tabela += `<table>`
    tabela += '<thead><tr>'
    tabela += `<th> Media: ${media} </th>`
    tabela += `<th> Mediana: ${md} </th>`
    tabela += `<th> Moda: ${moda} </th>`
    tabela += `</tr> </thead>`
    tabela += '</table>'

    document.getElementById('tab').innerHTML = tabela
}

//32;40;22;11;34;40;16;26;23;31;27;10;38;17;13;45;25;10;18;23;35;22;30;14;18;20;13;24;35;29;33;48;20;12;31;39;17;58;19;16;12;21;15;12;20;51;12;19;15;41;29;25;13;23;32;14;27;43;37;21;28;37;26;44;11;53;38;46;17;36;28;49;56;19;11