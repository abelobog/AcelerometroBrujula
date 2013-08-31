//actions
//Es necesario incluirlas para que se produzcan las animaciones
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});
/*Cargar todas las librerias
$(document).ready(function(){
    
});*/
//Es lo mismo que la linea anterior
(function(){
    document.addEventListener("deviceready",function(){
        $('ul.individual li').tap(function(){accion($(this));
        //alert($(this).parent('page').attr('id'))
    });
        
    },false);
    
});

function accion(obj){
    var i = obj.index();
    var p = obj.parent('.page').attr('id');
    //alert(i+'\n'+p);
    if (i==0)//Si fue iniciar
        iniciar(p);
    else if (i==1) //si fue detener
        detener(p);    
}

var watchID = null;
function iniciar(p){
    if (watchID)
        if (p=='acelerometro')
            watchID = navigator.accelerometer.watchAcceleration(function(acceleration) {
        $('#'+p+' h2').html('X: '+ acceleration.x + '<br>'+
                            'Y: '+ acceleration.y +'<br>'+
                            'Z: '+ acceleration.z);
        }, function(){
            alert('Error en el acelerómetro');
        }, {frequency: 500});
        else if (p=='brujula')
            watchID = navigator.compass.watchHeading(function(heading) {
                $('#'+p+' h2').html('Magnética: '+ heading.magneticHeading + '<br>'+
                            'Digital: '+ heading.trueHeading +'<br>'+
                            'Desviación actual: '+ heading.headingAccuracy);
            }, function onError(compassError) {
                alert('Error en la brujula: ' + compassError.code);
            }, {frequency: 500});   
    
}

function detener(p){
    if (watchID){
        if (p=='acelerometro')
            navigator.accelerometer.clearWatch(watchID);
        else if (p=='brujula')
            navigator.compass.clearWatch(watchID);
        
        watchID = null;
        $('#'+p+' h2').html('Detenido'); 
    }          
}