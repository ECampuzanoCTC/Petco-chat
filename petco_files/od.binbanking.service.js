ODBB={binbanking:{bindAll:function()
{$("#cardType, #cardNumber").bind('input',function(e){if($("#cardNumber").val().length>14)
{var jsonToSend={id:$("#cardNumber").val(),node:$("#cardType").val()}
$.ajax({url:ACC.config.contextPath+'/checkout/multi/cybersource-payment-method/binbanking',data:jsonToSend,type:'GET',dataType:'html',success:function(data){console.debug(data);$("#binbankingGroupPromotions").html(data);}});}});}}}
$(document).ready(function(){$("#cardType").val('');$("#cardNumber").val('');$("#ExpiryMonth").val('');$("#ExpiryYear").val('');$("#cvvNumber").val('');$("#binbankingGroupPromotions").empty();ODBB.binbanking.bindAll();});