 jQuery(document).ready(function($) {
    
    //evento que comprobará la sección de las partes tatuadas del usuarios en la tarjeta de usuario
    //al clickear en la imagen de usuario que muestra dicha tarjeta.
    $("#card-user-link").click(()=>{
        $.get("/partestatuadas", {nombre:localStorage.nombre}, (partes)=>{
            if(partes[0].tatuajes==undefined){                  //Si el usuario aún no ha introducido las partes que tiene tatuadas
                $("#div-partes-tatuadas").css("display","");    //se le mostrará un input para introducirlas.
            }
            else {
                $("#div-partes-tatuadas").css("display","none");//En caso de que si haya introducido esa información
                $("#partes-tatuadas").html(partes[0].tatuajes); //la mostramos.
                $("#div-tatuajes").css("display","");
            }
        });
    });
    
    //con este evento conseguiremos guardar en la base de datos las partes tataudas que haya introducido el usuario
    //y posterioremente mostrarlas en la tarjeta.
    $("#btn-partes-tatuadas").click(()=>{
        $.get("/introducir-partestatuadas", 
        {
            nombre:localStorage.nombre,
            partes_tatuadas: $("#input-partes-tatuadas").val()
            
        }, (partes)=>{
            $("#div-partes-tatuadas").css("display","none");
            $("#partes-tatuadas").html(partes[0].tatuajes);
            $("#div-tatuajes").css("display","");
            
        });
    });
    
    //Evento que a la hora de que el usuario clickee en el boton para añadir más partes de su cuerpo tatuadas
    //le mostrará de nuevo el input para introducir sus partes tatuadas.
    $("#añadir-partes-tatuadas").click(()=>{
        $("#div-partes-tatuadas").css("display","");
        $("#div-tatuajes").css("display","none");
    });
    
    
    
    
    $(".scroll a, .navbar-brand, .gototop").click(function(event){   
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 600,'swing');
    $(".scroll li").removeClass('active');
    $(this).parents('li').toggleClass('active');
    });
});

var wow = new WOW({
    boxClass:     'wowload',    // animated element css class (default is wow)
    animateClass: 'animated',   // animation css class (default is animated)
    offset:       0,            // distance to the element when triggering the animation (default is 0)
    mobile:       true,         // trigger animations on mobile devices (default is true)
    live:         true          // act on asynchronously loaded content (default is true)
});
wow.init();




$('.carousel').swipe({
    swipeLeft: function(){
        $(this).carousel('next');
    },
    swipeRight: function(){
        $(this).carousel('prev');
    },
    allowPageScroll: 'vertical'
});



