ACC.termsandconditions={bindTermsAndConditionsLink:function(){$(document).on("click",".termsAndConditionsLink",function(e){e.preventDefault();$.colorbox({maxWidth:"100%",maxHeight:"80%",width:"870px",scrolling:true,href:$(this).attr("href"),close:'<span class="glyphicon glyphicon-remove"></span>',title:'<div class="headline"><span class="headline-text"></span></div>',onComplete:function(){ACC.common.refreshScreenReaderBuffer();},onClosed:function(){ACC.common.refreshScreenReaderBuffer();}});});},payCar:function(){$('.creditoDebito').click(function(e){e.preventDefault();$.colorbox({width:500,height:400,href:$(this).attr("href"),onComplete:function(){ACC.common.refreshScreenReaderBuffer();},onClosed:function(){ACC.common.refreshScreenReaderBuffer();}});});},closePopUp:function(){$.colorbox.close();},}
$(function(){with(ACC.termsandconditions){bindTermsAndConditionsLink();payCar();}});