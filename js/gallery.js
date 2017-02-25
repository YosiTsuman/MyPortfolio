var first = true;
var mouseon = -1;

function getImageNaturalSize(id)
{
	var screenImage = $("#"+id);

	var theImage = new Image();
	
	theImage.src = screenImage.attr("src");
	
	return [theImage.width,theImage.height];
}
function setSmallLogoSize(imgSize)
{
	if(imgSize[0] > imgSize[1])
		window.parent.$("#smallLogo").css({"width":"100%","height":"auto"});
	else
		window.parent.$("#smallLogo").css({"width":"auto","height":"100%"});
}

function setProject(parent)
{	

	var mq = window.matchMedia( "(max-width: 767px)" );
	
	var id = parent.attr("id").split("_");
	id = id[1];
	$("#smallLogo").attr("src","images/" + projectsList.project[id].name + "/logo.png");
	
	var gallery = "";
	if(projectsList.project[id]['images'].length > 0 && !mq.matches)
		gallery = "<br> <a href='javascript:showSlider("+id+")'>Gallery</a>";
	$("#aboutProject").html(projectsList.project[id].description + gallery);
	$("#dateProject").html(projectsList.project[id].date);
	
	var tags = projectsList.project[id].tags.split(",");
	
	var tagsStr = "";
	
	for(i in tags)
	{
		tagsStr += "<div class='tagCont'>"+tags[i]+"</div>&nbsp;";
	}
	$("#tagsProject").html(tagsStr);
	$(".tagCont").css({"background":"#D3D3D3","padding":" 4px","border-radius":" 11px","float":" left","margin":"0 5px 5px 0 "});

	var desc = $("<div id='description'></div>");
	
	desc.append($("#projectDescContainer").html());

	if(!mq.matches)
	{
		var top = parent.position().top;
		var left = parent.position().left;
		var margin = parseInt(parent.css('marginTop').replace("px", ""));
		var width = parent.width() + margin * 2;
		var height = parent.height() + margin * 2;
		desc.css({"position":"absolute","top":"50%","left":"50%","width":505,"height":365,"transform": "translate(-50%, -50%)"});
	}
	
	$("#"+parent.attr("id")).append(desc);
}
function closeDesc()
{
	$("#description").remove();
}
$(function (){
	
	//initSlider();
	
	projectsList = JSON.parse(data);
	
	$(".gallery_item img").click(function(){
		//if(first)
		//{
		
	
			
			//first = false;
		//}
	});

	/*$("#gallery").mouseout(function(){
		if($('.gallery_item:hover').length == 0 && $('#description:hover').length == 0)
		{
			mouseon = -1;
			$("#description").remove();
		}
	});*/
});