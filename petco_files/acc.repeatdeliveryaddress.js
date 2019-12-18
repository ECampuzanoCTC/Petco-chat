ACC.repeatdeliveryaddress={spinner:$("<img src='"+ACC.config.commonResourcePath+"/images/spinner.gif' />"),addressID:'',showAddressBook:function()
{$(document).on("click","#viewAddressBook",function()
{var data=$("#savedAddressListHolder").html();$.colorbox({height:false,html:data,onComplete:function()
{$(this).colorbox.resize();}});})}}
$(document).ready(function()
{with(ACC.repeatdeliveryaddress)
{showAddressBook();}});