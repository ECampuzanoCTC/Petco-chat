ACC.forgottenpassword={_autoload:["bindLink"],bindLink:function(){$(document).on("click",".js-password-forgotten",function(e){e.preventDefault();ACC.colorbox.open($(this).data("cboxTitle"),{href:$(this).data("link"),close:'<span class="glyphicon glyphicon-remove"></span>',maxWidth:500,width:'100%',title:'<span class="fontPass">Recuperar contrase&ntilde;a</span>',height:false,overlayClose:true,onOpen:function()
{$('#validEmail').remove();},onComplete:function(){$('form#forgottenPwdForm').ajaxForm({success:function(data)
{if($(data).closest('#validEmail').length)
{if($('#validEmail').length===0)
{$(".forgotten-password").replaceWith(data);ACC.colorbox.resize();}}
else
{$("#forgottenPwdForm .control-group").replaceWith($(data).find('.control-group'));ACC.colorbox.resize();}}});}});});}};