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

    /**
     * http://brm.io/jquery-match-height/
     */
    // apply matchHeight to each item container's items
    $('.items-container').each(function() {
        $(this).children('.item').matchHeight({
            byRow: byRow,
        });
    });
});
