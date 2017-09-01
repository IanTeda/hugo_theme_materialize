(function($) {
    $(function() {
        $('.button-collapse').sideNav();

        $('.parallax').parallax();
        
        // Dropdown on navbar options
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
             // Does not change width of dropdown to that of the activator
            constrainWidth: true,
            // Activate on hover
            hover: true,
            // Spacing from edge
            gutter: 0,
            // Displays dropdown below the button
            belowOrigin: true,
            // Displays dropdown with edge aligned to the left of button
            alignment: 'right',
            // Stops event propagation
            stopPropagation: false,
        });

    });
})(jQuery); // end of jQuery name space
