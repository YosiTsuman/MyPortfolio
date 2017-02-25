
var Menu = React.createClass({
	
	_goto:function(e){
		$(".nav").find(".active").removeClass("active");
		   $("a[data-id='"+e.target.dataset.id+"']").parent().addClass("active");
		goToSection(e.target.dataset.id);
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
		           "C++","C","Assembler","ASP","ASP.net","Python","Perl"]
		}
	},
	_createTable(){
	
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
		var rows = this._createTable();
		
		var skills = skillsSet.map(function(element, index) {
		      return (
		    		  <SkillBar name={element[0]} percentage={element[1]} index={index}/>
		      );
		  });
		return (
				<div className='sectionWraper'>
				<div className='background'>
				<table >
				<tbody>
				{rows}
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

var Work = React.createClass({
	
	_showGallery: function(e){

		var parent = $("#"+e.target.id);
		
		if(e.target.id.indexOf("img") > -1);
			parent = $("#"+e.target.id).parent();
			
		if(mouseon != parent.attr("id"))
			$("#description").remove();
		
		setProject(parent);
		mouseon = parent.attr("id");
	},
	componentDidMount: function (){

		var projects = document.getElementsByClassName("gallery_item");

		for (var i = 0; i < projects.length; i++) 
			projects[i].addEventListener("click", this._showGallery, false);
		
	},
	render(){
		
		return (
				<div className="sectionWraper">
					<div  className="gallery_container">
						<ul className="galleryContainer">
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
		
					<div id="projectDescContainer">
					<span id="itemDescription">
						<div id="itemDescriptionContent">
							<div className='projectTtls'>About</div>
							<div id="aboutProject" className='projectContent'>
							
							</div>
							<div className='projectTtls'>Project Date</div>
							<div id="dateProject" className='projectContent'>
							
							</div>
							<div className='projectTtls'>Tags</div>
							<div id="tagsProject" className='projectContent'>
							
							</div>
						</div>
					</span>
					<div className='closeDesc'><a href='javascript:closeDesc()'>close</a></div>
					</div>
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
	componentDidMount(){
		goToSection('section1')
	},
	render(){
		
		return (
				<div>
				<Menu />
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