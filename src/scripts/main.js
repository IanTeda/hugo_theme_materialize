$(document).ready(function() {
    
    // MODAL
    $('.modal').modal();

    // DROPDOWNS
    $('.dropdown-button').dropdown({
        belowOrigin: true,
    });
    
    // TABS
    $('ul.tabs').tabs();

    // SCROLLSPY
    $('.scrollspy').scrollSpy();

    // SIDENAV
    $('.button-collapse').sideNav();

    $('.carousel.carousel-slider').carousel({fullWidth: true});

    $('.slider').slider();

    $('.materialboxed').materialbox();
});
