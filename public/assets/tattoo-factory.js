(function() {
    "use strict";
    $(document).ready(function(){

        //funcion con la que lograremos que se muestren los consejos una vez estemos dentro de
        //la vista tatuados y se haga click en el boton "Ver"
        $("#ver-consejos").click(function(){
            console.log("justo antes de consejos");
            $.get("/verconsejos", (consejos)=>{
                console.log("recibi consejos");
                for (var i=0; i<consejos.length; i++){
                    $('p#p'+(i)).html(consejos[i].text);
                    $('p#name'+(i)).text(consejos[i]._creator.nombre);
                }
                for (var i=0; i<consejos.length-1; i++){
                    $('#tatuado'+(i+1)).css({'display':''});
                    $('#selector'+(i+1)).fadeIn();
                }
                $("#tatuado0").addClass("item active animated bounceInRight row");
                $('#selector0').fadeIn();
            });
        });
        //funcion con la que lograremos que se muestren las valoraciones una vez estemos dentro de
        //la vista valora y se haga click en el boton "Ver"
        $("#ver-valoraciones").click(function(){
            console.log("justo antes de valoraciones");
            $.get("/vervaloraciones", (valoraciones)=>{
                console.log("recibi valoraciones");
                for (var i=0; i<valoraciones.length; i++){
                    $('p#p'+(i)).html(valoraciones[i].text);
                    $('p#name'+(i)).text(valoraciones[i]._creator.nombre);
                }
                for (var i=0; i<valoraciones.length-1; i++){
                    $('#valorado'+(i+1)).css({'display':''});
                    $('#selector'+(i+1)).fadeIn();
                }
                $("#valorado0").addClass("item active animated bounceInRight row");
                $('#selector0').fadeIn();
            });
        });
    });
})();