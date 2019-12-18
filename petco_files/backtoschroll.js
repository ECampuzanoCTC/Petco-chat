function scrollFunction(){if(document.body.scrollTop>20||document.documentElement.scrollTop>20){document.getElementById("myBtn").style.display="block";}else{document.getElementById("myBtn").style.display="none";}}
function topFunction(){$('html, body').animate({scrollTop:0},1000);}
$(document).ready(function(){window.onscroll=function(){scrollFunction()};});