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

modal.onclick = (e) => {
    if (e.target.classList.contains('modal-container')) {
        modal.classList.remove('active');
    }
};

btnSalvar.onclick = (e) => {
    e.preventDefault();

    if (email.value === '' || senha.value === '') {
        alert('Preencha todos os campos!');
        return;
    }

    let usuarios =
        JSON.parse(localStorage.getItem('usuarios')) || [];

    if (modo === 'cadastro') {

        const existe = usuarios.find(
            u => u.email === email.value
        );

        if (existe) {
            alert('Este email já está cadastrado!');
            return;
        }

        usuarios.push({
            email: email.value,
            senha: senha.value
        });

        localStorage.setItem(
            'usuarios',
            JSON.stringify(usuarios)
        );

        alert('Cadastro realizado com sucesso!');
        modal.classList.remove('active');
    }

    if (modo === 'login') {

        const usuario = usuarios.find(
            u =>
                u.email === email.value &&
                u.senha === senha.value
        );

        if (usuario) {

            localStorage.setItem(
                'usuarioLogado',
                email.value
            );

            window.location.href = 'salary.html';

        } else {
            alert('Email ou senha incorretos!');
        }
    }
};