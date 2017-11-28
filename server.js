// Importer les composants pour créer un serveur
let express = require('express'); // Express permet de construire le serveur NodeJS
let bodyParser = require('body-parser'); // Permet d'analyser les requêtes sur le serveur

// Importer le module de la route front
let front = require('./routes/front');
let api = require('./routes/api');

// Définir le port de l'application
let port = 8080;

// Initier le serveur
let app = express();

// Intégrer BodyParser dans le serveur
app.use(bodyParser.urlencoded({extended: false}));

// Configurer le moteur de templating/rendu
app.set('view engine', 'ejs');

// Définir le dossier à utiliser pour les vues (ejs) (non obligatoire car le dossier views est celui par défaut)
app.use(express.static('views'));

// Définir la route front
app.use('/', front);
app.use('/api', api);

// Configuring Passport
let passport = require('passport');
let expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Lancer le serveur
app.listen(port, () => {
  console.log(`Le serveur est lancé sur le port ${port}`);
});