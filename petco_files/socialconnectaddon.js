window.fbAsyncInit=function(){if(!document.getElementById("facebookAppId"))
return;var fappid=document.getElementById("facebookAppId").value;FB.init({appId:fappid,cookie:true,xfbml:true,version:'v3.2'});};(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))
return;js=d.createElement(s);js.id=id;js.src="https://connect.facebook.net/en_US/all.js";fjs.parentNode.insertBefore(js,fjs);}(document,'script','facebook-jssdk'));function fb_share(title,description,imageUrl,destinationUrl){FB.ui({method:'share',href:destinationUrl,quote:title,},function(response){if(response&&!response.error_message){console.log('Posting completed.');}else{console.log('Error while posting.');}});}