ACC.petcoqareviewaddon={_autoload:["loadPage","sendHelpfulRate","orderspec","filterspec","pagerreview","orderqya","pagerqya","loadValidators","ratingStars",],loadPage:function()
{ACC.petcoqareviewaddon.loadFile();ACC.petcoqareviewaddon.loadModal();ACC.petcoqareviewaddon.loadProgress();},loadFile:function(){var loadImages=function()
{var max=parseInt($("input[name='maxImg']").val());var obj=$(this);if($("input[type='file']").length>max)
{alert('Limite de imagen alcanzado');obj.val("");return false;}
if(obj[0]!=null&&obj[0].files[0].size>5244000)
{alert('EL tamaño de la imagen excede los 5 MB');obj.val("");return false;}
var ext=this.value.match(/\.([^\.]+)$/)[1];switch(ext){case 'jpg':case 'jpeg':case 'bmp':case 'png':case 'tif':$(obj).css({'position':'absolute','left':'-9999px','display':'none'}).parent().prepend('<input type="file" name="'+obj.attr('name')+'"/>')
$('#upload_list').append('<div>'+obj.val()+'<div>');$("input[type='file']").change(loadImages);var input=obj[0].files
if(input[0]){var reader=new FileReader();reader.onload=function(e){var span=document.createElement('span');span.innerHTML=['<img class="thumbreview" src="',e.target.result,'" title="','" "','"/>'].join('');document.getElementById('listImg').appendChild(span);};reader.readAsDataURL(input[0]);}
break;default:alert('Formato no soportado');this.value='';}}
$("input[type='file']").change(loadImages);},loadModal:function(){var modal=document.getElementsByClassName("modal-view");if(modal.length)
{var btn=document.getElementsByClassName("btnModal");var span=document.getElementsByClassName("btnMdClose");window.onload=function(event){modal[0].style.display="none";modal[1].style.display="none";}
btn[0].onclick=function(){modal[0].style.display="block";}
btn[1].onclick=function(){modal[1].style.display="block";}
for(let i=0;i<span.length;i++){(i<=1)?span[i].onclick=function(){modal[0].style.display="none";}:span[i].onclick=function(){modal[1].style.display="none";}}
window.onclick=function(event){if(event.target==modal[0]){modal[0].style.display="none";}
if(event.target==modal[1]){modal[1].style.display="none";}}}},loadProgress:function(){var rating_value=$.trim($("#avgRating").text());if($('#circle-bar').length)
{var bar=new ProgressBar.Circle("#circle-bar",{color:'#000',trailColor:'#eee',trailWidth:0,duration:6000,easing:'bounce',strokeWidth:8,text:{autoStyleContainer:false},from:{color:'#ffea82',a:0},to:{color:'#ffc200',a:1},step:function(state,circle){circle.path.setAttribute('stroke',state.color);var value=Math.round(circle.value()*100);if(value===0)
circle.setText('<div class="greenStars"><span class="glyphicon glyphicon-star active glyphicon-max"></span></div><div class="center-text">'+rating_value+'</div>');}});bar.text.style.fontFamily='"Raleway", Helvetica, sans-serif';bar.text.style.fontSize='1.8rem';bar.text.style.left='50%';bar.text.style.align='Center';bar.animate(0.8);}},sendHelpfulRate:function(e)
{var list=cookieList("crqa");document.addEventListener('click',function(event){if(event.target.matches('.btnTermsClose')){$.colorbox.close();}
if(event.target.matches('.view-more'))
{event.preventDefault();var matches=document.querySelectorAll(".show-hide-review[data-review-comment='"+event.target.dataset.reviewComment+"']");var viewMore=document.querySelectorAll(".view-more[data-review-comment='"+event.target.dataset.reviewComment+"']");var viewLess=document.querySelectorAll(".view-less[data-review-comment='"+event.target.dataset.reviewComment+"']");$(matches).css({'height':'155px','overflow-y':'scroll'});$(viewMore).css({'display':'none'});$(viewLess).css({'display':'inherit'});}
if(event.target.matches('.view-less'))
{event.preventDefault();$(".show-hide-review").css({'height':'60px','overflow-y':'hidden'});$(".show-hide-review").animate({scrollTop:0},"fast");$("#containerDiv").animate({scrollTop:0},"fast");$(".view-more").css({'display':'inherit'});$(".view-less").css({'display':'none'});}
if(event.target.matches('.view-more-answers'))
{event.preventDefault();var matches=document.querySelectorAll(".show-hide-answers[data-question-comment='"+event.target.dataset.questionComment+"']");var viewMore=document.querySelectorAll(".view-more-answers[data-question-comment='"+event.target.dataset.questionComment+"']");var viewLess=document.querySelectorAll(".view-less-answers[data-question-comment='"+event.target.dataset.questionComment+"']");$(matches).css({'display':'inherit','height':'200px','overflow-y':'scroll'});$(viewMore).css({'display':'none'});$(viewLess).css({'display':'inherit'});}
if(event.target.matches('.view-less-answers'))
{event.preventDefault();$(".show-hide-answers").css({'display':'none','height':'auto','overflow-y':'hidden'});$(".view-more-answers").css({'display':'inherit'});$(".view-less-answers").css({'display':'none'});}
if(event.target.matches('.helpbutton.y'))
{var parentId=event.target.value;var c=document.getElementById(parentId).children;var button_yes=c[0].childNodes;if(!list.contain(event.target.value))
{list.add(event.target.value);}
else
{button_yes[0].disabled=true;}
if(!button_yes[0].disabled)
{event.preventDefault();$.ajax({url:ACC.config.encodedContextPath+'/customerqya/score',type:'POST',data:{"class-model":event.target.className,"score":parentId,"target":button_yes[0].classList[2]},success:function(response)
{var result=response.split("|");button_yes[0].disabled=true;button_yes[0].style.color="white";var output="<button class='helpbutton y ca' value="+parentId+"><img src='/_ui/addons/petcoqareviewaddon/responsive/common/images/like.png' width='23'>&nbsp"+result[0]+"</button>";button_yes[0].innerHTML=output;},error:function(jqXHR,textStatus,errorThrown)
{console.log('error');}});return false;}}
else
if(event.target.matches('.helpbutton.r'))
{var parentId=event.target.value;var c=document.getElementById(parentId).children;var button_report=c[1].childNodes;if(!button_report[0].disabled)
{event.preventDefault();$.ajax({url:ACC.config.encodedContextPath+'/customerqya/report',type:'POST',data:{"class-model":event.target.className,"reportID":parentId,"target":button_report[0].classList[2]},success:function(response)
{button_report[0].disabled=true;button_report[0].style.color="black";},error:function(jqXHR,textStatus,errorThrown)
{console.log('error');}});return false;}}
else
if(event.target.matches('.answer-button')||event.target.matches('.closeanswer'))
{form_control="#"+event.target.value;if($(form_control).is(':visible'))
{$('.answer-button').each(function(){if(!$(this).is(":visible"))
$(this).show();});$('.write-answer').hide();$(form_control).hide();var validate=$(form_control).validate();validate.resetForm();}
else
{event.target.style.display="none";$('.write-answer').show();$(form_control).show();}}
else
return;},false);},orderspec:function(){$('#orderreview li a').on('click',function(e)
{e.preventDefault();var sku=document.getElementsByClassName("code");var id=$(this).data('review-filter');var text=$(this).text();$("#orderreviewdrop").html(text+'&nbsp;<span class="caret"></span>');var obj=$('#filterstars li a');var order=$('#orderreview li a');$("#filterreviewdrop").html(obj[0].text+'&nbsp;&nbsp;<span class="caret"></span>');ACC.petcoqareviewaddon.getReviews(sku[0].innerHTML,'0',id,'','');order[2].style="display:inherit";order[3].style="display:inherit";});},filterspec:function(){$('#filterstars li a').on('click',function(e)
{e.preventDefault();var sku=document.getElementsByClassName("code");var id=$(this).data('stars-filter');var obj=$('#orderreview li a');$("#orderreviewdrop").html(obj[0].text+'&nbsp;&nbsp;<span class="caret"></span>');ACC.petcoqareviewaddon.getReviews(sku[0].innerHTML,'0','',id,'');if(id==='all')
{id='Todas las';obj[2].style="display:inherit";obj[3].style="display:inherit";$('.show-divider').show();}
else
{obj[2].style="display:none";obj[3].style="display:none";$('.show-divider').hide();}
$("#filterreviewdrop").html(id+' huellitas &nbsp;&nbsp;<span class="caret"></span>');});},pagerreview:function()
{$('#pagerreview li a').on('click',function(e)
{e.preventDefault();var sku=document.getElementsByClassName("code");var filter=$.trim($('#filterreviewdrop').text());if(filter==='Todas las huellitas')
filter='all';var order=$('#orderreviewdrop').text();var obj_filter=$('#filterstars li a');var obj_order=$('#orderreview li a');for(i=0;i<$('#filterstars li a').length;i++)
{if(filter.indexOf($.trim(obj_filter[i].dataset.starsFilter))!=-1)
{filter=obj_filter[i].dataset.starsFilter;}}
for(i=0;i<$('#orderreview li a').length;i++)
{if(order.indexOf(obj_order[i].text)!=-1){order=obj_order[i].dataset.reviewFilter;}}
var command=$(this).data('review-pager');var numberOfPage=parseInt($("#pageReviewCounter").val());var totalPage=parseInt($("#totalReviewPages").val())
if((numberOfPage+1)>=totalPage)
numberOfPage=numberOfPage-1;if(((parseInt($("#pageReviewCounter").val())+1)==totalPage)&&(command==='next'))
{$(this).removeClass("blue-header").addClass("blackgray-header");}
else
{var next=$("#pagerreview li a");if(next.hasClass("blackgray-header")){next.removeClass("blackgray-header").addClass("blue-header");}}
if((numberOfPage==0)&&(command==='previous')){$(this).removeClass("blue-header").addClass("blackgray-header");}
if(filter=='all')
{ACC.petcoqareviewaddon.getReviews(sku[0].innerHTML,numberOfPage,order,'',command);}
else
ACC.petcoqareviewaddon.getReviews(sku[0].innerHTML,numberOfPage,'',filter,command);});},orderqya:function()
{$('#filterqya li a').on('click',function(e){e.preventDefault();var sku=document.getElementsByClassName("code");var id=$(this).data('qa-filter');var text=$(this).text();$("#dropfilterqya").html(text+'&nbsp;<span class="caret"></span>');ACC.petcoqareviewaddon.getQuestions(sku[0].innerHTML,'0','','custom',id);});},pagerqya:function()
{$('#pagerqya li a').on('click',function(e)
{e.preventDefault();var sku=document.getElementsByClassName("code");var id=$('#dropfilterqya').text();var obj=$('#filterqya li a');for(i=0;i<$('#filterqya li a').length;i++)
{if(id.indexOf(obj[i].text)!=-1){id=obj[i].dataset.qaFilter;}}
var page=$(this).data('qa-pager');var numberOfPage=parseInt($("#pageCounter").val());var totalPage=parseInt($("#totalQuestionPages").val());if((numberOfPage+1)>=totalPage)
numberOfPage=numberOfPage-1;if(((parseInt($("#pageCounter").val())+1)==totalPage)&&(page==='next'))
{$(this).removeClass("blue-header").addClass("blackgray-header");}
else
{var next=$("#pagerqya li a");if(next.hasClass("blackgray-header")){next.removeClass("blackgray-header").addClass("blue-header");}}
if((numberOfPage==0)&&(page==='previous')){$(this).removeClass("blue-header").addClass("blackgray-header");}
ACC.petcoqareviewaddon.getQuestions(sku[0].innerHTML,numberOfPage,page,'custom',id);$('#top-questions').animate({scrollTop:0},50);});},loadValidators:function()
{if($('#circle-bar').length){}
$("#customerReviewForm").validate({rules:{alias:"required",headline:"required",comment:"required",rating:"required"},messages:{alias:"Por favor ingrese un alias",headline:"Por favor ingrese un titulo",comment:"Por favor ingrese un comentario",rating:"Por favor ingrese una calificacion"},errorElement:"em",errorPlacement:function(error,element){error.addClass("help-block align-validator");if(element.prop("type")==="checkbox"){error.insertAfter(element.parent("label"));}else{error.insertAfter(element);}},highlight:function(element,errorClass,validClass){$(element).parents(".breadcrumform").addClass("has-error").removeClass("has-success");},unhighlight:function(element,errorClass,validClass){$(element).parents(".breadcrumform").addClass("has-success").removeClass("has-error");},checkReview:function(){if($("#review.rating").val()!=""){$(element).parents(".breadcrumform").addClass("has-success").removeClass("has-error");}}});$("#customerQuestionForm").validate({rules:{alias:"required",question:"required",},messages:{alias:"Debe ingresar un alias",question:"Escriba una pregunta"},errorElement:"em",errorPlacement:function(error,element){error.addClass("help-block align-validator");if(element.prop("type")==="checkbox"){error.insertAfter(element.parent("label"));}else{error.insertAfter(element);}},highlight:function(element,errorClass,validClass){$(element).parents(".breadcrumform").addClass("has-error").removeClass("has-success");},unhighlight:function(element,errorClass,validClass){$(element).parents(".breadcrumform").addClass("has-success").removeClass("has-error");}});},loadAnswerValidator:function(){$('form').submit(function(e){var id='#'+e.target.id;$(id).validate({rules:{alias:"required",answer:"required",},messages:{alias:"Debe ingresar un alias",answer:"Escriba una respuesta"},errorElement:"em",errorPlacement:function(error,element){error.addClass("help-block align-validator");if(element.prop("type")==="checkbox"){error.insertAfter(element.parent("label"));}else{error.insertAfter(element);}},highlight:function(element,errorClass,validClass){$(element).parents(".breadcrumform").addClass("has-error").removeClass("has-success");},unhighlight:function(element,errorClass,validClass){$(element).parents(".breadcrumform").addClass("has-success").removeClass("has-error");}});var form=$(id);if(!form.valid())
e.preventDefault();});},ratingStars:function(){$('.js-footprint').on({mouseleave:function mouseleave(){clearReviewState();var sV=(parseFloat($(".js-ratingSetTxt").val(),10));(typeof sV==="number"&&!isNaN(sV))?setReviewState(sV):clearReviewState();}});var ratingIcons=$('.js-footprint .js-ratingIcon');var setReviewState=function(index){ratingIcons.slice(0,parseFloat(index,10)).addClass('active');};var clearReviewState=function(){ratingIcons.removeClass('active');};ratingIcons.on({mouseenter:function mouseenter(){clearReviewState();setReviewState($(this).index()+1);},mouseleave:function mouseleave(){$(this).removeClass('active');},click:function click(){$(".js-ratingSetTxt").val(($(this).index()+1));}});},getQuestions:function(a,b,c,d,e)
{$.ajax({url:ACC.config.encodedContextPath+'/customerqya/customerqyaHtml',type:'GET',data:{"productCode":a,"numberOfPage":b,"command":c,"pageSize":d,"sortCode":e},success:function(response)
{if(response.length>0)
$('#reloadpageqya').html(response);},error:function(jqXHR,textStatus,errorThrown)
{console.log('error');}});},getReviews:function(a,b,c,d,e)
{$.ajax({url:ACC.config.encodedContextPath+'/customerreview/getReview',type:'GET',data:{"productcode":a,"page":b,"filter":c,"rating":d,"command":e},success:function(response)
{if(response.length>0)
{$('#reloadpagereview').html(response);ACC.ratingstars.bindRatingStars();}},error:function(jqXHR,textStatus,errorThrown)
{console.log('error');}});},loadPageCounter:function()
{var from=$("#fromReviewInput").val();var to=$("#toReviewInput").val();var totalReviews=$("#totalReviewInput").val();$('#fromToReview').html("&emsp;"+from+"&emsp;-&emsp;"+to);$('#totalReviewsLbl').html("&emsp;de&emsp;"+totalReviews+"&nbsp;Reseñas");},loadQuestionCounter:function()
{var from=$("#fromQuestionInput").val();var to=$("#toQuestionInput").val();var totalReviews=$("#totalQuestionInput").val();$('#fromToQuestion').html("&emsp;"+from+"&emsp;-&emsp;"+to);$('#totalQuestionLbl').html("&emsp;de&emsp;"+totalReviews+"&nbsp;Preguntas");},startZoom:function(){MagicZoom.start();}};var cookieList=function(cookieName){var cookie=$.cookie(cookieName);var items=cookie?cookie.split(/,/):new Array();return{"contain":function(val){if(!Array.prototype.indexOf){Array.prototype.indexOf=function(obj,start){for(var i=(start||0),j=this.length;i<j;i++){if(this[i]===obj){return i;}}
return-1;};}
var indx=items.join(',').indexOf(val);if(indx>-1){return true;}else{return false;}},"add":function(val){items.push(val);$.cookie(cookieName,items.join(','));},"remove":function(val){indx=items.indexOf(val);if(indx!=-1)items.splice(indx,1);$.cookie(cookieName,items.join(','));},"clear":function(){items=null;$.cookie(cookieName,null);},"items":function(){return items}}}