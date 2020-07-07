// JavaScript Document//

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

//	
//	$(".container22").isotope({
//		itemSelector :'.card',
////		layloutMode : 'fitRows'
//	});
//	
//	$(".menu ul li a").click(function(){
//		$(".menu ul li a").removeClass("active");
//	    $(this).addClass("active");
//	
//	var selector = $(this).attr("data-filter");
//	$(".container22").isotope({
//		filter:selector
//	});
//	return false
//							 
//	});
//	
//	
//	
	
	
	
      //isotope
    $('#projects').waitForImages(function () {
        var $container = $('.sss');
        $container.isotope({
            filter: '*',
        });

        $('.project_portfolio_menu a').click(function () {
            $('.project_portfolio_menu .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

    //animatedModal
//    $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();
	

	


	
	$('#projects')
			.on('click', 'a', function(event) {

				var $a = $(this),
					$projects  = $a.parents('#projects'),
					$modal = $projects .children('.modal'),
					$modalImg = $modal.find('img'),
					href = $a.attr('href');

				// Not an image? Bail.
					if (!href.match(/\.(jpg|gif|png|mp4)$/))
						return;

//				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Locked? Bail.
					if ($modal[0]._locked)
						return;

				// Lock.
					$modal[0]._locked = true;

				// Set src.
					$modalImg.attr('src', href);

				// Set visible.
					$modal.addClass('visible');

				// Focus.
					$modal.focus();

				// Delay.
					setTimeout(function() {

						// Unlock.
							$modal[0]._locked = false;

					}, 600);

			})
			.on('click', '.modal', function(event) {

				var $modal = $(this),
					$modalImg = $modal.find('img');

				// Locked? Bail.
					if ($modal[0]._locked)
						return;

				// Already hidden? Bail.
					if (!$modal.hasClass('visible'))
						return;

				// Stop propagation.
					event.stopPropagation();

				// Lock.
					$modal[0]._locked = true;

				// Clear visible, loaded.
					$modal
						.removeClass('loaded')

				// Delay.
					setTimeout(function() {

						$modal
							.removeClass('visible')

						setTimeout(function() {

							// Clear src.
								$modalImg.attr('src', '');

							// Unlock.
								$modal[0]._locked = false;

							// Focus.
								$body.focus();

						}, 475);

					}, 125);

			})
			.on('keypress', '.modal', function(event) {

				var $modal = $(this);

				// Escape? Hide modal.
					if (event.keyCode == 27)
						$modal.trigger('click');

			})
			.on('mouseup mousedown mousemove', '.modal', function(event) {

				// Stop propagation.
					event.stopPropagation();

			})
			.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
				.find('img')
					.on('load', function(event) {

						var $modalImg = $(this),
							$modal = $modalImg.parents('.modal');

						setTimeout(function() {

							// No longer visible? Bail.
								if (!$modal.hasClass('visible'))
									return;

							// Set loaded.
								$modal.addClass('loaded');

						}, 275);

					});

//     Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });

    });
});