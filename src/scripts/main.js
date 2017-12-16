$(document).ready(function() {
    // SIDENAV
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

    $('.materialboxed').materialbox();

    /**
     * Add target="blank" to external links
     */
    $(document.links).filter(function() {
        return this.hostname != window.location.hostname;
    }).attr('target', '_blank');
});
