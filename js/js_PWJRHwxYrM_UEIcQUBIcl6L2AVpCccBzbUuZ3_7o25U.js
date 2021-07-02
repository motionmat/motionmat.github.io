// IE7 and IE8.
(function($) {
  if ($.support.leadingWhitespace == false) {
    $('.container-12 > :last-child, ul.widget-menu > :last-child, .views-row:last-child, .field-group-format:last-child, th:last-child, td:last-child').addClass('last-child')
  }
})(jQuery);
;
/**
 * Zero menu js popup.
 */
(function ($) {
  var
    $popups, // All popups.
    popupOpened = false,
    focusInPopup = false,
    t;      // Timeout.

  // Alter menu popups, attach events and append to body.
  // Need to change location in DOM because header has overflow: hidden set.
  var $li = $('#zone-portal-navigation-wrapper div.menu-block-wrapper > .menu > li');
  var $liNotExpanded = $li.not('.expanded');
  var $liExpanded = $li.filter('.expanded').each(function() {
    var $this = $(this);
    var $popup = $this.find('.menu')
      .addClass('portal-navigation-menupopup')
      .attr('id', $this.attr('id') + '-menu');

    $popup
      .mouseenter(function() {
        clearTimeout(t);
      })
      .mouseleave(function() {
        hideMenu($popup);
      });
  });

  $popups = $('ul.portal-navigation-menupopup');

  /*$liExpanded.bind('click', function() {
    mouseenterEvent(this);
  });
*/
  $liExpanded.find('> a')
    .removeAttr("href").attr({ tabindex: "0", role: "button"}) // Remove 'href', add 'role' and 'tabindex' for screenreaders.
    .bind('focus', function(e) {
      mouseenterEvent(this, e);
    });
  $liNotExpanded.find('> a').bind('blur', function() {
    hideAllMenus();
  });
  $liExpanded.mouseleave(function() {
    mouseleaveEvent(this);
  });

  if ('ontouchstart' in document.documentElement) {
    $liExpanded.find('> a').on('touchstart', function(e) { mouseenterEvent(this, e); });
    $('body').on('touchstart', function() { hideAllMenus() });
    $liExpanded.find('ul.portal-navigation-menupopup').on('touchstart', function(e) { e.stopPropagation(); });
  } else {
    $liExpanded.find('> a').bind('click', function(e) { mouseenterEvent(this, e); });
    $('body').click(function() { hideAllMenus(); });
    $liExpanded.find('ul.portal-navigation-menupopup').click(function(e) { e.stopPropagation(); });
  }

  $popups
    .mouseenter(function() {
      clearTimeout(t);
    });

  // Close the menus if escape is used.
  $('body').keydown(function(e) {
    if (popupOpened && e.keyCode === 27) {
      var nextItem = $popups.filter(':visible').parent().next().find('> a');
      if (nextItem.length === 0) {
        var nextItem = $popups.filter(':visible').parent().parent().find('> :first-child').find('> a');
      }
      nextItem.focus()
      hideAllMenus();
    }
  });

  $('ul.portal-navigation-menupopup .last a').bind('blur', function(e) {
    hideMenu($(this).parent().parent());
  });

  var mouseenterEvent = function(that, e) {
    if (that.tagName == 'A') {
      var $this = $(that).parent();
    }
    else {
      var $this = $(that);
    }

    var openDelay = 0;

    t = window.setTimeout(function() {
      if (!popupOpened) {
        hideAllMenus();
        showMenu($('#' + $this.attr('id') + '-menu'), $this);
      }
    }, openDelay);

    e.stopPropagation();
    e.preventDefault();
  }

  var mouseleaveEvent = function(that) {
    var $this = $(that);
    clearTimeout(t);
    t = window.setTimeout(function() {
      hideMenu($('#' + $this.attr('id') + '-menu'), $this);
    }, 400);
  }

  var hideAllMenus = function() {
    popupOpened = false;
    $popups.hide();
  }

  var showMenu = function($popup, $liExpanded) {
    popupOpened = true;
    hideAllMenus();
    var offset = $liExpanded.offset();
    $popup.show();
  }

  var hideMenu = function($popup) {
    popupOpened = false;
    $popup.hide();
  }

})(jQuery);
;
/**
 * Zero menu js popup.
 */
(function ($) {
  var
    $menu,
    $menuItems,
    $menuItemsParent,
    $prev,
    $next,
    steps = new Array(),
    stepIndex = 0,
    menuWidth,
    menuHeight,
    menuItemsParentWidth = 0,
    menuItemsParentWidthInitial = 0,
    animateSpeed = 300;

  $menu = $('#block-menu-block-5');

  // From http://stackoverflow.com/questions/4383226/using-jquery-to-know-when-font-face-fonts-are-loaded
  var waitForWebfonts = function(fonts, callback) {
    var loadedFonts = 0;
    for(var i = 0, l = fonts.length; i < l; ++i) {
        (function(font) {
            var node = document.createElement('span');
            // Characters that vary significantly among different fonts
            node.innerHTML = 'giItT1WQy@!-/#';
            // Visible - so we can measure it - but not on the screen
            node.style.position      = 'absolute';
            node.style.left          = '-10000px';
            node.style.top           = '-10000px';
            // Large font size makes even subtle changes obvious
            node.style.fontSize      = '300px';
            // Reset any font properties
            node.style.fontFamily    = 'sans-serif';
            node.style.fontVariant   = 'normal';
            node.style.fontStyle     = 'normal';
            node.style.fontWeight    = 'normal';
            node.style.letterSpacing = '0';
            document.body.appendChild(node);

            // Remember width with no applied web font
            var width = node.offsetWidth;

            node.style.fontFamily = font;

            var interval;
            function checkFont() {
                // Compare current width with original width
                if(node && node.offsetWidth != width) {
                    ++loadedFonts;
                    node.parentNode.removeChild(node);
                    node = null;
                }

                // If all fonts have been loaded
                if(loadedFonts >= fonts.length) {
                    if(interval) {
                        clearInterval(interval);
                    }
                    if(loadedFonts == fonts.length) {
                        callback();
                        return true;
                    }
                }
            };

            if(!checkFont()) {
                interval = setInterval(checkFont, 50);
            }
        })(fonts[i]);
    }
  };

  if ($menu.length !== 0) {
    waitForWebfonts(['Museo500'], function() {
      var setMenuDimensions = function() {
        $menu.attr('style', '');

        menuWidth = $menu.outerWidth();
        menuHeight = $menu.height();

        $menu.css({
          // Can't use menuWidth here as negative horizontal margins are set.
          'width': $menu.width(),
          'height': menuHeight
        });
      }

      var getElementsWidth = function($elements) {
        var width = 0;
        $elements.each(function() {
          width += $(this).outerWidth();
        });
        return width;
      }

      var setMenuItemsParentDimensions = function() {
        $menuItemsParent = $menu.find('.menu').attr('style', '');
        $menuItems = $menuItemsParent.find('> li');
        menuItemsParentWidthInitial = $menuItemsParent.width();
        menuItemsParentWidth = getElementsWidth($menuItems);
        $menuItemsParent.css({
          'width': menuItemsParentWidth
        });
      }

      // Calculate left value of element by summing up the widths of elements to the left.
      var integerLeftForItem = function($element) {
        var $prevElement = $element;
        var left = 0;
        var doAnotherCycle;
        do {
          $prevElement = $prevElement.prev();
          doAnotherCycle = $prevElement.length !== 0 ? true : false;
          if (doAnotherCycle) {
            left += $prevElement.outerWidth();
          }

        } while (doAnotherCycle)
        return left;
      }

      var toggleArrowButtons = function() {
        $prev = $('#menu-level-3-prev');
        if ($prev.length === 0) {
          $prev = $('<div class="prev" id="menu-level-3-prev"></div>').appendTo($menu);
          $next = $('<div class="next" id="menu-level-3-next"></div>').appendTo($menu);
        }

        if (typeof steps[stepIndex-1] === 'undefined') {
          $prev.hide();
        }
        else {
          $prev.show();
        }

        if (typeof steps[stepIndex+1] === 'undefined') {
          $next.hide();
        }
        else {
          $next.show();
        }
      }

      var calculateSteps = function() {
        var currentStepWidth = 0;
        if (steps.length > 0) {
          steps = new Array();
        }
        steps.push(0);
        $menuItems.each(function(i) {
          $this = $(this);
          if (integerLeftForItem($this) + $this.outerWidth() - currentStepWidth > menuItemsParentWidthInitial) {
            currentStepWidth = integerLeftForItem($this);
            steps.push(currentStepWidth * (-1));
          }
        });
      }

      var prevStepIndex = function() {
        if (typeof steps[stepIndex-1] !== 'undefined') {
          return --stepIndex;
        }
        else {
          return false;
        }
      }

      var nextStepIndex = function() {
        if (typeof steps[stepIndex+1] !== 'undefined') {
          return ++stepIndex;
        }
        else {
          return false;
        }
      }

      var showPrev = function() {
        if (prevStepIndex() !== false) {
          $menuItemsParent.animate({
            left: steps[stepIndex]
          }, animateSpeed);
          toggleArrowButtons();
        }
      }

      var showNext = function() {
        if (nextStepIndex() !== false) {
          $menuItemsParent.animate({
            left: steps[stepIndex]
          }, animateSpeed);
          toggleArrowButtons();
        }
      }

      var showFirst = function() {
        stepIndex = 0;
        $menuItemsParent.animate({
          left: steps[stepIndex]
        }, animateSpeed);
        toggleArrowButtons();
      }

      setMenuDimensions();
      setMenuItemsParentDimensions();
      calculateSteps();
      toggleArrowButtons();

      $menuItems = $menu.find('.menu > li');

      $prev.click(function() {
        showPrev();
      });

      $next.click(function() {
        showNext();
      });

      $(window).resize(function() {
        setMenuDimensions();
        setMenuItemsParentDimensions();
        calculateSteps();
        showFirst();
      });
    });
  }
})(jQuery);
;

(function ($) {
  $module5 = $('#static-module-5');

  if ($module5.length) {
    var $tabs,
        slides = new Array(),
        $slides,
        $h3;

    var enableEvents = function() {
      $tabs = $module5.find('li.tab');
      $tabs.click(function() {
        $tabs.removeClass('active');
        $(this).addClass('active');
        var tabs_re = /tab-([0-9]*)/;
        var results = tabs_re.exec(this.className);
        showSlide(results[1]);
      });
    };

    var uiCreateSidebar = function() {
      var $mainTitle = $module5.find('h2');
      var aside = '<div class="aside"><h2>' + $mainTitle.text() + '</h2><ul class="tabs">';
      //$mainTitle.remove();
      $h3 = $module5.find('h3');
      $h3.each(function(i) {
        $this = $(this);
        aside += '<li class="tab tab-' + i  + (i===0 ? ' active' : '') + '"><a href="#" onclick="return false;">' + $this.text() + '</a></li>';
      });
      aside += '</ul></div>';
      $(aside).prependTo($module5);
    }

    var uiCreateSlides = function() {
      $h3.each(function(i) {
        $this = $(this);
        slides.push(new Array());
        var $row = $(this).next('.row');
        slides[slides.length-1].push($this);
        slides[slides.length-1].push($row);

        do {
          $row = $row.next('.row');
          if ($row.length) {
            slides[slides.length-1].push($row);
          }
        } while ($row.length);
      });

      $.each(slides, function(index, value) {
        var $slide = $('<div class="slide"></div>')
        $.each(value, function(index2, value2) {
          value2.appendTo($slide);
        });
        $slide.appendTo($module5.find('div.main-inner'));
        if (index === 0) {
          $slide.show();
        }
      });

      $slides = $module5.find('div.slide');
    }

    var ui = function() {
      uiCreateSidebar();
      uiCreateSlides();
    }

    var showSlide = function(index) {
      $slides.hide();
      $slides.eq(index).show();
    }

    ui();
    enableEvents();
  }

})(jQuery);
;
(function ($) {
  Drupal.mobileZonePortalNavigationZIndex = 11;

  var $blockSearch = $('#block-search-form');
  var $blockSearchContent = $('.content', $blockSearch);
  var $blockTitle = $('.block-title', $blockSearch);

  var titleClickEvent = function($this, e) {
    // Remove blue overlay when touching the button on Android.
    // Also much faster slide on Android.
    e.stopPropagation();
    e.preventDefault();

    if ($blockSearchContent.is(':visible')) {
      $blockSearchContent.slideUp();
      $blockTitle.removeClass('active');
    } else {
      $blockSearchContent.css('z-index', Drupal.mobileZonePortalNavigationZIndex++);
      $blockSearchContent.slideDown();
      $blockTitle.addClass('active');

      // Hide main menu if it's open.
      if ($('#collapsed-menu-button').hasClass('active')) {
        $("#mobile-menu-inner").slideUp();
        $('#collapsed-menu-button').removeClass('active');
      }

      // Hide language popup if it's open.
      if ($('#block-language-switcher-fallback-language-switcher-fallback .block-title').hasClass('active')) {
        $('#block-language-switcher-fallback-language-switcher-fallback .content').slideUp();
        $('#block-language-switcher-fallback-language-switcher-fallback .block-title').removeClass('active');
      }
    }
  }

  if ('ontouchstart' in document.documentElement) {
    $blockTitle.on('touchstart', function(e) {
      titleClickEvent($(this), e);
    });
  } else {
    $blockTitle.click(function(e) {
      titleClickEvent($(this), e);
    });
  }
})(jQuery);
;
(function ($) {
  $langBlock = $('#block-language-switcher-fallback-language-switcher-fallback');
  $langBlockTitle = $langBlock.find('.block-title');
  $langBlockContent = $langBlock.find('.content');

  $langBlockTitle.html($langBlock.find('a.active').text());

  // Make the text visible for default language.
  $langBlockTitle.css({
    'min-width': 27,
    'text-indent': 0,
    'width': 'auto'
  });

  var titleClickEvent = function($this, e) {
    // Remove blue overlay when touching the button on Android.
    // Also much faster slide on Android.
    e.stopPropagation();
    e.preventDefault();

    if ($langBlockContent.is(':visible')) {
      $langBlockContent.slideUp();
      $langBlockTitle.removeClass('active');
    } else {
      $langBlockContent.css('z-index', Drupal.mobileZonePortalNavigationZIndex++);
      $langBlockContent.slideDown();
      $langBlockTitle.addClass('active');

      // Hide search if it's open.
      if ($('#block-search-form .block-title').hasClass('active')) {
        $('#block-search-form .content').slideUp();
        $('#block-search-form .block-title').removeClass('active');
      }

      // Hide main menu if it's open.
      if ($('#collapsed-menu-button').hasClass('active')) {
        $("#mobile-menu-inner").slideUp();
        $('#collapsed-menu-button').removeClass('active');
      }
    }
  }


  if ('ontouchstart' in document.documentElement) {
    $langBlockTitle.on('touchstart', function(e) {
      titleClickEvent($(this), e);
    });
  } else {
    $langBlockTitle.click(function(e) {
      titleClickEvent($(this), e);
    });
  }




})(jQuery);
;
(function($) {
  $currentPagerItem = $('li.pager-current');
  if ($currentPagerItem.length) {
    $siblings = $currentPagerItem.siblings('.pager-item').addClass('pager-current-siblings');
    var $prev = false, $next = false;
    for (var i=0; i<$siblings.length; i++) {
      if ($prev === false) {
        $prev = $currentPagerItem.prev();
        $next = $currentPagerItem.next();
      } else {
        $prev = $prev.prev();
        $next = $next.next();
      }
      $prev.addClass('pager-current-siblings-' + i);
      $next.addClass('pager-current-siblings-' + i);

    }


    /*$currentPagerItem
      .prev().addClass('pager-current-siblings-1')
      .prev().addClass('pager-current-siblings-2')
      .prev().addClass('pager-current-siblings-3')
      .prev().addClass('pager-current-siblings-4');
    $currentPagerItem
      .next().addClass('pager-current-siblings-1')
      .next().addClass('pager-current-siblings-2')
      .next().addClass('pager-current-siblings-3')
      .next().addClass('pager-current-siblings-4');
      */
  }
})(jQuery);
;
/**
 * Change default UI Dialog and Colorbox settings.
 *
 * Also manage width between mobile, tablet and desktop screens.
 */



// UI Dialog settings.
(function($) {
  var $loadedContentIframe = false;
  var resizeTimer;
  var $zoneContent = $('#zone-content');



  /**
   * Width calculation.
   * Width is 67% of the content zone.
   */
  var calcUIDialogWidth = function(widthRatioOfContentWidth) {
    if (typeof widthRatioOfContentWidth === 'undefined') {
      widthRatioOfContentWidth = 0.67;
    }
    return $zoneContent.width() * widthRatioOfContentWidth;
  };



  var calcColorboxWidth = function(widthRatioOfContentWidth) {
    if (typeof widthRatioOfContentWidth === 'undefined') {
      widthRatioOfContentWidth = 0.67;
    }
    return calcUIDialogWidth(widthRatioOfContentWidth) - 40;
  };



  // @todo: should be included globally and set on all iframes.
  var resizeIframe = function(iframe) {
    var origWidth = iframe.attr('width');
    var origHeight = iframe.attr('height');
    var realWidth = iframe.width();
    iframe.css('height', realWidth * (origHeight/origWidth));
  };



  var resizeColorBox = function (timerLength) {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if ($('#cboxOverlay').is(':visible')) {
        $.colorbox.resize({
          innerWidth: calcColorboxWidth(0.84)
        });

        if($loadedContentIframe !== false && $loadedContentIframe.length) {
          resizeIframe($loadedContentIframe);
        }

        // Check if the image is not out of screen vertically and fix if needed.
        if ($('#colorbox').height() > $(window).height()) {
          if ($('#cboxLoadedContent').height() >= 600) {
            var difference = 600 / $('#cboxLoadedContent').height();
            var innerWidth = calcColorboxWidth(0.84) * difference;
          } else {
            var difference = $(window).height() / $('#cboxLoadedContent').height();
            var innerWidth = calcColorboxWidth(0.84) * difference;
          }
          $.colorbox.resize({
            innerWidth: innerWidth
          });
        } else if ($('#cboxLoadedContent').height() >= 600) {
          var difference = 600 / $('#cboxLoadedContent').height();
          var innerWidth = calcColorboxWidth(0.84) * difference;
          $.colorbox.resize({
            innerWidth: calcColorboxWidth(0.84) * difference
          });
        }

        $.colorbox.resize();
      }
    }, timerLength)
  };



  Drupal.behaviors.vpOverwriteDrupalColorboxSettings = {
    attach: function (context, settings) {
      settings.colorbox.initialHeight = '100px';
      settings.colorbox.initialWidth = calcColorboxWidth(0.84);
      settings.colorbox.innerWidth = calcColorboxWidth(0.84);
      settings.colorbox.reposition = false;
      settings.colorbox.speed = 0;
      settings.colorbox.transition = 'none';
    }
  };



  // Default UI Dialog settings.
  var setUIDialogDefaultSettings = function() {
    $.extend($.ui.dialog.prototype.options, {
      modal: true,
      open: function(event, ui) {
        $loadedContentIframe = $(event.target).find('iframe');
        if($loadedContentIframe !== false && $loadedContentIframe.length) {
          resizeIframe($loadedContentIframe);
        }

        // Fix centering after iframe resize.
        $dialog = $(".ui-dialog-content");
        $dialog.dialog("option", "position", "center");
      },
      position: "center",
      resizable: false,
      width: calcUIDialogWidth()
    });
  };



  // Default Colorbox settings.
  var setColorboxDefaultSettings = function() {
    $.extend($.colorbox.settings, {
      initialHeight: calcColorboxWidth(0.84) * 0.5,
      initialWidth: calcColorboxWidth(0.84) + 40,
      innerWidth: calcColorboxWidth(0.84),
      reposition: false, // We'll use reposition() method instead.
      speed: 0,
      transition: 'none'
    });
  };



  // Correcly calculate iframe content on first load.
  $(document).bind('cbox_complete', function(e) {
    $loadedContentIframe = $('#cboxLoadedContent iframe');
    resizeColorBox(0);
  });



  // Set UI Dialog settings.
  $(function() {

    if (typeof $.ui === 'undefined' || typeof $.ui.dialog === 'undefined') {
      return;
    }

    setUIDialogDefaultSettings();
    $('.ui-widget-overlay').live('click', function() {
      $(".ui-dialog-content").dialog('close');
    });

    $('.ui-dialog-titlebar-close').live('keydown', function(e) {
      if (e.keyCode === 13) {
        $(".ui-dialog-content").dialog('close');
        e.preventDefault();
      }
    });

    // On resize center and set width.
    $(window).resize(function () {
      setUIDialogDefaultSettings();
      $dialog = $(".ui-dialog-content");
      $dialog.dialog("option", "position", "center");
      if (!$dialog.hasClass('noresize')) {
        $dialog.dialog("option", "width", calcUIDialogWidth());
      }

      if($loadedContentIframe !== false && $loadedContentIframe.length) {
        resizeIframe($loadedContentIframe);
      }
    });
  });



  // Set Colorbox settings.
  $(function() {

    if (typeof $.colorbox === 'undefined') {
      return;
    }

    setColorboxDefaultSettings();

    $(window).resize(function () {
      setColorboxDefaultSettings();

      //resizeColorBox(300); // Latency makes orentation change look laggy.
      resizeColorBox(0);
    });
  });

})(jQuery);
;
(function($) {
  // @todo
  /*$news = $('#flexslider_views_slideshow_main_top_news_tabs-top_news_tabs_block');
  $newsMobile = $news.clone();
  $newsMobile.attr('id', '').css('border', '1px solid red');
  $newsMobile.find('.flexslider-views-slideshow-main-frame-row').not('.views-row-1').remove();
  $news.parent().after($newsMobile);*/
})(jQuery);
;
// @todo: currently we only fix in .node.
(function ($) {
  var isMobile = false;
  var $article = $('article');
  var isNode = $article.hasClass('node');
  var isSizeSet = false;
  var $elements = $('article.node embed, article.node iframe');
  var $body = $('body');

  var elementDynamicSize = function() {
    isMobile = $body.hasClass('responsive-layout-mobile');

    if (isMobile && isNode) {
      $elements.each(function() {
        var $this = $(this);

        if (typeof this.origWidth === 'undefined') {
          this.origHeight = $this.height();
          this.origWidth = $this.attr('width');
        }

        // Optional.
        $this.css('width', '100%');

        $this.css('height', $this.width() / this.origWidth * this.origHeight);

        isSizeSet = true;


      });
    } else if (isSizeSet) {
      $elements.each(function() {
        $(this).css({
          'height': this.origHeight,
          'width': this.origWidth
        });
      });
    }
  }

  $(window).load(function() {
    // Even after body load event the .responsive-layout-mobile class may not be attached. 100ms delay fixes this.
    setTimeout(elementDynamicSize, 100);

    $(window).resize(function() {
      elementDynamicSize();
    });
  });
})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxInline = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $.urlParam = function(name, url){
      if (name == 'fragment') {
        var results = new RegExp('(#[^&#]*)').exec(url);
      }
      else {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
      }
      if (!results) { return ''; }
      return results[1] || '';
    };
    $('.colorbox-inline', context).once('init-colorbox-inline').colorbox({
      transition:settings.colorbox.transition,
      speed:settings.colorbox.speed,
      opacity:settings.colorbox.opacity,
      slideshow:settings.colorbox.slideshow,
      slideshowAuto:settings.colorbox.slideshowAuto,
      slideshowSpeed:settings.colorbox.slideshowSpeed,
      slideshowStart:settings.colorbox.slideshowStart,
      slideshowStop:settings.colorbox.slideshowStop,
      current:settings.colorbox.current,
      previous:settings.colorbox.previous,
      reposition:settings.colorbox.reposition,
      next:settings.colorbox.next,
      close:settings.colorbox.close,
      overlayClose:settings.colorbox.overlayClose,
      maxWidth:settings.colorbox.maxWidth,
      maxHeight:settings.colorbox.maxHeight,
      innerWidth:settings.colorbox.innerWidth,
      innerHeight:settings.colorbox.innerHeight,
      title:function(){
        return decodeURIComponent($.urlParam('title', $(this).attr('href')));
      },
      iframe:function(){
        return $.urlParam('iframe', $(this).attr('href'));
      },
      inline:function(){
        return $.urlParam('inline', $(this).attr('href'));
      },
      href:function(){
        return $.urlParam('fragment', $(this).attr('href'));
      }
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    settings.colorbox = $.extend(settings.colorbox, {
      onComplete: function() {
        if (this.rel !== '') {

          var wrapper = $(this).closest('.views-row');

          var title = $.trim(wrapper.find('.views-field-field-title').text());
          var author = $.trim(wrapper.find('.views-field-field-author').text());
          var gallery_author = $.trim(wrapper.find('.views-field-field-author-1').text());
          var gallery_date = $.trim(wrapper.find('.views-field-field-date-1').text());
          var image_url = $.trim(wrapper.find('.views-field-field-picture-1 > div > a').attr("href"));
		  var img_date = $.trim(wrapper.find('.views-field-field-date').text());

          var image_height = $('#cboxLoadedContent .cboxPhoto').height();

          $('#cboxTitle').html(''+
            '<div class="description2">' + (img_date.length ? img_date : gallery_date) + ' | ' + (author.length ? author : gallery_author)+ '</div>' +
            '<div class="caption_description">' + (title.length ? title: ' ') + '</div>' +
            (image_url.length ? '<div class="download"><a href="' + image_url + '">' + Drupal.t('Download original') + '</a></div>' : '')
          );

        } else {
          $('#cboxTitle').hide();
        }
      }
    });
    $('a, area, input', context)
      .filter('.colorbox')
      .once('init-colorbox-processed')
      .colorbox(settings.colorbox);
  }
};



{
  $(document).bind('cbox_complete', function () {
    Drupal.attachBehaviors('#cboxLoadedContent');
  });
}

})(jQuery);
;
