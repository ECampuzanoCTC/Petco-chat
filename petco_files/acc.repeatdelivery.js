ACC.repeatdelivery={bindToQuantitySelector:function()
{$('.repeatSelector').change(function()
{$('#updateItemRepeatForm'+$(this).attr('entryNumber')).get(0).submit();});},bindToRemoveProductRepeat:function()
{$('.removeProductRepeat').on("click",function()
{if($('#numberOfEntriesRD').attr("data-value")==1){alert($('#messageRemoveRD').val());}
var r=confirm($('#messageRemoveProduct').val());if(r==true){$('#quantity'+$(this).attr('id')+' option:first').attr('selected',true);$('#updateItemRepeatForm'+$(this).attr('id')).submit();}});},bindToSetFrequencyRepeat:function(){$('.repeatFrequency').ready(function()
{var frequency=$(this).attr('entryNumber')
$(this).attr('value',frequency);});},bindToUpdateFrequencyRepeat:function(){$('.repeatFrequency').change(function()
{$('#updateFrequencyRepeatForm').get(0).submit();});},bindToChangeStatusEasyBuy:function(){$("[id^='linkCancelEasyBuy']").click(function(e){var easyBuyId=$(this).data("code");var popupTitle=$(this).data("popupTitle");ACC.colorbox.open(popupTitle,{inline:true,href:"#popup_confirm_cancel_easybuy_"+easyBuyId,width:"460px",onComplete:function()
{$(this).colorbox.resize();$('#cancelComment').val('');}});});}};$(document).ready(function()
{with(ACC.repeatdelivery)
{bindToQuantitySelector();bindToRemoveProductRepeat();bindToUpdateFrequencyRepeat();bindToChangeStatusEasyBuy();}});