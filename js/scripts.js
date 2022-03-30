(function ($) {
	var ua = window.navigator.userAgent;
	var isIE = /MSIE|Trident/.test(ua);

	if ( !isIE ) {
		//IE specific code goes here
		"use strict";
	}

	/** Adobe typekit font */
	try{Typekit.load({ async: true });}catch(e){};

	/*** Sticky header */
	const body = document.body;
	const scrollUp = "scroll-up";
	const scrollDown = "scroll-down";
	const searchBar = $('.search-wrap');
	let lastScroll = 100;
	window.addEventListener("scroll", () => {
	  	const currentScroll = window.pageYOffset;
	  	if (currentScroll <= 0)
	  	{
	    	body.classList.remove(scrollUp);
	    	return;
	  	}
	  	if (currentScroll > lastScroll && !body.classList.contains(scrollDown))
	  	{
	    	// down
	    	body.classList.remove(scrollUp);
	    	body.classList.add(scrollDown);
	    	searchBar.removeClass('search-show');
	  	}
	  	else if ( currentScroll < lastScroll && body.classList.contains(scrollDown) )
	  	{
	    	// up
	    	body.classList.remove(scrollDown);
	    	body.classList.add(scrollUp);

	  	}
	  	lastScroll = currentScroll;
	});


	$(window).on('load', function (e) {

		// Wow Animation
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true
		});
		wow.init();
	});

	/*** Sidr Menu */
	$('.navbar-toggle').sidr({
     	name: 'sidr-main',
      	side: 'right',
      	source: '#sidr',
      	displace: false,
      	renaming: false,
    });

    $('.navbar-toggle.in').on('click', function(){
		$.sidr('close', 'sidr-main');
	});

	/*** Enable Masonry */
	var $grid = $('.masonry').masonry({
	 	itemSelector: '.col',
	 	columnWidth: '.col',
	 	horizontalOrder: true,
	});

	
	 // trigger scroll
    $('a.scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var o = $(this.hash);
            if ((o = o.length ? o : $("[name=" + this.hash.slice(1) + "]")).length) return $("html, body").animate({
                scrollTop: o.offset().top - 70
            }, 1e3, "easeInOutExpo"), !1
        }
    });

    $(".pricing__switch .checkbox").change(function() {
        if(this.checked) {
            $('.pricing-table .pricing-table__amount').addClass('checked');
        }
        else {
            $('.pricing-table .pricing-table__amount').removeClass('checked');
        }
    });

    function checkAccordion (id) {

		$(id +' a.card-link').on('click', function () {
			if(!$(this).hasClass("collapsed")) {
				$(id +' .card').removeClass("show");
				$(this).parent().parent().addClass("show");
			}else {
				$(id +' .card').removeClass("show");
				$(this).parent().parent().addClass("show");
			}
		});
    }
    checkAccordion("#faq")
	
    /*** Popup Video lightbox */
     $('.popup-video').magnificPopup({
         type: 'iframe',
         preloader: false,
         fixedBgPos: true,
         removalDelay: 500,
         fixedContentPos: true,
         callbacks: {
             beforeOpen: function() {
                 // console.log(this.st.iframe.markup);
                 this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
                 this.st.mainClass = this.st.el.attr('data-effect');
             }
         },
     });

    /*** Select Wrap */
	$( "select" ).wrap( "<div class='select-wrapper'></div>" );

	/*** Slick Slider */
  	var $top_slider = $('.slider-for'),
  	    $bottom_slider = $('.slider-nav');
  	$top_slider.on('init', function(e, $slick) {}).slick({
  	    slidesToShow: 1,
  	    slidesToScroll: 1,
  	    prevArrow: $('.if-slider-controls .arrow-prev'),
  	    nextArrow: $('.if-slider-controls .arrow-next'),
  	    dots: false,
  	    fade: true,
  	    infinite: true,
  	    responsive: [{
  	        breakpoint: 576,
  	        settings: {
  	            arrows: false,
  	        }
  	    }]
  	}).on('beforeChange', function(event, $slick, currentSlide, nextSlide) {
  	    if ($bottom_slider.slick('getSlick').slideCount <= $bottom_slider.slick('slickGetOption', 'slidesToShow')) {
  	        $bottom_slider.slick('slickGoTo', nextSlide, true);
  	    }
  	});
  	$bottom_slider.on('init', function(e, $slick) {
  	    if ($slick.slideCount > $slick.slickGetOption('slidesToShow')) {
  	        $top_slider.slick('slickSetOption', {
  	            asNavFor: '.slider-nav'
  	        });
  	        $slick.slickSetOption({
  	            asNavFor: '.slider-for'
  	        });
  	    }
  	}).slick({
  	    slidesToShow: 4,
  	    slidesToScroll: 1,
  	    dots: false,
  	    arrows: false,
  	    centerMode: false,
  	    focusOnSelect: true,
  	    infinite: true,
  	    adaptiveHeight: true,
  	    responsive: [{
  	        breakpoint: 1401,
  	        settings: {
  	            slidesToShow: 3
  	        }
  	    }]
  	}).on('breakpoint', function(event, $slick, breakpoint) {
  	    if ($slick.slideCount > $slick.slickGetOption('slidesToShow')) {
  	        $top_slider.slick('slickSetOption', {
  	            asNavFor: '.slider-nav'
  	        });
  	        $slick.slickSetOption({
  	            asNavFor: '.slider-for'
  	        });
  	    } else {
  	        $top_slider.slick('slickSetOption', {
  	            asNavFor: null
  	        });
  	        $slick.slickSetOption({
  	            asNavFor: null
  	        });
  	    }
  	}).on('beforeChange', function(event, $slick, currentSlide, nextSlide) {
  	    if ($slick.slideCount <= $slick.slickGetOption('slidesToShow')) {
  	        $top_slider.slick('slickGoTo', nextSlide);
  	    }
  	});

  	/*** atm-Slider */
  	function cts_slider() {

  	    var time = 5;
  	    var $bar,
  	        $slick,
  	        isPause,
  	        tick,
  	        percentTime;
  	    $ctsSlick = $('.case-studies-slider');
  	    $bar = $('.slider-controls-wrapper .progress-bar .inner-line');

  	    $ctsSlick.each(function(index){

  	        $(this).slick({
  	            dots: true,
  	            arrows: true,
  	            slidesToShow: 1,
  	            slidesToScroll: 1,
  	            focusOnSelect: true,
  	            prevArrow: $('.slider-controls .arrow-prev')[index],
  	            nextArrow: $('.slider-controls .arrow-next')[index],
  	            responsive: [
  	            {
  	                breakpoint: 768,
  	                settings: {
  	                    
  	                }
  	            },
  	            {
  	                breakpoint: 576,
  	                settings: {
  	                    slidesToShow: 1,
  	                }
  	            }
  	          ]
  	        });
  	    });

  	    $ctsSlick.on({
  	        mouseenter: function() {
  	            isPause = true;
  	        },
  	        mouseleave: function() {
  	            isPause = false;
  	        }
  	    });

  	    function startProgressbar() {
  	        resetProgressbar();
  	        percentTime = 0;
  	        isPause = false;
  	        tick = setInterval(interval, 10);
  	    }

  	    function interval() {
  	        if(isPause === false) {
  	            percentTime += 1 / (time+0.1);
  	            $bar.css({
  	                width: percentTime+"%"
  	            });
  	            if(percentTime >= 100) {
  	                $ctsSlick.slick('slickNext');
  	                startProgressbar();
  	            }
  	        }
  	    }

  	    function resetProgressbar() {
  	        $bar.css({
  	            width: 0+'%' 
  	        });
  	        clearTimeout(tick);
  	    }
  	      
  	    startProgressbar();
  	}
  	cts_slider();

	/*** Number Counter */
	$('.counter').counterUp({
	    delay: 10,
	    time: 1000
	});
	
	
	/*** Header height = gutter height */
	function setGutterHeight(){
		var header = document.querySelector('.header'),
			  gutter = document.querySelector('.header-gutter');
			  // banner = document.querySelector('.banner');
		if (gutter) {
			gutter.style.height = header.offsetHeight + 'px';
		}

		// if (banner) {
		// 	banner.style.paddingTop = header.offsetHeight + 'px';
		// }
	}
	window.onload = setGutterHeight;
	window.onresize = setGutterHeight;

	/*** Generated by CoffeeScript 1.9.2 */
	function stickyKit() {
	    var reset_scroll;

	    $(function() {
	        return $("[data-sticky_column]").stick_in_parent({
	            parent: "[data-sticky_parent]",
	            offset_top: 160,
	            bottoming: true,
	        });
	    });

	    reset_scroll = function() {
	        var scroller;
	        scroller = $("body,html");
	        scroller.stop(true);

	        if ($(window).scrollTop() !== 0) {
	            scroller.animate({
	                scrollTop: 0
	            }, "fast");
	        }
	        return scroller;
	    };

	    window.scroll_it = function() {
	        var max;
	        max = $(document).height() - $(window).height();

	        return reset_scroll().animate({
	            scrollTop: max
	        }, max * 3).delay(100).animate({
	            scrollTop: 0
	        }, max * 3);
	    };

	    window.scroll_it_wobble = function() {
	        var max, third;
	        max = $(document).height() - $(window).height();
	        third = Math.floor(max / 3);

	        return reset_scroll().animate({
	            scrollTop: third * 2
	        }, max * 3).delay(100).animate({
	            scrollTop: third
	        }, max * 3).delay(100).animate({
	            scrollTop: max
	        }, max * 3).delay(100).animate({
	            scrollTop: 0
	        }, max * 3);
	    };

	    $(window).on("load", (function(_this) {
	        return function(e) {
	            return $(document.body).trigger("sticky_kit:recalc");
	        };
	    })(this));

	    $(window).on("resize", (function(_this) {
	        return function(e) {
	            return $(document.body).trigger("sticky_kit:recalc");
	        };
	    })(this));
	}

	var window_width = $(window).width();

	if (window_width < 992) {
	    $(document.body).trigger("sticky_kit:detach");
	} else {
	    stickyKit();
	}

	$( window ).resize(function() {
	    window_width = $( window ).width();
	    if (window_width < 992) {
	        $(document.body).trigger("sticky_kit:detach");
	    } else {
	        stickyKit();
	    }
	});

}(jQuery));
