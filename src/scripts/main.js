$(document).ready(function() {
    /**
     * Initialise Side Navigation
     */
    $('.button-collapse').sideNav({
        // Default is 300
        menuWidth: 250,
        // Choose the horizontal origin
        edge: 'right',
        // Closes side-nav on <a> clicks, useful for Angular/Meteor
        closeOnClick: true,
        // Choose whether you can drag to open on touch screens,
        draggable: true,
        // A function to be called when sideNav is opened
        onOpen: function(el) { },
        // A function to be called when sideNav is closed
        onClose: function(el) { },
    });

    /**
     * Initialise Image Material Box
     */
    $('.materialboxed').materialbox();

    /**
     * Initialise Carousel
     */
    $('.carousel').carousel();

    /**
     * Add target="blank" to external links
     */
    $(document.links).filter(function() {
        return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

});
