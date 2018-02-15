const products = [{ "title": "Yipp: The Social Bookmarking App", 
					"description" : "Yipp let's you create and curate colletions of web pages with others", 
					"banner" : "https://i.imgur.com/3ZmAQu3.png",
					"url" : "https://www.joinyipp.com/" },
					{ "title": "LikeWallet", 
					"description" : "LikeWallet provides ROI analytics for social media Influencers", 
					"banner" : "https://i.imgur.com/gLwoSRW.png", 
					"url" : "https://www.youtube.com/watch?v=EeCHOdUHZEk"}];


const projects = [{ "title": "Berkeley Hyperloop", 
					"description" : "Led team of 60+ undergraduate engineers to build a functional Hyperloop pod and compete in the SpaceX Hyperloop Competition against the world’s top 27 pods", 
					"banner" : "https://i.imgur.com/SlVDztE.jpg",
					"url" : "http://www.berkeley-hyperloop.com/" },
					{ "title": "Drinks4Snaps", 
					"description" : "Implemented a rewards system for promoting local restaurants through personal Snapchat accounts, increasing weekend revenue by $1,000", 
					"banner" : "https://media.giphy.com/media/xUOwGdy9OQOQYimnfi/giphy.gif",
					"url" : "javascript:;" },
					{ "title": "Tensegrity Robot For NASA", 
					"description" : "Designed, prototyped, controlled and tested the world's first actuated 12-bar Tensegrity robot for planetary exploration", 
					"banner" : "https://media.giphy.com/media/3ohs4yLSGMYG06pKG4/giphy.gif",
					"url" : "javascript:;" },
					{ "title": "Nourish Technology", 
					"description" : "Designed and prototyped solutions to automatically package food using intelligent robotic systems", 
					"banner" : "https://i.imgur.com/hYUvHfh.jpg",
					"url" : "https://www.youtube.com/watch?v=ttMuK_rMTpk"}];


class Card extends React.Component {
  render() {
  	return (

  		<div className="card">
		    <div className="pageImg d-flex align-items-center">
		      <a href={this.props.url} target="_blank"><img src={this.props.banner}></img></a>
		    </div>
		    <div className="pageInfo">
		      <a href={this.props.url} className="pageTitle" target="_blank"><h1>{this.props.title}</h1></a>
		      <p className="pageDescription">{this.props.description}</p>
		    </div>
		</div>

  	);
  }
}

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
			<div className="cards d-flex flex-row justify-content-center flex-wrap">{cards}</div>
		);
	}
}

class MessageBot extends React.Component {
	render() {
		
		var props = this.props.message;
		var messages = [];

		for (var i = 0; i < props.length; i++ ) {
			messages.push(<li key={i} className="chatBubble">{props[i]}</li>);
		}

		return (

			<div className="chatContainer d-flex flex-row justify-content-start align-items-end">
				<div className="thumbnail">
					<img src="https://i.imgur.com/82uekFX.jpg"></img>
				</div>
				<ul className="chatBubbles">
					{messages}
				</ul>
			</div>

		);
	}
}

class MessageUser extends React.Component {
	render() {
		return (
			<div className="chatBubble chatReply chatContainer align-self-end">{this.props.message}</div>
		);
	}
}

$(document).on("click", "#btnProducts", function(){
	ReactDOM.render(<MessageUser message="Show me the products you've built!"/>, document.getElementById('userReplies'));
	$(".replyButtons").before($("#userReplies").html());
	var botReply = ["Here ya go :)"];
	ReactDOM.render(<MessageBot message={botReply}/>, document.getElementById('botReplies'));
	$(".replyButtons").before($("#botReplies").html());
	ReactDOM.render(<Cards type="products" />, document.getElementById('products'));
	$(".replyButtons").before($("#products").html());
	$("#btnProducts").remove();
	if ($(".replyButtons").children().length > 0) {
		var botFollowUp = ["Anything else?"];
		ReactDOM.render(<MessageBot message={botFollowUp}/>, document.getElementById('botReplies'));
		$(".replyButtons").before($("#botReplies").html());
	}
	setTimeout(function(){ updateScroll(); }, 100);

});

$(document).on("click", "#btnProjects", function(){
	ReactDOM.render(<MessageUser message="Tell me about your projects"/>, document.getElementById('userReplies'));
	$(".replyButtons").before($("#userReplies").html());
	var botReply = ["Sure thing"];
	ReactDOM.render(<MessageBot message={botReply}/>, document.getElementById('botReplies'));
	$(".replyButtons").before($("#botReplies").html());
	ReactDOM.render(<Cards type="projects" />, document.getElementById('projects'));
	$(".replyButtons").before($("#projects").html());
	$("#btnProjects").remove();
	if ($(".replyButtons").children().length > 0) {
		var botFollowUp = ["What else?"]
		ReactDOM.render(<MessageBot message={botFollowUp}/>, document.getElementById('botReplies'));
		$(".replyButtons").before($("#botReplies").html());
	}
	setTimeout(function(){ updateScroll(); }, 100);
});

$(document).on("click", "#btnAboutMe", function(){
	
	var aboutMe1 = "Does this mean we're friends?";
	var aboutMe2 = "I'm from Colombia and I have lived in six countries so far! Right now I am based in the Bay Area and I'm loving it :)";
	var aboutMe3 = "Btw, I'm currently looking for a position in Product Management. Hit me up if you've got any leads!";
	var botFollowUp = "Anyways, wanna see my work?"
	$("#btnAboutMe").remove();
	if ($(".replyButtons").children().length > 0) {
		var messages = [aboutMe1, aboutMe2, aboutMe3, botFollowUp];
	} else {
		var messages = [aboutMe1, aboutMe2, aboutMe3];
	}
	ReactDOM.render(<MessageUser message="Tell me more about yourself :)"/>, document.getElementById('userReplies'));
	$(".replyButtons").before($("#userReplies").html());
	ReactDOM.render(<MessageBot message={messages}/>, document.getElementById('aboutMe'));
	$(".replyButtons").before($("#aboutMe").html());
	setTimeout(function(){ updateScroll(); }, 100);
});

function updateScroll() {
	if ($(".container").height() > $(window).height()) {
		$(".container").removeClass("fixed-bottom");
	}
	$(document).scrollTop($(".container")[0].scrollHeight);
}
