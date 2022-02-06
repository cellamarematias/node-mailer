const express = require('express');
const app = express();
const path = require('path');


app.use(express.urlencoded({extended: false}));  // para poder leer el contenido del form
app.use(express.json()); // para poder leer tmb en este formate -- apps react y demás
app.use(express.json());

app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
