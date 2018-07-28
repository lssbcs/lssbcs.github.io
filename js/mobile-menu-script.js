function setMobileMenuPosition(){
	var aboutPosition = getPercentage("about","projects", 1);
	var projectsPosition = getPercentage("projects","contact", 1);
	var contactPosition = getPercentage("contact","footer", 1);
	var blogPosition = getBlog()== true ? 100 : 0;
	$(".about_burger").stop(true,false).animate({
		width: aboutPosition + "%"
	},100,"linear");
	$(".projects_burger").stop(true,false).animate({
		width: projectsPosition + "%"
	},100,"linear");
	$(".contact_burger").stop(true,false).animate({
		width: contactPosition + "%"
	},100,"linear");
	$(".blog_burger").stop(true,false).animate({
		width: blogPosition + "%"
	},100,"linear");
}
function getPercentage(element, next, fraction){
	var elementTop = getElementPosition($("#"+element));
	var nextTop = getElementPosition($("#"+next));
	var height = nextTop - elementTop;
	return Math.max(0,(getPosition(fraction)-elementTop)/(height/100))
}
function getPosition(fraction){
	if(getBlog()){
		return 0;
	}
	return $(window).scrollTop()+fraction*$(window).height();
}
function positionColoredText(){
	$(".seen_text h3, .initial_text h3").css({
		"line-height": $(".mobile_menu_link").height()+"px"
	})
	if(getBlog()){
		setColouredPosition(0,0,0,"home");
		setColouredPosition(0,0,0,"about");
		setColouredPosition(0,0,0,"projects");
		setColouredPosition(0,0,0,"contact");
		setColouredPosition(0,100,0,"blog");
	}
	else{
	positionIndividualColoredText("home","landing","about");
	positionIndividualColoredText("about","about","projects");
	positionIndividualColoredText("projects","projects","contact");
	positionIndividualColoredText("contact","contact","footer");
	setColouredPosition(0,0,0,"blog");
	}
}
function positionIndividualColoredText(text,element,next){
	var top = getPercentage(element, next, 0);
	var bottom = getPercentage(element, next, 1);
	var textTop = top*$(".initial_text").height()*0.01;
	setColouredPosition(top,bottom,textTop,text);
}
function setColouredPosition(top, bottom, textTop, text){
	$("#"+text+"_mobile_menu .seen_text").css({
		height : bottom - top +"%",
		top : textTop +"px"
	});

	$("#"+text+"_mobile_menu .seen_text h3").css({
		top : -textTop +"px"
	});
}
function getScreenPosition(){
	getPercentage("home","landing",0.5);
	getPercentage("about","about",0.5);
	getPercentage("projects","projects",0.5);
	getPercentage("contact","contact",0.5);
}
var inMenu = false;
$("#burger_button").click(function(){
	if(inMenu){
		closeMobileMenu();	
	}
	else{
		openMobileMenu();
	}
});
$("#mobile_content_mask").click(function(){
	closeMobileMenu();
})
function closeMobileMenu(){
	$("#mobile_content_mask").fadeOut(200);
	$("#burger_button").stop(true,false).animate({
			left: "40px"
		},150,function(){
			$($(".burger_bar").get(0)).delay(250).animate({
				width: "60px",
				left: "0px",
				top: "0px"
			},150);
			$($(".burger_bar").get(2)).delay(250).animate({
				width: "60px",
				left: "0px",
				top: "0px"
			},150);
			$($(".burger_bar").get(1)).delay(120).animate({
				width: "60px"
			},150);
			$($(".burger_bar").get(0)).delay(250).removeClass("top_mobile_arrow");
			$($(".burger_bar").get(2)).delay(250).removeClass("bottom_mobile_arrow");
			$("#mobile_menu").stop(true,false).animate({
				right: "-80vw"
			},400,function(){
				inMenu=false;
			});
			$("#burger_button").stop(true,false).animate({
				left : "-100px"
			},400);
		});
}
function openMobileMenu(){
	$("#mobile_content_mask").fadeIn(200);
	$("#burger_button").stop(true,false).animate({
			"padding-right": "30px"
		},150,function(){
			$($(".burger_bar").get(1)).delay(250).animate({
				width: "20px"
			},150,function(){
				$($(".burger_bar").get(0)).animate({
					width: "30px",
					left: "15px",
					top: "11px"
				},150);
				$($(".burger_bar").get(0)).addClass("top_mobile_arrow");
				$($(".burger_bar").get(2)).animate({
					width: "30px",
					left: "15px",
					top: "-11px"
				},150);
				$($(".burger_bar").get(2)).addClass("bottom_mobile_arrow");
			});
			positionColoredText();
			$("#mobile_menu").stop(true,false).animate({
				right: "0"
			},400,function(){
				inMenu=true;
			});
			$("#burger_button").stop(true,false).animate({
				"padding-right": "10px",
				left : "20px"
			},550);
		});
}
$(".mobile_menu_link").click(function(){
	var element
	if($(this).attr("id")=="home_mobile_menu"){
		element=$("#landing");
	}
	else if($(this).attr("id")=="about_mobile_menu"){
		element=$("#about");
	}
	else if($(this).attr("id")=="projects_mobile_menu"){
		element=$("#projects");
	}
	else if($(this).attr("id")=="contact_mobile_menu"){
		element=$("#contact");
	}
	else if($(this).attr("id")=="blog_mobile_menu"){
		showBlog();
		closeMobileMenu();
		return;
	}
	var result;
	if(getBlog()){
		result=hideBlog;
	}
	else{
		result=scrollToElement;
	}
	new Promise(function(fulfil,reject){
			fulfil(result(element));
	}).then(function(){
		closeMobileMenu();		
	});
});