(function(exports){
  "use strict";
    
  const util = require('util');
  const mongoose = require('mongoose');
  
  mongoose.connect('mongodb://localhost/tattoo-factory');
  
  const UsuarioSchema = mongoose.Schema({
    "nombre": String,
    "tatuajes": String
  });
  
  const ComparteSchema = mongoose.Schema({
    "_creator": { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    "categoria": String,
    "text": String
  });
  
  
  // añadimos la tablas a la base de datos
  const Usuario = mongoose.model("Usuario",UsuarioSchema);
  const Comparte = mongoose.model("Datos",ComparteSchema);

  Usuario.remove({}).then(()=>{
    Comparte.remove({}).then(()=>{
      let mena = new Usuario({nombre: 'Mena'});
      let yeray = new Usuario({nombre: 'Yeray'});
      
      mena.save(function(err){
        if(err) return console.log(err);
        
            let comentario1mena = new Comparte({
              _creator: mena._id, 
              categoria: 'valoranos', 
              text: 'Me gusta mucho vuestra página web, CH es una gran empresa con buenos productos!'
              
            });
            comentario1mena.save(function(err){
              if(err) return console.log(err);
            });
            let comentario2mena = new Comparte({
              _creator: mena._id, 
              categoria: 'tatuado', 
              text: 'Una vez me salieron unas pequeñas heridas despues de hacerme el tattoo, con un poco de crema, poco sol y cuidado se curaron bien.'
              
            });
            comentario2mena.save(function(err){
              if(err) return console.log(err);
            });
      });
      yeray.save(function(err){
        if(err) return console.log(err);
        
            let comentario1yeray = new Comparte({
              _creator: yeray._id, 
              categoria: 'valoranos', 
              text: 'Me encantan las prendas de CH, son originales y de calidad..'
              
            });
            comentario1yeray.save(function(err){
              if(err) return console.log(err);
            });
            let comentario2yeray = new Comparte({
              _creator: yeray._id, 
              categoria: 'tatuado', 
              text: 'Nunca me he tatuado y estoy buscando diseños de tattoos tradicionales(666-66-66-66).'
              
            });
            comentario2yeray.save(function(err){
              if(err) return console.log(err);
            });
      });
    });
  });
  
module.exports = {Comparte: Comparte, Usuario: Usuario};

})(); 