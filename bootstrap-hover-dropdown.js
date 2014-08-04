/**
 * Project: Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Contributors: Mattia Larentis
 *
 * Dependencies: Bootstrap's Dropdown plugin, jQuery
 *
 * A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
 *
 * License: MIT
 *
 * http://cameronspear.com/blog/bootstrap-dropdown-on-hover-plugin/
 */
;(function ($, window, undefined) {
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function (options) {
        // don't do anything if touch is supported
        // (plugin causes some issues on mobile)
        if('ontouchstart' in document) return this; // don't want to affect chaining

        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());

        return this.each(function () {
            var $this = $(this),
                $parent = $this.parent(),
                defaults = {
                    delayClose: 1000,
                    delayOpen: 300,
                    delaySwitch: 100,
                    instantlyCloseOthers: true
                },
                data = {
                    delayClose: $(this).data('delay-close'),
                    delayOpen: $(this).data('delay-open'),
                    delaySwitch: $(this).data('delay-switch'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                showEvent   = 'show.bs.dropdown',
                hideEvent   = 'hide.bs.dropdown',
                // shownEvent  = 'shown.bs.dropdown',
                // hiddenEvent = 'hidden.bs.dropdown',
                settings = $.extend(true, {}, defaults, options, data),
                timeoutOpen,
                timeoutClose;


            $parent.hover(function (event) {

                // so a neighbor can't open the dropdown
            	// FIX: see https://github.com/CWSpear/bootstrap-hover-dropdown/issues/55
                if($parent.hasClass('open') && !$this.is(event.target)) {
                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    return true;
                }

                var isChildMenu = $parent.parents('.dropdown-menu').length,
                    siblingIsOpen = $parent.siblings().hasClass('open');

                window.clearTimeout(timeoutClose);

                timeoutOpen = window.setTimeout(function(){
                    openDropdown(event);
                }, siblingIsOpen || isChildMenu ? settings.delaySwitch : settings.delayOpen);



            }, function () {
                clearTimeout(timeoutOpen);

                var isChildMenu = $parent.parents('.dropdown-menu').length;

                timeoutClose = window.setTimeout(function () {
                    $parent.removeClass('open');
                    $this.trigger(hideEvent);
                }, timeoutOpen && !isChildMenu ? settings.delayClose : settings.delaySwitch);
            });
            
            // clear timeout if hovering submenu
            $allDropdowns.find('.dropdown-menu').hover(function(){
            	window.clearTimeout(timeoutClose);
            }, function(){

                var isChildMenu = $(this).parents('.dropdown-menu').length;

                if(isChildMenu){
                    return true;
                }

                timeoutClose = window.setTimeout(function () {
                    $parent.removeClass('open');
                    $this.trigger(hideEvent);
                }, timeoutOpen > 0 ? settings.delayClose : 0);
            });
            
            
            // this helps with button groups!
            $this.hover(function (event) {
                // this helps prevent a double event from firing.
                // see https://github.com/CWSpear/bootstrap-hover-dropdown/issues/55
                if($parent.hasClass('open') && !$parent.is(event.target)) {
                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    return true;
                }

            });

            // handle submenus
            $parent.find('.dropdown-submenu').each(function (){
                var $this = $(this);
                var subTimeout;
                $this.hover(function () {
                    window.clearTimeout(subTimeout);
                    $this.children('.dropdown-menu').show();
                    // always close submenu siblings instantly
                    $this.siblings().children('.dropdown-menu').hide();
                }, function () {
                    var $submenu = $this.children('.dropdown-menu');
                    subTimeout = window.setTimeout(function () {
                        $submenu.hide();
                    }, timeoutOpen > 0 ? settings.delayClose : 0);
                });
            });

            function openDropdown(event) {
                $allDropdowns.find(':focus').blur();

                if(settings.instantlyCloseOthers === true){

                    // not the first level
                    if($this.parents('.dropdown-menu').length && $this.siblings().parent().hasClass('open')){
                        $this.siblings().parent().removeClass('open');
                    }else{
                        $this.parent('li').siblings().removeClass('open');
                    }
                }


                window.clearTimeout(timeoutClose);
                $parent.addClass('open');
                $this.trigger(showEvent);
            }
        });
    };

    $(document).ready(function () {
        // apply dropdownHover to all elements with the data-hover="dropdown" attribute
        $('[data-hover="dropdown"]').dropdownHover();
    });
})(jQuery, this);
