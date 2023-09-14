const { Sequelize } = require('sequelize');

//Conection database
    const sequelize = new Sequelize('node', 'kainan', 'rodrigues123', {
        host: "localhost",
        port: 1433,
        dialect: "mssql"
    });
    
    //Test connection
    sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    }).catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
    });

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}