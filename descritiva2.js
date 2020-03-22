function entrarDados() {
    var tipoDados = document.getElementsByName('tipoDados') // AMOSTRA OU POPULAÇÃO
    var tipoVar = document.getElementsByName('tipoVar') // QUALI OU QUANTI
    var dados = (document.getElementById('dados').value) // INSERÇÃO DE DADOS
    var nome = document.getElementById('nomeVar')

    calcular(tipoDados, tipoVar, dados, nome)
}


function calcular(tipoDados, tipoVar, dados, nome) {
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
    // TESTE NOMINAL: verde;azul;verde;amarelo;rosa;rosa;azul;rosa;rosa;amarelo;verde;verde

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

    var freqR = [], fac = [], ax = 0, facP = [], ay = 0
    // FREQUÊNCIA RELATIVA (%)
    for (let i = 0; i < freq.length; i++) {
        freqR[i] = Number((freq[i] * 100 / total).toFixed(2))
    }

    // FREQUÊNCIA ACUMULADA
    for (let i = 0; i < freq.length; i++) {
        ax += freq[i]
        fac.push(ax)
    }

    // FREQUÊNCIA ACUMULADA PERCENTUAL (%)
    for (let i = 0; i < freqR.length; i++) {
        ay += freqR[i]
        facP.push(ay)
    }

    // CRIANDO A TABELA
    criarTabela(vet2, freq, freqR, fac, facP)


    console.log(vetor)
    console.log(`Total ${total}`)
    console.log(vet2)
    console.log(freq)
    console.log(freqR)
    console.log(fac)
    console.log(facP)
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

        var freqR = [], fac = [], ax = 0, facP = [], ay = 0
        // FREQUÊNCIA RELATIVA (%)
        for (let i = 0; i < freq.length; i++) {
            freqR[i] = Number((freq[i] * 100 / total).toFixed(2))
        }

        // FREQUÊNCIA ACUMULADA
        for (let i = 0; i < freq.length; i++) {
            ax += freq[i]
            fac.push(ax)
        }

        // FREQUÊNCIA ACUMULADA PERCENTUAL (%)
        for (let i = 0; i < freqR.length; i++) {
            ay += freqR[i]
            facP.push(ay)
        }

        // CRIANDO A TABELA
        criarTabela(vet2, freq, freqR, fac, facP)

        console.log(vetor)
        console.log(`Total ${total}`)
        console.log(vet2)
        console.log(freq)
        console.log(freqR)
        console.log(fac)
        console.log(facP)

    } else {    // QUANTITATIVA CONTÍNUA 
        // AMPLITUDE
        var min = Math.min(...vetor)
        var max = Math.max(...vetor)
        var at = max - min

        // CLASSES/LINHAS
        var cl = Math.round(Math.sqrt(total))
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
        ic = at / cl

        // DESCOBRIR A FREQUÊNCIA DE CADA ELEMENTO
        var freq = []
        var left = vetor[0]
        var right = left + ic
        
        for (let i = 0; i < cl; i++) {
            cont = 0
            for (let j = 0; vetor[j] < right; j++) {
                if (vetor[j] < right) {
                    cont++
                }
            }
            freq[i] = cont
            right+= ic
        }

        // TESTE QUANTI CONTÍNUA
        // 29;18;30;20;27;19;19;28;18;19;45;22;27;28;39;19;19;23;19;20;19;18;32;56;22;21;20;21;24;26;30;18;28;26;20;21;29

        // VINCULAR A VARIAVEL À TAG tbody DO ARQUIVO HTML
        var tbody = document.querySelector('tbody')
        var menor = vet2[0]
        var maior = menor + ic
        for (let i = 0; i < cl; i++) {
            // CRIA UMA LINHA
            var linha = document.createElement('tr')

            // CRIA AS COLUNAS DA LINHA
            var element = document.createElement('td')
            var frequencia = document.createElement('td')

            // ENDEREÇA OS VALORES ÀS VARIAVEIS 
            var element_text = document.createTextNode(menor + ' |--- ' + maior)
            var frequencia_text = document.createTextNode(freq[i])

            // ATRIBUI OS VALORES ÀS VARIAVEIS DA COLUNA
            element.appendChild(element_text)
            frequencia.appendChild(frequencia_text)

            linha.appendChild(element)
            linha.appendChild(frequencia)

            // ATRIBUI ONDE A LINHA DEVE SER CRIADA NO ARQUIVO HTML
            tbody.appendChild(linha)

            // INCREMENTO COLUNA VARIÁVEL 
            menor = maior
            maior = maior + ic
        }


        console.log(vetor)
        console.log('total de elementos:' + total)
        console.log(vet2)
        console.log(`menor: ${min}, maior: ${max}`)
        console.log('amplitude: ' + at)
        console.log("n° de linhas: " + cl)
        console.log('intervalo de classe: ' + ic)
        console.log(freq)
    }


}

function criarTabela(vet2, freq, freqR, fac, facP) {
    // CRIANDO AS TABELAS: QUALI Nominal e Ordinal / QUANTI Discreta

    // VINCULAR A VARIAVEL À TAG tbody DO ARQUIVO HTML
    var tbody = document.querySelector('tbody')
    for (let i = 0; i < vet2.length; i++) {
        // CRIA UMA LINHA
        var linha = document.createElement('tr')

        // CRIA AS COLUNAS DA LINHA
        var element = document.createElement('td')
        var frequencia = document.createElement('td')
        var freqP = document.createElement('td')
        var freqA = document.createElement('td')
        var freqAcP = document.createElement('td')

        // ENDEREÇA OS VALORES ÀS VARIAVEIS 
        var element_text = document.createTextNode(vet2[i])
        var frequencia_text = document.createTextNode(freq[i])
        var freqP_text = document.createTextNode(`${freqR[i]} %`)
        var freqA_text = document.createTextNode(fac[i])
        var freqAcP_text = document.createTextNode(`${facP[i]} %`)

        // ATRIBUI OS VALORES ÀS VARIAVEIS DA COLUNA
        element.appendChild(element_text)
        frequencia.appendChild(frequencia_text)
        freqP.appendChild(freqP_text)
        freqA.appendChild(freqA_text)
        freqAcP.appendChild(freqAcP_text)

        linha.appendChild(element)
        linha.appendChild(frequencia)
        linha.appendChild(freqP)
        linha.appendChild(freqA)
        linha.appendChild(freqAcP)

        // ATRIBUI ONDE A LINHA DEVE SER CRIADA NO ARQUIVO HTML
        tbody.appendChild(linha)
    }
}