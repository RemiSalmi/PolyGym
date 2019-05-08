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

//Port to use
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//Assets's folder
app.use('/public', express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

//Index route
app.get('/', (req, res) => {
    res.redirect('/exercices');
});


