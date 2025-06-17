function compara(){
     var a = 5;
        var b = 7;
        if(a==b){
            alert("A es igual a B");
        } else {
            alert("A y B son diferentes")
        }
}
function resta(a,b){
    var rest = a-b;
    document.writeln("<h2>La resta es:"+rest +"<h2>");
}

function suma(x,y){
    var sum=x+y;
    document.getElementById("sumar").innerHTML = "La suma es: "+ sum;   
}

function escribir(){
    valor = document.getElementById("entrada").value;
    document.getElementById("contenido").innerHTML = valor;
}