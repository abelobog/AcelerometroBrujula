//actions
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});
var watchID = null;
$(function(){
	document.addEventListener("deviceready",function(){
		$('ul.individual li').tap(function(){accion($(this));});
	},false);
});

function accion(obj){
	var i = obj.index();
	var p = obj.parents('.page').attr('id');
	alert('acción');
	
	if(i==0)//Si fue Iniciar
		iniciar(p);
	else
		if(i==1)//Si fue Detener
			detener(p);
}

function iniciar(p){
		if(p=='acelerometro'){
			watchID = navigator.accelerometer.watchAcceleration(function(acceleration){
				$('#'+p+' h2').html('X: '+acceleration.x+'<br>'+
									'Y: '+acceleration.y+'<br>'+
									'Z: '+acceleration.z);
			},function(){
				alert('onError!');
			},{ frequency: 500 });
		}else{
			if(p=='brujula'){
				watchID = navigator.compass.watchHeading(function(heading){
					$('#'+p+' h2').html('Magnética: '+heading.magneticHeading+'<br>'+
										'Real: '+heading.trueHeading+'<br>'+
										'Precisión: '+heading.headingAccuracy);
				},function onError(compassError){
					alert('Compass error: ' + compassError.code);
				},{ frequency: 500 });
			}
		}
}

function detener(p){
	if(watchID){
		if(p=='acelerometro'){
			navigator.accelerometer.clearWatch(watchID);
		}else{
			if(p=='brujula')
				navigator.compass.clearWatch(watchID);
		}
		watchID = null;
		$('#'+p+' h2').html('Detenido');
	}
}