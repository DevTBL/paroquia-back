const { Sequelize } = require('sequelize');

// Conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize('node', 'postgres', 'rodrigues123', {
  host: "localhost",
  port: 5433, // Porta padrão do PostgreSQL
  dialect: "postgres", // Indica que você está usando o PostgreSQL
});

// Teste a conexão
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:');
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
