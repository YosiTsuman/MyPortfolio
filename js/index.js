var projectsList = JSON.parse(data);
	
var Menu = React.createClass({
	
	_goto:function(e){
		$(".nav").find(".active").removeClass("active");
		   $("a[data-id='"+e.target.dataset.id+"']").parent().addClass("active");
		this.props.goToSection(e.target.dataset.id);
	},
	componentDidMount:function(){
		var links = document.getElementsByClassName("navLink");

		for (var i = 0; i < links.length; i++) 
			links[i].addEventListener("click", this._goto, false);
		
	},
	render: function(){
		
		return (
				<div className="navbar navbar-inverse navbar-fixed-top">
				<div className="container width-full" >
					<a href="#" className="navbar-brand"><img alt="" src="images/logo3.png" /></a>
					<button className="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<div className="collapse navbar-collapse navHeaderCollapse">
						<ul className="nav navbar-nav navbar-right">
							<li className="active"><a data-id="section1" className="navLink">HELLO</a></li>
							<li><a data-id="section2" className="navLink" >SKILLS</a></li>
							<li><a data-id="section3" className="navLink" >WORK</a></li>
							<li><a data-id="section4" className="navLink" >CONTACT</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
});

var SkillBar = React.createClass({
	render(){
		var label = "label";
		if(this.props.index %2 == 0)
			label += " light";
		return (
				<div className="bar cf" data-percent={this.props.percentage}>
					<span className={label}>{this.props.name}</span>
		        </div>		
		);
	}
});
var NxtBtn = React.createClass({
	getInitialState: function() {
	    return {
	    	sectionsStr: ["Introduction","Skills","Work","Contact"]

	    };
	},
	render() {
		
		return (
				<div id={"nextsection"+this.props.id} className='nextChapter'>
					<div className='nxtBtn'>
					<font>{this.state.sectionsStr[this.props.id]}</font>
					<br />
					<i className="downIcon"></i>
					</div>
				</div>
		);
	}
	
});

var Section = React.createClass({
	getInitialState: function() {
	    return {
	    	sections: [null,Introduction,Skills,Work,Contact]
	    };
	},
	render: function(){

		var Component = this.state.sections[this.props.id];
		
		if(this.state.sections.length -1 > this.props.id)
			var next = <NxtBtn id={this.props.id} />

		return (
			<section id={"section"+this.props.id} className='section' >
			<Component />
			
			{next}
			</section>
		);
		
	}
	
});

var Introduction = React.createClass({
	render(){
		
		return (
				<div className='introduction'>
				<font className='intro1'>HELLO</font><br /><br />
				<font className='intro2'>My name is Yosi Tsuman</font><br /><br /><br />
				<font className='intro3'>I'm a software engineer</font><br />
				<font className='intro3'>web developer</font>
				</div>		
		);
	}
	
});

var Skills = React.createClass({
	getInitialState(){
		return {
			langType: ["PHP","HTML","CSS","MySql","Javascript","jQuery","Linux",
		           "Android","Objective C","Objective C","C#","Ruby","Java",
		           "C++","C","Assembler","ASP","ASP.net","Python","Perl"],
		    skillsSet: [["PHP","90%"],
		                 ["HTML","85%"],
		                 ["CSS","80%"],
		                 ["MySql","85%"],
		                 ["Javascript","95%"],
		                 ["jQuery","95%"],
		                 ["React","65%"],
		                 ["Linux","60%"],
		                 ["Android","75%"],
		                 ["Objective C","55%"],
		                 ["Problem Solving","99%"]]
		}
	},
	_createBackground(){
	
		var rows = [];
		for (var i=0; i < 10; i++) {

			var cells = [];
			
			for (var j=0; j <= 10; j++) {
				var rand = Math.floor((Math.random() * 180) - 90);

				var pos = Math.floor((Math.random() * this.state.langType.length) + 0);
				var style = {"-webkit-transform": "rotate(" + rand + "deg)", "-ms-transform": "rotate(" + rand + "deg)", "transform":"rotate(" + rand + "deg)"};
				cells.push(<td key={j}><div className='lang' style={style}>{this.state.langType[pos]}</div></td>);
			}
		    rows.push(<tr key={i}>{cells}</tr>);
		}
		return rows;


	},
	render(){
		var bg = this._createBackground();
		
		var skills = this.state.skillsSet.map(function(element, index) {
		      return (
		    		  <SkillBar name={element[0]} percentage={element[1]} index={index}/>
		      );
		  });
		return (
				<div className='sectionWraper'>
					<div className='background'>
						<table >
							<tbody>
							{bg}
							</tbody>
						</table>
					</div>
					<div className='chart' >
						<div className="wrap">
						    <div className="holder">
						    	{skills}
						    </div>
						</div>
					</div>
				</div>
		);
	}
	
});
var ProjectDesc = React.createClass({

	render(){		
		var tags = this.props.tags.map(function(e,i){
			return (
				<span key={i} className='tagCont'>{e}</span>
			);
		})

		return (
			<div id="description">
				<span id="itemDescription">
					<div id="itemDescriptionContent">
						<div className='projectTtls'>About</div>
						<div id="aboutProject" className='projectContent'>
						{this.props.about}
						<div className='galleryLink' onClick={this.props.showGallery} >Gallery</div>
						</div>
						<div className='projectTtls'>Project Date</div>
						<div id="dateProject" className='projectContent'>
						{this.props.date}
						</div>
						<div className='projectTtls'>Tags</div>
						<div id="tagsProject" className='projectContent'>
						{tags}
						</div>
					</div>
				</span>
				<div className='closeDesc' onClick={this.props.closeDesc} >close</div>
			</div>
		)
	}
});
var Gallery = React.createClass({
	getInitialState(){
		return {
			imageId: 0,
			image: ""
		}
	},
	goBack: function(){
		var id = this.state.imageId;
		if(id > 0)
			id--;
		else
			id = this.props.images.length - 1;
		
		this.setState({imageId:id});
			
	},
	goNext: function(){
		var id = this.state.imageId;
		id++;
		if(id == this.props.images.length)
			id = 0;
		
		this.setState({imageId:id});
	},
	render(){	
		console.log(this.props.images)
		return (
			<div className="gallery">
				<img className="closeGalleryBtn" onClick={this.props.closeGallery} src="images/close.png" /> 
				<img className="galleryBtn" onClick={this.goBack} src="images/back.png" />
				<img className="bigImg" src={this.props.images[this.state.imageId]} />
				<img className="galleryBtn" src="images/nxt.png" onClick={this.goNext}/>
			</div>
		)
	}
});
var Work = React.createClass({
	getInitialState(){
		return {
			showDesc: false,
			showGallery: false,
			id: "",
			about: "",
			date: "",
			tags: [],
			images: []
		}
	},
	_showGallery: function(){
		this.setState({showGallery:true,images:projectsList.project[this.state.id]['images']});
	},
	_closeGallery: function(){
		this.setState({showGallery:false,images:null});
	},
	_closeDescription: function(){
		this.setState({showDesc:false});
	},
	_showDescription: function(e){

		var id = e.target.id;
		
		if(id.indexOf("img") > -1);
			id = $("#"+id).parent().attr("id");
		
		id = id.split("_");
		id = id[1];
		
		var aboutStr = projectsList.project[id].description;
		var dateStr = projectsList.project[id].date
		
		var tags = projectsList.project[id].tags.split(",");
		
		this.setState({showDesc:true,id:id,about:aboutStr,date:dateStr,tags:tags});

	},
	componentDidMount: function (){
		
		var projects = document.getElementsByClassName("gallery_item");

		for (var i = 0; i < projects.length; i++) 
			projects[i].addEventListener("click", this._showDescription, false);
		
	},
	render(){
		return (
				<div className="sectionWraper">
					<div  className="gallery_container">
						<ul className="projectsContainer">
							<li id="item_0" className='gallery_item'><img id="item_0_img" src='images/emilio/logo.png'></img></li>
							<li id="item_1" className='gallery_item'><img id="item_1_img" src='images/motokid/logo.png'></img></li>
							<li id="item_2" className='gallery_item'><img id="item_2_img" src='images/tami/logo.png'></img></li>
							<li id="item_3" className='gallery_item'><img id="item_3_img" src='images/shiruzzi/logo.png'></img></li>
							<li id="item_4" className='gallery_item'><img id="item_4_img" src='images/timewatch/logo.png'></img></li>
							<li id="item_5" className='gallery_item'><img id="item_5_img" src='images/orit/logo.png'></img></li>			
						</ul>
						<div id="sliderConteiner">
						<div id="my-slider"></div>
						</div>
					</div>
					{ this.state.showDesc ? <ProjectDesc id={this.state.id} about={this.state.about} date={this.state.date} tags={this.state.tags} closeDesc={this._closeDescription} showGallery={this._showGallery}/> : ""}
					{ this.state.showGallery ? <Gallery images={this.state.images}  closeGallery={this._closeGallery}/> : ""}
					
				</div>
		);
	}
	
});

var Contact = React.createClass({
	
	render(){
		
		return (
				<div id="contactWraper">
					<div id="links">
					<a href='https://www.facebook.com/yosi.tsuman' target='_blank'><img  className='link' src='images/facebook-icon.png' /></a>
					<a href="mailto:yosi.tsuman@gmail.com" ><img  className='link' src='images/gmail-icon.png' /></a>
					<a href='https://il.linkedin.com/in/yosi-tsuman-313b7b43' target='_blank'><img  className='link' src='images/linkedin.png' /></a>
					</div>
				</div>
		);
	}
	
});

var Content = React.createClass({
	getInitialState(){
		return {
			lastChapter:"",
			first:true,
			scrollTimer:null,
			sectionsShown:[]
		}
	},
	showSection: function(id){
		switch(id)
		{
			case "section1":
				$(".introduction").fadeIn("slow");
				break;
			case "section2":
				if(this.state.sectionsShown[2] != true)
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
					this.state.sectionsShown[2] = true;
				}
				break;
			case "section3":
				$(".gallery_item img").fadeIn("slow",function(){
				});
				break;
			case "section4":
				if(this.state.sectionsShown[4] != true)
				{
					$(".link").addClass("animate-links");
					this.state.sectionsShown[4] = true;
				}
				break;
		}
	},
	goToSection: function(id){
		

		var _this = this;
		if(this.state.lastChapter != "")
		{
			$("#next"+this.state.lastChapter).css("height","0px");
			$("#next"+this.state.lastChapter+" .nxtBtn").css("visibility","hidden");
			
		}
		
		this.setState({lastChapter:id});
		
		$('html, body').animate({
			scrollTop : $("#" + id).offset().top
		}, 500, function(){
			
			_this.showSection(id);
			
			$("#next"+id).animate({
				height : "45px"
			}, 700,function(){
				$("#next"+_this.state.lastChapter+" .nxtBtn").css("visibility","visible");
				});
			
			if(_this.state.first)
			{
				$("#menu").slideDown( "800" );
				_this.setState({first:false});
			}
			
		});
	},
	handleScroll: function(event){
		var _this = this;
		clearTimeout(this.state.scrollTimer);
		
		$( ".section" ).each(function( index ) {

			if($(document).scrollTop() < $(this).innerHeight() + $(this).offset().top && $(document).scrollTop() > $(this).offset().top)
			{
				var pos = $(this).position();
				if((($(this).innerHeight() + pos.top) - $(document).scrollTop()) > ($(this).innerHeight()/2))
					var sectionId = index+1;
				else
					var sectionId = index+2;
				
				_this.showSection('section' + sectionId);
				_this.setState({scrollTimer:setTimeout(function(){_this.goToSection('section' + sectionId);}, 700)});
			}
			});
	},
	shouldComponentUpdate: function (nextProps, nextState, nextContext) {
	    return false;
	},
	componentDidMount(){

		document.addEventListener('scroll', this.handleScroll);
		this.goToSection('section1')
	},
	render(){
		
		return (
				<div>
				<Menu goToSection={this.goToSection}/>
				<Section id="1" />
				<Section id="2" />
				<Section id="3" />
				<Section id="4" />
				</div>
		
		);
	}
});
ReactDOM.render(
	<Content />,
	document.getElementById('content')
);