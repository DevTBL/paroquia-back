const db = require("./db");

const Post = db.sequelize.define('post', {
    title: {
        type: db.Sequelize.STRING
    },
    content: {
        type: db.Sequelize.TEXT
    },
    photo: {
        type: db.Sequelize.BLOB('long') // Use BLOB para armazenar dados binários longos (imagens)
    },
    likes: {
        type: db.Sequelize.INTEGER
    }
});

module.exports = Post;

//Post.sync({force: true})