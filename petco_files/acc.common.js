ACC.common={currentCurrency:$("main").data('currencyIsoCode')||"USD",processingMessage:$("<img src='"+ACC.config.commonResourcePath+"/images/spinner.gif'/>"),blockFormAndShowProcessingMessage:function(submitButton)
{var form=submitButton.parents('form:first');form.block({message:ACC.common.processingMessage});},refreshScreenReaderBuffer:function()
{$('#accesibility_refreshScreenReaderBufferField').attr('value',new Date().getTime());},checkAuthenticationStatusBeforeAction:function(actionCallback)
{$.ajax({url:ACC.config.authenticationStatusUrl,statusCode:{401:function(){location.href=ACC.config.loginUrl;}},success:function(data){if(data=="authenticated"){actionCallback();}}});}};jQuery.extend({postJSON:function(url,data,callback)
{return jQuery.post(url,data,callback,"json");}});$.ajaxPrefilter(function(options,originalOptions,jqXHR)
{if(options.type==="post"||options.type==="POST")
{var noData=(typeof options.data==="undefined");if(noData)
{options.data="CSRFToken="+ACC.config.CSRFToken;}
else
{var patt1=/application\/json/i;if(options.data instanceof window.FormData)
{options.data.append("CSRFToken",ACC.config.CSRFToken);}
else if(patt1.test(options.contentType))
{jqXHR.setRequestHeader('CSRFToken',ACC.config.CSRFToken);}
else if(options.data.indexOf("CSRFToken")===-1)
{options.data=options.data+"&"+"CSRFToken="+ACC.config.CSRFToken;}}}});