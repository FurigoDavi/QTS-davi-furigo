package factory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// Fábrica de conexões: centraliza a criação da conexão com o banco MySQL
public class ConnectionFactory {

    public Connection getConnection() {
        try {
            // Altere usuário/senha/porta conforme sua instalação do MySQL, se necessário
            return DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/projetojava?useTimezone=true&serverTimezone=UTC",
                    "root",
                    ""
            );
        } catch (SQLException excecao) {
            throw new RuntimeException(excecao);
        }
    }
}
