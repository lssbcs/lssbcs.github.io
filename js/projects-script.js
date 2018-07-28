var clicks=0;
var projectMarkup={};
projectMarkup["Orbital Diagnostics"]=[
									"<h4>Project Specification</h4><p>ff kvdfvs sdfn sdf j dsf sdvjj sdfv sdf dsf dsf dfdfsdfs ndvvfhi ihfdv cfdvhfvh f vhf v fv hf h jdaondondad ds hd sf sdo h shdic so sdv hsd vosdnco vsdoco sdjc sdc s dc sc  sdvb bj vhfnuonfwdc djodf vjonvuosnvj h fouv socv</p>",
									"<h4>Technologies Used</h4><p>dnfjnsdfnsdjufnjusdfnsdfnosd nfn sdfniosdnfo sdnofjnsdofnsdo fnsdofniosdn enfeofownfonwefnwef ownf nw</p>",
									"<h4>Finished Project</h4><img src='assets/stock1.jpg'>",
									"<h4>Personal Contribution</h4><p>dfudnsuvfndfnvuonw fjw fjow foweon wj ddn weonw  wfjw eon foj je vjo wof fvo jonwipncvn jo o vin dfkinsdco jjov sdcndspcnspd dddc</p>"
									];
projectMarkup["Root Code Solutions"]=["b","c","d","a"];
projectMarkup["Settlers Of Catan"]=["c","d","a","b"];
projectMarkup["SH Project"]=["d","a","b","c"];
projectMarkup["Other Projects"]=["a","b","c","d"];





function positionTiles(position){
	var tiles=$(".project_thumb");
	var numberOfTiles=tiles.length;
	var angle=360/numberOfTiles;
	var centerTile;
	tiles.each(function(item, tile){
		var i=(item+position)%numberOfTiles;
		var internalAngle=angle*i;
		var multiplicationFactor=[1, 0, 1];
		var angleFrom90=internalAngle%90;
		var zIndex=0;
		var opacity=0;
		$(tile).removeClass("selected_tile");
		if(internalAngle==0){
			opacity=1;
			zIndex=2;
			$(tile).addClass("selected_tile");
		}
		else if(i==1||i==numberOfTiles-1){
			opacity=0.5;
			zIndex=1;
		}
		else{
			opacity=0;
			zIndex=0;
		}
		if(internalAngle>90 && internalAngle<=270){
			multiplicationFactor[2]=-1;
		}
		if(internalAngle>180 && internalAngle<=360){
			multiplicationFactor[0]=-1;
		}
		if(internalAngle>180){
			angleFrom90=90-angleFrom90;
		}
		var xShift=Math.sin(toRadians(angleFrom90))*multiplicationFactor[0]*$(window).width()*0.3;
		var zShift=Math.cos(toRadians(angleFrom90))*multiplicationFactor[2]*$(window).width()*0.3;
		$(tile).css({transform: "translate3D("+xShift+"px, 0px, "+zShift+"px)"});
		$(tile).css({"-webkit-transform": "translate3D("+xShift+"px, 0px, "+zShift+"px)"});
		$(tile).css({"z-index": zIndex});
		$(tile).stop(true,false).fadeTo(400,opacity);
		$(tile).removeClass("left_tile");
		$(tile).removeClass("right_tile");
		$(tile).find(".project_thumb_title").removeClass("project_thumb_selected_title");
		if(internalAngle<=180&&internalAngle>0){
			$(tile).addClass("right_tile");
		}
		else if(internalAngle<360&&internalAngle>180||internalAngle==0){
			$(tile).addClass("left_tile");
		}
		if(internalAngle==0){
			$(tile).find(".project_thumb_title").addClass("project_thumb_selected_title");
			centerTile=tile;
		}
	});
	return centerTile;
}
function refreshTiles(){
	positionTiles(clicks);
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
$("#project_gallery").on("click",".left_tile",function(){
	clicks++;
	if(clicks>$(".project_thumb").length){
		clicks=clicks-$(".project_thumb").length;
	}
	var centerTile=positionTiles(clicks);
	addText(clicks);
});

$("#project_gallery").on("click",".right_tile",function(){
	clicks--;
	if(clicks<0){
		clicks=clicks+$(".project_thumb").length;
	}
	var centerTile=positionTiles(clicks);
	addText(clicks);
});


function addText(project){
	var projectName=$(".selected_tile").find("h4").text();
	$(".left_panel").stop(true, false).animate({
		left: -100+"%"
	},200);
	$(".right_panel").stop(true, false).animate({
		right: -100+"%"
	},200,function(){
		animatePanelIn($(".top_panel.left_panel"), projectMarkup[projectName][0], 100, "left", 20);
		animatePanelIn($(".top_panel.right_panel"), projectMarkup[projectName][1], 150, "right", 20);
		animatePanelIn($(".bottom_panel.left_panel"), projectMarkup[projectName][2], 200, "left", 20);
		animatePanelIn($(".bottom_panel.right_panel"), projectMarkup[projectName][3], 250, "right", 20);
	});
}

function animatePanelIn(panel, text, delay, side, distance){
	panel.html(text);
	if(side=="left"){
		panel.stop(true, false).delay(delay).animate({
			left: distance+"%" 
		},200);
	}
	else{
		panel.stop(true, false).delay(delay).animate({
			right: distance+"%" 
		},200);
	}
}