(function($){$.cookieBar=function(options,val){if(options=='cookies'){var doReturn='cookies';}else if(options=='set'){var doReturn='set';}else{var doReturn=false;}
var defaults={message:'We use cookies to track usage and preferences.',acceptButton:true,acceptText:'I Understand',acceptFunction:function(cookieValue){if(cookieValue!='enabled'&&cookieValue!='accepted')window.location=window.location.href;},declineButton:false,declineText:'Disable Cookies',declineFunction:function(cookieValue){if(cookieValue=='enabled'||cookieValue=='accepted')window.location=window.location.href;},policyButton:false,policyText:'Privacy Policy',policyURL:'/privacy-policy/',autoEnable:true,acceptOnContinue:false,acceptOnScroll:false,acceptAnyClick:false,expireDays:365,renewOnVisit:false,forceShow:false,effect:'slide',element:'body',append:false,fixed:false,bottom:false,zindex:'',domain:String(window.location.hostname),referrer:String(document.referrer)};var options=$.extend(defaults,options);var expireDate=new Date();expireDate.setTime(expireDate.getTime()+(options.expireDays*86400000));expireDate=expireDate.toGMTString();var cookieEntry='cb-enabled={value}; expires='+expireDate+'; path=/';var i,cookieValue='',aCookie,aCookies=document.cookie.split('; ');for(i=0;i<aCookies.length;i++){aCookie=aCookies[i].split('=');if(aCookie[0]=='cb-enabled'){cookieValue=aCookie[1];}}
if(cookieValue==''&&doReturn!='cookies'&&options.autoEnable){cookieValue='enabled';document.cookie=cookieEntry.replace('{value}','enabled');}else if((cookieValue=='accepted'||cookieValue=='declined')&&doReturn!='cookies'&&options.renewOnVisit){document.cookie=cookieEntry.replace('{value}',cookieValue);}
if(options.acceptOnContinue){if(options.referrer.indexOf(options.domain)>=0&&String(window.location.href).indexOf(options.policyURL)==-1&&doReturn!='cookies'&&doReturn!='set'&&cookieValue!='accepted'&&cookieValue!='declined'){doReturn='set';val='accepted';}}
if(doReturn=='cookies'){if(cookieValue=='enabled'||cookieValue=='accepted'){return true;}else{return false;}}else if(doReturn=='set'&&(val=='accepted'||val=='declined')){document.cookie=cookieEntry.replace('{value}',val);if(val=='accepted'){return true;}else{return false;}}else{var message=options.message.replace('{policy_url}',options.policyURL);if(options.acceptButton){var acceptButton='<a href="" class="cb-enable">'+options.acceptText+'</a>';}else{var acceptButton='';}
if(options.declineButton){var declineButton='<a href="" class="cb-disable">'+options.declineText+'</a>';}else{var declineButton='';}
if(options.policyButton){var policyButton='<a href="'+options.policyURL+'" class="cb-policy">'+options.policyText+'</a>';}else{var policyButton='';}
if(options.fixed){if(options.bottom){var fixed=' class="fixed bottom"';}else{var fixed=' class="fixed"';}}else{var fixed='';}
if(options.zindex!=''){var zindex=' style="z-index:'+options.zindex+';"';}else{var zindex='';}
if(options.forceShow||cookieValue=='enabled'||cookieValue==''){if(options.append){$(options.element).append('<div id="cookie-bar"'+fixed+zindex+'><p>'+message+acceptButton+declineButton+policyButton+'</p></div>');}else{$(options.element).prepend('<div id="cookie-bar"'+fixed+zindex+'><p>'+message+acceptButton+declineButton+policyButton+'</p></div>');}}
var removeBar=function(func){if(options.acceptOnScroll)$(document).off('scroll');if(typeof(func)==='function')func(cookieValue);if(options.effect=='slide'){$('#cookie-bar').slideUp(300,function(){$('#cookie-bar').remove();});}else if(options.effect=='fade'){$('#cookie-bar').fadeOut(300,function(){$('#cookie-bar').remove();});}else{$('#cookie-bar').hide(0,function(){$('#cookie-bar').remove();});}
$(document).unbind('click',anyClick);};var cookieAccept=function(){document.cookie=cookieEntry.replace('{value}','accepted');removeBar(options.acceptFunction);};var cookieDecline=function(){var deleteDate=new Date();deleteDate.setTime(deleteDate.getTime()-(864000000));deleteDate=deleteDate.toGMTString();aCookies=document.cookie.split('; ');for(i=0;i<aCookies.length;i++){aCookie=aCookies[i].split('=');if(aCookie[0].indexOf('_')>=0){document.cookie=aCookie[0]+'=0; expires='+deleteDate+'; domain='+options.domain.replace('www','')+'; path=/';}else{document.cookie=aCookie[0]+'=0; expires='+deleteDate+'; path=/';}}
document.cookie=cookieEntry.replace('{value}','declined');removeBar(options.declineFunction);};var anyClick=function(e){if(!$(e.target).hasClass('cb-policy'))cookieAccept();};$('#cookie-bar .cb-enable').click(function(){cookieAccept();return false;});$('#cookie-bar .cb-disable').click(function(){cookieDecline();return false;});if(options.acceptOnScroll){var scrollStart=$(document).scrollTop(),scrollNew,scrollDiff;$(document).on('scroll',function(){scrollNew=$(document).scrollTop();if(scrollNew>scrollStart){scrollDiff=scrollNew-scrollStart;}else{scrollDiff=scrollStart-scrollNew;}
if(scrollDiff>=Math.round(options.acceptOnScroll))cookieAccept();});}
if(options.acceptAnyClick){$(document).bind('click',anyClick);}}};})(jQuery);