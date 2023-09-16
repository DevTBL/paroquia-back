const db = require("./db");
const { DataTypes } = require('sequelize');

const Post = db.sequelize.define('post', {
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT
    },
    photo: {
        type: DataTypes.BLOB // Armazenar dados binários longos (imagens)
    },
    likes: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'posts',
    timestamps: true,
});

module.exports = Post;

Post.sync();
