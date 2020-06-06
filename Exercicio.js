const rs = require('readline-sync');
const sqlite = require('sqlite3');

var db = new sqlite.Database('auladb.db', error => {
    if (error) {
        console.log(error.message);
    }
    // else {
    //     console.log('Criado com sucesso');
    // db.run("CREATE Table Carro (nome text, cor text, ano integer, valor float)")
    // }
});

var inserirCarros = (rs) => {
    var nome = rs.question('Insira o nome do carro: ');
    var cor = rs.question('Insira a cor do carro: ');
    var ano = rs.questionInt('Insira o ano do carro: ');
    var valor = rs.questionFloat('Insira o valor do carro: ');

    var insert = 'INSERT INTO Carro (nome, cor, ano, valor) VALUES (?, ?, ?, ?)';
    db.run(insert, [nome, cor, ano, valor], error => {
        if(error) {
            console.log(`Ocorreu um erro no programa: ${error.message}`);
            return;
        }
        console.log('Dado inserido com sucesso!')
    })
};

var deletarCarros = (rs) => {
    var nomeDoCarro = rs.question('Digite o nome do carro que deseja deletar: ');
    var query = "DELETE FROM Carro WHERE nome = ?";
    db.run(query, [nomeDoCarro], (error) => {
        error ? console.log('Ocorreu um erro: ' + error.message) : console.log('Carro deletado');
    })
};

var imprimirCarros = () => {
    var selecter = 'SELECT * FROM Carro';
    db.all(selecter, (error, listaDeCarros) => {
        if (error) {
            console.log(`Ocorreu um erro: ${error.message}`);
            return error;
        }
        var salvaCarrosEmArray = [];
        listaDeCarros.forEach(carro => {
            salvaCarrosEmArray.push(carro);
        })
        console.table(salvaCarrosEmArray);
    })
};

var carroMaisCaro = () => {
    var selecter = 'SELECT MAX(valor) FROM Carro';
    db.all(selecter, (error, listaDeCarros) => {
        if (error) {
            console.log(`Ocorreu um erro: ${error.message}`);
            return error;
        }
        var salvaCarrosEmArray = [];
        listaDeCarros.forEach(carro => {
            salvaCarrosEmArray.push(carro);
        })
        console.table(salvaCarrosEmArray);
    })
};

var carroMaisBarato = () => {
    var selecter = 'SELECT MIN(valor) FROM Carro';
    db.all(selecter, (error, listaDeCarros) => {
        if (error) {
            console.log(`Ocorreu um erro: ${error.message}`);
            return error;
        }
        var salvaCarrosEmArray = [];
        listaDeCarros.forEach(carro => {
            salvaCarrosEmArray.push(carro);
        })
        console.table(salvaCarrosEmArray);
    })
};

var carroEmOrdemDecrescente = () => {
    var selecter = 'SELECT * FROM Carro ORDER BY valor DESC';
    db.all(selecter, (error, listaDeCarros) => {
        if (error) {
            console.log(`Ocorreu um erro: ${error.message}`);
            return error;
        }
        var salvaCarrosEmArray = [];
        listaDeCarros.forEach(carro => {
            salvaCarrosEmArray.push(carro);
        })
        console.table(salvaCarrosEmArray);
    })
};

var quantidadeDeCarros = () => {
    var selecter = 'SELECT COUNT () FROM Carro';
    db.all(selecter, (error, listaDeCarros) => {
        if (error) {
            console.log(`Ocorreu um erro: ${error.message}`);
            return error;
        }
        listaDeCarros.forEach(carro => console.log(carro))
    })
};

var corDosCarros = (rs) => {
    var corDoCarro = rs.question('Insira uma cor a ser pesquisada: ');
    var selecter = 'SELECT * FROM Carro WHERE cor = ?';
    db.all(selecter, [corDoCarro],(error, listaDeCarros) => {
        if (error) {
            console.log(`Ocorreu um erro: ${error.message}`);
            return error;
        }
        listaDeCarros.forEach(carro => console.log(carro));
    })
};

var anoDosCarros = (rs) => {
    var anoDoCarro = rs.question('Insira um ano a ser pesquisado: ');
    var selecter = 'SELECT * FROM Carro WHERE ano = ?';
    db.all(selecter, [anoDoCarro],(error, listaDeCarros) => {
        if (error) {
            console.log(`Ocorreu um erro: ${error.message}`);
            return error;
        }
        listaDeCarros.forEach(carro => console.log(carro));
    })
};

var carrosMaisNovos = (rs) => {
    var anoDoCarro = rs.question('Insira um ano a ser pesquisado e serao retornados os carros mais novos que ele: ');
    var selecter = 'SELECT * FROM Carro WHERE ano > ?';
    db.all(selecter, [anoDoCarro],(error, listaDeCarros) => {
        if (error) {
            console.log(`Ocorreu um erro: ${error.message}`);
            return error;
        }
        listaDeCarros.forEach(carro => console.log(carro));
    })
};

var carrosMaisVelhos = (rs) => {
    var anoDoCarro = rs.question('Insira um ano a ser pesquisado e serao retornados os carros mais velhos que ele: ');
    var selecter = 'SELECT * FROM Carro WHERE ano < ?';
    db.all(selecter, [anoDoCarro],(error, listaDeCarros) => {
        if (error) {
            console.log(`Ocorreu um erro: ${error.message}`);
            return error;
        }
        listaDeCarros.forEach(carro => console.log(carro))
    })
};

while (true) {
    console.log(`1) Cadastrar novo veiculo\n2) Remover um veiculo por nome\n3) Ver os veiculos cadastrados\n4) Ver o carro mais carro\n5) Ver o carro mais barato\n6) Ver do mais caro para o mais barato\n7) Ver quantos carros existem\n8) Ver os carros por cor\n9) Ver os carros por ano\n10) Ver os carros mais velhos \n11) Ver os carros mais novos\n12) Escolha entre 1, 2, 3 e 4: `);
    var opcao = rs.question('> ');

    if (opcao != '1' && opcao != '2' && opcao != '3' && opcao != '4' && opcao != '5' && opcao != '6' && opcao != '7' && opcao != '8' && opcao != '9' && opcao != '10' && opcao != '11' && opcao != '12') {
        console.log('\nEscolha uma das opcoes disponiveis!\n');
    }
    else if (opcao == '1') {
        // cadastrarCarro(rs);
        inserirCarros(rs);
        break
    }
    else if (opcao == '2') {
        deletarCarros(rs);
        break
    }
    else if (opcao == '3') {
        imprimirCarros();
        break
    }
    else if (opcao == '4') {
        carroMaisCaro();
        break
    }
    else if (opcao == '5') {
        carroMaisBarato();
        break
    }
    else if (opcao == '6') {
        carroEmOrdemDecrescente();
        break
    }
    else if (opcao == '7') {
        quantidadeDeCarros();
        break
    }
    else if (opcao == '8') {
        corDosCarros(rs);
        break
    }
    else if (opcao == '9') {
        anoDosCarros(rs);
        break
    }
    else if (opcao == '10') {
        carrosMaisNovos(rs);
        break
    }
    else if (opcao == '11') {
        carrosMaisVelhos(rs);
        break
    }
    else {
        console.log('Bye')
        break
    }
};

// class Carros {
//     constructor(nome, cor, ano, valor) {
//         this.nome = nome;
//         this.cor = cor;
//         this.ano = ano;
//         this.valor = valor;
//     }
// };

// var cadastrarCarro = (rs) => {
//     var carro = new Carros();
//     carro.nome = rs.question('Insira o nome do carro: ');
//     carro.cor = rs.question('Insira a cor do carro: ');
//     carro.ano = rs.questionInt('Insira o ano do carro: ');
//     carro.valor = rs.questionFloat('Insira o valor do carro: ');
//     return carro;
// }