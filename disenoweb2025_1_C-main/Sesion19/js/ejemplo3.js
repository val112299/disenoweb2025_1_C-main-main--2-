$(document).ready(function(){
    $("a").click(function(){
        alert("Has usado el enlace, serás enviado la pagina"+ $(this).attr("href"));
    })
})