/*
 * Project: Twitter Bootstrap Hover Dropdown
 * Author: Cameron Spear
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
    // if instantlyCloseOthers is true, then it will instantly shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function(delay, instantlyCloseOthers) {
        if(typeof delay === 'boolean') {
            instantlyCloseOthers = delay;
            delay = 500;
        }
        else if(!delay) delay = 500;

        // the element we really care about is the dropdown-toggle's parent
        var $these = this.parent();
        return this.each(function() {
            var timeout, $this = $(this).parent();
            $this.hover(function() {
                window.clearTimeout(timeout);
                if(instantlyCloseOthers === true) $these.removeClass('open');
                $(this).addClass('open');
            }, function() {
                timeout = window.setTimeout(function() {
                    $this.removeClass('open');
                }, delay);
            });
        });
    };
})(jQuery, this);