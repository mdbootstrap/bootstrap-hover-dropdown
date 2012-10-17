/*
 * Project: Twitter Bootstrap Hover Dropdown
 * Author: Cameron Spear & Larentis Mattia
 *
 * Dependencies?: Twitter Bootstrap's Dropdown plugin
 *
 * A simple plugin to enable twitter bootstrap dropdowns to active on hover and provide a nice user experience.
 *
 * No license, do what you want. I'd love credit or a shoutout, though.
 *
 * http://cameronspear.com/blog/twitter-bootstrap-dropdown-on-hover-plugin/
 */

!function ($) {
  "use strict";

  $.fn.dropdownHover = function (opt) {
    $(this).each(function () {  // each ul
      var $this = $(this)  // ul
        , $lis = $this.find('li')  // li
        , data = {
          'delay': $this.data('delay'),
          'instantlyCloseOthers': $this.data('close-others') === undefined
        }
        , options = $.extend(true, {}, $.fn.dropdownHover.defaults, opt, data);

      return $lis.each(function () {
        var $this = $(this); // li

        $this.hover(function () {
          if (options.instantlyCloseOthers)
            $this.parent().find('li').removeClass('open');
          $this.addClass('open');
        }, function () {
          window.setTimeout(function () {
            $this.removeClass('open');
          }, options.delay);
        });
      });
    });
  };

  $.fn.dropdownHover.defaults = {
    delay: 500,
    instantlyCloseOthers: true
  };
}($);