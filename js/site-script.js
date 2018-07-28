var windowMobileWidth = 1000;
var inBlog=false;

function getBlog(){
	return inBlog;
}
function scrollTo(position,speed){
	$('html, body').stop().animate({
		scrollTop: position
	}, speed);
}
function distanceFromElement(element){
	var elementPosition=getElementPosition(element) - ($("#menu").height()/2)+1;
	var screenPosition=$(document).scrollTop();
	return Math.abs(elementPosition-screenPosition);
}
function scrollToElement(element, blog=false){
	if(blog){
		scrollTo((getElementPosition(element) - ($("#menu").height()/2)),30);
	}
	else{
		scrollTo((getElementPosition(element) - ($("#menu").height()/2)),distanceFromElement(element)/2);
	}
}

function getElementPosition(element){
	return element.offset().top
}
function showBlog(){
	inBlog=true;
	setMenuPosition();
	var moveTo = -($(window).width()/100)*20;
	removeUnderline($(".selected_link_underline"));
	$("#blog_right").stop().animate({
		right: moveTo+"px"
	},400);
	$("#blog_left").stop().animate({
		left: moveTo+"px"
	},400,function(){
		$("#blog").css("display","block");
	    var currentSelected=$("#blog_set").find(".selected_link");
		$("body").stop(true,false).scrollTop(0);
		$("#content").css("display","none");
		$("#menu").css("display","none");	
		$("#blog_right").fadeOut(200);
		$("#blog_left").fadeOut(200,function(){
			createUnderline(currentSelected);
		});
	});
}
function hideBlog(newPosition){
	inBlog=false;
	setMenuPosition();
	var moveTo = -($(window).width()/100)*200;
	$("#blog_right").fadeIn(200);
	$("#blog_left").fadeIn(200,function(){
		$("#content").css("display","block");
		$("#menu").css("display","block");
		scrollToElement(newPosition,true);
		$("#blog").css("display","none");
		$("#blog_right").stop().animate({
			right: moveTo+"px"
		},400);
		$("#blog_left").stop().animate({
			left: moveTo+"px"
		},400);
	});
}

function repositionBlog(){
	if(!inBlog){
		var moveTo = -($(window).width()/100)*200;
		$("#blog_left").css("left",-moveTo+"px");
		$("#blog_right").css("right",-moveTo+"px");
	}
}

$(window).load(function(){
	setMenuPosition();
	positionTiles(0);
	parallax();
	blurInOut();
})

$(window).resize(function(){
	setMenuPosition();
	refreshTiles();
	parallax();
	blurInOut();
	repositionBlog();
});

$(window).scroll(function(){
	setMenuPosition();
	parallax();
	blurInOut();
});

function parallax(){
    if($(window).width()>windowMobileWidth){
        $(".parallax").each(function(){
        	//element height
            var elementHeight=$(this).height();
            //element position in document
            var elementTop=$(this).offset().top;
            var elementBottom=elementTop+elementHeight;
            var elementMiddle=elementTop+elementHeight/2;
            //screen height
            var screenHeight=$(window).height();
            //screen position in document
            var screenTop=$("body").scrollTop();
            var screenBottom=screenTop+screenHeight;
            var screenMiddle=screenTop+screenHeight/2;
            if(elementBottom>screenTop&&elementTop<screenBottom){
                $(this).css({
                    top: ((
                    		(
                    			(elementMiddle-screenMiddle) /*distance from middle of element to middle of screen*/
                    			/
                    			((elementHeight+screenHeight)/2) /*total space effect occurs*/
                    		)
                    		*
                    		((elementHeight-$(this).parent().height())/2) /*wiggle room within parent element*/
                    	)+$(this).parent().height()/2)+"px"
            	});
            }
        });
    }
}
function blurInOut(){
	if($(window).width()>windowMobileWidth){
        $(".blurInOut").each(function(){
        	//element height
            var elementHeight=$(this).parent().height();
            //element position in document
            var elementTop=$(this).parent().offset().top;
            var elementBottom=elementTop+elementHeight;
            var elementMiddle=elementTop+elementHeight/2;
            //screen height
            var screenHeight=$(window).height();
            //screen position in document
            var screenTop=Math.max($("body").scrollTop(),$("#blog_set").scrollTop());
            var screenBottom=screenTop+screenHeight;
            var screenMiddle=screenTop+screenHeight/2;
            var relativeElementMiddle=Math.abs(elementMiddle-screenMiddle);
            var chunkHeight=screenHeight/5;
            var filterPower=relativeElementMiddle/chunkHeight;
            $(this).css({"-webkit-filter": "blur("+filterPower+"px)"});
            $(this).css({filter: "blur("+filterPower+"px)"});
        });
    }
}