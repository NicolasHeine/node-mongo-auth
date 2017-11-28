// Importer et configurer les composants de la route
let express = require('express');
let router = express.Router(); // Fonction permettant de définir les routes

// Importer le service
//let newsFeed = require('../services/news.service');

// Configurer la route => localhost:8080/
router.get('/', (req, res) => {
  res.render('index', {
    userName: 'Nicolas Heine',
  });
})

// Créer une route pour afficher un post unique
router.get('/add/post', (req, res) => {
  res.render('addPost');
})

// Exporter la route
module.exports = router;