// JavaScript Document
$(function () {
	"use strict";
	var obj = {
		init: function () {
			this.smoothScroll();
			this.sidemenu();
			this.textAnimate();
			this.box01JS();
			this.box03JS();
			this.mainSlide();
		},
		smoothScroll : function(){
			$('a[href^="#"]').click(function () {
				if ($($(this).attr('href')).length) {
					var p = $($(this).attr('href')).offset();
						$('html,body').animate({
							scrollTop: p.top
						}, 600);
				}
				return false;
			});
		},
		
		sidemenu : function(){
			$(window).bind("load resize scroll", function () {
				var wW = $(window).width(),
					haftH = $(window).height() / 2,
					top = $(this).scrollTop();
				$('#top-link a').each(function () {
						var currLink = $(this);
						var refElement = $(currLink.attr("href"));
						if (refElement.position().top - haftH <= top && refElement.position().top + haftH + refElement.height() > top) {
							$('#top-link ul li a').removeClass("active");
							currLink.addClass("active");
						} else {
							currLink.removeClass("active");
						}
					});
			});
		},
		
		textAnimate: function () {
			$('#typed').typed({
				stringsElement: $('#typed-strings'),
				typeSpeed: 65,
				backDelay: 2500,
				loop: true,
				contentType: 'html',
				loopCount: false
			});
		},
		
		box01JS : function(){
			$(window).scroll(function(){
				var top = $(this).scrollTop(),
					 haftscreen = $(window).height() / 2,
					 js01run = $('.box01').position().top -  haftscreen;
				if(top > js01run){
					$('.skill-bar-process').each(function(count){
						var key = $(this),
							 width = key.attr('data-percent');
						key.animate({
							width : width + '%'
						},{duration: 800 + count * 200, easing: 'swing'});
					});
					$('.skill-number-process').each(function(count){
						var key = $(this),
							 width = key.attr('data-percent');
						key.animate({
							left : width + '%'
						},{duration: 800 + count * 200, easing: 'swing'});
					});
				}
				
				
			});
			
		},

		box03JS: function () {
			$(window).scroll(function(){
				var top = $(this).scrollTop(),
					 fullscreen = $(window).height(),
					 js03run = $('.box03').position().top -  fullscreen;
				if(top > js03run){
					$('.statistics-count').each(function () {
						var $this = $(this),
							countTo = $this.attr('data-count');

						$({countNum: $this.text()}).animate({countNum: countTo},{duration: 1000, easing: 'linear',
								step: function () {
									$this.text(Math.floor(this.countNum));
								},
								complete: function () {
									$this.text(this.countNum);
								}
							});
					});
				}else{
					$('.statistics-count').each(function () {
						var $this = $(this),
							countTo = 0;

						$({countNum: $this.text()}).animate({countNum: countTo},{duration: 1000, easing: 'linear',
								step: function () {
									$this.text(Math.floor(this.countNum));
								},
								complete: function () {
									$this.text(this.countNum);
								}
							});
					});
				}
			});
			
		},

		mainSlide: function () {
			var lists = $('.main-visual-list');
			var indexs = [];
			var timer;
			var interval = 5000;

			lists.each(function (i) {
				var list = $(this);
				var direction = list.data('direction');
				var items = $('.main-visual-list__item', list);
				indexs[i] = 0;
				items.each(function () {
					var posLeft, posTop;
					var item = $(this);
					switch (direction) {
						case 'left':
							posLeft = '100%';
							posTop = '0%';
							break;
						case 'right':
							posLeft = '-100%';
							posTop = '0%';
							break;
						case 'up':
							posLeft = '0%';
							posTop = '100%';
							break;
						case 'down':
							posLeft = '0%';
							posTop = '-100%';
							break;
					}
					if (item.index() === indexs[i]) {
						item.css({
							left: '0%',
							top: '0%'
						});
					} else {
						item.css({
							left: posLeft,
							top: posTop
						});
					}
				});
			});

			function slide() {
				lists.each(function (i) {
					var list = $(this);
					var direction = list.data('direction');
					var items = $('.main-visual-list__item', list);
					var max = items.size();

					if (max < 2) {
						return;
					}

					var preIndex = indexs[i];
					var index = indexs[i] + 1 < max ? indexs[i] + 1 : 0;

					indexs[i] = index;

					items.each(function () {
						var item = $(this);
						var posLeft, posTop;
						if (item.index() === preIndex) {
							switch (direction) {
								case 'left':
									posLeft = '-100%';
									posTop = '0%';
									break;
								case 'right':
									posLeft = '100%';
									posTop = '0%';
									break;
								case 'up':
									posLeft = '0%';
									posTop = '-100%';
									break;
								case 'down':
									posLeft = '0%';
									posTop = '100%';
									break;
							}
							item.animate({
								left: posLeft,
								top: posTop
							}, 300, function () {
								switch (direction) {
									case 'left':
										posLeft = '100%';
										posTop = '0%';
										break;
									case 'right':
										posLeft = '-100%';
										posTop = '0%';
										break;
									case 'up':
										posLeft = '0%';
										posTop = '100%';
										break;
									case 'down':
										posLeft = '0%';
										posTop = '-100%';
										break;
								}
								$(this).css({
									left: posLeft,
									top: posTop
								});
							});
						} else if (item.index() === index) {
							switch (direction) {
								case 'left':
									posLeft = '100%';
									posTop = '0%';
									break;
								case 'right':
									posLeft = '-100%';
									posTop = '0%';
									break;
								case 'up':
									posLeft = '0%';
									posTop = '100%';
									break;
								case 'down':
									posLeft = '0%';
									posTop = '-100%';
									break;
							}
							item.animate({
								left: '0%',
								top: '0%'
							}, 300);
						}
					});
				});
			}


			timer = setInterval(function () {
				slide();
			}, interval);
		},

	};

	obj.init();

});