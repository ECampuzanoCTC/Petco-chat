ACC.promotionengine={_autoload:["bindMyPromoSelector"],bindMyPromoSelector:function()
{$(document).on("change","#promotionCampaignSelector",function(e)
{var target=$(e.target);var input=target.parent().parent().find(".js-voucher-code");var value=target.val();var form=target.parent().parent().find("#applyVoucherForm");input.val(value);form.submit();});}}