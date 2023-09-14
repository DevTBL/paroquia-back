const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('node', 'kainan', 'rodrigues123', {
    host: "localhost",
    port: 1433, // Corrija a porta para 3306
    dialect: "mssql"
});



const Postagem = sequelize.define('postagens', {
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    }
});

const User = sequelize.define('users', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.TEXT
    },
    age: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});

/* User.create({
    firstname: "Kainan",
    lastname: "Rodrigues",
    age: 21,
    email: "kainan.ars@gmail.com"
})
 */