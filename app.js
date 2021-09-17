// Importando express js
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurando ruta raíz del servidor
app.get('/', function(req, res){
   res.send('Hola desde Home');
})

// Escuchar en un puerto
// Estableciendo el puerto de manera global
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), function(){
   console.log('Escuchando en el puerto: ', app.get('port'));
})