$(function(){
	var videoHTML, 
		rtime, 
		timeout = false, 
		delta = 200, 
		skillsVisible = false,
		skillsInit = false;
		deviceWidth = $('body').innerWidth(),
		deviceHeight = $('body').innerHeight(),
		projectDescHeights = new Array(),
		mobile = isMobile();
		
	//Initilize site
	configPreloader();
	toggleVideo(isChrome());
	configNav();	
	if(mobile) { setNavHeight(); }	
	fadeNavBG();
	if(!mobile) { centerVideo(); }
	projectAnimationConfig();
	configSkills();
	
	$(window).scroll(function(){
		configSkills();
		//Throttle scroll call so it waits until the user is done scrolling the window
		if(!mobile){
			rtime = new Date();
			if(timeout === false){	
				timeout = true;
				fadeNavBG();
				setTimeout(scrollEnd, delta);
			}
		}
	});

	function scrollEnd(){
		if (new Date() - rtime < delta){
			setTimeout(scrollEnd, delta);
		} else {
			timeout = false;
			//Code to run once the user has finished scrolling the window
			var scrollTop = $(window).scrollTop();
			if (scrollTop == 0){
				$('header').animate({
					backgroundColor: "rgba(0,0,0,0)"
				}, 500);
			}
		}
	}

	$(window).resize(function(){
		//Throttle resize call so it waits until the user is done resizing the window
		rtime = new Date();
		if(timeout === false){	
			timeout = true;
			setTimeout(resizeEnd, delta);
		}
	});

	//Throttle resize call so it waits until the user is done resizing the window
	function resizeEnd(){
		if (new Date() - rtime < delta){
			setTimeout(resizeEnd, delta);
		} else {
			timeout = false;
			//Code to run once the user has finished resizing the window
			deviceWidth = $('body').innerWidth();
			deviceHeight = $('body').innerHeight();		
			mobile = isMobile();
			configNav();
			setNavHeight();
			resetProjectDescHeights();
			projectAnimationConfig();
			toggleVideo(false);
			if(!mobile) { centerVideo(); }
			resetSkillWrapper();
		}
	}

	function configPreloader(){
		if(!mobile){
			$('body').jpreLoader({
				splashID: '#jSplash',
				loaderVPos: '50%',
				splashVPos: '25%',
				splashFunction: function(){
					interval = setInterval(function(){
						//Aniumate the ... during loading
						$loading = $('#loading');
						$loading.html().length < 3 ? $loading.html($loading.html() + ".") : $loading.html("");
					}, 500);
				}
			}, function(){
				toggleVideo(isChrome());
				toggleVideo(isChrome());
				clearInterval(interval);
			});
		} else {
			$('#jSplash').css('display', 'none');
			$('body').css('display', 'block');
		}
	}

	function fadeNavBG(){
		if($(window).scrollTop() != 0 && $('header').css('backgroundColor') != "rgba(0,0,0,.7)"){
			$('header').animate({
				backgroundColor: "rgba(0,0,0,.7)"
			}, 500);
		}
	}

	function isMobile(tablet){
		mobileWidth = tablet ? 1024 : 768;
		return deviceWidth <= mobileWidth ? true : false;	
	}

	function configNav(){
		$('header img').click(function(){
			scrollNav($(this), 0);
		});

		$('nav a').click(function(){
			var offset = -110;
			if(mobile){ 
				animateNav();
				offset = 0; 
			}
			scrollNav($(this), offset);
		});

		if (mobile){ 
			//navHandle click listener
			$('#navHandle').click(function(){ animateNav(); });

			//Prevent the user from scrolling to the left when the navigation is expanded on mobile devices to improve UX. 
			//Look into adding functionality that closes the navagation instead of scrolling left.
			var sPos = 0;
			$(window).scroll(function(){
				var sLeft = $(this).scrollLeft();
				if(sLeft > sPos && $('nav#mobile').css('width') == '135px'){
					$(document).scrollLeft(0);
				}
				sPos = sLeft;
			});
		}
	}

	function scrollNav($this, distance){
		$.scrollTo($("#" + $this.data('href')), 1000, {offset: distance});
	}

	function animateNav(){
		var d = $('nav#mobile').css('width') == "135px" ? "0" : "135px";
		var s = 750;
		
		$('nav#mobile').animate({
			display:'toggle',
			width: d
		},s);
		$('header').animate({
			left:d
		},s);	
		$('#navHandle').animate({
			left:d
		},s);
		$('#pages').animate({
			left:d
		},s);	
	}

	function setNavHeight(){
		$('nav#mobile').css('height', $(document).height()  + 'px');
	}

	function isChrome(){
		return navigator.userAgent.match(/chrome/i) ? true : false;
	}

	function toggleVideo(chrome){
		var scrollTop = $('body').scrollTop();
		if ((isMobile(true) || (chrome && scrollTop != 0)) && videoVisible()){
			//Remove video for mobile device so it doesn't waste data and reduces GPU load in Chrome
			videoHTML = $('#videoWrapper').html();
			$('#videoWrapper').html(""); 
		} else if ((!isMobile(true) || (chrome && scrollTop != 0)) && !videoVisible()) {
			//Adds video if it has been removed
			$('#videoWrapper').html(videoHTML);
		}
	}

	function videoVisible(){
		return $('#videoWrapper').html() != "" ? true : false;
	}

	//Calculates the width and height of the browser minus scroll bars, then calculates the size of the video scaled to fill the browser. I then test of the width or height will be cropped from the video and if the width is being cropped I adjust the margin-left to center the video.
	function centerVideo(){
		//Default video size is 596(W) x 336(H)
		var h = (deviceWidth / 596) * 336;
		var w = (deviceHeight / 336) * 596;
		
		$('#home video').css('margin-left', h < deviceHeight ? '-' + ((w - deviceWidth) / 2) + 'px' : 'auto');
	}

	function resetProjectDescHeights(){
		$('.project>article').each(function(){
			$(this).css('height', 'auto')
		});
	}

	function projectAnimationConfig(){
		//Animates project hover
		$('.project>article').each(function(i){
			$this = $(this);
			projectDescHeights[i] = $this.css('height');
			mobile ? $this.css('height','0px') : $this.css('height','50px');
		})

		if(mobile){
			$('.project').unbind('mouseenter mouseleave').click(function(){
				$article = $(this).find('article');
				$('.project>article').animate({
					height: '0px'
				}, 500);
				$article.animate({
					height: $article.css('height') == '0px' ? projectDescHeights[$(this).data('id')] : "0px"
				}, 750);
			});
		} else {
			$('.project').unbind('click').hover(
				function(){
						$this = $(this);
						$this.find('img').fadeTo("slow", 0.3);
						$this.find('article').animate({
							height:projectDescHeights[$this.data('id')]
						},1000);
				}, function(){
						$this = $(this);
						$this.find('img').fadeTo("slow",1)
						$this.find('article').animate({
							height:'50px'
						},1000);
				}
			);
		}
	}

	function resetSkillWrapper(){
		$('#moreBtn').unbind('click').html('View More');
		$('#chartWrapper').css('height', 'auto');
	}

	function configSkills(){
		if(!skillsInit){ 
			//Check is skills are visible
			$.each($('.page:in-viewport'), function(){
				if($(this).attr('id') == "skills"){ skillsVisible = true; return false; }
			});

			if(skillsVisible){
				//Initilize skills dooughnuts
				$.each($('.chart>canvas'), function(i){
					var chart = $('#' + $(this).attr('id'));
					var context = chart.get(0).getContext("2d");
					var chartObj = new Chart(context).Doughnut([{
						value: chart.data('value'),
						color: "#f08800"
					}, {
						value: (100 - chart.data('value')),
						color: "#080a1c"
					}], {
						segmentShowStroke: false,
						percentageInnerCutout: 75,
						animationEasing: "easeOutQuart"
					});
				});

				//Initilize View More/Less functionality
				$wrapper = $('#chartWrapper');
				var wrapperHeight = $wrapper.css('height');
				var height = mobile ? '670px' : '680px';
				$wrapper.css('height',height);

				$('#moreBtn').click(function(){
					$wrapper.animate({
						height: $wrapper.css('height') == height ? wrapperHeight : height
					}, 1000, function(){
						$('#moreBtn').html($wrapper.css('height') == height ? "View More" : "View Less");
					});
				});
				//Initilize skills bars
				$.each($('.chart .barWrapper div'), function(){
					$this = $(this);
					$this.animate({
						width: $this.data('value') + "%"
					}, 1000);
				});
				skillsInit = true;
			}
		}
	}
});