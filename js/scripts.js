//Attach wave effect to buttons and other elements
Waves.attach(".btn");
Waves.init();

//PORTFOLIO INFO START

//Insert products info here
const products = [{ "title": "Yipp: The Social Bookmarking App", 
					"description" : "Yipp let's you create and curate colletions of web pages with others", 
					"banner" : "https://i.imgur.com/3ZmAQu3.png",
					"url" : "yipp.html" },
					{ "title": "LikeWallet", 
					"description" : "LikeWallet provides ROI analytics for social media Influencers", 
					"banner" : "https://i.imgur.com/gLwoSRW.png", 
					"url" : "likewallet.html"}];

//Insert projects info here
const projects = [{ "title": "Berkeley Hyperloop", 
					"description" : "Led team of 60+ undergraduate engineers to build a functional Hyperloop pod and compete in the SpaceX Hyperloop Competition against the world’s top 27 pods", 
					"banner" : "https://i.imgur.com/k3MTcR5.jpg",
					"url" : "bloop.html" },
					{ "title": "Drinks4Snaps", 
					"description" : "Implemented a rewards system for promoting local restaurants through personal Snapchat accounts, increasing weekend revenue by $1,000", 
					"banner" : "https://media.giphy.com/media/xUOwGdy9OQOQYimnfi/giphy.gif",
					"url" : "drinks4snaps.html" },
					{ "title": "Tensegrity Robot For NASA", 
					"description" : "Designed, prototyped, controlled and tested the world's first actuated 12-bar Tensegrity robot for planetary exploration", 
					"banner" : "https://media.giphy.com/media/3ohs4yLSGMYG06pKG4/giphy.gif",
					"url" : "tensegrity.html" },
					{ "title": "Lean Launchpad", 
					"description" : "Led two experiments and 135 interviews to test 100+ hypotheses and validate three business ideas", 
					"banner" : "https://i.imgur.com/LZ2taSo.png",
					"url" : "llp.html"}];

//PORTFOLIO INFO END


//REACT COMPONENTS START

//Class for individual products/projects card
class Card extends React.Component {
  render() {
  	return (
  		<div className="card animated bounceIn">
		    <div className="pageImg d-flex align-items-center">
		      <a href="#" data-toggle="modal" data-target="#modalContainer"><img src={this.props.banner}></img></a>
		    </div>
		    <div className="pageInfo">
		      <a href="#" className="pageTitle" data-toggle="modal" data-target="#modalContainer"><h1>{this.props.title}</h1></a>
		      <p className="pageDescription">{this.props.description}</p>
		    </div>
		</div>
  	);
  }
}

class ModalTitle extends React.Component {
	render(){
		return (<div>{this.props.title}</div>);
	}
}

// class ModalPics extends React.Component {
// 	render(){
// 		return (
// 			<div className="modal-body">

// 			</div>
// 		);
// 	}
// }

//Class for groups of cards
class Cards extends React.Component {
	render() {
		var cards = [];
		if (this.props.type == "products") {
			for (var i = 0; i < products.length; i++ ) {
				cards.push(<Card key={i} banner={products[i].banner} title={products[i].title} description={products[i].description} url={products[i].url} />)
			}
		} else {
			for (var i = 0; i < projects.length; i++ ) {
				cards.push(<Card key={i} banner={projects[i].banner} title={projects[i].title} description={projects[i].description} url={projects[i].url} />)
			}
		}

		return (
			<div className="cards d-flex flex-row justify-content-center flex-wrap" id={"cards-"+this.props.type}>{cards}</div>
		);
	}
}

//Class for messages made by the bot
class MessageBot extends React.Component {
	render() {
		
		var props = this.props.message;
		var ids = this.props.id;
		var messages = [];

		for (var i = 0; i < props.length; i++ ) {
			messages.push(<li key={i} className="chatBubble" id={ids[i]}>{props[i]}</li>);
		}

		return (

			<div className="chatContainer animated slideInUp d-flex flex-row justify-content-start align-items-end">
				<div className="thumbnail" id={"pic-"+ids[0]}>
					<img src="https://i.imgur.com/82uekFX.jpg"></img>
				</div>
				<ul className="chatBubbles">
					{messages}
				</ul>
			</div>

		);
	}
}

//Class for messages made by user
class MessageUser extends React.Component {
	render() {
		return (
			<div className="chatBubble chatReply animated slideInUp chatContainer align-self-end" id={this.props.id}>{this.props.message}</div>
		);
	}
}

//REACT COMPONENTS END

//REACT RENDERING + ANIMATIONS START

const totalMessages = 14; //Number of total messages goes here
var messagesRemaining = 9; //Number of messages remaining after intro

const outroMessage = "Thanks for hanging out! If you wanna chat some more, feel free to shoot me an email at jdordonez@berkeley.edu 🙃";
const outroID = "outro";

$(document).on("click", "#btnProducts", function(){

	$('.replyButtons button').prop('disabled', true);
	$("#header").fadeOut();
	
	//Render user reply
	var idProd1 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageUser message="Show me the products you've built!" id={"chat-"+idProd1}/>, document.getElementById('userReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#userReplies").html());

	//Render bot reply
	var botReply = ["Here ya go 😎"];
	var idProd2 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageBot message={botReply} id={["chat-"+idProd2]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());

	//Render products cards
	ReactDOM.render(<Cards type="products" />, document.getElementById('products'));
	$(".replyButtons").before($("#products").html());	

	//Render bot follow-up if this is not the last prompt
	if ($(".replyButtons").children().length > 1) {
		var botFollowUp = ["Anything else?"];
		var idProd3 = (totalMessages - messagesRemaining).toString();
	} else {
		var botFollowUp = [outroMessage];
		var idProd3 = outroID;
	}

	ReactDOM.render(<MessageBot message={botFollowUp} id={["chat-"+idProd3]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());

	//Reveal and animate rendered components
	$(".container").addClass("fixed-bottom");
	$(".replyButtons").removeClass("fadeIn");
	$(".replyButtons").addClass("fadeOut");
	$("#chat-"+idProd1).slideToggle();
	setTimeout(function(){ $("#btnProducts").remove();; }, 400);
	setTimeout(function(){ $("#chat-"+idProd2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#pic-chat-"+idProd2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#cards-products .card").slideToggle(); }, 2000);
	setTimeout(function(){ $("#chat-"+idProd3).slideToggle(); }, 3000);
	setTimeout(function(){ $("#pic-chat-"+idProd3).slideToggle(); }, 3000);
	setTimeout(function(){ $('.replyButtons button').prop('disabled', false); $(".replyButtons").removeClass("fadeOut"); $(".replyButtons").addClass("fadeIn"); }, 3000);
	setTimeout(function(){ updateScroll(); $(".card").removeClass("animated"); }, 3400);

});

$(document).on("click", "#btnProjects", function(){

	$('.replyButtons button').prop('disabled', true);
	$("#header").fadeOut();
	
	//Render user reply
	var idProj1 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageUser message="Tell me about your projects" id={"chat-"+idProj1} />, document.getElementById('userReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#userReplies").html());

	//Render bot reply
	var botReply = ["Sure thing"];
	var idProj2 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageBot message={botReply} id={["chat-"+idProj2]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());

	//Render projects cards
	ReactDOM.render(<Cards type="projects" />, document.getElementById('projects'));
	$(".replyButtons").before($("#projects").html());

	//Render bot follow-up if this is not the last prompt
	if ($(".replyButtons").children().length > 1) {
		var botFollowUp = ["What else? 🤔"];
		var idProj3 = (totalMessages - messagesRemaining).toString();
	} else {
		var botFollowUp = [outroMessage];
		var idProj3 = outroID;
	}
	ReactDOM.render(<MessageBot message={botFollowUp} id={["chat-"+idProj3]} />, document.getElementById('botReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#botReplies").html());


	//Reveal and animate rendered components
	$(".container").addClass("fixed-bottom");
	$(".replyButtons").removeClass("fadeIn");
	$(".replyButtons").addClass("fadeOut");
	$("#chat-"+idProj1).slideToggle();
	setTimeout(function(){ $("#btnProjects").remove(); }, 400);
	setTimeout(function(){ $("#chat-"+idProj2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#pic-chat-"+idProj2).slideToggle(); }, 1000);
	setTimeout(function(){ $("#cards-projects .card").slideToggle(); }, 2000);
	setTimeout(function(){ $("#chat-"+idProj3).slideToggle(); }, 3000);
	setTimeout(function(){ $("#pic-chat-"+idProj3).slideToggle(); }, 3000);
	setTimeout(function(){ $('.replyButtons button').prop('disabled', false); $(".replyButtons").removeClass("fadeOut"); $(".replyButtons").addClass("fadeIn"); }, 3000);
	setTimeout(function(){ updateScroll(); $(".card").removeClass("animated"); }, 3400);

});

$(document).on("click", "#btnAboutMe", function(){

	$('.replyButtons button').prop('disabled', true);
	$("#header").fadeOut();
	
	//Render user reply
	var idAbout1 = (totalMessages - messagesRemaining).toString();
	ReactDOM.render(<MessageUser message="Tell me more about yourself 🙂" id={"chat-"+idAbout1} />, document.getElementById('userReplies'));
	messagesRemaining -= 1;
	$(".replyButtons").before($("#userReplies").html());
	//Set messages for 'about me' reply
	var aboutMe1 = "Does this mean we're friends? 😁";
	var id1 = "chat-"+(totalMessages - messagesRemaining).toString();
	var aboutMe2 = "I'm from Colombia and I have lived in six countries so far! Right now I am based in the Bay Area and I'm loving it";
	var id2 = "chat-"+(totalMessages - messagesRemaining + 1).toString();
	var aboutMe3 = "Btw, I'm currently looking for a position in a Product team. If you've got any leads, please hit me up at jdordonez@berkeley.edu! 👍";
	var id3 = "chat-"+(totalMessages - messagesRemaining + 2).toString();
	var botFollowUp = "Anyways, wanna see my work?";
	var botGoodbye = "Thanks for hanging out! 👋"
	var id4 = "chat-"+(totalMessages - messagesRemaining + 3).toString();

	//Only include bot follow up if this is not the final prompt
	if ($(".replyButtons").children().length > 1) {
		var messages = [aboutMe1, aboutMe2, aboutMe3, botFollowUp];
		var ids = [id1, id2, id3, id4];
	} else {
		var messages = [aboutMe1, aboutMe2, aboutMe3, botGoodbye];
		var ids = [id1, id2, id3, id4];
	}

	//Render 'about me' replies
	ReactDOM.render(<MessageBot message={messages} id={ids} />, document.getElementById('aboutMe'));
	messagesRemaining = messagesRemaining - ids.length;
	$(".replyButtons").before($("#aboutMe").html());
	
	//Animate rendered components
	$(".container").addClass("fixed-bottom");
	$(".replyButtons").removeClass("fadeIn");
	$(".replyButtons").addClass("fadeOut");
	$("#chat-"+idAbout1).slideToggle();
	setTimeout(function(){ $("#btnAboutMe").remove(); }, 400);
	setTimeout(function(){ $("#"+id1).slideToggle(); }, 1000);
	setTimeout(function(){ $(".container .thumbnail").last().slideToggle(); }, 1000);
	setTimeout(function(){ $("#"+id2).slideToggle(); }, 2000);
	setTimeout(function(){ $("#"+id3).slideToggle(); }, 3000);
	setTimeout(function(){ $("#"+id4).slideToggle(); }, 4000);
	setTimeout(function(){ $('.replyButtons button').prop('disabled', false); $(".replyButtons").removeClass("fadeOut"); $(".replyButtons").addClass("fadeIn"); }, 4000);
	setTimeout(function(){ updateScroll(); $(".card").removeClass("animated"); }, 4400);

});

//Load modal file when user clicks on project
$(document).on("click", ".card a", function(){
	$("#modalContainer .modal-content").empty();
	$("#modalContainer .modal-content").html('<i class="modalSpinner fas fa-spinner fa-spin"></i>');
	var modalTitle = $(this).parent().parent().find(".pageTitle").text();
	if ($(this).parent().parent().parent().attr("id") == "cards-products") {
		var project = arraySearch(modalTitle, products);
	} else {
		var project = arraySearch(modalTitle, projects);
	}
	$("#modalContainer .modal-content").load(project.url);
	Waves.attach(".btn, .carousel-control-next, .carousel-control-prev");
	Waves.init();
});

//REACT RENDERING + ANIMATIONS END

//INTRO ANIMATION START

//function to detect when animations end
var animationEnd = (function(el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));

setTimeout(function(){$("#chat-1, #pic-intro").slideToggle()}, 200);
$('#chat-1').one(animationEnd, function(){
	setTimeout(function(){$("#chat-2").slideToggle()}, 100);
	$('#chat-2').one(animationEnd, function(){
		setTimeout(function(){$("#chat-3").slideToggle()}, 100);
		$('#chat-3').one(animationEnd, function(){
			setTimeout(function(){$("#chat-4").slideToggle()}, 100);
			$('#chat-4').one(animationEnd, function(){
				$(".replyButtons").css("visibility", "visible");
				$(".replyButtons").addClass("animated fadeIn");
			});
		});
	});
});

//INTRO ANIMATION END

//FUNCTIONS

//scroll to bottom of page
function updateScroll() {
	if ($(".container").height() > $(window).height()) {
		$(".container").removeClass("fixed-bottom");
	}
	$(document).scrollTop($(".container")[0].scrollHeight);
}

//Search array for object key value
function arraySearch(valueKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].title === valueKey) {
            return myArray[i];
        }
    }
}