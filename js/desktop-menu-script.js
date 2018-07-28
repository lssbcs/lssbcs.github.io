$(".menu_left").click(function(){
	if($(this).parent().attr("id")=="blog_set"){
		hideBlog($("#landing"));
		showMenuPane("landing");
	}
	else{
		scrollToElement($("#landing"),false);
	}
});

$(".menu_link").click(function(){
	if(!$(this).hasClass("selected_link")){
		var element="";
		if($(this).find("h3").text()=="About"){
			element=$("#about");
		}
		else if($(this).find("h3").text()=="Projects"){
			element=$("#projects");
		}
		else if($(this).find("h3").text()=="Contact"){
			element=$("#contact");
		}
		else if($(this).find("h3").text()=="Blog"){
			showBlog();
			currentPane="blog";
			return;
		}
		if($(this).parent().parent().attr("id")=="blog_set"){
			hideBlog(element);
		}
		else{
			scrollToElement(element,false);
		}
	}
});

var currentPane="landing";
function setDesktopMenuPosition(){
	if(!getBlog()){
		var position = $(window).scrollTop() + $("#menu").height();
		if(position>=getElementPosition($("#about")) && position<getElementPosition($("#projects"))){
			if(currentPane!="about"){
				showMenuPane("about");
			}
		}
		else if(position>=getElementPosition($("#projects")) && position<getElementPosition($("#contact")) && position+$(window).height()<$(document).height()){
			if(currentPane!="projects"){
				showMenuPane("projects");
			}
		}
		else if(position>=getElementPosition($("#contact"))||position+$(window).height()>=$(document).height()){
			if(currentPane!="contact"){
				showMenuPane("contact");
			}
		}
		else{
			showMenuPane("landing");
		}
	}	
}
function showMenuPane(pane){
		$("#"+pane+"_set").show();
		$(".menu_set:not(#"+pane+"_set,#blog_set,#"+currentPane+"_set)").hide();
		$("#menu_roller").removeClass();
		currentPane=pane;
		$("#menu_roller").addClass("show-"+pane);
		window.setTimeout(function(){
	    	$(".selected_link_underline:not(.selected_link .selected_link_underline)").remove();
	    	var currentSelected=$("#"+currentPane+"_set").find(".selected_link");
			createUnderline(currentSelected);
		}, 300);
}

function createUnderline(link){
	link.append("<div class='selected_link_underline'></div>");
	expandUnderline(link.find(".selected_link_underline"));
}
function expandUnderline(line){
	line.stop(true,false).animate({
		width:(line.parent().find("h3").width())+"px"
	},200);
}
function removeUnderline(line){
	line.stop(true,false).animate({
		width:0
	},300,function(){
		line.remove();
	});
}
$(".menu_link:not(.selected_link)").hover(
function(){	
	createUnderline($(this));
},function(){
	if(!$(this).hasClass(".selected_link")){	
		removeUnderline($(this).find(".selected_link_underline"));
	}
});