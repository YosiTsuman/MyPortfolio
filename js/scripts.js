
var lastChapter = "";
var first = true;
var scrollTimer;
var sectionsShown = new Array();
function showMenu()
{
	$("#menu").slideDown( "800" );

}
function showSection(id)
{
	switch(id)
	{
		case "section1":
			$(".introduction").fadeIn("slow");
			break;
		case "section2":
			if(sectionsShown[2] != true)
			{
				$('.bar').each(function (i) {
			        var $bar = $(this);
			        $(this).append('<span class="count"></span>')
			        setTimeout(function () {
			            $bar.css('width', $bar.attr('data-percent'));
			        }, i * 100);
			    });

			    $('.count').each(function () {
			        $(this).prop('Counter', 0).animate({
			            Counter: $(this).parent('.bar').attr('data-percent')
			        }, {
			            duration: 2000,
			            easing: 'swing',
			            step: function (now) {
			                $(this).text(Math.ceil(now) + '%');
			            }
			        });
			    });
			    sectionsShown[2] = true;
			}
			break;
		case "section3":
			$(".gallery_item img").fadeIn("slow",function(){
			});
			break;
		case "section4":
			if(sectionsShown[4] != true)
			{
				var mq = window.matchMedia( "(max-width: 767px)" );
				var first = "60%";
				var second = "55%";
				if(!mq.matches)
				{
					first = "250px";
					second = "200px";
				}
				$(".link").animate({width:first},400,function(){
					$(".link").animate({width:second},200);
				});
				sectionsShown[4] = true;
			}
			break;
	}
}
function goToSection(id){
	

	
	if(lastChapter != "")
	{
		$("#next"+lastChapter).css("height","0px");
		$("#next"+lastChapter+" .nxtBtn").css("visibility","hidden");
		/*$("#next"+lastChapter+" font").css("visibility","hidden");
		$("#next"+lastChapter+" i").css("visibility","hidden");*/
		
	}
	
	lastChapter = id;
	
	$('html, body').animate({
		scrollTop : $("#" + id).offset().top
	}, 500, function(){
		
		showSection(id);
		
		$("#next"+id).animate({
			height : "45px"
		}, 700,function(){
			/*$("#next"+lastChapter+" font").css("visibility","visible");
			$("#next"+lastChapter+" i").css("visibility","visible");*/
			$("#next"+lastChapter+" .nxtBtn").css("visibility","visible");
			});
		
		if(first)
		{
			showMenu();
			first = false;
		}
		
	});
}

$(document).ready(function() {

	
	$(document).bind('scroll', function() {
		clearTimeout(scrollTimer);
		
		/*if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
        {
          alert('end reached');
        }*/
		
		$( ".section" ).each(function( index ) {

			if($(document).scrollTop() < $(this).innerHeight() + $(this).offset().top && $(document).scrollTop() > $(this).offset().top)
			{
				var pos = $(this).position();
				if((($(this).innerHeight() + pos.top) - $(document).scrollTop()) > ($(this).innerHeight()/2))
					var sectionId = index+1;
				else
					var sectionId = index+2;
				
				showSection('section' + sectionId);
				scrollTimer = setTimeout(function(){goToSection('section' + sectionId);}, 700);
			}
			});
		
	});
});
