# Cadastro de Usuário (Java + Swing + MySQL)

Programa completo baseado no passo a passo do documento enviado: uma tela de
cadastro (Nome, CPF, Email, Telefone) que grava os dados numa tabela MySQL.

## Estrutura

```
projetojava/
├── database.sql              → script para criar o banco e a tabela
├── lib/                      → coloque aqui o driver JDBC do MySQL (.jar)
└── src/
    ├── factory/
    │   ├── ConnectionFactory.java   → abre a conexão com o MySQL
    │   └── TestaConexao.java        → classe simples para testar a conexão
    ├── modelo/
    │   └── Usuario.java             → classe "bean" (getters/setters)
    ├── dao/
    │   └── UsuarioDAO.java          → método adiciona() que faz o INSERT
    └── gui/
        └── UsuarioGUI.java          → tela (Swing) com os botões Cadastrar/Limpar/Sair
```

## Pré-requisitos

1. **MySQL Server** instalado e rodando (local ou XAMPP/WAMP/Docker).
2. **JDK** instalado (Java 8 ou superior). Verifique com `java -version`.
3. **Driver JDBC do MySQL** (Connector/J), arquivo `.jar`. Baixe em:
   https://dev.mysql.com/downloads/connector/j/
   (escolha "Platform Independent", extraia o `.zip`/`.tar.gz` e pegue o
   arquivo `mysql-connector-j-X.X.X.jar`).

## Passo 1 — Criar o banco de dados

Abra o MySQL Workbench (ou o cliente `mysql` no terminal) e rode o conteúdo
de `database.sql`:

```bash
mysql -u root -p < database.sql
```

## Passo 2 — Colocar o driver JDBC no projeto

Copie o arquivo `mysql-connector-j-X.X.X.jar` que você baixou para dentro da
pasta `lib/` deste projeto.

## Passo 3 — Ajustar usuário/senha do MySQL (se necessário)

Por padrão o código usa usuário `root` e senha em branco, igual ao tutorial.
Se o seu MySQL tiver senha, ou rodar em outra porta, edite:

`src/factory/ConnectionFactory.java`

```java
return DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/projetojava?useTimezone=true&serverTimezone=UTC",
        "root",
        "SUA_SENHA_AQUI"
);
```

## Passo 4 — Compilar e executar (via terminal, sem precisar do NetBeans)

Na pasta `projetojava/`, rode:

**Linux/Mac:**
```bash
mkdir -p bin
javac -cp "lib/*" -d bin $(find src -name "*.java")
java -cp "bin:lib/*" gui.UsuarioGUI
```

**Windows (PowerShell/cmd):**
```bat
mkdir bin
javac -cp "lib\*" -d bin (dir /s /b src\*.java)
java -cp "bin;lib\*" gui.UsuarioGUI
```

Isso deve abrir a janela "Cadastro de Usuário" com os campos Nome, CPF,
Email, Telefone e os botões **Cadastrar**, **Limpar** e **Sair**.

## Passo 5 — Testar

1. Preencha os 4 campos e clique em **Cadastrar** → deve aparecer a mensagem
   de sucesso.
2. Clique em **Limpar** para apagar os campos.
3. Clique em **Sair** para fechar a janela.
4. Confira no MySQL:
   ```sql
   use projetojava;
   select * from usuario;
   ```

## Alternativa: abrir no NetBeans

Se preferir usar o NetBeans (como no tutorial original), crie um novo
"Aplicativo Java" chamado `MinhaAplicacao`, copie os arquivos de `src/` para
dentro dos pacotes correspondentes (`factory`, `modelo`, `dao`, `gui`) e
adicione o `.jar` do driver em **Bibliotecas → Adicionar JAR/Pasta**. Depois
é só rodar a classe `UsuarioGUI` (botão direito → Run File).

## Erros comuns

- **`com.mysql.cj.jdbc.Driver` não encontrado / ClassNotFoundException** →
  o `.jar` do driver não está no classpath (confira o `-cp`).
- **`Access denied for user 'root'@'localhost'`** → usuário/senha errados em
  `ConnectionFactory.java`.
- **`Communications link failure`** → o MySQL não está rodando, ou está em
  outra porta (ajuste `localhost:3306` na URL de conexão).
- **`Unknown database 'projetojava'`** → esqueceu de rodar o `database.sql`.



## Eu, Davi Furigo realizei o README.md com IA