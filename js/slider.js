var slider;

function getCenter(element)
{
	var $this = $("#"+element);
	var offset = $this.offset();
	var width = $this.width();
	var height = $this.height();

	var centerX = offset.left + width / 2;
	var centerY = offset.top + height / 2;
	
	return [centerX,centerY];
}

function initSlider()
{
	var center = getCenter("contentContainer");
	
	var left = center[0] - $("#sliderConteiner").width()/2;
	var top = center[1] - $("#sliderConteiner").height()/2;
	
	$("#sliderConteiner").css("left",left);
	$("#sliderConteiner").css("top",top);
}

function showSlider(id)
{
	slider = new BeaverSlider({
	    type: "carousel",
	    structure: {
	        container: {
	            id: "my-slider",
	            width: $("#sliderConteiner").width(),
	            height: $("#sliderConteiner").height(),
	            margin:10
	        },
	        player: {
	            show: "always",
	            containerClass: "player-container-carousel",
	            backClass: "player-back-carousel",
	            forwardClass: "player-forward-carousel",
	            pauseClass: "player-pause-carousel",
	            playClass: "player-play-carousel"
	        }
	    },
	    content: {
	        images: projectsList.project[id]['images']
	    },
	    animation: {
	        waitAllImages: true,
	        effects: effectSets["carousel: slideOver"],
	        initialInterval: 1000,
	        interval: 2000
	    }
	});   
	$("#sliderConteiner").show();
}