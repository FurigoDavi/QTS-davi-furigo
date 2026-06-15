const modal = document.querySelector('.modal-container');
const modalTitle = document.querySelector('#modalTitle');
const email = document.querySelector('#m-email');
const senha = document.querySelector('#m-senha');
const btnSalvar = document.querySelector('#btnSalvar');

let modo = '';

function openCadastro() {
    modo = 'cadastro';

    modal.classList.add('active');
    modalTitle.innerText = 'Cadastro';
    btnSalvar.innerText = 'Cadastrar';
}

function openLogin() {
    modo = 'login';

    modal.classList.add('active');
    modalTitle.innerText = 'Login';
    btnSalvar.innerText = 'Entrar';
}

btnSalvar.onclick = async (e) => {

    e.preventDefault();

    const dados = {
        email: email.value,
        senha: senha.value
    };

    try {

        if (modo === 'cadastro') {

            const resposta = await fetch(
                'http://localhost:3000/api/cadastro',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dados)
                }
            );

            const resultado = await resposta.json();

            if (!resposta.ok) {
                alert(resultado.error);
                return;
            }

            alert('Cadastro realizado!');
        }

        if (modo === 'login') {

            const resposta = await fetch(
                'http://localhost:3000/api/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dados)
                }
            );

            const resultado = await resposta.json();

            if (!resposta.ok) {
                alert(resultado.error);
                return;
            }

            localStorage.setItem(
                'usuarioLogado',
                resultado.usuario.email
            );

            window.location.href = 'salary.html';
        }

    } catch (erro) {
        alert('Erro ao conectar ao servidor');
        console.error(erro);
    }
};