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

    email.value = '';
    senha.value = '';
}

function openLogin() {
    modo = 'login';

    modal.classList.add('active');
    modalTitle.innerText = 'Login';
    btnSalvar.innerText = 'Entrar';

    email.value = '';
    senha.value = '';
}

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-container')) {
        modal.classList.remove('active');
    }
});

btnSalvar.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!email.value || !senha.value) {
        alert('Preencha todos os campos!');
        return;
    }

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

            alert('Cadastro realizado com sucesso!');
            modal.classList.remove('active');
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
        console.error(erro);
        alert('Erro ao conectar com o servidor.');
    }
});