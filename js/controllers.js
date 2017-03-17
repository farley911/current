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
			src: "enigma",
			title: "Enigma Health",
			name: "Enigma Health",
			desc: "Enigma Health brought me onboard as their senior developer to help provide the technical leadership mentoring and direction to help them develop the tools, teams and processes to deliver their treatment program to patients. In addition I was responsible for developing and maintaining a number of web sites to maintain Enigma Healths online presence. These tools were built using either Angular.js or Drupal 7 depending on the needs of the project.",
			url: "enigmahealth.com"
		},
		{
			src: "wqq",
			title: "Wedding Quick Quote",
			name: "Wedding Quick Quote",
			desc: "The team behind wedding quick quote was looking to update their existing system so that it would be a modern responsive site where users could get a wedding quote from any device. I received their current source code and after careful review I identified the updates that would be needed to provide a facelift to their existing system without requiring a complete rebuild of the backend services.",
			url: "weddingquickquote.com"
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
		{name: "HTML5", id: "html", value: "90"},
		{name: "CSS3", id: "css", value: "90"},
		{name: "JavaScript", id: "js", value: "90"},
		{name: "Sass", id: "sass", value: "90"},
		{name: "jQuery", id: "jquery", value: "85"},
		{name: "Ember.js", id: "ember", value: "80"},
		{name: "MV*", id: "mvc", value: "80"},
		{name: "Angular.js", id: "angularjs", value: "75"},
		{name: "Bootstrap", id: "boosstrap", value: "75"},
		{name: "PHP", id: "php", value: "70"},
		{name: "SQL", id: "sql", value: "65"},
		{name: ".NET", id: "dotNet", value: "50"},
		{name: "AJAX", id: "ajax", value: "90"},
		{name: "Adobe CS", id: "adobe", value: "90"},		
		{name: "Responsive Design", id: "responsiveDesign", value: "85"},
		{name: "ASP", id: "asp", value: "80"},
		{name: "Email Blasts", id: "email", value: "70"},
		{name: "Json", id: "json", value: "80"},
		{name: "Web Design", id: "design", value: "80"},
		{name: "XML", id: "xml", value: "70"},
		{name: "C#", id: "csharp", value: "60"},
		{name: "Cake PHP", id: "cakephp", value: "50"}
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