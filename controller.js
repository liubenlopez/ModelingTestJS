var rowSize = 20;
var columnSize = 20;
var listaObjetos = [];
var TimerHandler;

function getObjetoGenerado(x,y) {
	let min = Math.ceil(0);
	let max = Math.floor(25);
	let value =  Math.floor(Math.random() * (max - min) + min);
	let colores = ['#00FF00','#00F700','#00EF00','#00E700','#00DF00','#00D700','#00CF00','#00C700','#00FF7F','#00BF00','#00B700','#00AF00','#00A700','#009F00','#009700','#008F00','#008700','#007F00','#007700','#006F00','#006700','#005F00','#005700','#004F00','#004700','#003F00'];
	return {name:x+"-"+y, fuerza:value, color:colores[value], posicion: [x,y]};
}

function inicializarListaObjetos(){
	listaObjetos = [];
	for(let i=0; i<rowSize; i++){
		for(let j=0; j<columnSize; j++){
			listaObjetos.push(getObjetoGenerado(i,j));
		}
	}
}

function actualizarTabla(){
	$('#TableTest tr').remove();
	for(let i=0; i<rowSize; i++){
		let row = "<tr>";
		for(let j=0; j<columnSize; j++){
			row += "<td style='border: 1px solid; background-color:white; padding: 1px; font-size: 10px; text-align: center;' id='"+i+"-"+j+"'><div>"+i+"-"+j+"</div></td>";
		}
		row += "</tr>";
		$("#TableTest").find('tbody').append(row);
	}
	listaObjetos.forEach(function(objeto) {
		const div = document.createElement("div");
		div.innerHTML = "<div style='background-color:"+objeto.color+"; padding: 2px 4px;'>"+objeto.name+"</div>";
		document.getElementById(objeto.posicion[0]+"-"+objeto.posicion[1]).appendChild(div);
	});
	document.getElementById("poblacionCount").innerHTML = "<span>"+listaObjetos.length+"</span>";
}

function ejecutarSimulacion(){
	listaObjetos.forEach(function(objeto) {
		let direccionMovimiento = Math.floor(Math.random() * (5 - 1) + 1);//Genera valores del 1 al 4: 1 arriba, 2 abajo, 3 derecha, 4 izquierda
		switch (direccionMovimiento) {
			case 1: objeto.posicion[1]+1 < rowSize ? objeto.posicion[1] = objeto.posicion[1]+1 : objeto.posicion[1] = objeto.posicion[1]-1; break;
			case 2: objeto.posicion[1]-1 >= 0 ? objeto.posicion[1] = objeto.posicion[1]-1 : objeto.posicion[1] = objeto.posicion[1]+1; break;
			case 3: objeto.posicion[0]+1 < columnSize ? objeto.posicion[0] = objeto.posicion[0]+1 : objeto.posicion[0] = objeto.posicion[0]-1; break;
			case 4: objeto.posicion[0]-1 >= 0 ? objeto.posicion[0] = objeto.posicion[0]-1 : objeto.posicion[0] = objeto.posicion[0]+1; break;
		}
	});
	ejecutarTorneo();
}

function ejecutarTorneo(){
	//Se elimina el que menos fuerza tiene
	listaObjetos.forEach(function() {
		listaObjetos.forEach(function(obj, index) {
			listaObjetos.forEach(function(obj1, index1) {
				if(obj != obj1 && obj.posicion[0] == obj1.posicion[0] && obj.posicion[1] == obj1.posicion[1]){
					obj.fuerza >= obj1.fuerza ? listaObjetos.splice(index1,1) : listaObjetos.splice(index,1);
				}
			});	
		});
	});
	actualizarTabla();
}

function ejecutarSimulacionPasoAPaso(){
	document.getElementById("ejecutarSimulacionCiclica").style.display = "block";
	document.getElementById("pausarSimulacionCiclica").style.display = "none";
	clearInterval(TimerHandler);
	ejecutarSimulacion();
}

function ejecutarSimulacionCiclica(){
	document.getElementById("ejecutarSimulacionCiclica").style.display = "none";
	document.getElementById("pausarSimulacionCiclica").style.display = "block";
	TimerHandler = setInterval(ejecutarSimulacion, 1000);
}

function pausarSimulacionCiclica(){
	document.getElementById("ejecutarSimulacionCiclica").style.display = "block";
	document.getElementById("pausarSimulacionCiclica").style.display = "none";
	clearInterval(TimerHandler);
}

$( document ).ready(function() {
	inicializarListaObjetos();
	actualizarTabla();
});