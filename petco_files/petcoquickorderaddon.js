var ACC=ACC||{};if($("#petcoQuickOrder").length>0){ACC.petcoquickorderaddon={_autoload:["bindClearQuickOrderRow","bindResetFormBtn","bindAddToCartClick","bindFocusOutQtyInputField","bindChangeOnSkuCheckbox","calculateGrandTotal","bindQtySelectorMinus","bindQtySelectorPlus"],processingMessage:$("<img src='"+ACC.config.commonResourcePath+"/images/spinner.gif'/>"),$quickOrderContainer:$('.js-pet-quick-order-container'),$quickOrderMinRows:Number($('.js-pet-quick-order-container').data('quickOrderMinRows')),$quickOrderMaxRows:Number($('.js-pet-quick-order-container').data('quickOrderMaxRows')),$productExistsInFormMsg:$('.js-pet-quick-order-container').data('productExistsInFormMsg'),$quickOrderLeavePageMsg:$('#petcoQuickOrder').data('gridConfirmMessage'),$hiddenSkuInput:'input.js-hidden-sku-field',$addToCartBtn:$('#js-add-to-cart-quick-order-btn-top, #js-add-to-cart-quick-order-btn-bottom'),$resetFormBtn:$('#js-reset-quick-order-form-btn-top, #js-reset-quick-order-form-btn-bottom'),$productInfoContainer:'.js-product-info',$skuInputField:'.js-sku-input-field',$qtyInputField:'.js-pet-quick-order-qty',$jsLiContainer:'li.js-li-container',$removeQuickOrderRowBtn:'.js-remove-quick-order-row',$skuValidationContainer:'.js-sku-validation-container',$qtyValidationContainer:'.js-qty-validation-container',$productItemTotal:'.js-pet-quick-order-item-total',$classHasError:'has-error',$skuCheckbox:'.js-pet-sku-checkbox',$grandTotal:".quick-order-grand-total",$qtySelectorMinus:'.js-quick-order-qty-selector-minus',$qtySelectorPlus:'.js-quick-order-qty-selector-plus',bindResetFormBtn:function(){ACC.petcoquickorderaddon.$resetFormBtn.on("click",ACC.petcoquickorderaddon.clearForm);},bindAddToCartClick:function(){ACC.petcoquickorderaddon.$addToCartBtn.on("click",ACC.petcoquickorderaddon.addToCart);},bindClearQuickOrderRow:function(){$(ACC.petcoquickorderaddon.$removeQuickOrderRowBtn).on("mousedown",ACC.petcoquickorderaddon.clearQuickOrderRow);},bindFocusOutQtyInputField:function(){$(ACC.petcoquickorderaddon.$qtyInputField).on("focusout keydown",ACC.petcoquickorderaddon.handleFocusOutOnQtyInput);},bindChangeOnSkuCheckbox:function(){$(ACC.petcoquickorderaddon.$skuCheckbox).on("change",ACC.petcoquickorderaddon.handleCheckSku);},bindQtySelectorMinus:function(){$(ACC.petcoquickorderaddon.$qtySelectorMinus).on("mousedown",ACC.petcoquickorderaddon.handleQtyMinus);},bindQtySelectorPlus:function(){$(ACC.petcoquickorderaddon.$qtySelectorPlus).on("mousedown",ACC.petcoquickorderaddon.handleQtyPlus);},addToCart:function(){ACC.petcoquickorderaddon.blockLinkProcessingMessage($(this));$.ajax({url:ACC.petcoquickorderaddon.$quickOrderContainer.data('quickOrderAddToCartUrl'),type:'POST',contentType:'application/json',data:ACC.petcoquickorderaddon.getJSONDataForAddToCart(),success:function(response){ACC.petcoquickorderaddon.disableBeforeUnloadEvent();window.location=ACC.config.encodedContextPath+'/cart';},error:function(xhr,textStatus,error){console.log("The following error occurred: "+textStatus,errorThrown);}});},handleAddToCartSuccess:function(response){if($(response.quickOrderErrorData).size()>0){ACC.petcoquickorderaddon.disableBeforeUnloadEvent();}
var lookup={};response.quickOrderErrorData.forEach(function(el){lookup[el.sku]=el.errorMsg;});$(ACC.petcoquickorderaddon.$qtyInputField).each(function(){var parentLi=ACC.petcoquickorderaddon.getCurrentParentLi(this);var sku=ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$skuInputField).val();var errorMsg=lookup[sku];if(errorMsg){ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$skuValidationContainer).text(errorMsg);}
else{ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$removeQuickOrderRowBtn).trigger("mousedown");}});ACC.petcoquickorderaddon.handleBeforeUnloadEvent();ACC.product.displayCartDetail(response);},getJSONDataForAddToCart:function(){var skusAsJSON=[];$(ACC.petcoquickorderaddon.$skuCheckbox).each(function(){if($(this).is(':checked')){var qty=Number(ACC.petcoquickorderaddon.findElementInCurrentParentLi(this,ACC.petcoquickorderaddon.$qtyInputField).val());if(qty>0){var sku=jQuery.trim(ACC.petcoquickorderaddon.findElementInCurrentParentLi(this,ACC.petcoquickorderaddon.$skuInputField).val());skusAsJSON.push({"product":{"code":sku},"quantity":qty});}}});return JSON.stringify({"cartEntries":skusAsJSON});},handleFocusOutOnQtyInput:function(event){var key=event.charCode?event.charCode:event.keyCode?event.keyCode:0;if(key==13){event.preventDefault();var parentLi=ACC.petcoquickorderaddon.getCurrentParentLi(event.target);parentLi.next().find(ACC.petcoquickorderaddon.$skuInputField).focus();$(event.target).focusout();}
if(event.type=="focusout"){ACC.petcoquickorderaddon.validateAndUpdateItemTotal(event);ACC.petcoquickorderaddon.enableDisableAddToCartBtn();}},clearForm:function(){ACC.petcoquickorderaddon.disableBeforeUnloadEvent();window.location.reload();},validateAndUpdateItemTotal:function(event){var parentLi=ACC.petcoquickorderaddon.getCurrentParentLi(event.target);var qtyValue=jQuery.trim(ACC.productorderform.filterSkuEntry($(event.target).val()));if(isNaN(qtyValue)||qtyValue==""){qtyValue=0;$(event.target).removeClass(ACC.petcoquickorderaddon.$classHasError);ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$qtyValidationContainer).text('');$(event.target).val(0);}
else{qtyValue=Number(qtyValue);$(event.target).val(qtyValue);var maxQty=jQuery.trim(ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$qtyInputField).data('maxProductQty'));var stockLevelStatus=jQuery.trim(ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$qtyInputField).data('stockLevelStatus'));maxQty=($.isEmptyObject(maxQty)&&stockLevelStatus=="inStock")?"FORCE_IN_STOCK":Number(maxQty);if(!isNaN(maxQty)&&qtyValue>maxQty){$(event.target).addClass(ACC.petcoquickorderaddon.$classHasError);var qtyValidationContainer=ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$qtyValidationContainer);qtyValidationContainer.text(qtyValidationContainer.data('maxProductQtyMsg'));qtyValue=maxQty;$(event.target).val(maxQty);}
else{$(event.target).removeClass(ACC.petcoquickorderaddon.$classHasError);ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$qtyValidationContainer).text('');}}
if(qtyValue>0){var itemPrice=parseFloat(ACC.petcoquickorderaddon.findElement(parentLi,'.js-product-price').data('productPrice'));ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$productItemTotal).html(ACC.productorderform.formatTotalsCurrency(itemPrice*qtyValue));}
else{ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$productItemTotal).text('');}
ACC.petcoquickorderaddon.calculateGrandTotal();},clearQuickOrderRow:function(){var quickOrderMinRows=ACC.petcoquickorderaddon.$quickOrderMinRows;var parentLi=ACC.petcoquickorderaddon.getCurrentParentLi(this);if($('.js-ul-container li.js-li-container').length>quickOrderMinRows){parentLi.remove();ACC.petcoquickorderaddon.bindClearQuickOrderRow();}
else{ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$productInfoContainer).remove();ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$skuValidationContainer).text('');ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$skuInputField).val('');ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$hiddenSkuInput).val('');}
ACC.petcoquickorderaddon.enableDisableAddToCartBtn();ACC.petcoquickorderaddon.handleBeforeUnloadEvent();ACC.petcoquickorderaddon.calculateGrandTotal();},isCurrentSkuSameAsPrevious:function(parentLi,productCode){return ACC.petcoquickorderaddon.findElement(parentLi,ACC.petcoquickorderaddon.$hiddenSkuInput).val()==productCode;},isDuplicateSku:function(currentInput,productCode){var exists=false;$(ACC.petcoquickorderaddon.$skuInputField).each(function(){if($(this).val()==productCode&&!$(this).is($(currentInput))){exists=true;return false}});return exists;},handleBeforeUnloadEvent:function(){if(ACC.petcoquickorderaddon.isAnySkuPresent()){ACC.petcoquickorderaddon.disableBeforeUnloadEvent();ACC.petcoquickorderaddon.enableBeforeUnloadEvent();}
else{ACC.petcoquickorderaddon.disableBeforeUnloadEvent();}},disableBeforeUnloadEvent:function(){$(window).off('beforeunload',ACC.petcoquickorderaddon.beforeUnloadHandler);},enableBeforeUnloadEvent:function(){$(window).on('beforeunload',ACC.petcoquickorderaddon.beforeUnloadHandler);},beforeUnloadHandler:function(){return ACC.petcoquickorderaddon.$quickOrderLeavePageMsg;},enableDisableAddToCartBtn:function(){var addToCartButtonEnabled=ACC.petcoquickorderaddon.shouldAddToCartBeEnabled();if(addToCartButtonEnabled){ACC.petcoquickorderaddon.$addToCartBtn.removeAttr('disabled');}else{ACC.petcoquickorderaddon.$addToCartBtn.attr('disabled','disabled');}},shouldAddToCartBeEnabled:function(){var sum=0;var enable=false;$(ACC.petcoquickorderaddon.$skuCheckbox).each(function(){if($(this).is(':checked')){var str=ACC.petcoquickorderaddon.findElementInCurrentParentLi(this,ACC.petcoquickorderaddon.$qtyInputField).val();if(str){sum+=parseInt(str.trim(),10);}
if(sum>=1){enable=true;return false;}}});return enable;},isAnySkuPresent:function(){var present=false;$(ACC.petcoquickorderaddon.$skuInputField).each(function(){var str=jQuery.trim(this.value);if(str){present=true;return false;}});return present;},getCurrentParentLi:function(currentElement){return $(currentElement).closest(ACC.petcoquickorderaddon.$jsLiContainer);},findElement:function(currentElement,toFind){return $(currentElement).find(toFind);},findElementInCurrentParentLi:function(currentElement,toFind){return $(currentElement).closest(ACC.petcoquickorderaddon.$jsLiContainer).find(toFind);},handleCheckSku:function(event){ACC.petcoquickorderaddon.calculateGrandTotal();},calculateGrandTotal:function(){var grandTotal=0.0;$(ACC.petcoquickorderaddon.$skuCheckbox).each(function(){if($(this).is(':checked')){var sku=jQuery.trim(ACC.petcoquickorderaddon.findElementInCurrentParentLi(this,ACC.petcoquickorderaddon.$skuInputField).val());var price=parseFloat(ACC.petcoquickorderaddon.findElementInCurrentParentLi(this,'.js-product-price').data('productPrice'));var qtyValue=parseInt(ACC.petcoquickorderaddon.findElementInCurrentParentLi(this,ACC.petcoquickorderaddon.$qtyInputField).val());var stockLevelStatus=jQuery.trim(ACC.petcoquickorderaddon.findElementInCurrentParentLi(this,ACC.petcoquickorderaddon.$qtyInputField).data('stockLevelStatus'))
if(stockLevelStatus!="outOfStock")
grandTotal+=(price*qtyValue);}});$(ACC.petcoquickorderaddon.$grandTotal).html(ACC.productorderform.formatTotalsCurrency(grandTotal));ACC.petcoquickorderaddon.enableDisableAddToCartBtn();},blockLinkProcessingMessage:function(submitButton)
{var form=submitButton.parents('form:first');form.block({message:ACC.petcoquickorderaddon.processingMessage});},handleQtyMinus:function(event){ACC.petcoquickorderaddon.handleQtyChange(this,"minus");},handleQtyPlus:function(event){ACC.petcoquickorderaddon.handleQtyChange(this,"plus");},handleQtyChange:function(parent,mode){var inputField=ACC.petcoquickorderaddon.findElementInCurrentParentLi(parent,ACC.petcoquickorderaddon.$qtyInputField);var currentQty=parseInt(inputField.val());var updated=false;if(mode==="minus"){if(currentQty>=1){currentQty=currentQty-1;updated=true;}else{updated=false;}}else{currentQty=currentQty+1;updated=true;}
if(updated){inputField.val(currentQty);var ev=$.Event("keydown",{charCode:13,which:13});inputField.trigger(ev);}},};}