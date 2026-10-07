const API_BASE = 'http://localhost:3000/api/funcionarios';

const modal = document.querySelector('#modal');

const form = document.querySelector('#form');

const nome = document.querySelector('#m-nome');
const funcao = document.querySelector('#m-funcao');
const salario = document.querySelector('#m-salario');

const tabela = document.querySelector('#tabelaFuncionarios');

const botaoNovo = document.querySelector('#new');

let funcionarioEditando = null;

/*------------------------------------------*/

console.log("JavaScript carregado!");

botaoNovo.onclick = () => {

    funcionarioEditando = null;

    nome.value = '';
    funcao.value = '';
    salario.value = '';

    modal.classList.add('active');
};

/*------------------------------------------*/

modal.onclick = (event) => {

    if (event.target === modal) {
        modal.classList.remove('active');
    }

};

/*------------------------------------------*/

async function carregarFuncionarios() {

    const resposta = await fetch(API_BASE);

    const funcionarios = await resposta.json();

    tabela.innerHTML = '';

    funcionarios.forEach(funcionario => {

        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.funcao}</td>
            <td>R$ ${Number(funcionario.salario).toFixed(2)}</td>

            <td>
                <button onclick="editarFuncionario(${funcionario.id})">
                    Editar
                </button>
            </td>

            <td>
                <button onclick="excluirFuncionario(${funcionario.id})">
                    Excluir
                </button>
            </td>
        `;

        tabela.appendChild(linha);

    });
}

/*-------------------------------------------------*/

form.onsubmit = async (event) => {

    event.preventDefault();

    const dados = {
        nome: nome.value,
        funcao: funcao.value,
        salario: salario.value
    };

    if (funcionarioEditando === null) {

        await fetch(API_BASE, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(dados)
        });

    } else {

        await fetch(`${API_BASE}/${funcionarioEditando}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(dados)
        });

    }

    modal.classList.remove('active');

    carregarFuncionarios();

};

/*-------------------------------------------------*/

async function editarFuncionario(id) {

    const resposta = await fetch(API_BASE);

    const funcionarios = await resposta.json();

    const funcionario = funcionarios.find(
        item => item.id === id
    );

    nome.value = funcionario.nome;
    funcao.value = funcionario.funcao;
    salario.value = funcionario.salario;

    funcionarioEditando = id;

    modal.classList.add('active');
}

/*-------------------------------------------------*/

async function excluirFuncionario(id) {

    const confirmar = confirm(
        'Deseja realmente excluir este funcionário?'
    );

    if (!confirmar) {
        return;
    }

    await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
    });

    carregarFuncionarios();
}

carregarFuncionarios();