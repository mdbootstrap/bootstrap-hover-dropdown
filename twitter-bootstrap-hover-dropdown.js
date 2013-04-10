/*
 * Project: Twitter Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Contributors: Mattia Larentis
 *
 * Dependencies?: Twitter Bootstrap's Dropdown plugin
 *
 * A simple plugin to enable twitter bootstrap dropdowns to active on hover and provide a nice user experience.
 *
 * No license, do what you want. I'd love credit or a shoutout, though.
 *
 * http://cameronspear.com/blog/twitter-bootstrap-dropdown-on-hover-plugin/
 */
;(function($, window, undefined) {
    // pure win here: we create these spans so we can test if we have the responsive css loaded
    // this is my attempt to hopefully make sure the IDs are unique
    $('<div class="nav-collapse collapse" style="display:none;" id="cwspear-is-awesome">.</div>').appendTo('body');

    var shouldHover = function() {
        return $('#cwspear-is-awesome').height();
    };

    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function(options) {

        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());

        return this.each(function() {
            var $this = $(this).parent(),
                defaults = {
                    delay: 500,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                settings = $.extend(true, {}, defaults, options, data),
                timeout;

            $this.hover(function() {
                if(shouldHover()) {
                    if(settings.instantlyCloseOthers === true)
                        $allDropdowns.removeClass('open');

                    window.clearTimeout(timeout);
                    $(this).addClass('open');
                }
            }, function() {
                if(shouldHover()) {
                    timeout = window.setTimeout(function() {
                        $this.removeClass('open');
                    }, settings.delay);
                }
            });
        });
    };

    // apply dropdownHover to all elements with the data-hover="dropdown" attribute
    $(document).ready(function() {
        $('[data-hover="dropdown"]').dropdownHover();
    });
})(jQuery, this);
