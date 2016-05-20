const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');



//Traemos la base de datos:
const baseDeDatos = require('./models/database.js');
const Comparte = baseDeDatos.Comparte;
const Usuario = baseDeDatos.Usuario;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//página principal:
app.get('/', (request, response) => {
  response.render('index', {});
});

//middleware que comprobará si el usuario que se conecta existe, si no lo crea
app.get('/existe', (request,response) => {
  console.log("entre al existe");
  Usuario.count({nombre : request.query.nombre}, function(err,file){
    if(err) return console.log(err);
    if(file==0){
      var nuevoUsuario = new Usuario({nombre: request.query.nombre});
      nuevoUsuario.save(function(err){
        if(err) return console.log(err);
        console.log("Usuario creado");
      });
    }
  });
});

//middleware que nos devolverá las partes del cuerpo que tiene tatuadas el usuario.
app.get('/partestatuadas', (request,response) => {
  Usuario.find({nombre: request.query.nombre}, {_id:0,tatuajes:1}, (err,file) => {
    if(err) throw err;
    console.log("file: " + file);
    console.log("tatuajes: " + file.tatuajes);
    response.send(file);
  });
});

//middleware que actualizará las partes del cuerpo que tienen tatuadas los usuarios y nos las devolverá de nuevo
app.get('/introducir-partestatuadas', (request,response) => {
  Usuario.update({nombre: request.query.nombre}, {$set: {tatuajes: request.query.partes_tatuadas}},(err,file) => {
    if(err) throw err;
    Usuario.find({nombre:request.query.nombre}, {_id:0,tatuajes:1}, (err,file) => {
      if(err) throw err;
      response.send(file);
    });
  });
});

//middleware que guardará en la base de datos las experiencias de los usuarios:
app.get('/comparte',(request,response) => {
  Usuario.find({nombre: request.query.nombreusu},(err,file)=>{
    var experiencia = new Comparte({
    _creator: file[0]._id, 
    categoria: request.query.categoria, 
    text: request.query.contenido
    });
    experiencia.save(function(err){
      if(err) return console.log(err);
    });
    response.render('index', {});
  })
});


//página de los modelos:
app.get('/modelos', (request, response) => {
  response.render('modelos', {});
});


//página de valoraciones:
app.get('/valora', (request, response) => {
  response.render('valora', {});
});


//página de tatuados:
app.get('/tatuado', (request, response) => {
  response.render('tatuado', {});
});

//middleware que nos traera la informacion desde la base de datos para la vista de tatuados:
app.get('/verconsejos', (request, response) => {
  //aqui tenemos que hacer la peticion a la BD pidiendo el consejo y su creador.
  Comparte
  .find({categoria: 'tatuado'})
  .populate('_creator')
  .exec((err,consejos)=>{
    if(err) console.log(err);
    response.send(consejos);
  });
});

//middleware que nos traera la informacion desde la base de datos para la vista de valoraciones:
app.get('/vervaloraciones', (request, response) => {
  //aqui tenemos que hacer la peticion a la BD pidiendo el consejo y su creador.
  Comparte
  .find({categoria: 'valoranos'})
  .populate('_creator')
  .exec((err,valoraciones)=>{
    if(err) console.log(err);
    response.send(valoraciones);
  });
});

module.exports = app;
