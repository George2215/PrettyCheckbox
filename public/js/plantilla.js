
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.adminlte = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};



var ControlSidebar = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'ControlSidebar';
  var DATA_KEY = 'lte.control.sidebar';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    CONTROL_SIDEBAR: '.control-sidebar',
    DATA_TOGGLE: '[data-widget="control-sidebar"]',
    MAIN_HEADER: '.main-header'
  };

  var ClassName = {
    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
    CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open'
  };

  var Default = {
    slide: true

    /**
     * Class Definition
     * ====================================================
     */

  };
  var ControlSidebar = function () {
    function ControlSidebar(element, config) {
      classCallCheck(this, ControlSidebar);

      this._element = element;
      this._config = this._getConfig(config);
    }

    // Public

    ControlSidebar.prototype.show = function show() {
      // Show the control sidebar
      if (this._config.slide) {
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE);
      } else {
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN);
      }
    };

    ControlSidebar.prototype.collapse = function collapse() {
      // Collapse the control sidebar
      if (this._config.slide) {
        $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE);
      } else {
        $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN);
      }
    };

    ControlSidebar.prototype.toggle = function toggle() {
      this._setMargin();

      var shouldOpen = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE);
      if (shouldOpen) {
        // Open the control sidebar
        this.show();
      } else {
        // Close the control sidebar
        this.collapse();
      }
    };

    // Private

    ControlSidebar.prototype._getConfig = function _getConfig(config) {
      return $.extend({}, Default, config);
    };

    ControlSidebar.prototype._setMargin = function _setMargin() {
      $(Selector.CONTROL_SIDEBAR).css({
        top: $(Selector.MAIN_HEADER).outerHeight()
      });
    };

    // Static

    ControlSidebar._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new ControlSidebar(this, $(this).data());
          $(this).data(DATA_KEY, data);
        }

        if (data[operation] === 'undefined') {
          throw new Error(operation + ' is not a function');
        }

        data[operation]();
      });
    };

    return ControlSidebar;
  }();

  /**
   *
   * Data Api implementation
   * ====================================================
   */


  $(document).on('click', Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    ControlSidebar._jQueryInterface.call($(this), 'toggle');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = ControlSidebar._jQueryInterface;
  $.fn[NAME].Constructor = ControlSidebar;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ControlSidebar._jQueryInterface;
  };

  return ControlSidebar;
}(jQuery);



var Layout = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'Layout';
  var DATA_KEY = 'lte.layout';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Selector = {
    SIDEBAR: '.main-sidebar',
    HEADER: '.main-header',
    CONTENT: '.content-wrapper',
    CONTENT_HEADER: '.content-header',
    WRAPPER: '.wrapper',
    CONTROL_SIDEBAR: '.control-sidebar',
    LAYOUT_FIXED: '.layout-fixed',
    FOOTER: '.main-footer'
  };

  var ClassName = {
    HOLD: 'hold-transition',
    SIDEBAR: 'main-sidebar',
    LAYOUT_FIXED: 'layout-fixed'

    /**
     * Class Definition
     * ====================================================
     */

  };
  var Layout = function () {
    function Layout(element) {
      classCallCheck(this, Layout);

      this._element = element;

      this._init();
    }

    // Public

    Layout.prototype.fixLayoutHeight = function fixLayoutHeight() {
      var heights = {
        window: $(window).height(),
        header: $(Selector.HEADER).outerHeight(),
        footer: $(Selector.FOOTER).outerHeight(),
        sidebar: $(Selector.SIDEBAR).height()
      };
      var max = this._max(heights);

      $(Selector.CONTENT).css('min-height', max - heights.header);
      $(Selector.SIDEBAR).css('min-height', max - heights.header);
    };

    // Private

    Layout.prototype._init = function _init() {
      var _this = this;

      // Enable transitions
      $('body').removeClass(ClassName.HOLD);

      // Activate layout height watcher
      this.fixLayoutHeight();
      $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview collapsed.lte.pushmenu expanded.lte.pushmenu', function () {
        _this.fixLayoutHeight();
      });

      $(window).resize(function () {
        _this.fixLayoutHeight();
      });

      $('body, html').css('height', 'auto');
    };

    Layout.prototype._max = function _max(numbers) {
      // Calculate the maximum number in a list
      var max = 0;

      Object.keys(numbers).forEach(function (key) {
        if (numbers[key] > max) {
          max = numbers[key];
        }
      });

      return max;
    };

    // Static

    Layout._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Layout(this);
          $(this).data(DATA_KEY, data);
        }

        if (operation) {
          data[operation]();
        }
      });
    };

    return Layout;
  }();

  /**
   * Data API
   * ====================================================
   */


  $(window).on('load', function () {
    Layout._jQueryInterface.call($('body'));
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Layout._jQueryInterface;
  $.fn[NAME].Constructor = Layout;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Layout._jQueryInterface;
  };

  return Layout;
}(jQuery);



var PushMenu = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'PushMenu';
  var DATA_KEY = 'lte.pushmenu';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    COLLAPSED: 'collapsed' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY
  };

  var Default = {
    screenCollapseSize: 768
  };

  var Selector = {
    TOGGLE_BUTTON: '[data-widget="pushmenu"]',
    SIDEBAR_MINI: '.sidebar-mini',
    SIDEBAR_COLLAPSED: '.sidebar-collapse',
    BODY: 'body',
    OVERLAY: '#sidebar-overlay',
    WRAPPER: '.wrapper'
  };

  var ClassName = {
    SIDEBAR_OPEN: 'sidebar-open',
    COLLAPSED: 'sidebar-collapse',
    OPEN: 'sidebar-open',
    SIDEBAR_MINI: 'sidebar-mini'

    /**
     * Class Definition
     * ====================================================
     */

  };
  var PushMenu = function () {
    function PushMenu(element, options) {
      classCallCheck(this, PushMenu);

      this._element = element;
      this._options = $.extend({}, Default, options);

      if (!$(Selector.OVERLAY).length) {
        this._addOverlay();
      }
    }

    // Public

    PushMenu.prototype.show = function show() {
      $(Selector.BODY).addClass(ClassName.OPEN).removeClass(ClassName.COLLAPSED);

      var shownEvent = $.Event(Event.SHOWN);
      $(this._element).trigger(shownEvent);
    };

    PushMenu.prototype.collapse = function collapse() {
      $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.COLLAPSED);

      var collapsedEvent = $.Event(Event.COLLAPSED);
      $(this._element).trigger(collapsedEvent);
    };

    PushMenu.prototype.toggle = function toggle() {
      var isShown = void 0;
      if ($(window).width() >= this._options.screenCollapseSize) {
        isShown = !$(Selector.BODY).hasClass(ClassName.COLLAPSED);
      } else {
        isShown = $(Selector.BODY).hasClass(ClassName.OPEN);
      }

      if (isShown) {
        this.collapse();
      } else {
        this.show();
      }
    };

    // Private


    PushMenu.prototype._addOverlay = function _addOverlay() {
      var _this = this;

      var overlay = $('<div />', {
        id: 'sidebar-overlay'
      });

      overlay.on('click', function () {
        _this.collapse();
      });

      $(Selector.WRAPPER).append(overlay);
    };

    // Static

    PushMenu._jQueryInterface = function _jQueryInterface(operation) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new PushMenu(this);
          $(this).data(DATA_KEY, data);
        }

        if (operation) {
          data[operation]();
        }
      });
    };

    return PushMenu;
  }();

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.TOGGLE_BUTTON, function (event) {
    event.preventDefault();

    var button = event.currentTarget;

    if ($(button).data('widget') !== 'pushmenu') {
      button = $(button).closest(Selector.TOGGLE_BUTTON);
    }

    PushMenu._jQueryInterface.call($(button), 'toggle');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = PushMenu._jQueryInterface;
  $.fn[NAME].Constructor = PushMenu;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return PushMenu._jQueryInterface;
  };

  return PushMenu;
}(jQuery);



var Treeview = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'Treeview';
  var DATA_KEY = 'lte.treeview';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    SELECTED: 'selected' + EVENT_KEY,
    EXPANDED: 'expanded' + EVENT_KEY,
    COLLAPSED: 'collapsed' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY
  };

  var Selector = {
    LI: '.nav-item',
    LINK: '.nav-link',
    TREEVIEW_MENU: '.nav-treeview',
    OPEN: '.menu-open',
    DATA_WIDGET: '[data-widget="treeview"]'
  };

  var ClassName = {
    LI: 'nav-item',
    LINK: 'nav-link',
    TREEVIEW_MENU: 'nav-treeview',
    OPEN: 'menu-open'
  };

  var Default = {
    trigger: Selector.DATA_WIDGET + ' ' + Selector.LINK,
    animationSpeed: 300,
    accordion: true

    /**
     * Class Definition
     * ====================================================
     */
  };
  var Treeview = function () {
    function Treeview(element, config) {
      classCallCheck(this, Treeview);

      this._config = config;
      this._element = element;
    }

    // Public

    Treeview.prototype.init = function init() {
      this._setupListeners();
    };

    Treeview.prototype.expand = function expand(treeviewMenu, parentLi) {
      var _this = this;

      var expandedEvent = $.Event(Event.EXPANDED);

      if (this._config.accordion) {
        var openMenuLi = parentLi.siblings(Selector.OPEN).first();
        var openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first();
        this.collapse(openTreeview, openMenuLi);
      }

      treeviewMenu.slideDown(this._config.animationSpeed, function () {
        parentLi.addClass(ClassName.OPEN);
        $(_this._element).trigger(expandedEvent);
      });
    };

    Treeview.prototype.collapse = function collapse(treeviewMenu, parentLi) {
      var _this2 = this;

      var collapsedEvent = $.Event(Event.COLLAPSED);

      treeviewMenu.slideUp(this._config.animationSpeed, function () {
        parentLi.removeClass(ClassName.OPEN);
        $(_this2._element).trigger(collapsedEvent);
        treeviewMenu.find(Selector.OPEN + ' > ' + Selector.TREEVIEW_MENU).slideUp();
        treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN);
      });
    };

    Treeview.prototype.toggle = function toggle(event) {
      var $relativeTarget = $(event.currentTarget);
      var treeviewMenu = $relativeTarget.next();

      if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
        return;
      }

      event.preventDefault();

      var parentLi = $relativeTarget.parents(Selector.LI).first();
      var isOpen = parentLi.hasClass(ClassName.OPEN);

      if (isOpen) {
        this.collapse($(treeviewMenu), parentLi);
      } else {
        this.expand($(treeviewMenu), parentLi);
      }
    };

    // Private

    Treeview.prototype._setupListeners = function _setupListeners() {
      var _this3 = this;

      $(document).on('click', this._config.trigger, function (event) {
        _this3.toggle(event);
      });
    };

    // Static

    Treeview._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if (!data) {
          data = new Treeview($(this), _config);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'init') {
          data[config]();
        }
      });
    };

    return Treeview;
  }();

  /**
   * Data API
   * ====================================================
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_WIDGET).each(function () {
      Treeview._jQueryInterface.call($(this), 'init');
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Treeview._jQueryInterface;
  $.fn[NAME].Constructor = Treeview;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Treeview._jQueryInterface;
  };

  return Treeview;
}(jQuery);



var Widget = function ($) {
  /**
   * Constants
   * ====================================================
   */

  var NAME = 'Widget';
  var DATA_KEY = 'lte.widget';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    EXPANDED: 'expanded' + EVENT_KEY,
    COLLAPSED: 'collapsed' + EVENT_KEY,
    REMOVED: 'removed' + EVENT_KEY
  };

  var Selector = {
    DATA_REMOVE: '[data-widget="remove"]',
    DATA_COLLAPSE: '[data-widget="collapse"]',
    CARD: '.card',
    CARD_HEADER: '.card-header',
    CARD_BODY: '.card-body',
    CARD_FOOTER: '.card-footer',
    COLLAPSED: '.collapsed-card'
  };

  var ClassName = {
    COLLAPSED: 'collapsed-card'
  };

  var Default = {
    animationSpeed: 'normal',
    collapseTrigger: Selector.DATA_COLLAPSE,
    removeTrigger: Selector.DATA_REMOVE
  };

  var Widget = function () {
    function Widget(element, settings) {
      classCallCheck(this, Widget);

      this._element = element;
      this._parent = element.parents(Selector.CARD).first();
      this._settings = $.extend({}, Default, settings);
    }

    Widget.prototype.collapse = function collapse() {
      var _this = this;

      this._parent.children(Selector.CARD_BODY + ', ' + Selector.CARD_FOOTER).slideUp(this._settings.animationSpeed, function () {
        _this._parent.addClass(ClassName.COLLAPSED);
      });

      var collapsed = $.Event(Event.COLLAPSED);

      this._element.trigger(collapsed, this._parent);
    };

    Widget.prototype.expand = function expand() {
      var _this2 = this;

      this._parent.children(Selector.CARD_BODY + ', ' + Selector.CARD_FOOTER).slideDown(this._settings.animationSpeed, function () {
        _this2._parent.removeClass(ClassName.COLLAPSED);
      });

      var expanded = $.Event(Event.EXPANDED);

      this._element.trigger(expanded, this._parent);
    };

    Widget.prototype.remove = function remove() {
      this._parent.slideUp();

      var removed = $.Event(Event.REMOVED);

      this._element.trigger(removed, this._parent);
    };

    Widget.prototype.toggle = function toggle() {
      if (this._parent.hasClass(ClassName.COLLAPSED)) {
        this.expand();
        return;
      }

      this.collapse();
    };

    // Private

    Widget.prototype._init = function _init(card) {
      var _this3 = this;

      this._parent = card;

      $(this).find(this._settings.collapseTrigger).click(function () {
        _this3.toggle();
      });

      $(this).find(this._settings.removeTrigger).click(function () {
        _this3.remove();
      });
    };

    // Static

    Widget._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Widget($(this), data);
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
        }

        if (typeof config === 'string' && config.match(/remove|toggle/)) {
          data[config]();
        } else if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          data._init($(this));
        }
      });
    };

    return Widget;
  }();

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.DATA_COLLAPSE, function (event) {
    if (event) {
      event.preventDefault();
    }

    Widget._jQueryInterface.call($(this), 'toggle');
  });

  $(document).on('click', Selector.DATA_REMOVE, function (event) {
    if (event) {
      event.preventDefault();
    }

    Widget._jQueryInterface.call($(this), 'remove');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Widget._jQueryInterface;
  $.fn[NAME].Constructor = Widget;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Widget._jQueryInterface;
  };

  return Widget;
}(jQuery);

exports.ControlSidebar = ControlSidebar;
exports.Layout = Layout;
exports.PushMenu = PushMenu;
exports.Treeview = Treeview;
exports.Widget = Widget;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/*
 * Toastr
 * Copyright 2012-2015
 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Greta Krafsig
 *
 * Project: https://github.com/CodeSeven/toastr
 */
/* global define */
(function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var toastr = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: '2.1.3',
                warning: warning
            };

            var previousToast;

            return toastr;

            ////////////////

            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function getContainer(options, create) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                if (create) {
                    $container = createContainer(options);
                }
                return $container;
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($toastElement, clearOptions) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if (!clearToast($toastElement, options, clearOptions)) {
                    clearContainer(options);
                }
            }

            function remove($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    removeToast($toastElement);
                    return;
                }
                if ($container.children().length) {
                    $container.remove();
                }
            }

            // internal functions

            function clearContainer (options) {
                var toastsToClear = $container.children();
                for (var i = toastsToClear.length - 1; i >= 0; i--) {
                    clearToast($(toastsToClear[i]), options);
                }
            }

            function clearToast ($toastElement, options, clearOptions) {
                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
                    $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return true;
                }
                return false;
            }

            function createContainer(options) {
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass);

                $container.appendTo($(options.target));
                return $container;
            }

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    toastClass: 'toast',
                    containerId: 'toast-container',
                    debug: false,

                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,
                    closeMethod: false,
                    closeDuration: false,
                    closeEasing: false,
                    closeOnHover: true,

                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },
                    iconClass: 'toast-info',
                    positionClass: 'toast-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                    titleClass: 'toast-title',
                    messageClass: 'toast-message',
                    escapeHtml: false,
                    target: 'body',
                    closeHtml: '<button type="button">&times;</button>',
                    closeClass: 'toast-close-button',
                    newestOnTop: true,
                    preventDuplicates: false,
                    progressBar: false,
                    progressClass: 'toast-progress',
                    rtl: false
                };
            }

            function publish(args) {
                if (!listener) { return; }
                listener(args);
            }

            function notify(map) {
                var options = getOptions();
                var iconClass = map.iconClass || options.iconClass;

                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }

                if (shouldExit(options, map)) { return; }

                toastId++;

                $container = getContainer(options, true);

                var intervalId = null;
                var $toastElement = $('<div/>');
                var $titleElement = $('<div/>');
                var $messageElement = $('<div/>');
                var $progressElement = $('<div/>');
                var $closeElement = $(options.closeHtml);
                var progressBar = {
                    intervalId: null,
                    hideEta: null,
                    maxHideTime: null
                };
                var response = {
                    toastId: toastId,
                    state: 'visible',
                    startTime: new Date(),
                    options: options,
                    map: map
                };

                personalizeToast();

                displayToast();

                handleEvents();

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function escapeHtml(source) {
                    if (source == null) {
                        source = '';
                    }

                    return source
                        .replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                }

                function personalizeToast() {
                    setIcon();
                    setTitle();
                    setMessage();
                    setCloseButton();
                    setProgressBar();
                    setRTL();
                    setSequence();
                    setAria();
                }

                function setAria() {
                    var ariaValue = '';
                    switch (map.iconClass) {
                        case 'toast-success':
                        case 'toast-info':
                            ariaValue =  'polite';
                            break;
                        default:
                            ariaValue = 'assertive';
                    }
                    $toastElement.attr('aria-live', ariaValue);
                }

                function handleEvents() {
                    if (options.closeOnHover) {
                        $toastElement.hover(stickAround, delayedHideToast);
                    }

                    if (!options.onclick && options.tapToDismiss) {
                        $toastElement.click(hideToast);
                    }

                    if (options.closeButton && $closeElement) {
                        $closeElement.click(function (event) {
                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                                event.cancelBubble = true;
                            }

                            if (options.onCloseClick) {
                                options.onCloseClick(event);
                            }

                            hideToast(true);
                        });
                    }

                    if (options.onclick) {
                        $toastElement.click(function (event) {
                            options.onclick(event);
                            hideToast();
                        });
                    }
                }

                function displayToast() {
                    $toastElement.hide();

                    $toastElement[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
                    );

                    if (options.timeOut > 0) {
                        intervalId = setTimeout(hideToast, options.timeOut);
                        progressBar.maxHideTime = parseFloat(options.timeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                        if (options.progressBar) {
                            progressBar.intervalId = setInterval(updateProgress, 10);
                        }
                    }
                }

                function setIcon() {
                    if (map.iconClass) {
                        $toastElement.addClass(options.toastClass).addClass(iconClass);
                    }
                }

                function setSequence() {
                    if (options.newestOnTop) {
                        $container.prepend($toastElement);
                    } else {
                        $container.append($toastElement);
                    }
                }

                function setTitle() {
                    if (map.title) {
                        var suffix = map.title;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.title);
                        }
                        $titleElement.append(suffix).addClass(options.titleClass);
                        $toastElement.append($titleElement);
                    }
                }

                function setMessage() {
                    if (map.message) {
                        var suffix = map.message;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.message);
                        }
                        $messageElement.append(suffix).addClass(options.messageClass);
                        $toastElement.append($messageElement);
                    }
                }

                function setCloseButton() {
                    if (options.closeButton) {
                        $closeElement.addClass(options.closeClass).attr('role', 'button');
                        $toastElement.prepend($closeElement);
                    }
                }

                function setProgressBar() {
                    if (options.progressBar) {
                        $progressElement.addClass(options.progressClass);
                        $toastElement.prepend($progressElement);
                    }
                }

                function setRTL() {
                    if (options.rtl) {
                        $toastElement.addClass('rtl');
                    }
                }

                function shouldExit(options, map) {
                    if (options.preventDuplicates) {
                        if (map.message === previousToast) {
                            return true;
                        } else {
                            previousToast = map.message;
                        }
                    }
                    return false;
                }

                function hideToast(override) {
                    var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
                    var duration = override && options.closeDuration !== false ?
                        options.closeDuration : options.hideDuration;
                    var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
                    if ($(':focus', $toastElement).length && !override) {
                        return;
                    }
                    clearTimeout(progressBar.intervalId);
                    return $toastElement[method]({
                        duration: duration,
                        easing: easing,
                        complete: function () {
                            removeToast($toastElement);
                            clearTimeout(intervalId);
                            if (options.onHidden && response.state !== 'hidden') {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date();
                            publish(response);
                        }
                    });
                }

                function delayedHideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    progressBar.hideEta = 0;
                    $toastElement.stop(true, true)[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing}
                    );
                }

                function updateProgress() {
                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
                    $progressElement.width(percentage + '%');
                }
            }

            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                $toastElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                    previousToast = undefined;
                }
            }

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window.toastr = factory(window.jQuery);
    }
}));
