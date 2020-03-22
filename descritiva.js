//VARIÁVEIS GLOBAIS
var tipoDados = document.getElementsByName('tipoDados') // AMOSTRA OU POPULAÇÃO
var tipoVar = document.getElementsByName('tipoVar') // QUALI OU QUANTI


//var cont = 0 // QUANTIDADE TOTAL DE DADOS INSERIDOS

function calcular() {
    // CERTIFICAR QUE O USUÁRIO SELECIONOU AMOSTRA OU POPULAÇÃO
    if (tipoDados[0].checked == false && tipoDados[1].checked == false) {
        alert('Seleção de dados incompleta. Selecione Amostra ou População!')
    }

    // CERTIFICAR QUE O USUÁRIO SELECIONOU ALGUM TIPO DE VARIÁVEL(quali NOMINAL ou ORDINAL / quanti DISCRETA ou CONTÍNUA)
    if (tipoVar[0].checked == false && tipoVar[1].checked == false && tipoVar[2].checked == false && tipoVar[3].checked == false) {
        alert('Seleção de dados incompleta. Selecione o tipo da variável pesquisada!')
    }

    if (tipoVar[0].checked || tipoVar[2].checked) {
        separarOrdenar()
    } else if (tipoVar[3].checked) {
        continua()
    }
}

function separarOrdenar() {
    var dados = (document.getElementById('dados').value) // INSERÇÃO DE DADOS
    var vetor = [];
    vetor = dados.split(";"); // SEPARADOR POR ';'

    // ORDENAR: ORDEM CRESCENTE (number) OU ALFABÉTICA (astring)
    if (vetor[0] != Number) {
        vetor.sort()
    } else {
        vetor.sort(function (a, b) {
            return a - b;
        });
    }

    ////////////////////////////////////////////

    var total = vetor.length // TOTAL RECEBE O TAMANHO DO VETOR (QUANTIDADE DE ELEMENTOS)
    var vet2 = [], freq = [], freqR = [], fac = [], facP = [], ax = 0, ay = 0
    var cont = 0
    for (let i = 0; i < vetor.length; i++) {
        vet2[i] = vetor[i]
    }   // PASSA OS VALORES DO VETOR PARA VET2

    // EXCLUI ELEMENTOS REPETIDOS
    var vet2 = [...new Set(vetor)]

    // DESCOBRIR A FREQUÊNCIA DE CADA ELEMENTO 
    for (let i = 0; i < vet2.length; i++) {
        cont = 0;
        for (let j = 0; j < vetor.length; j++) {
            if (vet2[i] == vetor[j]) {
                cont++
            }
        }
        freq[i] = cont
    }

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

    console.log(vetor)
    console.log(vet2)
    console.log(total)
    console.log(freq)
    console.log(freqR)
    console.log(fac)
    console.log(facP)

}
function continua() {
    var dados = (document.getElementById('dados').value) // INSERÇÃO DE DADOS
    var vetor = []
    
    vetor = dados.split(";"); // SEPARADOR POR ';'

    // ORDENAR EM ORDEM CRESCENTE
    vetor.sort(function (a, b) {
        return a - b;
    });

    ////////////////////////////////////////////

    var total = vetor.length // TOTAL RECEBE O TAMANHO DO VETOR (QUANTIDADE DE ELEMENTOS)
    var vet2 = []
    for (let i = 0; i < vetor.length; i++) {
        vet2[i] = vetor[i]
    }   // PASSA OS VALORES DO VETOR PARA VET

    // EXCLUI ELEMENTOS REPETIDOS
    var vet2 = [...new Set(vetor)]

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

    console.log(vetor)
    console.log('total de elementos:' + total)
    console.log(vet2)
    console.log(`menor: ${min}, maior: ${max}`)
    console.log('amplitude: ' + at)
    console.log("n° de linhas" + cl)
    console.log('intervalo de classe: ' + ic)
}