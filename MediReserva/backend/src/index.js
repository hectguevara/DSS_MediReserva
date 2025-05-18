const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const appRoutes = require('./routes');
require('dotenv').config();
const cors = require('cors');
const router = express.Router();

const app = express();

let limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 1000, 
  message: 'Has excedido el número de solicitudes permitidas. Por favor intenta más tarde.'
})

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(cors());

app.use('/api', limiter);

app.use('/api', appRoutes);


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

/*router.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});*/


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
})