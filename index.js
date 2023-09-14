const express = require("express");
const {engine} = require("express-handlebars"); // Correção: Importe exphbs, não engine
const bodyparser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ storage: multer.memoryStorage() }); // Configure o armazenamento de memória
const app = express();

const Post = require('./models/Post');

// Config
// Permite requisição de outro endereço URL, CORS
// Vai aceitar requisições apenas de :3000
const corsOptions = {
    origin: 'http://localhost:3000',
  };
  
  // Configure o CORS com opções
  app.use(cors(corsOptions));
  

// Template Engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Routes
app.get('/', function (req, res) {
    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) {
      // Pré-processar os dados das imagens para base64
      const postsWithBase64Images = posts.map((post) => ({
        ...post.dataValues,
        photo: post.dataValues.photo.toString('base64'),
      }));
  
      res.render('home', { posts: postsWithBase64Images });
    });
  });

  // Modifique sua rota para retornar os dados como JSON
app.get('/api/posts', function (req, res) {
    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) {
      // Pré-processar os dados das imagens para base64
      const postsWithBase64Images = posts.map((post) => ({
        ...post.dataValues,
        photo: post.dataValues.photo.toString('base64'),
      }));
  
      res.json(postsWithBase64Images);
    });
  });
  

    // Modifique sua rota para retornar os dados como JSON
app.get('/api/posts/:id', function (req, res) {
    const postId = req.params.id;

    Post.findByPk(postId)
      .then(function (post) {
        if (!post) {
          return res.status(404).send('Post não encontrado');
        }

        return post;
      }).then((posts) => { // Alteração aqui: Renomeie a variável para evitar conflitos
              // Pré-processar os dados das imagens para base64
        const postsWithBase64Images = {
            ...posts.dataValues,
            photo: posts.dataValues.photo.toString('base64'),
        };
        res.json({ postsWithBase64Images });
      }).catch((error) =>  {
        console.error('Erro ao buscar post:', error);
        res.status(500).json({ error: 'Erro ao buscar post:' });
      });
    })
  

  

app.get('/createPost', function (req, res) {
  res.render('forms');
});

app.post('/send', upload.single('photo'), function (req, res) {
  var title = req.body.title;
  const content = req.body.content.replace(/\r\n/g, '\n'); // Substituir quebras de linha por \n


  if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
    return res.status(400).send('O arquivo de imagem está vazio ou não foi carregado corretamente.');
}

  var photo = req.file;

  Post.create({
    title: title,
    content: content,
    photo: photo.buffer
  }).then(function () {
    res.redirect('/');
  }).catch(function (error) {
    res.status(500).send('An error has occurred ' + error);
  });
});

app.post('/like/:id', (req, res) => {
    // 1. Obtém o ID do post a ser atualizado a partir dos parâmetros da rota
    const postId = req.params.id;
  
    // 2. Encontra o post no banco de dados pelo ID
    Post.findByPk(postId)
      .then(function (post) {
        if (!post) {
          return res.status(404).send('Post não encontrado');
        }
  
        // 3. Atualiza o número de likes
        post.likes += 1;
  
        // 4. Salva as alterações no banco de dados
        return post.save();
      }).then((updatedPost) => { // Alteração aqui: Renomeie a variável para evitar conflitos
        const newLikes = updatedPost.likes;
        res.json({ likes: newLikes });
      }).catch((error) =>  {
        console.error('Erro ao atualizar likes:', error);
        res.status(500).json({ error: 'Erro ao atualizar likes' });
      });
});

  



app.get('/delete/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send('Post deleted');
    }).catch(function(error){
        res.send('Post not found');
    });
});

app.listen(8081, function () {
  console.log("Server running in http://localhost:8081");
});
