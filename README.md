Twitter Bootstrap Hover Dropdown Plugin
=======================================

A simple plugin to enable twitter bootstrap dropdowns to activate on hover and provide a nice user experience.

The dropdowns are dismissed after a configurable delay. This fixes an issue that can instantly close your nav because of a 1px gap between the button/nav item that activated the dropdown and the actual dropdown. It is also generally a better user experience, as users are not punished by going 1 pixel outside of the dropdown, which would instantly close the nav without a delay.

**Note:** The HTML markup is the same as with any other Twitter Bootstrap dropdown. This will not interfere with Bootstrap's default activate-on-click method.

### Usage

Usage is simple:

```javascript
$('.dropdown-toggle').dropdownHover([delay = 500,] [instantlyCloseOthers = false]);
```

### Parameters

* **delay**: *(optional)* The delay in miliseconds. This is the time to wait before closing a dropdown when the mouse is no longer over the dropdown or the button/nav item that activated it. Defaults to 500.
* **instantlyCloseOthers**: *(optional)* A boolean value that when true, will instantly close all other dropdowns matched by the selector used when you activate a new navigation. This is nice for when you have dropdowns close together that may overlap. Default is false.

### Demo

You can view a demo for this plugin on my site: http://cameronspear.com/demos/twitter-bootstrap-hover-dropdown/

#### A Note on Choosing a Selector

This plugin purposedly lets you choose a selector (as opposed to apply this to everything with the class of `.dropdown-toggle`). This is so that you can selectively apply it where you want. Maybe you only want to use it for the main nav, and not have it activate for dropdown buttons in the main content. You can add a class to the item that normally gets `.dropdown-toggle` and use that class with this plugin to easily achieve that, or use a selector such as `.main-nav .dropdown-toggle`.

Note that the `instantlyCloseOthers` only works with items that are matched by the original selector(s) used, i.e. if you call `.dropdownHover()` on multiple selectors, they are each uniquely tied together (but separately from other selectors) via `instantlyCloseOthers`.

### License

No license for now, or probably ever. Do what you want, but I would love credit or a shoutout. You can always follow me on Twitter: [@CWSpear](https://twitter.com/CWSpear)