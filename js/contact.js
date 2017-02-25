$(document).ready(function(){
	var mq = window.matchMedia( "(max-width: 767px)" );
	var first = "20%";
	var second = "15%";
	if(!mq.matches)
	{
		first = "250px";
		second = "200px";
	}
	$(".link").animate({width:first},400,function(){
		$(".link").animate({width:second},200);
	});
});