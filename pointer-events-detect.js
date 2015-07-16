function hasPointerEvents() {
    var domPrefixes = 'moz o ms webkit'.split(' ');

    // Cannot use `.prefixed()` for events, so test each prefix
    var bool = false,
        i    = domPrefixes.length;

    // Don't forget un-prefixed...
    bool = isEventSupported('pointerdown');

    while (i-- && !bool) {
        if (isEventSupported(domPrefixes[i] + 'pointerdown')) {
            bool = true;
        }
    }

    return bool;

    // http://v3.modernizr.com/download/#-pointerevents-dontmin

    function createElement() {
        if (typeof document.createElement !== 'function') {
            // This is the case in IE7, where the type of createElement is "object".
            // For this reason, we cannot call apply() as Object is not a Function.
            return document.createElement(arguments[0]);
        } else {
            return document.createElement.apply(document, arguments);
        }
    };

    /**
     * @param  {string|*}           eventName  is the name of an event to test for (e.g. "resize")
     * @param  {(Object|string|*)=} element    is the element|document|window|tagName to test on
     * @return {boolean}
     */
    function isEventSupported(eventName, element) {

        var isSupported;
        if (!eventName) {
            return false;
        }
        if (!element || typeof element === 'string') {
            element = createElement(element || 'div');
        }

        // Testing via the `in` operator is sufficient for modern browsers and IE.
        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
        // "resize", whereas `in` "catches" those.
        eventName   = 'on' + eventName;
        return eventName in element;
    }
}
