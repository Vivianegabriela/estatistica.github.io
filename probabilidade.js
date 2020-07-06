function calcula() {
    // TIPO DE DISTRIBUIÇÃO 
    var distribuicao = document.getElementsByName('dist') // TIPO DISTRIBUIÇÃO: BINOMINAL, NORMAL OU UNIFORME


    if (distribuicao[0].checked == true) { // DISTRIBUIÇÃO BINOMINAL
        // ENTRADA DE DADOS
        var amostra = Number(document.getElementById('amost').value) // AMOSTRA
        var evento = document.getElementById('evento').value // EVENTOS
        var sucesso = Number(document.getElementById('sucesso').value)
        var fracasso = Number(document.getElementById('fracasso').value)

        // SEPARAR DADOS DO EVENTO POR ';'
        var vetor = []
        vetor = evento.split(";")

        // PROCESSAMENTO
        var sub = 0
        var ac, prob
        var porcento = 0

        // UM UNICO ELEMENTO COMO EVENTO
        if (vetor.length == 1) {
            sub = amostra - vetor[0]
            ac = fatorial(amostra) / (fatorial(vetor[0]) * fatorial(sub))   // ANALISE COMBINATÓRIA
            prob = ac * (Math.pow(sucesso, vetor[0])) * (Math.pow(fracasso, sub))   //PROBABILIDADE
            porcento = prob * 100   //PROBABILIDADE PERCENTUAL

            console.log(prob)
        } else {    // MAIS DE UM ELEMENTO COMO EVENTO
            ac = []
            prob = []
            for (let i = 0; i < vetor.length; i++) {
                sub = amostra - vetor[i]
                ac[i] = fatorial(amostra) / (fatorial(vetor[i]) * fatorial(sub))    // ANALISE COMBINATÓRIA
                prob[i] = (ac[i] * (Math.pow(sucesso, vetor[i])) * (Math.pow(fracasso, sub)))   //PROBABILIDADE
                porcento += Number(prob[i] * 100)    //PROBABILIDADE PERCENTUAL
            }
        }

        porcento = porcento.toFixed(2)
        // MÉDIA
        var media = amostra * sucesso

        // DESVIO PADRÃO
        var dp = (Math.sqrt(amostra * sucesso * fracasso)).toFixed(2)

        // COEFICIENTE DE VARIAÇÃO 
        var cv = ((dp / media) * 100).toFixed(2)

        // GERANDO LISTA COM VALORES
        var list = ''
        list += '<ul class="list-group">'
        list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
        list += 'Probabilidade (%)'
        list += `<span class="badge badge-dark badge-pill">${porcento}%</span> </li>`
        list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
        list += 'Média'
        list += `<span class="badge badge-dark badge-pill">${media}</span></li>`
        list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
        list += 'Desvio Padrão'
        list += `<span class="badge badge-dark badge-pill">${dp}</span></li>`
        list += '<li class="list-group-item d-flex justify-content-between align-items-center">'
        list += 'Coeficiente de Variação'
        list += `<span class="badge badge-dark badge-pill" > ${cv}%</span></li>`
        list += '</ul>'

        document.getElementById('resultadoBi').innerHTML = list

    } else if (distribuicao[1].checked == true) { // DISTRIBUIÇÃO NORMAL
        // ENTRADA DE DADOS
        var media = document.getElementById('media').value
        var dp = document.getElementById('dp').value
        var tipoDist = document.getElementsByName('tipo') // MENOR / ENTRE / MAIOR

        // TABELA DIST. NORMAL 
        var escore = [['0.0000', '0.0040', '0.0080', '0.0120', '0.0160', '0.0199', '0.0239', '0.0279', '0.0319', '0.0359', '0.0']]
        escore.push(['0.0398', '0.0438', '0.0478', '0.0517', '0.0557', '0.0596', '0.0636', '0.0675', '0.0714', '0.0753', '0.1'])
        escore.push(['0.0793', '0.0832', '0.0871', '0.0910', '0.0948', '0.0987', '0.1026', '0.1064', '0.1103', '0.1141', '0.2'])
        escore.push(['0.1179', '0.1217', '0.1255', '0.1293', '0.1331', '0.1368', '0.1406', '0.1443', '0.1480', '0.1517', '0.3'])
        escore.push(['0.1554', '0.1591', '0.1628', '0.1664', '0.1700', '0.1736', '0.1772', '0.1808', '0.1844', '0.1879', '0.4'])
        escore.push(['0.1915', '0.1950', '0.1985', '0.2019', '0.2054', '0.2088', '0.2123', '0.2157', '0.2190', '0.2224', '0.5'])
        escore.push(['0.2257', '0.2291', '0.2324', '0.2357', '0.2389', '0.2422', '0.2454', '0.2486', '0.2517', '0.2549', '0.6'])
        escore.push(['0.2580', '0.2611', '0.2642', '0.2673', '0.2703', '0.2734', '0.2764', '0.2794', '0.2823', '0.2852', '0.7'])
        escore.push(['0.2881', '0.2910', '0.2939', '0.2967', '0.2995', '0.3023', '0.3051', '0.3078', '0.3106', '0.3133', '0.8'])
        escore.push(['0.3159', '0.3186', '0.3212', '0.3238', '0.3264', '0.3289', '0.3315', '0.3340', '0.3365', '0.3389', '0.9'])

        escore.push(['0.3413', '0.3438', '0.3461', '0.3485', '0.3508', '0.3531', '0.3554', '0.3577', '0.3599', '0.3621', '1.0'])
        escore.push(['0.3643', '0.3665', '0.3686', '0.3708', '0.3729', '0.3749', '0.3770', '0.3790', '0.3810', '0.3830', '1.1'])
        escore.push(['0.3849', '0.3869', '0.3888', '0.3907', '0.3925', '0.3944', '0.3962', '0.3980', '0.3997', '0.4015', '1.2'])
        escore.push(['0.4032', '0.4049', '0.4066', '0.4082', '0.4099', '0.4115', '0.4131', '0.4147', '0.4162', '0.4177', '1.3'])
        escore.push(['0.4192', '0.4207', '0.4222', '0.4236', '0.4251', '0.4265', '0.4279', '0.4292', '0.4306', '0.4319', '1.4'])

        escore.push(['0.4332', '0.4345', '0.4357', '0.4370', '0.4382', '0.4394', '0.4406', '0.4418', '0.4429', '0.4441', '1.5'])
        escore.push(['0.4452', '0.4463', '0.4474', '0.4484', '0.4495', '0.4505', '0.4515', '0.4525', '0.4535', '0.4545', '1.6'])
        escore.push(['0.4554', '0.4564', '0.4573', '0.4582', '0.4591', '0.4599', '0.4608', '0.4616', '0.4625', '0.4633', '1.7'])
        escore.push(['0.4641', '0.4649', '0.4656', '0.4664', '0.4671', '0.4678', '0.4686', '0.4693', '0.4699', '0.4706', '1.8'])
        escore.push(['0.4713', '0.4719', '0.4726', '0.4732', '0.4738', '0.4744', '0.4750', '0.4756', '0.4761', '0.4767', '1.9'])

        escore.push(['0.4772', '0.4778', '0.4783', '0.4788', '0.4793', '0.4798', '0.4803', '0.4808', '0.4812', '0.4817', '2.0'])
        escore.push(['0.4821', '0.4826', '0.4830', '0.4834', '0.4838', '0.4842', '0.4846', '0.4850', '0.4854', '0.4857', '2.1'])
        escore.push(['0.4861', '0.4864', '0.4868', '0.4871', '0.4875', '0.4878', '0.4881', '0.4884', '0.4887', '0.4890', '2.2'])
        escore.push(['0.4893', '0.4896', '0.4898', '0.4901', '0.4904', '0.4906', '0.4909', '0.4911', '0.4913', '0.4916', '2.3'])
        escore.push(['0.4918', '0.4920', '0.4922', '0.4925', '0.4927', '0.4929', '0.4931', '0.4932', '0.4934', '0.4936', '2.4'])

        escore.push(['0.4938', '0.4940', '0.4941', '0.4943', '0.4945', '0.4946', '0.4948', '0.4949', '0.4951', '0.4952', '2.5'])
        escore.push(['0.4953', '0.4955', '0.4956', '0.4957', '0.4959', '0.4960', '0.4961', '0.4962', '0.4963', '0.4964', '2.6'])
        escore.push(['0.4965', '0.4966', '0.4967', '0.4968', '0.4969', '0.4970', '0.4971', '0.4972', '0.4973', '0.4974', '2.7'])
        escore.push(['0.4974', '0.4975', '0.4976', '0.4977', '0.4977', '0.4978', '0.4979', '0.4979', '0.4980', '0.4981', '2.8'])
        escore.push(['0.4981', '0.4982', '0.4982', '0.4983', '0.4984', '0.4984', '0.4985', '0.4985', '0.4986', '0.4986', '2.9'])

        escore.push(['0.4987', '0.4987', '0.4987', '0.4988', '0.4988', '0.4989', '0.4989', '0.4989', '0.4990', '0.4990', '3.0'])
        escore.push(['0.4990', '0.4991', '0.4991', '0.4991', '0.4992', '0.4992', '0.4992', '0.4992', '0.4993', '0.4993', '3.1'])
        escore.push(['0.4993', '0.4993', '0.4994', '0.4994', '0.4994', '0.4994', '0.4994', '0.4995', '0.4995', '0.4995', '3.2'])
        escore.push(['0.4995', '0.4995', '0.4995', '0.4996', '0.4996', '0.4996', '0.4996', '0.4996', '0.4996', '0.4997', '3.3'])
        escore.push(['0.4997', '0.4997', '0.4997', '0.4997', '0.4997', '0.4997', '0.4997', '0.4997', '0.4997', '0.4998', '3.4'])

        escore.push(['0.4998', '0.4998', '0.4998', '0.4998', '0.4998', '0.4998', '0.4998', '0.4998', '0.4998', '0.4998', '3.5'])
        escore.push(['0.4998', '0.4998', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '3.6'])
        escore.push(['0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '3.7'])
        escore.push(['0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '0.4999', '3.8'])
        escore.push(['0.5000', '0.5000', '0.5000', '0.5000', '0.5000', '0.5000', '0.5000', '0.5000', '0.5000', '0.5000', '3.9'])

        if (tipoDist[0].checked == true) {
            // MENOR QUE 
            var numTrans = document.getElementById('menorQue').value
            var escoreZ = parseFloat((numTrans - media) / dp).toFixed(2)

            // TRANSFORMA EM POSITIVO - CASO DÊ NEGATIVO 
            if (escoreZ < 0) {
                escoreZ *= -1
            }

            // TRANSFORMA EM STRING
            escoreZ = escoreZ.toString()

            var vertical = escoreZ.slice(0, 3) // NUMERO VERTICAL (1.2)
            var horizontal = Math.round((escoreZ - vertical) * 100) // NUMERO HORIZONTAL (1 a 10)

            // PROCURA O VALOR Z NA TABELA 
            for (let i = 0; i < escore.length; i++) {
                if (vertical == escore[i][10]) {
                    var z = Number(escore[i][horizontal])
                }
            }

            // CALCULA A PROBABILIDADE
            if (numTrans <= media) {
                var prob = ((0.5 - z) * 100).toFixed(2)
            } else if (numTrans > media) {
                var prob = ((0.5 + z) * 100).toFixed(2)
            }

            resultado(prob)

            console.log(`Primeira conta: ${escoreZ}`)
            console.log(`Numero vertical: ${vertical}`)
            console.log(`Numero horizontal: ${horizontal}`)
            console.log(`Escore Z: ${z}`)
            console.log(`Probabilidade: ${prob}`)

        } else if (tipoDist[1].checked == true) {
            var numMenor = document.getElementById('menor').value
            var numMaior = document.getElementById('maior').value
            var z1 = parseFloat((numMenor - media) / dp).toFixed(2)
            var z2 = parseFloat((numMaior - media) / dp).toFixed(2)

            // TRANSFORMA EM POSITIVO - CASO DÊ NEGATIVO 
            if (z1 < 0) {
                z1 *= -1
            }

            if (z2 < 0) {
                z2 *= -1
            }

            // TRANSFORMA EM STRING
            z1 = z1.toString()
            z2 = z2.toString()

            var vertical1 = z1.slice(0, 3)  // NUMERO VERTICAL (ex: 1,2)
            var horizontal1 = Math.round((z1 - vertical1) * 100)  // NUMERO HORIZONTAL (1 a 10)

            var vertical2 = z2.slice(0, 3) // NUMERO VERTICAL (ex: 1,2)
            var horizontal2 = Math.round((z2 - vertical2) * 100) // NUMERO HORIZONTAL (1 a 10)

            // PROCURA O VALOR Z NA TABELA 
            for (let i = 0; i < escore.length; i++) {
                if (vertical1 == escore[i][10]) {
                    var zMenor = Number(escore[i][horizontal1])
                }
            }

            // PROCURA O VALOR Z NA TABELA 
            for (let i = 0; i < escore.length; i++) {
                if (vertical2 == escore[i][10]) {
                    var zMaior = Number(escore[i][horizontal2])
                }
            }

            // CALCULA A PROBABILIDADE
            if ((numMenor < media) && (numMaior < media)) {
                var prob = ((zMenor - zMaior) * 100).toFixed(2)
            } else if ((numMenor > media) && (numMaior > media)) {
                var prob = ((zMaior - zMenor) * 100).toFixed(2)
            } else if ((numMenor < media) && (numMaior > media)) {
                var prob = ((zMaior + zMenor) * 100).toFixed(2)
            }

            resultado(prob)

            console.log(`Primeira conta: ${z1}`)
            console.log(`Primeira conta: ${z2}`)
            console.log(`Numero vertical: ${vertical1}`)
            console.log(`Numero horizontal: ${horizontal1}`)
            console.log(`Numero vertical: ${vertical2}`)
            console.log(`Numero horizontal: ${horizontal2}`)
            console.log(`Escore Z: ${zMenor}`)
            console.log(`Escore Z: ${zMaior}`)
            console.log(`Probabilidade: ${prob}`)


        } else if (tipoDist[2].checked == true) {
            // MAIOR QUE 
            var numTrans = document.getElementById('maiorQue').value
            var escoreZ = parseFloat((numTrans - media) / dp).toFixed(2)

            // TRANSFORMA EM POSITIVO - CASO DÊ NEGATIVO 
            if (escoreZ < 0) {
                escoreZ *= -1
            }

            // TRANSFORMA EM STRING
            escoreZ = escoreZ.toString()

            var verticalZ = escoreZ.slice(0, 3) // NUMERO VERTICAL (ex: 1,2)
            var horizontalZ = Math.round((escoreZ - verticalZ) * 100) // NUMERO HORIZONTAL (1 a 10)

            // PROCURA O VALOR Z NA TABELA 
            for (let i = 0; i < escore.length; i++) {
                if (verticalZ == escore[i][10]) {
                    var z = Number(escore[i][horizontalZ])
                }
            }

            // CALCULA A PROBABILIDADE
            if (numTrans >= media) {
                var prob = ((0.5 - z) * 100).toFixed(2)
            } else if (numTrans < media) {
                var prob = ((0.5 + z) * 100).toFixed(2)
            }
            resultado(prob)

            console.log(`Primeira conta: ${escoreZ}`)
            console.log(`Numero vertical: ${verticalZ}`)
            console.log(`Numero horizontal: ${horizontalZ}`)
            console.log(`Escore Z: ${z}`)
            console.log(`Probabilidade: ${prob}`)

        }
    } else if (distribuicao[2].checked == true) {
        var minimo = Number(document.getElementById('min').value)
        var maximo = Number(document.getElementById('max').value)
        var valores = document.getElementsByName('tiposDistUni')
        var densidade = 1 / (maximo - minimo)
        var pMedio = (minimo + maximo) / 2
        var variancia = ((Math.pow((maximo - minimo), 2)) / 12).toFixed(2)
        var dp = (Math.sqrt(variancia)).toFixed(2)
        var cv = ((dp / pMedio) * 100).toFixed(2)
        var prob = 0

        if (valores[0].checked == true) {
            var menosQue = document.getElementById('menorQueUni').value
            prob = ((densidade * (menosQue - minimo)) * 100).toFixed(2)

            resultadoUni(prob, variancia, dp, cv)

        } else if (valores[1].checked == true) {
            var menorEntre = document.getElementById('menorUni').value
            var maiorEntre = document.getElementById('maiorUni').value
            var intervalo = maiorEntre - menorEntre
            prob = (densidade * intervalo * 100).toFixed(2)

            resultadoUni(prob, variancia, dp, cv)

        } else if (valores[2].checked == true) {
            var maisQue = document.getElementById('maiorQueUni').value
            prob = ((densidade * (maximo - maisQue)) * 100).toFixed(2)

            resultadoUni(prob, variancia, dp, cv)

        }
    }
}

function fatorial(n) {
    if ((n == 0) || (n == 1)) {
        return 1;
    } else {
        var acumula = 1;
        for (x = n; x > 1; x--) {
            acumula = acumula * x;
        }
        return acumula;
    }
}

function resultado(prob) {
    var resul = ''
    resul += '<ul class="list-group">'
    resul += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    resul += 'Probabilidade (%)'
    resul += `<span class="badge badge-dark badge-pill">${prob}%</span> </li>`
    resul += '</ul>'

    document.getElementById('resultadoNormal').innerHTML = resul
}

function resultadoUni(prob, variancia, dp, cv) {
    var resul = ''
    resul += '<ul class="list-group">'
    resul += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    resul += 'Probabilidade (%)'
    resul += `<span class="badge badge-dark badge-pill">${prob}%</span> </li>`
    resul += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    resul += 'Variância'
    resul += `<span class="badge badge-dark badge-pill">${variancia}</span> </li>`
    resul += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    resul += 'Desvio Padrão'
    resul += `<span class="badge badge-dark badge-pill">${dp}</span> </li>`
    resul += '<li class="list-group-item d-flex justify-content-between align-items-center">'
    resul += 'Coeficiente de Variação (%)'
    resul += `<span class="badge badge-dark badge-pill">${cv}%</span> </li>`
    resul += '</ul>'

    document.getElementById('resultadoUniforme').innerHTML = resul
}