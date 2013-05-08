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
 */(function(e,t,n){var r=e();e.fn.dropdownHover=function(n){r=r.add(this.parent());return this.each(function(){var s=e(this),o=s.parent(),u={delay:500,instantlyCloseOthers:!0},a={delay:e(this).data("delay"),instantlyCloseOthers:e(this).data("close-others")},f=e.extend(!0,{},u,n,a),l,c;o.hover(function(e){if(!o.hasClass("open")&&!s.is(e.target))return!0;if(i()){f.instantlyCloseOthers===!0&&r.removeClass("open");t.clearTimeout(l);o.addClass("open")}},function(){i()&&(l=t.setTimeout(function(){o.removeClass("open")},f.delay))});o.find(".dropdown-submenu").hover(function(){i()&&t.clearTimeout(c);e(this).children(".dropdown-menu").show()},function(){var n=e(this).children(".dropdown-menu");i()?c=t.setTimeout(function(){n.hide()},f.delay):n.hide()})})};var i=function(){return!!e("#cwspear-is-awesome").height()};e(document).ready(function(){e('[data-hover="dropdown"]').dropdownHover();e('<div class="nav-collapse collapse" style="visibility:hidden;position:fixed" id="cwspear-is-awesome">.</div>').appendTo("body")});var s=".dropdown-submenu:hover>.dropdown-menu{display:none}",o=document.createElement("style");o.type="text/css";o.styleSheet?o.styleSheet.cssText=s:o.appendChild(document.createTextNode(s));e("head")[0].appendChild(o)})(jQuery,this);