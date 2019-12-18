ACC.newsletter={bindAll:function()
{this.newsletterLink($('.newsletter-pop'));},newsletterLink:function(link)
{link.click(function()
{$.get(link.data('url')).done(function(data){$.colorbox({html:data,width:950,height:600,overlayClose:false,scrolling:false,onOpen:function()
{$('#validEmail').remove();},onComplete:function()
{var officeDepotNewsletterForm=$('#officeDepotNewsletterForm');officeDepotNewsletterForm.ajaxForm({success:function(data)
{if($(data).closest('#validEmail').length)
{if($('#validEmail').length===0)
{$('#globalMessages').append(data);}
$.colorbox.close();}
else
{$("#officeDepotNewsletterForm .control-group").replaceWith($(data).find('.control-group'));}}});ACC.common.refreshScreenReaderBuffer();},onClosed:function()
{ACC.common.refreshScreenReaderBuffer();}});});});}};$(document).ready(function()
{ACC.newsletter.bindAll();});