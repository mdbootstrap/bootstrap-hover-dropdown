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
            var $this = $(this),
                $parent = $this.parent(),
                defaults = {
                    delay: 500,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                settings = $.extend(true, {}, defaults, options, data),
                timeout, subTimeout;

            $parent.hover(function(event) {
                // so a neighbor can't open the dropdown
                if(!$parent.hasClass('open') && !$this.is(event.target)) {
                    return true;
                }

                if(shouldHover()) {
                    if(settings.instantlyCloseOthers === true)
                        $allDropdowns.removeClass('open');

                    window.clearTimeout(timeout);
                    $parent.addClass('open');
                }
            }, function() {
                if(shouldHover()) {
                    timeout = window.setTimeout(function() {
                        $parent.removeClass('open');
                    }, settings.delay);
                }
            });

            $parent.find('.dropdown-submenu').hover(function() {
                if(shouldHover()) {
                    window.clearTimeout(subTimeout);
                }
                $(this).children('.dropdown-menu').show();
            }, function() {
                var $submenu = $(this).children('.dropdown-menu');
                if(shouldHover()) {
                    subTimeout = window.setTimeout(function() {
                        $submenu.hide();
                    }, settings.delay);
                } else {
                    // emulate Twitter Bootstrap's default behavior
                    $submenu.hide();
                }
            });
        });
    };

    // helper function to see if we should hover
    var shouldHover = function() { return !!$('#cwspear-is-awesome').height(); };
    $(document).ready(function() {
        // apply dropdownHover to all elements with the data-hover="dropdown" attribute
        $('[data-hover="dropdown"]').dropdownHover();

        // pure win here: we create these spans so we can test if we have the responsive css loaded
        // this is my attempt to hopefully make sure the IDs are unique
        $('<div class="nav-collapse collapse" style="visibility:hidden;position:fixed" id="cwspear-is-awesome">.</div>').appendTo('body');
    });

    // for the submenu to close on delay, we need to override Bootstrap's CSS in this case
    var css = '.dropdown-submenu:hover>.dropdown-menu{display:none}';
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    $('head')[0].appendChild(style);
})(jQuery, this);