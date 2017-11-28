// Importer et configurer les composants de la route
let express = require('express');
let router = express.Router(); // Fonction permettant de définir les routes

// Importe MongoDB
let mongodb = require('mongodb');
let ObjectId = mongodb.ObjectId;
let MongoClient = mongodb.MongoClient;
let mongodbUrl = 'mongodb://localhost:27017/users'

// Importe Bcrypt
let bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


// Importer le service
//let newsFeed = require('../services/news.service');

router.post('/inscription', (req, res) => {
  // Ouvrir la connexion à la base MongoDB
  MongoClient.connect(mongodbUrl, (err, db) =>{
    // Tester la connexion
    if(err){
      res.send(err);
      // Fermer la connexion
      db.close();
    }else{
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let user ={
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          user: req.body.user,
          password: hash
        }
        db.collection('user').insert(user, (err, newUser) => {
          if(err){
            res.send(err);
          }else{
            res.render('profil', {
              userName: 'Nicolas Heine',
            });
          }
        })
        // Fermer la connexion
        db.close();
      });
    }
  })
});

router.post('/connexion', (req, res) => {
// Ouvrir la connexion à la base MongoDB
  MongoClient.connect(mongodbUrl, (err, db) =>{
    // Tester la connexion
    if(err){
      res.send(err);
    }else{
      // Récupération du user
      db.collection('user').find({user: req.body.user}).toArray((err, uniqUser) => {
        if(err){
          res.send(err);
        }else{
          if(uniqUser.length){
            bcrypt.compare(req.body.password, uniqUser[0].password, function(err, res) {
              if(res){
                res.render('profil', {
                  userName: 'Nicolas Heine',
                });
              }else{
                res.render('profil', {
                  userName: 'mauvais mdp',
                });
              }
            });
          }else{
            res.render('profil', {
              userName: 'ce user n\'existe pas',
            });
          }
        }
      })
    }

    // Fermer la connexion
    db.close();
  })
});

router.get('/delete/:id', (req, res) => {
// Ouvrir la connexion à la base MongoDB
  MongoClient.connect(mongodbUrl, (err, db) =>{
    // Tester la connexion
    if(err){
      res.send(err);
    }else{
      // Récupération de la collection
      db.collection('posts').remove({_id: new ObjectId(req.params.id)}, (err, uniqPost) => {
        if(err){
          res.send(err);
        }else{
          // On delete le post
          newsFeed.getAll(data => {
            // Renvoyer une vue html dans la réponse avec le tableau data
            res.render('index', {
              userName: 'Nicolas Heine',
              collection: data
            });
          });
        }
      })
    }

    // Fermer la connexion
    db.close();
  })
});

router.post('/post/add', (req, res) => {
  // Ouvrir la connexion à la base MongoDB
  MongoClient.connect(mongodbUrl, (err, db) =>{
    // Tester la connexion
    if(err){
      res.send(err);
    }else{
      // Récupération de la collection
      db.collection('posts').insert(req.body, (err, newPost) => {
        if(err){
          res.send(err);
        }else{
          newsFeed.getAll(data => {
            // Renvoyer une vue html dans la réponse avec le tableau data
            res.render('index', {
              userName: 'Nicolas Heine',
              collection: data
            });
          });
        }
      })
    }

    // Fermer la connexion
    db.close();
  })
});

// Exporter la route
module.exports = router;