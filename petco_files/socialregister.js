$(document).ready(function(){if(typeof launchSocialRegisterPopup!=='undefined'){ACC.colorbox.open(socialRegisterPopupTitle,{href:socialRegisterPopupUrl,close:'<span class="glyphicon glyphicon-remove"></span>',maxWidth:500,width:'100%',title:'<span class="fontPass">'
+socialRegisterPopupTitle+'</span>',height:false,overlayClose:true,onOpen:function(){},onComplete:function(){$('form#socialRegisterForm').ajaxForm({success:function(data){if($(data).closest('#social-register-message').length)
{var redirect=$(data).find('#redirectAction').val();var messageCode=$(data).find('#messageCode').val();if(messageCode.length>0)
{$(".social-register").replaceWith(data);ACC.colorbox.resize();}
if(redirect.length>0)
{setTimeout(function(){$(location).attr('href',redirect);},2000);}}
else
{$("#socialRegisterForm .control-group").replaceWith($(data).find('.control-group'));ACC.colorbox.resize();}}});}});}});