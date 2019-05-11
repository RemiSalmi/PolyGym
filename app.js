//Init express
const express = require('express');
const app = express();
const path = require('path');

//Init bp
const bodyParser = require('body-parser');

//Routes imports
const utilisateursRoute = require('./routes/utilisateursRoute');
const exercicesRoute = require('./routes/exercicesRoute');
const programmesRoute = require('./routes/programmesRoute');

app.use('/utilisateurs', utilisateursRoute);
app.use('/exercices', exercicesRoute);
app.use('/programmes', programmesRoute);

//Controllers imports
const exerciceController = require('./controllers/exerciceController');
const programmeController = require('./controllers/programmeControllers');
const utilisateurController = require('./controllers/utilisateurController');


//Port to use
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
    ssl: true
})

//Assets's folder
app.use('/public', express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

//Index route
app.get('/', (req, res) => {
    res.redirect('/exercices');
});

//Test route
app.get('/test/equips', exerciceController.getAllEquipement);
app.get('/test/muscles/:id', exerciceController.getMuscleById);

