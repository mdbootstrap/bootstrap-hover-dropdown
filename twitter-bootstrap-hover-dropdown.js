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
                timeout;

            $parent.hover(function(event) {
                // so a neighbor can't open the dropdown
                if(!$parent.hasClass('open') && !$this.is(event.target)) {
                    return true;
                }

                if(shouldHover) {
                    if(settings.instantlyCloseOthers === true)
                        $allDropdowns.removeClass('open');

                    window.clearTimeout(timeout);
                    $parent.addClass('open');
                }
            }, function() {
                if(shouldHover) {
                    timeout = window.setTimeout(function() {
                        $parent.removeClass('open');
                    }, settings.delay);
                }

            });

            // this helps with button groups!
            $this.hover(function() {
                if(shouldHover) {
                    if(settings.instantlyCloseOthers === true)
                        $allDropdowns.removeClass('open');

                    window.clearTimeout(timeout);
                    $parent.addClass('open');
                }
            });

            // handle submenus
            $parent.find('.dropdown-submenu').each(function(){
                var $this = $(this);
                var subTimeout;
                $this.hover(function() {
                    if(shouldHover) {
                        window.clearTimeout(subTimeout);
                        $this.children('.dropdown-menu').show();
                        // always close submenu siblings instantly
                        $this.siblings().children('.dropdown-menu').hide();
                    }
                }, function() {
                    var $submenu = $this.children('.dropdown-menu');
                    if(shouldHover) {
                        subTimeout = window.setTimeout(function() {
                            $submenu.hide();
                        }, settings.delay);
                    } else {
                        // emulate Twitter Bootstrap's default behavior
                        $submenu.hide();
                    }
                });
            });
        });
    };

    // helper variables to guess if they are using a mouse
    var shouldHover = false,
        mouse_info = {
            hits: 0,
            x: null,
            y: null
        };
    $(document).ready(function() {
        // apply dropdownHover to all elements with the data-hover="dropdown" attribute
        $('[data-hover="dropdown"]').dropdownHover();

        // if the mouse movements are "smooth" or there are more than 20, they probably have a real mouse
        $(document).mousemove(function(e){
            mouse_info.hits++;
            if (mouse_info.hits > 20 || (Math.abs(e.pageX - mouse_info.x) + Math.abs(e.pageY - mouse_info.y)) < 4) {
                $(this).unbind(e);
                shouldHover = true;
            }
            else {
                mouse_info.x = e.pageX;
                mouse_info.y = e.pageY;
            }
        });
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
