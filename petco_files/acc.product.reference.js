ACC.product.reference={enableAddReferenceToCartButton:function(){$('.js-enable-reference-btn').each(function(){if(!($(this).hasClass('outOfStock')||$(this).hasClass('out-of-stock'))){$(this).removeAttr("disabled");}});},bindToAddReferenceToCartForm:function(){var addToCartReferenceForm=$('.add_reference_to_cart_form');addToCartReferenceForm.ajaxForm({beforeSubmit:ACC.product.reference.showReferenceRequest,success:ACC.product.reference.displayAddReferenceToCartPopup});setTimeout(function(){$ajaxCallEventReference=true;},2000);},showReferenceRequest:function(arr,$form,options){if($ajaxCallEventReference)
{$ajaxCallEventReference=false;return true;}
return false;},displayAddReferenceToCartPopup:function(cartResult,statusText,xhr,formElement){$ajaxCallEventReference=true;$('#addToCartLayer').remove();if(typeof ACC.minicart.updateMiniCartDisplay=='function'){ACC.minicart.updateMiniCartDisplay();}
var titleHeader=$('#addToCartTitle').html();ACC.colorbox.open(titleHeader,{html:cartResult.addToCartLayer,width:"460px"});var productCode=$('[name=productCodePost]',formElement).val();var quantityField=$('[name=qty]',formElement).val();var quantity=1;if(quantityField!=undefined){quantity=quantityField;}
var cartAnalyticsData=cartResult.cartAnalyticsData;var cartData={"cartCode":cartAnalyticsData.cartCode,"productCode":productCode,"quantity":quantity,"productPrice":cartAnalyticsData.productPostPrice,"productName":cartAnalyticsData.productName};ACC.track.trackAddToCart(productCode,quantity,cartData);},numberToString:function(totalChecks){if(totalChecks==''){return "";}
switch(parseInt(totalChecks)){case 1:return "";case 2:return " ambos";case 3:return " los tres";case 4:return " los cuatro";case 5:return " los cinco";case 6:return " los seis";case 7:return " los siete";case 8:return " los ocho";case 9:return " los nueve";case 10:return " los diez";default:return "";}},initButtonReferenceLabel:function(){var totalProductCheck=$("#totalProductCheck").val()
var buttonLabel=ACC.product.reference.numberToString(totalProductCheck);$("#addToCartButtonReference").html("Agregar"+buttonLabel+" al carrito");},formatCurrency:function(total){var neg=false;if(total<0){neg=true;total=Math.abs(total);}
return(neg?"-$":'$')+parseFloat(total,10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,"$1,").toString();},getBootstrapDeviceSize:function(){var isMobile=$('#users-device-size').find('div:visible').first().attr('id')!='lg';if(isMobile){$('.lazyOwl').attr("width","50px");$('.plussymb').css("font-size","8.5pt");$('.plussymb').html("<br>+");jQuery("#buttonDesktop").detach().appendTo('#buttonMobile');$('.js-owl-carousel').owlCarousel({items:12,autoHeight:false,navigation:true,itemsMobile:false,navigationText:["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"],pagination:false,itemsMobile:[500,6],lazyLoad:true}).trigger('refresh.owl.carousel');}else{jQuery("#buttonMobile").detach().appendTo('#buttonDesktop');$('.js-owl-carousel').owlCarousel({items:11,navigation:true,navigationText:["<span class='glyphicon glyphicon-chevron-left'></span>","<span class='glyphicon glyphicon-chevron-right'></span>"],pagination:false,lazyLoad:true}).trigger('refresh.owl.carousel');}
return $('#users-device-size').find('div:visible').first().attr('id');}};$(document).ready(function(){$ajaxCallEventReference=true;ACC.product.reference.bindToAddReferenceToCartForm();ACC.product.reference.enableAddReferenceToCartButton();ACC.product.reference.initButtonReferenceLabel();ACC.product.reference.getBootstrapDeviceSize();});