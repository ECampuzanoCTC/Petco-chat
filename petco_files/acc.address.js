ACC.address={_autoload:["bindToChangeAddressButton","bindCreateUpdateAddressForm","bindSuggestedDeliveryAddresses","bindCountrySpecificAddressForms","showAddressFormButtonPanel","bindViewAddressBook","bindToColorboxClose","showRemoveAddressFromBookConfirmation","backToListAddresses","showFieldsForPickupConsignment","submitEventToPickupConsignment","validationRulesPickupConsignment","removePickupConsignment","bindValidatePostalCode"],spinner:$("<img src='"+ACC.config.commonResourcePath+"/images/spinner.gif' />"),addressID:'',handleChangeAddressButtonClick:function()
{ACC.address.addressID=($(this).data("address"))?$(this).data("address"):'';$('#summaryDeliveryAddressFormContainer').show();$('#summaryOverlayViewAddressBook').show();$('#summaryDeliveryAddressBook').hide();$.getJSON(getDeliveryAddressesUrl,ACC.address.handleAddressDataLoad);return false;},handleAddressDataLoad:function(data)
{ACC.address.setupDeliveryAddressPopupForm(data);ACC.colorbox.open("",{inline:true,href:"#summaryDeliveryAddressOverlay",overlayClose:false,onOpen:function(){ACC.address.emptyAddressForm();$(document).on('change','#saveAddress',function()
{var saveAddressChecked=$(this).prop('checked');$('#defaultAddress').prop('disabled',!saveAddressChecked);if(!saveAddressChecked)
{$('#defaultAddress').prop('checked',false);}});}});},setupDeliveryAddressPopupForm:function(data)
{$('#summaryDeliveryAddressBook').html($('#deliveryAddressesTemplate').tmpl({addresses:data}));$('#summaryDeliveryAddressBook button.use_address').click(ACC.address.handleSelectExistingAddressClick);$('#summaryDeliveryAddressBook button.edit').click(ACC.address.handleEditAddressClick);$('#summaryDeliveryAddressBook button.default').click(ACC.address.handleDefaultAddressClick);},emptyAddressForm:function()
{var options={url:getDeliveryAddressFormUrl,data:{addressId:ACC.address.addressID,createUpdateStatus:''},type:'GET',success:function(data)
{$('#summaryDeliveryAddressFormContainer').html(data);ACC.address.bindCreateUpdateAddressForm();}};$.ajax(options);},handleSelectExistingAddressClick:function()
{var addressId=$(this).attr('data-address');$.postJSON(setDeliveryAddressUrl,{addressId:addressId},ACC.address.handleSelectExitingAddressSuccess);return false;},handleEditAddressClick:function()
{$('#summaryDeliveryAddressFormContainer').show();$('#summaryOverlayViewAddressBook').show();$('#summaryDeliveryAddressBook').hide();var addressId=$(this).attr('data-address');var options={url:getDeliveryAddressFormUrl,data:{addressId:addressId,createUpdateStatus:''},target:'#summaryDeliveryAddressFormContainer',type:'GET',success:function(data)
{ACC.address.bindCreateUpdateAddressForm();ACC.colorbox.resize();},error:function(xht,textStatus,ex)
{alert("Failed to update cart. Error details ["+xht+", "+textStatus+", "+ex+"]");}};$(this).ajaxSubmit(options);return false;},handleDefaultAddressClick:function()
{var addressId=$(this).attr('data-address');var options={url:setDefaultAddressUrl,data:{addressId:addressId},type:'GET',success:function(data)
{ACC.address.setupDeliveryAddressPopupForm(data);},error:function(xht,textStatus,ex)
{alert("Failed to update address book. Error details ["+xht+", "+textStatus+", "+ex+"]");}};$(this).ajaxSubmit(options);return false;},handleSelectExitingAddressSuccess:function(data)
{if(data!=null)
{ACC.refresh.refreshPage(data);ACC.colorbox.close();}
else
{alert("Failed to set delivery address");}},bindCreateUpdateAddressForm:function()
{$('.create_update_address_form').each(function()
{var options={type:'POST',beforeSubmit:function()
{$('#checkout_delivery_address').block({message:ACC.address.spinner});},success:function(data)
{$('#summaryDeliveryAddressFormContainer').html(data);var status=$('.create_update_address_id').attr('status');if(status!=null&&"success"===status.toLowerCase())
{ACC.refresh.getCheckoutCartDataAndRefreshPage();ACC.colorbox.close();}
else
{ACC.address.bindCreateUpdateAddressForm();ACC.colorbox.resize();}},error:function(xht,textStatus,ex)
{alert("Failed to update cart. Error details ["+xht+", "+textStatus+", "+ex+"]");},complete:function()
{$('#checkout_delivery_address').unblock();}};$(this).ajaxForm(options);});},refreshDeliveryAddressSection:function(data)
{$('.summaryDeliveryAddress').replaceWith($('#deliveryAddressSummaryTemplate').tmpl(data));},bindSuggestedDeliveryAddresses:function()
{var status=$('.add_edit_delivery_address_id').attr('status');if(status!=null&&"hasSuggestedAddresses"==status)
{ACC.address.showSuggestedAddressesPopup();}},showSuggestedAddressesPopup:function()
{ACC.colorbox.open("",{href:"#popup_suggested_delivery_addresses",inline:true,overlayClose:false,width:525,});},bindCountrySpecificAddressForms:function(){$(document).on("change",'#countrySelector select',function(){var options={'addressCode':'','countryIsoCode':$(this).val()};ACC.address.displayCountrySpecificAddressForm(options,ACC.address.showAddressFormButtonPanel);})},showAddressFormButtonPanel:function()
{if($('#countrySelector :input').val()!=='')
{$('#addressform_button_panel').show();}},bindToColorboxClose:function()
{$(document).on("click",".closeColorBox",function()
{ACC.colorbox.close();})},displayCountrySpecificAddressForm:function(options,callback)
{$.ajax({url:ACC.config.encodedContextPath+'/my-account/addressform',async:true,data:options,dataType:"html",beforeSend:function()
{$("#i18nAddressForm").html(ACC.address.spinner);}}).done(function(data)
{$("#i18nAddressForm").html($(data).html());if(typeof callback=='function')
{callback.call();}});},bindToChangeAddressButton:function()
{$(document).on("click",'.summaryDeliveryAddress .editButton',ACC.address.handleChangeAddressButtonClick);},bindViewAddressBook:function()
{$(document).on("click",".js-address-book",function(e){e.preventDefault();ACC.colorbox.open("Direcciones guardadas",{href:"#addressbook",inline:true,width:"380px"});})
$(document).on("click",'#summaryOverlayViewAddressBook',function()
{$('#summaryDeliveryAddressFormContainer').hide();$('#summaryOverlayViewAddressBook').hide();$('#summaryDeliveryAddressBook').show();ACC.colorbox.resize();});},showRemoveAddressFromBookConfirmation:function()
{$(document).on("click",".removeAddressFromBookButton",function()
{var addressId=$(this).data("addressId");var popupTitle=$(this).data("popupTitle");ACC.colorbox.open(popupTitle,{inline:true,height:false,href:"#popup_confirm_address_removal_"+addressId,onComplete:function()
{$(this).colorbox.resize();}});})},backToListAddresses:function(){$(".addressBackBtn").on("click",function(){var sUrl=$(this).data("backToAddresses");window.location=sUrl;});},showFieldsForPickupConsignment:function(){$(".pickup-consignment-left-input").on("click",function(){var element=$(this);var elementNumber=element.next().val();if(element.is(":checked")==true){$(".containerPickupConsignment_"+elementNumber).show(500);}else{$(".containerPickupConsignment_"+elementNumber).hide(500);}});},submitEventToPickupConsignment:function(){$(".savepickupConsignmentButton").on("click",function(){var button=$(this);var elementNumber=button.attr("data-number");$(".pickupConsignmentButton_"+elementNumber).attr('disabled','disabled');button.text("Guardando...");var firsName=$(".pickupConsignmentFirstName_"+elementNumber).val().trim();var middleName=$(".pickupConsignmentMiddleName_"+elementNumber).val().trim();var lastName=$(".pickupConsignmentLastName_"+elementNumber).val().trim();if(firsName!=undefined&&middleName!=undefined&&lastName!=undefined&&firsName.length>0&&middleName.length>0&&lastName.length>0){$.ajax({url:ACC.config.encodedContextPath+"/checkout/multi/cybersource-summary/savePickupConsignment",type:'POST',data:$("#pickupConsignmentForm_"+elementNumber).serialize(),success:function(response){$(".showName_"+elementNumber+" > .show").text(firsName+" "+middleName+" "+lastName);$(".showNameColumTwo_"+elementNumber).text(firsName+" "+middleName+" "+lastName);$(".showPickupByColumTwo_"+elementNumber).show(300);$(".containerPickupConsignment_"+elementNumber).hide(500);button.text("Guardar");$(".pickupConsignmentButton_"+elementNumber).removeAttr('disabled');$(".removePickUpName_"+elementNumber).show();$("#pickupConsignmentCheckbox_"+elementNumber).prop("checked",false);},error:function(){console.log("Errror");button.text("Guardar");$(".pickupConsignmentButton_"+elementNumber).removeAttr('disabled');}});}else{button.text("Guardar");$(".pickupConsignmentButton_"+elementNumber).removeAttr('disabled');}});},validationRulesPickupConsignment:function(){$(".firsNameConsigment").focusout(function(){var name=$(this);var elementNumber=name.attr("data-number");if(name.val().length>0){var middleName=$(".pickupConsignmentMiddleName_"+elementNumber).val();if(middleName.length>0){var lastName=$(".pickupConsignmentLastName_"+elementNumber).val();if(lastName.length>0){return $(".pickupConsignmentButton_"+elementNumber).prop("disabled",false);}}}
return $(".pickupConsignmentButton_"+elementNumber).prop("disabled",true);});$(".middleNameConsigment").focusout(function(){var middleName=$(this);var elementNumber=middleName.attr("data-number");if(middleName.val().length>0){var firsName=$(".pickupConsignmentFirstName_"+elementNumber).val();if(firsName.length>0){var lastName=$(".pickupConsignmentLastName_"+elementNumber).val();if(lastName.length>0){return $(".pickupConsignmentButton_"+elementNumber).prop("disabled",false);}}}
return $(".pickupConsignmentButton_"+elementNumber).prop("disabled",true);});$(".lastNameConsigment").focusout(function(){var lastName=$(this);var elementNumber=lastName.attr("data-number");if(lastName.val().length>0){var firsName=$(".pickupConsignmentFirstName_"+elementNumber).val();if(firsName.length>0){var middleName=$(".pickupConsignmentMiddleName_"+elementNumber).val();if(middleName.length>0){return $(".pickupConsignmentButton_"+elementNumber).prop("disabled",false);}}}
return $(".pickupConsignmentButton_"+elementNumber).prop("disabled",true);});$("input[name='lastName'],input[name='middleName'], input[name='firstName']").keydown(function(e){var arr=[8,9,16,17,20,32,35,36,37,38,39,40,45,46,192];for(var i=65;i<=90;i++){arr.push(i);}
if(jQuery.inArray(event.which,arr)===-1){event.preventDefault();}});},removePickupConsignment:function(){$(".removePickUpButton").on("click",function(){var button=$(this);var elementNumber=button.attr("data-number");$(".showName_"+elementNumber+" > .show").text("Eliminando...");button.attr('disabled','disabled');$(".pickupConsignmentFirstName_"+elementNumber).val("");$(".pickupConsignmentMiddleName_"+elementNumber).val("");$(".pickupConsignmentLastName_"+elementNumber).val("");$.ajax({url:ACC.config.encodedContextPath+"/checkout/multi/cybersource-summary/savePickupConsignment",type:'POST',data:$("#pickupConsignmentForm_"+elementNumber).serialize(),success:function(response){$(".showName_"+elementNumber+" > .show").text("No se ha seleccionado informacion.");$(".pickupConsignmentButton_"+elementNumber).attr('disabled','disabled');button.hide();$(".containerPickupConsignment_"+elementNumber).hide(500);$(".showPickupByColumTwo_"+elementNumber).hide(500);$("#pickupConsignmentCheckbox_"+elementNumber).prop("checked",false);button.removeAttr('disabled');},error:function(){console.log("Errror");button.removeAttr('disabled');}});});},bindValidatePostalCode:function(){$(document).on("click","#validatePostalCode",ACC.address.handleValidateButtonClick);},handleValidateButtonClick:function(e)
{e.preventDefault();document.getElementById("onSearchBoxClick").value="validate";$("#addressForm").submit();}};