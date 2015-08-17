/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
*/

function toggleNav() {
	if ($('#site-wrapper').hasClass('show-nav')) {
	  	// Do things on Nav Close
	 	$('#site-wrapper').removeClass('show-nav');
	 	$('#site-wrapper').removeClass('overflow');
	} else {
	 	 // Do things on Nav Open
	  	$('#site-wrapper').addClass('show-nav');
	  	$('#site-wrapper').addClass('overflow');
	}
}

$(window).load(function() {
	var windowheight = $(window).height();
	var headerheight = $('.header').height();
	var bodyheight = $('.content')[0].scrollHeight;

	var height = bodyheight - windowheight;
	height = height + headerheight;

	$('.curtain-back').css('height', height);

	$('body').css('visibility','visible').hide().fadeIn('slow');

	setTimeout(function(){
   		$( ".curtain, .curtain-back" ).fadeOut(400);
	}, 1000);

});

/*
|--------------------------------------------------------------------------
| Perform functions when all documents finish downloading
|--------------------------------------------------------------------------
*/

$(document).ready(function () {

	$(document).foundation();
	$(document).foundation('offcanvas', 'reflow');
	$(document).foundation('equalizer', 'reflow');

	$('.toggle-nav').click(function() {
		// Calling a function in case you want to expand upon this.
		toggleNav();
	});

});