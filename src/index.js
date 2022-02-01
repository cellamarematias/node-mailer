const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: false}));  // para poder leer el contenido del form
app.use(express.json()); // para poder leer tmb en este formate -- apps react y demás
app.use(express.json());

app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
console.log('Server on port 3000')