//Define Device class
var device = function Device() {
	var _width = $('body').innerWidth();
	var _height = $('body').innerHeight();
	var _chrome = navigator.userAgent.match(/chrome/i) ? true : false;
	var _tablet = _width <= 1024 ? true : false;
	var _mobile = _width <= 768 ? true : false;

	return{
		//Define Width get; set;
		width : function(newWidth){
			if(newWidth){ _width = newWidth; }
			return _width;
		},
		//Define height get; set;
		height : function(newHeight){
			if(newHeight){ _height = newHeight; }
			return _height;
		},
		//Define isChrome get; set;
		chrome : function(isChrome){
			if (isChrome){ _chrome = isChrome; }
			return _chrome;
		},
		//Define isTablet get; set;
		tablet : function(isTablet){
			if(isTablet){ _tablet = isTablet; }
			return _tablet;
		},
		//Define isMobile get; set;
		mobile : function(newMobile){
			if(newMobile){ _mobile = newMobile; }
			return _mobile;
		},
		//Define reset method
		reset : function(){
			_width = $('body').innerWidth();
			_height = $('body').innerHeight();
			_tablet = _width <= 1024 ? true : false;
			_mobile = _width <= 768 ? true : false;
		}
	};
}();


//Define Video class
var video = function Video(){
	var _video = this;
	var _HTML = $('#videoWrapper').html();
	var _visible = $('#videoWrapper').html() !== "" ? true : false;

	return{
		//Define HTML get; set;
		HTML : function(newHTML){
			if(newHTML){ _HTML = newHTML; }
			return _HTML;
		},
		//Define visible get; set;
		visible : function(isVisible){
			if(isVisible){ _visible = isVisible; }
			return _visible;
		},
		//Define toggle method
		toggle : function(){
			var scrollTop = $('body').scrollTop();
			if ((device.tablet() || (device.chrome() && scrollTop !== 0)) && _visible){
				//Remove video for mobile device so it doesn't waste data and reduces GPU load in Chrome
				_visible = false;
				$('#videoWrapper').html(""); 
			} else if ((!device.tablet() || (device.chrome() && scrollTop !== 0)) && !_visible) {
				//Adds video if it has been removed
				_visible = true;
				$('#videoWrapper').html(_HTML);
			}
		},
		//Define center method
		center : function(){
			//Calculates the width and height of the browser minus scroll bars, then calculates the size of the video scaled to fill the browser. I then test of the width or height will be cropped from the video and if the width is being cropped I adjust the margin-left to center the video.
			if(!device.mobile()){
				//Default video size is 596(W) x 336(H)
				var h = (device.width() / 596) * 336;
				var w = (device.height() / 336) * 596;
				
				$('#home video').css('margin-left', h < device.height() ? '-' + ((w - device.width()) / 2) + 'px' : 'auto');
			}
		},
		//Define init method
		init : function(){
			//Initilize video object
			video.toggle();
			video.center();
		}
	};
}();

//Define Preloader Class
var preloader = function Preloader(){
	return{
		init : function(){
			if(!device.mobile()){
		    var interval;
				$('body').jpreLoader({
					splashID: '#jSplash',
					loaderVPos: '50%',
					splashVPos: '25%',
					splashFunction: function(){
						interval = setInterval(function(){
							//Aniumate the ... during loading
							var $loading = $('#loading');
							$loading.html($loading.html().length < 3 ? $loading.html() + "." : "");
						}, 500);
					}
				}, function(){
					clearInterval(interval);
				});
			} else {
				$('#jSplash').css('display', 'none');
				$('body').css('display', 'block');
			}
		}
	};	
}();

//Define Nav class
var nav = function Nav(){
	return{
		//Define pushState method
		pushState : function(href){
			if(href == "home") href = "/";
			history.pushState({id : href}, '', href);
		},
		//Define scroll method
		scroll : function(e, dist){
			var href = e.data('href');
			$.scrollTo($("#" + href), 1000, {offset: dist}, {onAfter: nav.pushState(href)});
		},
		//Define animate method
		animate : function(){
			var $mobileNav = $('nav#mobile');
			var d = $mobileNav.css('width') == "135px" ? "0" : "135px";
			var s = 750;
			
			$mobileNav.animate({
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
		},
		//Define setHeight method
		setHeight : function(){
			if(device.mobile()){ $('nav#mobile').css('height', $(document).height()  + 'px'); }
		},
		//Define fadeBG method
		fadeBG : function(){
			if($(window).scrollTop() !== 0 && $('header').css('backgroundColor') != "rgba(0,0,0,.7)"){
				$('header').animate({
					backgroundColor: "rgba(0,0,0,.7)"
				}, 500);
			}
		},
		//Define init method
		init : function(){
			$('header').on('click', 'img', function(){
				var $headerImg = $(this);
				nav.scroll($headerImg, 0);
			});

			$('nav').on('click', 'a', function(){
				var $navAnchor = $(this);
				var offset = -110;

				//Set the active navigation item
				$('nav a.active').removeClass('active');
				$navAnchor.addClass('active');

				if(device.mobile()){ 
					nav.animate();
					offset = 0; 
				}

				nav.scroll($navAnchor, offset);
			});

			if (device.mobile()){ 
				//navHandle click listener
				$('#navHandle').on('click', 'span', function(){ nav.animate(); });

				//Prevent the user from scrolling to the left when the navigation is expanded on mobile devices to improve UX. 
				//Look into adding functionality that closes the navagation instead of scrolling left.
				var sPos = 0;
				$(window).scroll(function(){
					var $window = $(this);
					var sLeft = $window.scrollLeft();

					if(sLeft > sPos && $('nav#mobile').css('width') == '135px'){
						$(document).scrollLeft(0);
					}
					sPos = sLeft;
				});
			}

			nav.setHeight();
			nav.fadeBG();
		}
	};
}();

//Define project class
var project = function Project(){
	var _descHeights = [];
	var $article;

	return{
		init : function(){
			$('.project>article').each(function(i){
				$article = $(this);
				_descHeights[i] = $article.css('height');
				$article.css('height', device.mobile() ? '0px' : '50px');
			});

			if(device.mobile()){
				$('.project').unbind('mouseenter mouseleave').on('click', 'img', function(){
					var $projectImg = $(this);
					var $project = $projectImg.parent();

					$article = $project.find('article');
					$('.project>article').animate({
						height: '0px'
					}, 500);
					$article.animate({
						height: $article.css('height') == '0px' ? _descHeights[$project.data('id')] : "0px"
					}, 750);
				});
			} else {
				var $project;
				$('.project').unbind('click').hover(
					function(){
							$project = $(this);
							$project.find('img').fadeTo("slow", 0.3);
							$project.find('article').animate({
								height:_descHeights[$project.data('id')]
							},1000);
					}, function(){
							$project = $(this);
							$project.find('img').fadeTo("slow",1);
							$project.find('article').animate({
								height:'50px'
							},1000);
					}
				);
			}
		},
		resetDescHeights : function(){
			$('.project>article').each(function(){
				var $article = $(this);
				$article.css('height', 'auto');
			});
		}
	};
}();

//Define Skills class
var skill = function Skill(){
	var _initilized = false;
	var _mInitilized = false;

	return{
		//Define initilized method get; set;
		initilized : function(i){
			if(i) _initilized = i;
			return _initilized;
		},
		//Define mInitilized method get; set;
		mInitilized : function(i){
			if(i) _mInitilized = i;
			return _mInitilized;
		},
		//Define setSkillHeight method
		setSkillHeight : function(){
			//Initilize View More/Less functionality
			var _wrapper = $('#chartWrapper');
			var _wrapperHeight = _wrapper.css('height');
			var _height = device.mobile() ? '670px' : '680px';
			_wrapper.css('height',_height);

			$('#moreBtn').on('click', 'span', function(){
				_wrapper.animate({
					height: _wrapper.css('height') == _height ? _wrapperHeight : _height
				}, 1000, function(){
					$('#moreBtn>span').html(_wrapper.css('height') == _height ? "View More" : "View Less");
				});
			});
		},
		//Define animate method
		init : function(){
			if (device.mobile()){
				//Initilize skills bars
				if(!_mInitilized && windowObj.pageVisible("skills")){
					$.each($('.chart .barWrapper div'), function(){
						var $skillBar = $(this);
						$skillBar.animate({
							width: $skillBar.data('value') + "%"
						}, 1000);
					});
					_mInitilized = true;
				}
			} else {
				if(!_initilized && windowObj.pageVisible("skills")){
					//Initilize skills dooughnuts
					$.each($('.chart>canvas'), function(){
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
					_initilized = true;
				}
			};
		},
		reset : function(){
			$('#moreBtn').unbind('click').html('View More');
			$('#chartWrapper').css('height', 'auto');
		}
	};
}();

//Define Window class
var windowObj = function Window(){
	var _window = $(window);
	var _visible = false;
	var _timeout = false;
	var _delta = 200;
	var _rtime;

	return{		
		//Define visible method
		pageVisible : function(pageId){
			//Check is skills are visible
			$.each($('.page:in-viewport'), function(){
				var $page = $(this);
				if($page.attr('id') == pageId){ 
					_visible = true; 
					return false; 
				}
			});
			return _visible;
		},
		scrollEnd : function(){
			//call functions here so they don't wait for the user to stop scrolling before their triggered, this will be called less frequently than the scoll method.
			skill.init();

			if(!device.mobile()) nav.fadeBG();

			if (new Date() - _rtime < _delta){
				setTimeout(windowObj.scrollEnd, _delta);
			} else {
				//Code to run once the user has finished scrolling the window
				_timeout = false;
				var scrollTop = _window.scrollTop();
				if (scrollTop === 0){
					$('header').animate({
						backgroundColor: "rgba(0,0,0,0)"
					}, 500);
				}
			}
		},
		scroll : function(){
			//Throttle scroll call so it waits until the user is done scrolling the window
			_rtime = new Date();
			if(_timeout === false){	
				_timeout = true;					
				setTimeout(windowObj.scrollEnd, _delta);
			}
		},
		resizeEnd : function(){			
			if (new Date() - _rtime < _delta){
				setTimeout(windowObj.resizeEnd, _delta);
			} else {
				//Code to run once the user has finished resizing the window
				_timeout = false;
				device.reset();
				nav.init();
				project.resetDescHeights();
				project.init();
				video.toggle();
				video.center();
				skill.reset();
				skill.init();
				skill.setSkillHeight();
			}
		},
		resize : function(){
			//Throttle resize call so it waits until the user is done resizing the window
			_rtime = new Date();
			if(_timeout === false){	
				_timeout = true;
				setTimeout(windowObj.resizeEnd, _delta);
			}
		},
		init : function(){
			var _window = $(window);
			//Handle scroll event
			_window.scroll(function(){
				windowObj.scroll();
			});
			//Handle resize event
			_window.resize(function(){
				windowObj.resize();
			});
			//scroll to the page is one has been passed in the URL
			var URL = window.location.pathname;
			URL = URL.substring(1,URL.length);

			if(URL != "") $('nav a[data-href=' + URL + ']').trigger('click');

			//button hover transition
			$('button').hover(
				function(){
					$(this).animate({
						backgroundColor: "#181818"
					}, 500);
				},
				function(){
					$(this).animate({
						backgroundColor: "#282828"
					}, 500);
				}
			);
		}
	};
}();

preloader.init();

$(function(){
	video.init();
	nav.init();
	project.init();
	skill.setSkillHeight();
	skill.init();
	windowObj.init();
});