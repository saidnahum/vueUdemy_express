import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// Conexión a la DB
// const mongoose = require('mongoose');
// const dbURL = require("./properties").DB_URL;
// mongoose.connect(dbURL)
// mongoose.connection.on("connected", () => {
//    console.log("Conectado a MongoDB");
// })

const mongoose = require('mongoose');

// Conexion Local
//const uri = "mongodb://localhost:27017/mevn-udemy";

// Conexion en la nube
const uri = "mongodb+srv://said:890318hvz@mongodb-server.vygtk.mongodb.net/mevn-udemy?retryWrites=true&w=majority"

const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(uri, options).then(
   /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
   () => { console.log('Conectado a MongoDB') },
   /** handle initial connection error */
   err => { console.log(err) }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
// app.get('/', (req, res) => {
//    res.send('Hello World!');
// });

// Rutas
app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/user'));
app.use('/api/login', require('./routes/login'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3001);
app.listen(app.get('puerto'), () => {
   console.log('Example app listening on port'+ app.get('puerto'));
});