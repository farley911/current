//Angular controllers
function HeadCtrl($scope){
	//Creates an array for both navigations
	$scope.navs = [
		{id: "mobile"},
		{id: "standard"}
	];
	
	//Creates an array with all navigation items
	$scope.pages = [
		{href: "home", text: "Home"},
		{href: "skills", text: "Skills"},
		{href: "portfolio", text: "Portfolio"},
		{href: "about", text: "About Me"},
		{href: "contact", text: "Contact"}
	];
}

function portfolioCtrl($scope){
	//Creates array for projects
	$scope.projects = [
		{
			src: "nike",
			title: "Nike",
			name: "Nike",
			desc: "Nike provided one of the most challenging and rewarding projects in my career. I was one of two developers responsible for delivering the front end of an advanced 3D design tool that allowed designers to open various 3D models of shoes and using a collection of palettes and tool panels apply and manipulate color, material, prints, patterns and graphics to the individual parts of the shoe, export PDF documentation to send off to product line managers and factories for approval and production, calculate color usage from primary though quaternary colors to display on packaging, and much more.",
			url: "nike.com"
		},
		{
			src: "enigma",
			title: "Enigma Health",
			name: "Enigma Health",
			desc: "Enigma Health brought me onboard as their senior developer to help provide the technical leadership mentoring and direction to help them develop the tools, teams and processes to deliver their treatment program to patients. In addition I was responsible for developing and maintaining a number of web sites to maintain Enigma Healths online presence. These tools were built using either Angular.js or Drupal 7 depending on the needs of the project.",
			url: "enigmahealth.com"
		},
		{
			src: "ub",
			title: "Umpqua Bank Account Management",
			name: "Umpqua Bank Account Management",
			desc: "Umpqua Bank brought me onto their digital team to help with the development of their next generation account management tool. The tool was built on the Ember.js framework and delivered users account information, transaction history, transfers and other features directly to their desktop, tablet and mobile devices by utilizing a RESTful interface between the front-end code and SalesForce backend."
		},
		{
			src: "hubb", 
			title: "hubb", 
			name: "hubb", 
			desc: "The hubb website was a particularly fun website to work on as I had the chance to work very closely with the designer in order to develop a site that was both stunningly beautiful and built using the latest technologies at the time. I had planned to include additional features such as parallax scrolling and URL pushState to create navigation history, however the deadline prevented these additions.", 
			url: "hubb.me"
		},
		{
			src: "mec", 
			title: "Mircosoft Exchange Conference", 
			name: "Microsoft Exchange Conference", 
			desc: "Microsoft Exchange is a large conference held semi annually. The website development was a team effort to create a highly stylized and responsive website hosted in Windows Azure. In addition to the marketing website I was also responsible to the development of the registration websites ensuring that attendees can register, book hotel rooms and purchase any desired training sessions.", 
			url: "iammec.com"
		},
		{
			src: "lync", 
			title: "Microsoft Lync Conference", 
			name: "Microsoft Lync Conference", 
			desc: "Microsoft Lync Conference is a smaller conference. I was in charge of leading the development of the site with the help of my development assistant. Along with the marketing site I was also responsible for developing registration websites that collect payment, book hotels, and allow attendees to edit existing registrations.", 
			url: "lyncconf.com"
		}
	];
}

function skillsCtrl($scope){
	$scope.skills = [
		{name: "HTML5", id: "html", value: "9"},
		{name: "CSS3", id: "css", value: "9"},
		{name: "JavaScript", id: "js", value: "9"},
		{name: "Sass", id: "sass", value: "9"},
		{name: "Angular.js (2.x)", id: "angularjs2", value: "8.5"},
		{name: "MV*", id: "mvc", value: "8.5"},
		{name: "jQuery", id: "jquery", value: "8.5"},
		{name: "TypeScript", id: "typescript", value: "8.5"},
		{name: "Angular.js (1.x)", id: "angularjs1", value: "7.5"},
		{name: "Bootstrap", id: "boosstrap", value: "7.5"},
		{name: "Ember.js", id: "ember", value: "7"},
		{name: "ThreeJS", id: "webgl", value: "6"},
		{name: "PHP", id: "php", value: "7"},
		{name: "SQL", id: "sql", value: "6.5"},
		{name: ".NET", id: "dotNet", value: "5"},
		{name: "AJAX", id: "ajax", value: "9"},
		{name: "Adobe CS", id: "adobe", value: "9"},		
		{name: "Responsive Design", id: "responsiveDesign", value: "8.5"},
		{name: "ASP", id: "asp", value: "8"},
		{name: "Email Blasts", id: "email", value: "7"},
		{name: "Json", id: "json", value: "8"},
		{name: "Web Design", id: "design", value: "8"},
		{name: "XML", id: "xml", value: "7"},
		{name: "C#", id: "csharp", value: "6"},
		{name: "Cake PHP", id: "cakephp", value: "5"}
	];
}

function contactForm($scope){
	$scope.sendEmail = function(message){
		if (message.$valid){
			var post = $.post("sendEmail.php", {name: $scope.name, email: $scope.email, phoneNumber: $scope.phoneNumber, website: $scope.website, message: $scope.message});
			post.done(function(response){
				if(response){
					$('#mailSuccess').css('display','block');
					$("html, body").animate({ scrollTop: $(document).height() }, "slow");
					$('#contact button').prop('disabled', true);
				} else {
					$('#mailFailure').css('display','block');
				}
			});
		}
	};
}