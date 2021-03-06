(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    (function(factory) {
        "use strict";
        if ("function" === typeof define && define.amd) define([ "jquery" ], factory); else if ("undefined" !== typeof exports) module.exports = factory(require("jquery")); else factory(jQuery);
    })((function($) {
        "use strict";
        var Slick = window.Slick || {};
        Slick = function() {
            var instanceUid = 0;
            function Slick(element, settings) {
                var dataSettings, _ = this;
                _.defaults = {
                    accessibility: true,
                    adaptiveHeight: false,
                    appendArrows: $(element),
                    appendDots: $(element),
                    arrows: true,
                    asNavFor: null,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.70531 15.2947C8.31578 15.6842 7.68422 15.6842 7.29468 15.2947C6.9054 14.9054 6.90511 14.2743 7.29405 13.8847L12.17 9L0.999998 9C0.447714 9 -6.511e-07 8.55228 -6.99382e-07 8C-7.47665e-07 7.44771 0.447714 7 0.999999 7L12.17 7L7.29405 2.11531C6.90511 1.72568 6.90539 1.0946 7.29468 0.705315C7.68422 0.31578 8.31578 0.31578 8.70531 0.705315L16 8L8.70531 15.2947Z"/></svg></button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.70531 15.2947C8.31578 15.6842 7.68422 15.6842 7.29468 15.2947C6.9054 14.9054 6.90511 14.2743 7.29405 13.8847L12.17 9L0.999998 9C0.447714 9 -6.511e-07 8.55228 -6.99382e-07 8C-7.47665e-07 7.44771 0.447714 7 0.999999 7L12.17 7L7.29405 2.11531C6.90511 1.72568 6.90539 1.0946 7.29468 0.705315C7.68422 0.31578 8.31578 0.31578 8.70531 0.705315L16 8L8.70531 15.2947Z"/></svg></button>',
                    autoplay: false,
                    autoplaySpeed: 3e3,
                    centerMode: false,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(slider, i) {
                        return $('<button type="button" />').text(i + 1);
                    },
                    dots: false,
                    dotsClass: "slick-dots",
                    draggable: true,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: false,
                    focusOnSelect: false,
                    focusOnChange: false,
                    infinite: true,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: false,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    pauseOnDotsHover: false,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: false,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: true,
                    swipeToSlide: false,
                    touchMove: true,
                    touchThreshold: 5,
                    useCSS: true,
                    useTransform: true,
                    variableWidth: false,
                    vertical: false,
                    verticalSwiping: false,
                    waitForAnimate: true,
                    zIndex: 1e3
                };
                _.initials = {
                    animating: false,
                    dragging: false,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: false,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: false,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: false,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: false,
                    unslicked: false
                };
                $.extend(_, _.initials);
                _.activeBreakpoint = null;
                _.animType = null;
                _.animProp = null;
                _.breakpoints = [];
                _.breakpointSettings = [];
                _.cssTransitions = false;
                _.focussed = false;
                _.interrupted = false;
                _.hidden = "hidden";
                _.paused = true;
                _.positionProp = null;
                _.respondTo = null;
                _.rowCount = 1;
                _.shouldClick = true;
                _.$slider = $(element);
                _.$slidesCache = null;
                _.transformType = null;
                _.transitionType = null;
                _.visibilityChange = "visibilitychange";
                _.windowWidth = 0;
                _.windowTimer = null;
                dataSettings = $(element).data("slick") || {};
                _.options = $.extend({}, _.defaults, settings, dataSettings);
                _.currentSlide = _.options.initialSlide;
                _.originalSettings = _.options;
                if ("undefined" !== typeof document.mozHidden) {
                    _.hidden = "mozHidden";
                    _.visibilityChange = "mozvisibilitychange";
                } else if ("undefined" !== typeof document.webkitHidden) {
                    _.hidden = "webkitHidden";
                    _.visibilityChange = "webkitvisibilitychange";
                }
                _.autoPlay = $.proxy(_.autoPlay, _);
                _.autoPlayClear = $.proxy(_.autoPlayClear, _);
                _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
                _.changeSlide = $.proxy(_.changeSlide, _);
                _.clickHandler = $.proxy(_.clickHandler, _);
                _.selectHandler = $.proxy(_.selectHandler, _);
                _.setPosition = $.proxy(_.setPosition, _);
                _.swipeHandler = $.proxy(_.swipeHandler, _);
                _.dragHandler = $.proxy(_.dragHandler, _);
                _.keyHandler = $.proxy(_.keyHandler, _);
                _.instanceUid = instanceUid++;
                _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
                _.registerBreakpoints();
                _.init(true);
            }
            return Slick;
        }();
        Slick.prototype.activateADA = function() {
            var _ = this;
            _.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            });
        };
        Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {
            var _ = this;
            if ("boolean" === typeof index) {
                addBefore = index;
                index = null;
            } else if (index < 0 || index >= _.slideCount) return false;
            _.unload();
            if ("number" === typeof index) if (0 === index && 0 === _.$slides.length) $(markup).appendTo(_.$slideTrack); else if (addBefore) $(markup).insertBefore(_.$slides.eq(index)); else $(markup).insertAfter(_.$slides.eq(index)); else if (true === addBefore) $(markup).prependTo(_.$slideTrack); else $(markup).appendTo(_.$slideTrack);
            _.$slides = _.$slideTrack.children(this.options.slide);
            _.$slideTrack.children(this.options.slide).detach();
            _.$slideTrack.append(_.$slides);
            _.$slides.each((function(index, element) {
                $(element).attr("data-slick-index", index);
            }));
            _.$slidesCache = _.$slides;
            _.reinit();
        };
        Slick.prototype.animateHeight = function() {
            var _ = this;
            if (1 === _.options.slidesToShow && true === _.options.adaptiveHeight && false === _.options.vertical) {
                var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
                _.$list.animate({
                    height: targetHeight
                }, _.options.speed);
            }
        };
        Slick.prototype.animateSlide = function(targetLeft, callback) {
            var animProps = {}, _ = this;
            _.animateHeight();
            if (true === _.options.rtl && false === _.options.vertical) targetLeft = -targetLeft;
            if (false === _.transformsEnabled) if (false === _.options.vertical) _.$slideTrack.animate({
                left: targetLeft
            }, _.options.speed, _.options.easing, callback); else _.$slideTrack.animate({
                top: targetLeft
            }, _.options.speed, _.options.easing, callback); else if (false === _.cssTransitions) {
                if (true === _.options.rtl) _.currentLeft = -_.currentLeft;
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (false === _.options.vertical) {
                            animProps[_.animType] = "translate(" + now + "px, 0px)";
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = "translate(0px," + now + "px)";
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) callback.call();
                    }
                });
            } else {
                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);
                if (false === _.options.vertical) animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)"; else animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)";
                _.$slideTrack.css(animProps);
                if (callback) setTimeout((function() {
                    _.disableTransition();
                    callback.call();
                }), _.options.speed);
            }
        };
        Slick.prototype.getNavTarget = function() {
            var _ = this, asNavFor = _.options.asNavFor;
            if (asNavFor && null !== asNavFor) asNavFor = $(asNavFor).not(_.$slider);
            return asNavFor;
        };
        Slick.prototype.asNavFor = function(index) {
            var _ = this, asNavFor = _.getNavTarget();
            if (null !== asNavFor && "object" === typeof asNavFor) asNavFor.each((function() {
                var target = $(this).slick("getSlick");
                if (!target.unslicked) target.slideHandler(index, true);
            }));
        };
        Slick.prototype.applyTransition = function(slide) {
            var _ = this, transition = {};
            if (false === _.options.fade) transition[_.transitionType] = _.transformType + " " + _.options.speed + "ms " + _.options.cssEase; else transition[_.transitionType] = "opacity " + _.options.speed + "ms " + _.options.cssEase;
            if (false === _.options.fade) _.$slideTrack.css(transition); else _.$slides.eq(slide).css(transition);
        };
        Slick.prototype.autoPlay = function() {
            var _ = this;
            _.autoPlayClear();
            if (_.slideCount > _.options.slidesToShow) _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
        };
        Slick.prototype.autoPlayClear = function() {
            var _ = this;
            if (_.autoPlayTimer) clearInterval(_.autoPlayTimer);
        };
        Slick.prototype.autoPlayIterator = function() {
            var _ = this, slideTo = _.currentSlide + _.options.slidesToScroll;
            if (!_.paused && !_.interrupted && !_.focussed) {
                if (false === _.options.infinite) if (1 === _.direction && _.currentSlide + 1 === _.slideCount - 1) _.direction = 0; else if (0 === _.direction) {
                    slideTo = _.currentSlide - _.options.slidesToScroll;
                    if (_.currentSlide - 1 === 0) _.direction = 1;
                }
                _.slideHandler(slideTo);
            }
        };
        Slick.prototype.buildArrows = function() {
            var _ = this;
            if (true === _.options.arrows) {
                _.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow");
                _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow");
                if (_.slideCount > _.options.slidesToShow) {
                    _.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                    _.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex");
                    if (_.htmlExpr.test(_.options.prevArrow)) _.$prevArrow.prependTo(_.options.appendArrows);
                    if (_.htmlExpr.test(_.options.nextArrow)) _.$nextArrow.appendTo(_.options.appendArrows);
                    if (true !== _.options.infinite) _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                } else _.$prevArrow.add(_.$nextArrow).addClass("slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                });
            }
        };
        Slick.prototype.buildDots = function() {
            var i, dot, _ = this;
            if (true === _.options.dots && _.slideCount > _.options.slidesToShow) {
                _.$slider.addClass("slick-dotted");
                dot = $("<ul />").addClass(_.options.dotsClass);
                for (i = 0; i <= _.getDotCount(); i += 1) dot.append($("<li />").append(_.options.customPaging.call(this, _, i)));
                _.$dots = dot.appendTo(_.options.appendDots);
                _.$dots.find("li").first().addClass("slick-active");
            }
        };
        Slick.prototype.buildOut = function() {
            var _ = this;
            _.$slides = _.$slider.children(_.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
            _.slideCount = _.$slides.length;
            _.$slides.each((function(index, element) {
                $(element).attr("data-slick-index", index).data("originalStyling", $(element).attr("style") || "");
            }));
            _.$slider.addClass("slick-slider");
            _.$slideTrack = 0 === _.slideCount ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
            _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
            _.$slideTrack.css("opacity", 0);
            if (true === _.options.centerMode || true === _.options.swipeToSlide) _.options.slidesToScroll = 1;
            $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading");
            _.setupInfinite();
            _.buildArrows();
            _.buildDots();
            _.updateDots();
            _.setSlideClasses("number" === typeof _.currentSlide ? _.currentSlide : 0);
            if (true === _.options.draggable) _.$list.addClass("draggable");
        };
        Slick.prototype.buildRows = function() {
            var a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection, _ = this;
            newSlides = document.createDocumentFragment();
            originalSlides = _.$slider.children();
            if (_.options.rows > 0) {
                slidesPerSection = _.options.slidesPerRow * _.options.rows;
                numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
                for (a = 0; a < numOfSlides; a++) {
                    var slide = document.createElement("div");
                    for (b = 0; b < _.options.rows; b++) {
                        var row = document.createElement("div");
                        for (c = 0; c < _.options.slidesPerRow; c++) {
                            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                            if (originalSlides.get(target)) row.appendChild(originalSlides.get(target));
                        }
                        slide.appendChild(row);
                    }
                    newSlides.appendChild(slide);
                }
                _.$slider.empty().append(newSlides);
                _.$slider.children().children().children().css({
                    width: 100 / _.options.slidesPerRow + "%",
                    display: "inline-block"
                });
            }
        };
        Slick.prototype.checkResponsive = function(initial, forceUpdate) {
            var breakpoint, targetBreakpoint, respondToWidth, _ = this, triggerBreakpoint = false;
            var sliderWidth = _.$slider.width();
            var windowWidth = window.innerWidth || $(window).width();
            if ("window" === _.respondTo) respondToWidth = windowWidth; else if ("slider" === _.respondTo) respondToWidth = sliderWidth; else if ("min" === _.respondTo) respondToWidth = Math.min(windowWidth, sliderWidth);
            if (_.options.responsive && _.options.responsive.length && null !== _.options.responsive) {
                targetBreakpoint = null;
                for (breakpoint in _.breakpoints) if (_.breakpoints.hasOwnProperty(breakpoint)) if (false === _.originalSettings.mobileFirst) {
                    if (respondToWidth < _.breakpoints[breakpoint]) targetBreakpoint = _.breakpoints[breakpoint];
                } else if (respondToWidth > _.breakpoints[breakpoint]) targetBreakpoint = _.breakpoints[breakpoint];
                if (null !== targetBreakpoint) if (null !== _.activeBreakpoint) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint = targetBreakpoint;
                        if ("unslick" === _.breakpointSettings[targetBreakpoint]) _.unslick(targetBreakpoint); else {
                            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                            if (true === initial) _.currentSlide = _.options.initialSlide;
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if ("unslick" === _.breakpointSettings[targetBreakpoint]) _.unslick(targetBreakpoint); else {
                        _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                        if (true === initial) _.currentSlide = _.options.initialSlide;
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                } else if (null !== _.activeBreakpoint) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (true === initial) _.currentSlide = _.options.initialSlide;
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
                if (!initial && false !== triggerBreakpoint) _.$slider.trigger("breakpoint", [ _, triggerBreakpoint ]);
            }
        };
        Slick.prototype.changeSlide = function(event, dontAnimate) {
            var indexOffset, slideOffset, unevenOffset, _ = this, $target = $(event.currentTarget);
            if ($target.is("a")) event.preventDefault();
            if (!$target.is("li")) $target = $target.closest("li");
            unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
            indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
            switch (event.data.message) {
              case "previous":
                slideOffset = 0 === indexOffset ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                break;

              case "next":
                slideOffset = 0 === indexOffset ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                break;

              case "index":
                var index = 0 === event.data.index ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger("focus");
                break;

              default:
                return;
            }
        };
        Slick.prototype.checkNavigable = function(index) {
            var navigables, prevNavigable, _ = this;
            navigables = _.getNavigableIndexes();
            prevNavigable = 0;
            if (index > navigables[navigables.length - 1]) index = navigables[navigables.length - 1]; else for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
            return index;
        };
        Slick.prototype.cleanUpEvents = function() {
            var _ = this;
            if (_.options.dots && null !== _.$dots) {
                $("li", _.$dots).off("click.slick", _.changeSlide).off("mouseenter.slick", $.proxy(_.interrupt, _, true)).off("mouseleave.slick", $.proxy(_.interrupt, _, false));
                if (true === _.options.accessibility) _.$dots.off("keydown.slick", _.keyHandler);
            }
            _.$slider.off("focus.slick blur.slick");
            if (true === _.options.arrows && _.slideCount > _.options.slidesToShow) {
                _.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide);
                _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide);
                if (true === _.options.accessibility) {
                    _.$prevArrow && _.$prevArrow.off("keydown.slick", _.keyHandler);
                    _.$nextArrow && _.$nextArrow.off("keydown.slick", _.keyHandler);
                }
            }
            _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler);
            _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler);
            _.$list.off("touchend.slick mouseup.slick", _.swipeHandler);
            _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler);
            _.$list.off("click.slick", _.clickHandler);
            $(document).off(_.visibilityChange, _.visibility);
            _.cleanUpSlideEvents();
            if (true === _.options.accessibility) _.$list.off("keydown.slick", _.keyHandler);
            if (true === _.options.focusOnSelect) $(_.$slideTrack).children().off("click.slick", _.selectHandler);
            $(window).off("orientationchange.slick.slick-" + _.instanceUid, _.orientationChange);
            $(window).off("resize.slick.slick-" + _.instanceUid, _.resize);
            $("[draggable!=true]", _.$slideTrack).off("dragstart", _.preventDefault);
            $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition);
        };
        Slick.prototype.cleanUpSlideEvents = function() {
            var _ = this;
            _.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, true));
            _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, false));
        };
        Slick.prototype.cleanUpRows = function() {
            var originalSlides, _ = this;
            if (_.options.rows > 0) {
                originalSlides = _.$slides.children().children();
                originalSlides.removeAttr("style");
                _.$slider.empty().append(originalSlides);
            }
        };
        Slick.prototype.clickHandler = function(event) {
            var _ = this;
            if (false === _.shouldClick) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
            }
        };
        Slick.prototype.destroy = function(refresh) {
            var _ = this;
            _.autoPlayClear();
            _.touchObject = {};
            _.cleanUpEvents();
            $(".slick-cloned", _.$slider).detach();
            if (_.$dots) _.$dots.remove();
            if (_.$prevArrow && _.$prevArrow.length) {
                _.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
                if (_.htmlExpr.test(_.options.prevArrow)) _.$prevArrow.remove();
            }
            if (_.$nextArrow && _.$nextArrow.length) {
                _.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", "");
                if (_.htmlExpr.test(_.options.nextArrow)) _.$nextArrow.remove();
            }
            if (_.$slides) {
                _.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each((function() {
                    $(this).attr("style", $(this).data("originalStyling"));
                }));
                _.$slideTrack.children(this.options.slide).detach();
                _.$slideTrack.detach();
                _.$list.detach();
                _.$slider.append(_.$slides);
            }
            _.cleanUpRows();
            _.$slider.removeClass("slick-slider");
            _.$slider.removeClass("slick-initialized");
            _.$slider.removeClass("slick-dotted");
            _.unslicked = true;
            if (!refresh) _.$slider.trigger("destroy", [ _ ]);
        };
        Slick.prototype.disableTransition = function(slide) {
            var _ = this, transition = {};
            transition[_.transitionType] = "";
            if (false === _.options.fade) _.$slideTrack.css(transition); else _.$slides.eq(slide).css(transition);
        };
        Slick.prototype.fadeSlide = function(slideIndex, callback) {
            var _ = this;
            if (false === _.cssTransitions) {
                _.$slides.eq(slideIndex).css({
                    zIndex: _.options.zIndex
                });
                _.$slides.eq(slideIndex).animate({
                    opacity: 1
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.applyTransition(slideIndex);
                _.$slides.eq(slideIndex).css({
                    opacity: 1,
                    zIndex: _.options.zIndex
                });
                if (callback) setTimeout((function() {
                    _.disableTransition(slideIndex);
                    callback.call();
                }), _.options.speed);
            }
        };
        Slick.prototype.fadeSlideOut = function(slideIndex) {
            var _ = this;
            if (false === _.cssTransitions) _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing); else {
                _.applyTransition(slideIndex);
                _.$slides.eq(slideIndex).css({
                    opacity: 0,
                    zIndex: _.options.zIndex - 2
                });
            }
        };
        Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {
            var _ = this;
            if (null !== filter) {
                _.$slidesCache = _.$slides;
                _.unload();
                _.$slideTrack.children(this.options.slide).detach();
                _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
                _.reinit();
            }
        };
        Slick.prototype.focusHandler = function() {
            var _ = this;
            _.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", (function(event) {
                event.stopImmediatePropagation();
                var $sf = $(this);
                setTimeout((function() {
                    if (_.options.pauseOnFocus) {
                        _.focussed = $sf.is(":focus");
                        _.autoPlay();
                    }
                }), 0);
            }));
        };
        Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {
            var _ = this;
            return _.currentSlide;
        };
        Slick.prototype.getDotCount = function() {
            var _ = this;
            var breakPoint = 0;
            var counter = 0;
            var pagerQty = 0;
            if (true === _.options.infinite) if (_.slideCount <= _.options.slidesToShow) ++pagerQty; else while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            } else if (true === _.options.centerMode) pagerQty = _.slideCount; else if (!_.options.asNavFor) pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll); else while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
            return pagerQty - 1;
        };
        Slick.prototype.getLeft = function(slideIndex) {
            var targetLeft, verticalHeight, targetSlide, coef, _ = this, verticalOffset = 0;
            _.slideOffset = 0;
            verticalHeight = _.$slides.first().outerHeight(true);
            if (true === _.options.infinite) {
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
                    coef = -1;
                    if (true === _.options.vertical && true === _.options.centerMode) if (2 === _.options.slidesToShow) coef = -1.5; else if (1 === _.options.slidesToShow) coef = -2;
                    verticalOffset = verticalHeight * _.options.slidesToShow * coef;
                }
                if (_.slideCount % _.options.slidesToScroll !== 0) if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) if (slideIndex > _.slideCount) {
                    _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
                    verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
                } else {
                    _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
                    verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
                }
            } else if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
                verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
            }
            if (_.slideCount <= _.options.slidesToShow) {
                _.slideOffset = 0;
                verticalOffset = 0;
            }
            if (true === _.options.centerMode && _.slideCount <= _.options.slidesToShow) _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2; else if (true === _.options.centerMode && true === _.options.infinite) _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth; else if (true === _.options.centerMode) {
                _.slideOffset = 0;
                _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
            }
            if (false === _.options.vertical) targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset; else targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
            if (true === _.options.variableWidth) {
                if (_.slideCount <= _.options.slidesToShow || false === _.options.infinite) targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex); else targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow);
                if (true === _.options.rtl) if (targetSlide[0]) targetLeft = -1 * (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()); else targetLeft = 0; else targetLeft = targetSlide[0] ? -1 * targetSlide[0].offsetLeft : 0;
                if (true === _.options.centerMode) {
                    if (_.slideCount <= _.options.slidesToShow || false === _.options.infinite) targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex); else targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow + 1);
                    if (true === _.options.rtl) if (targetSlide[0]) targetLeft = -1 * (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()); else targetLeft = 0; else targetLeft = targetSlide[0] ? -1 * targetSlide[0].offsetLeft : 0;
                    targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
                }
            }
            return targetLeft;
        };
        Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {
            var _ = this;
            return _.options[option];
        };
        Slick.prototype.getNavigableIndexes = function() {
            var max, _ = this, breakPoint = 0, counter = 0, indexes = [];
            if (false === _.options.infinite) max = _.slideCount; else {
                breakPoint = -1 * _.options.slidesToScroll;
                counter = -1 * _.options.slidesToScroll;
                max = 2 * _.slideCount;
            }
            while (breakPoint < max) {
                indexes.push(breakPoint);
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
            return indexes;
        };
        Slick.prototype.getSlick = function() {
            return this;
        };
        Slick.prototype.getSlideCount = function() {
            var slidesTraversed, swipedSlide, centerOffset, _ = this;
            centerOffset = true === _.options.centerMode ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;
            if (true === _.options.swipeToSlide) {
                _.$slideTrack.find(".slick-slide").each((function(index, slide) {
                    if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > -1 * _.swipeLeft) {
                        swipedSlide = slide;
                        return false;
                    }
                }));
                slidesTraversed = Math.abs($(swipedSlide).attr("data-slick-index") - _.currentSlide) || 1;
                return slidesTraversed;
            } else return _.options.slidesToScroll;
        };
        Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {
            var _ = this;
            _.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(slide)
                }
            }, dontAnimate);
        };
        Slick.prototype.init = function(creation) {
            var _ = this;
            if (!$(_.$slider).hasClass("slick-initialized")) {
                $(_.$slider).addClass("slick-initialized");
                _.buildRows();
                _.buildOut();
                _.setProps();
                _.startLoad();
                _.loadSlider();
                _.initializeEvents();
                _.updateArrows();
                _.updateDots();
                _.checkResponsive(true);
                _.focusHandler();
            }
            if (creation) _.$slider.trigger("init", [ _ ]);
            if (true === _.options.accessibility) _.initADA();
            if (_.options.autoplay) {
                _.paused = false;
                _.autoPlay();
            }
        };
        Slick.prototype.initADA = function() {
            var _ = this, numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow), tabControlIndexes = _.getNavigableIndexes().filter((function(val) {
                return val >= 0 && val < _.slideCount;
            }));
            _.$slides.add(_.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            });
            if (null !== _.$dots) {
                _.$slides.not(_.$slideTrack.find(".slick-cloned")).each((function(i) {
                    var slideControlIndex = tabControlIndexes.indexOf(i);
                    $(this).attr({
                        role: "tabpanel",
                        id: "slick-slide" + _.instanceUid + i,
                        tabindex: -1
                    });
                    if (-1 !== slideControlIndex) {
                        var ariaButtonControl = "slick-slide-control" + _.instanceUid + slideControlIndex;
                        if ($("#" + ariaButtonControl).length) $(this).attr({
                            "aria-describedby": ariaButtonControl
                        });
                    }
                }));
                _.$dots.attr("role", "tablist").find("li").each((function(i) {
                    var mappedSlideIndex = tabControlIndexes[i];
                    $(this).attr({
                        role: "presentation"
                    });
                    $(this).find("button").first().attr({
                        role: "tab",
                        id: "slick-slide-control" + _.instanceUid + i,
                        "aria-controls": "slick-slide" + _.instanceUid + mappedSlideIndex,
                        "aria-label": i + 1 + " of " + numDotGroups,
                        "aria-selected": null,
                        tabindex: "-1"
                    });
                })).eq(_.currentSlide).find("button").attr({
                    "aria-selected": "true",
                    tabindex: "0"
                }).end();
            }
            for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) if (_.options.focusOnChange) _.$slides.eq(i).attr({
                tabindex: "0"
            }); else _.$slides.eq(i).removeAttr("tabindex");
            _.activateADA();
        };
        Slick.prototype.initArrowEvents = function() {
            var _ = this;
            if (true === _.options.arrows && _.slideCount > _.options.slidesToShow) {
                _.$prevArrow.off("click.slick").on("click.slick", {
                    message: "previous"
                }, _.changeSlide);
                _.$nextArrow.off("click.slick").on("click.slick", {
                    message: "next"
                }, _.changeSlide);
                if (true === _.options.accessibility) {
                    _.$prevArrow.on("keydown.slick", _.keyHandler);
                    _.$nextArrow.on("keydown.slick", _.keyHandler);
                }
            }
        };
        Slick.prototype.initDotEvents = function() {
            var _ = this;
            if (true === _.options.dots && _.slideCount > _.options.slidesToShow) {
                $("li", _.$dots).on("click.slick", {
                    message: "index"
                }, _.changeSlide);
                if (true === _.options.accessibility) _.$dots.on("keydown.slick", _.keyHandler);
            }
            if (true === _.options.dots && true === _.options.pauseOnDotsHover && _.slideCount > _.options.slidesToShow) $("li", _.$dots).on("mouseenter.slick", $.proxy(_.interrupt, _, true)).on("mouseleave.slick", $.proxy(_.interrupt, _, false));
        };
        Slick.prototype.initSlideEvents = function() {
            var _ = this;
            if (_.options.pauseOnHover) {
                _.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, true));
                _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, false));
            }
        };
        Slick.prototype.initializeEvents = function() {
            var _ = this;
            _.initArrowEvents();
            _.initDotEvents();
            _.initSlideEvents();
            _.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, _.swipeHandler);
            _.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, _.swipeHandler);
            _.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, _.swipeHandler);
            _.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, _.swipeHandler);
            _.$list.on("click.slick", _.clickHandler);
            $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
            if (true === _.options.accessibility) _.$list.on("keydown.slick", _.keyHandler);
            if (true === _.options.focusOnSelect) $(_.$slideTrack).children().on("click.slick", _.selectHandler);
            $(window).on("orientationchange.slick.slick-" + _.instanceUid, $.proxy(_.orientationChange, _));
            $(window).on("resize.slick.slick-" + _.instanceUid, $.proxy(_.resize, _));
            $("[draggable!=true]", _.$slideTrack).on("dragstart", _.preventDefault);
            $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition);
            $(_.setPosition);
        };
        Slick.prototype.initUI = function() {
            var _ = this;
            if (true === _.options.arrows && _.slideCount > _.options.slidesToShow) {
                _.$prevArrow.show();
                _.$nextArrow.show();
            }
            if (true === _.options.dots && _.slideCount > _.options.slidesToShow) _.$dots.show();
        };
        Slick.prototype.keyHandler = function(event) {
            var _ = this;
            if (!event.target.tagName.match("TEXTAREA|INPUT|SELECT")) if (37 === event.keyCode && true === _.options.accessibility) _.changeSlide({
                data: {
                    message: true === _.options.rtl ? "next" : "previous"
                }
            }); else if (39 === event.keyCode && true === _.options.accessibility) _.changeSlide({
                data: {
                    message: true === _.options.rtl ? "previous" : "next"
                }
            });
        };
        Slick.prototype.lazyLoad = function() {
            var loadRange, cloneRange, rangeStart, rangeEnd, _ = this;
            function loadImages(imagesScope) {
                $("img[data-lazy]", imagesScope).each((function() {
                    var image = $(this), imageSource = $(this).attr("data-lazy"), imageSrcSet = $(this).attr("data-srcset"), imageSizes = $(this).attr("data-sizes") || _.$slider.attr("data-sizes"), imageToLoad = document.createElement("img");
                    imageToLoad.onload = function() {
                        image.animate({
                            opacity: 0
                        }, 100, (function() {
                            if (imageSrcSet) {
                                image.attr("srcset", imageSrcSet);
                                if (imageSizes) image.attr("sizes", imageSizes);
                            }
                            image.attr("src", imageSource).animate({
                                opacity: 1
                            }, 200, (function() {
                                image.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                            }));
                            _.$slider.trigger("lazyLoaded", [ _, image, imageSource ]);
                        }));
                    };
                    imageToLoad.onerror = function() {
                        image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                        _.$slider.trigger("lazyLoadError", [ _, image, imageSource ]);
                    };
                    imageToLoad.src = imageSource;
                }));
            }
            if (true === _.options.centerMode) if (true === _.options.infinite) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            } else {
                rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
                rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
                if (true === _.options.fade) {
                    if (rangeStart > 0) rangeStart--;
                    if (rangeEnd <= _.slideCount) rangeEnd++;
                }
            }
            loadRange = _.$slider.find(".slick-slide").slice(rangeStart, rangeEnd);
            if ("anticipated" === _.options.lazyLoad) {
                var prevSlide = rangeStart - 1, nextSlide = rangeEnd, $slides = _.$slider.find(".slick-slide");
                for (var i = 0; i < _.options.slidesToScroll; i++) {
                    if (prevSlide < 0) prevSlide = _.slideCount - 1;
                    loadRange = loadRange.add($slides.eq(prevSlide));
                    loadRange = loadRange.add($slides.eq(nextSlide));
                    prevSlide--;
                    nextSlide++;
                }
            }
            loadImages(loadRange);
            if (_.slideCount <= _.options.slidesToShow) {
                cloneRange = _.$slider.find(".slick-slide");
                loadImages(cloneRange);
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
                cloneRange = _.$slider.find(".slick-cloned").slice(0, _.options.slidesToShow);
                loadImages(cloneRange);
            } else if (0 === _.currentSlide) {
                cloneRange = _.$slider.find(".slick-cloned").slice(-1 * _.options.slidesToShow);
                loadImages(cloneRange);
            }
        };
        Slick.prototype.loadSlider = function() {
            var _ = this;
            _.setPosition();
            _.$slideTrack.css({
                opacity: 1
            });
            _.$slider.removeClass("slick-loading");
            _.initUI();
            if ("progressive" === _.options.lazyLoad) _.progressiveLazyLoad();
        };
        Slick.prototype.next = Slick.prototype.slickNext = function() {
            var _ = this;
            _.changeSlide({
                data: {
                    message: "next"
                }
            });
        };
        Slick.prototype.orientationChange = function() {
            var _ = this;
            _.checkResponsive();
            _.setPosition();
        };
        Slick.prototype.pause = Slick.prototype.slickPause = function() {
            var _ = this;
            _.autoPlayClear();
            _.paused = true;
        };
        Slick.prototype.play = Slick.prototype.slickPlay = function() {
            var _ = this;
            _.autoPlay();
            _.options.autoplay = true;
            _.paused = false;
            _.focussed = false;
            _.interrupted = false;
        };
        Slick.prototype.postSlide = function(index) {
            var _ = this;
            if (!_.unslicked) {
                _.$slider.trigger("afterChange", [ _, index ]);
                _.animating = false;
                if (_.slideCount > _.options.slidesToShow) _.setPosition();
                _.swipeLeft = null;
                if (_.options.autoplay) _.autoPlay();
                if (true === _.options.accessibility) {
                    _.initADA();
                    if (_.options.focusOnChange) {
                        var $currentSlide = $(_.$slides.get(_.currentSlide));
                        $currentSlide.attr("tabindex", 0).focus();
                    }
                }
            }
        };
        Slick.prototype.prev = Slick.prototype.slickPrev = function() {
            var _ = this;
            _.changeSlide({
                data: {
                    message: "previous"
                }
            });
        };
        Slick.prototype.preventDefault = function(event) {
            event.preventDefault();
        };
        Slick.prototype.progressiveLazyLoad = function(tryCount) {
            tryCount = tryCount || 1;
            var image, imageSource, imageSrcSet, imageSizes, imageToLoad, _ = this, $imgsToLoad = $("img[data-lazy]", _.$slider);
            if ($imgsToLoad.length) {
                image = $imgsToLoad.first();
                imageSource = image.attr("data-lazy");
                imageSrcSet = image.attr("data-srcset");
                imageSizes = image.attr("data-sizes") || _.$slider.attr("data-sizes");
                imageToLoad = document.createElement("img");
                imageToLoad.onload = function() {
                    if (imageSrcSet) {
                        image.attr("srcset", imageSrcSet);
                        if (imageSizes) image.attr("sizes", imageSizes);
                    }
                    image.attr("src", imageSource).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                    if (true === _.options.adaptiveHeight) _.setPosition();
                    _.$slider.trigger("lazyLoaded", [ _, image, imageSource ]);
                    _.progressiveLazyLoad();
                };
                imageToLoad.onerror = function() {
                    if (tryCount < 3) setTimeout((function() {
                        _.progressiveLazyLoad(tryCount + 1);
                    }), 500); else {
                        image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
                        _.$slider.trigger("lazyLoadError", [ _, image, imageSource ]);
                        _.progressiveLazyLoad();
                    }
                };
                imageToLoad.src = imageSource;
            } else _.$slider.trigger("allImagesLoaded", [ _ ]);
        };
        Slick.prototype.refresh = function(initializing) {
            var currentSlide, lastVisibleIndex, _ = this;
            lastVisibleIndex = _.slideCount - _.options.slidesToShow;
            if (!_.options.infinite && _.currentSlide > lastVisibleIndex) _.currentSlide = lastVisibleIndex;
            if (_.slideCount <= _.options.slidesToShow) _.currentSlide = 0;
            currentSlide = _.currentSlide;
            _.destroy(true);
            $.extend(_, _.initials, {
                currentSlide
            });
            _.init();
            if (!initializing) _.changeSlide({
                data: {
                    message: "index",
                    index: currentSlide
                }
            }, false);
        };
        Slick.prototype.registerBreakpoints = function() {
            var breakpoint, currentBreakpoint, l, _ = this, responsiveSettings = _.options.responsive || null;
            if ("array" === $.type(responsiveSettings) && responsiveSettings.length) {
                _.respondTo = _.options.respondTo || "window";
                for (breakpoint in responsiveSettings) {
                    l = _.breakpoints.length - 1;
                    if (responsiveSettings.hasOwnProperty(breakpoint)) {
                        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
                        while (l >= 0) {
                            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) _.breakpoints.splice(l, 1);
                            l--;
                        }
                        _.breakpoints.push(currentBreakpoint);
                        _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                    }
                }
                _.breakpoints.sort((function(a, b) {
                    return _.options.mobileFirst ? a - b : b - a;
                }));
            }
        };
        Slick.prototype.reinit = function() {
            var _ = this;
            _.$slides = _.$slideTrack.children(_.options.slide).addClass("slick-slide");
            _.slideCount = _.$slides.length;
            if (_.currentSlide >= _.slideCount && 0 !== _.currentSlide) _.currentSlide = _.currentSlide - _.options.slidesToScroll;
            if (_.slideCount <= _.options.slidesToShow) _.currentSlide = 0;
            _.registerBreakpoints();
            _.setProps();
            _.setupInfinite();
            _.buildArrows();
            _.updateArrows();
            _.initArrowEvents();
            _.buildDots();
            _.updateDots();
            _.initDotEvents();
            _.cleanUpSlideEvents();
            _.initSlideEvents();
            _.checkResponsive(false, true);
            if (true === _.options.focusOnSelect) $(_.$slideTrack).children().on("click.slick", _.selectHandler);
            _.setSlideClasses("number" === typeof _.currentSlide ? _.currentSlide : 0);
            _.setPosition();
            _.focusHandler();
            _.paused = !_.options.autoplay;
            _.autoPlay();
            _.$slider.trigger("reInit", [ _ ]);
        };
        Slick.prototype.resize = function() {
            var _ = this;
            if ($(window).width() !== _.windowWidth) {
                clearTimeout(_.windowDelay);
                _.windowDelay = window.setTimeout((function() {
                    _.windowWidth = $(window).width();
                    _.checkResponsive();
                    if (!_.unslicked) _.setPosition();
                }), 50);
            }
        };
        Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {
            var _ = this;
            if ("boolean" === typeof index) {
                removeBefore = index;
                index = true === removeBefore ? 0 : _.slideCount - 1;
            } else index = true === removeBefore ? --index : index;
            if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) return false;
            _.unload();
            if (true === removeAll) _.$slideTrack.children().remove(); else _.$slideTrack.children(this.options.slide).eq(index).remove();
            _.$slides = _.$slideTrack.children(this.options.slide);
            _.$slideTrack.children(this.options.slide).detach();
            _.$slideTrack.append(_.$slides);
            _.$slidesCache = _.$slides;
            _.reinit();
        };
        Slick.prototype.setCSS = function(position) {
            var x, y, _ = this, positionProps = {};
            if (true === _.options.rtl) position = -position;
            x = "left" == _.positionProp ? Math.ceil(position) + "px" : "0px";
            y = "top" == _.positionProp ? Math.ceil(position) + "px" : "0px";
            positionProps[_.positionProp] = position;
            if (false === _.transformsEnabled) _.$slideTrack.css(positionProps); else {
                positionProps = {};
                if (false === _.cssTransitions) {
                    positionProps[_.animType] = "translate(" + x + ", " + y + ")";
                    _.$slideTrack.css(positionProps);
                } else {
                    positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)";
                    _.$slideTrack.css(positionProps);
                }
            }
        };
        Slick.prototype.setDimensions = function() {
            var _ = this;
            if (false === _.options.vertical) {
                if (true === _.options.centerMode) _.$list.css({
                    padding: "0px " + _.options.centerPadding
                });
            } else {
                _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
                if (true === _.options.centerMode) _.$list.css({
                    padding: _.options.centerPadding + " 0px"
                });
            }
            _.listWidth = _.$list.width();
            _.listHeight = _.$list.height();
            if (false === _.options.vertical && false === _.options.variableWidth) {
                _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
                _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children(".slick-slide").length));
            } else if (true === _.options.variableWidth) _.$slideTrack.width(5e3 * _.slideCount); else {
                _.slideWidth = Math.ceil(_.listWidth);
                _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children(".slick-slide").length));
            }
            var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
            if (false === _.options.variableWidth) _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset);
        };
        Slick.prototype.setFade = function() {
            var targetLeft, _ = this;
            _.$slides.each((function(index, element) {
                targetLeft = _.slideWidth * index * -1;
                if (true === _.options.rtl) $(element).css({
                    position: "relative",
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                }); else $(element).css({
                    position: "relative",
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }));
            _.$slides.eq(_.currentSlide).css({
                zIndex: _.options.zIndex - 1,
                opacity: 1
            });
        };
        Slick.prototype.setHeight = function() {
            var _ = this;
            if (1 === _.options.slidesToShow && true === _.options.adaptiveHeight && false === _.options.vertical) {
                var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
                _.$list.css("height", targetHeight);
            }
        };
        Slick.prototype.setOption = Slick.prototype.slickSetOption = function() {
            var l, item, option, value, type, _ = this, refresh = false;
            if ("object" === $.type(arguments[0])) {
                option = arguments[0];
                refresh = arguments[1];
                type = "multiple";
            } else if ("string" === $.type(arguments[0])) {
                option = arguments[0];
                value = arguments[1];
                refresh = arguments[2];
                if ("responsive" === arguments[0] && "array" === $.type(arguments[1])) type = "responsive"; else if ("undefined" !== typeof arguments[1]) type = "single";
            }
            if ("single" === type) _.options[option] = value; else if ("multiple" === type) $.each(option, (function(opt, val) {
                _.options[opt] = val;
            })); else if ("responsive" === type) for (item in value) if ("array" !== $.type(_.options.responsive)) _.options.responsive = [ value[item] ]; else {
                l = _.options.responsive.length - 1;
                while (l >= 0) {
                    if (_.options.responsive[l].breakpoint === value[item].breakpoint) _.options.responsive.splice(l, 1);
                    l--;
                }
                _.options.responsive.push(value[item]);
            }
            if (refresh) {
                _.unload();
                _.reinit();
            }
        };
        Slick.prototype.setPosition = function() {
            var _ = this;
            _.setDimensions();
            _.setHeight();
            if (false === _.options.fade) _.setCSS(_.getLeft(_.currentSlide)); else _.setFade();
            _.$slider.trigger("setPosition", [ _ ]);
        };
        Slick.prototype.setProps = function() {
            var _ = this, bodyStyle = document.body.style;
            _.positionProp = true === _.options.vertical ? "top" : "left";
            if ("top" === _.positionProp) _.$slider.addClass("slick-vertical"); else _.$slider.removeClass("slick-vertical");
            if (void 0 !== bodyStyle.WebkitTransition || void 0 !== bodyStyle.MozTransition || void 0 !== bodyStyle.msTransition) if (true === _.options.useCSS) _.cssTransitions = true;
            if (_.options.fade) if ("number" === typeof _.options.zIndex) {
                if (_.options.zIndex < 3) _.options.zIndex = 3;
            } else _.options.zIndex = _.defaults.zIndex;
            if (void 0 !== bodyStyle.OTransform) {
                _.animType = "OTransform";
                _.transformType = "-o-transform";
                _.transitionType = "OTransition";
                if (void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.webkitPerspective) _.animType = false;
            }
            if (void 0 !== bodyStyle.MozTransform) {
                _.animType = "MozTransform";
                _.transformType = "-moz-transform";
                _.transitionType = "MozTransition";
                if (void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.MozPerspective) _.animType = false;
            }
            if (void 0 !== bodyStyle.webkitTransform) {
                _.animType = "webkitTransform";
                _.transformType = "-webkit-transform";
                _.transitionType = "webkitTransition";
                if (void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.webkitPerspective) _.animType = false;
            }
            if (void 0 !== bodyStyle.msTransform) {
                _.animType = "msTransform";
                _.transformType = "-ms-transform";
                _.transitionType = "msTransition";
                if (void 0 === bodyStyle.msTransform) _.animType = false;
            }
            if (void 0 !== bodyStyle.transform && false !== _.animType) {
                _.animType = "transform";
                _.transformType = "transform";
                _.transitionType = "transition";
            }
            _.transformsEnabled = _.options.useTransform && null !== _.animType && false !== _.animType;
        };
        Slick.prototype.setSlideClasses = function(index) {
            var centerOffset, allSlides, indexOffset, remainder, _ = this;
            allSlides = _.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
            _.$slides.eq(index).addClass("slick-current");
            if (true === _.options.centerMode) {
                var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
                centerOffset = Math.floor(_.options.slidesToShow / 2);
                if (true === _.options.infinite) {
                    if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass("slick-active").attr("aria-hidden", "false"); else {
                        indexOffset = _.options.slidesToShow + index;
                        allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass("slick-active").attr("aria-hidden", "false");
                    }
                    if (0 === index) allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass("slick-center"); else if (index === _.slideCount - 1) allSlides.eq(_.options.slidesToShow).addClass("slick-center");
                }
                _.$slides.eq(index).addClass("slick-center");
            } else if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) _.$slides.slice(index, index + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"); else if (allSlides.length <= _.options.slidesToShow) allSlides.addClass("slick-active").attr("aria-hidden", "false"); else {
                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = true === _.options.infinite ? _.options.slidesToShow + index : index;
                if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass("slick-active").attr("aria-hidden", "false"); else allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false");
            }
            if ("ondemand" === _.options.lazyLoad || "anticipated" === _.options.lazyLoad) _.lazyLoad();
        };
        Slick.prototype.setupInfinite = function() {
            var i, slideIndex, infiniteCount, _ = this;
            if (true === _.options.fade) _.options.centerMode = false;
            if (true === _.options.infinite && false === _.options.fade) {
                slideIndex = null;
                if (_.slideCount > _.options.slidesToShow) {
                    if (true === _.options.centerMode) infiniteCount = _.options.slidesToShow + 1; else infiniteCount = _.options.slidesToShow;
                    for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
                        slideIndex = i - 1;
                        $(_.$slides[slideIndex]).clone(true).attr("id", "").attr("data-slick-index", slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass("slick-cloned");
                    }
                    for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                        slideIndex = i;
                        $(_.$slides[slideIndex]).clone(true).attr("id", "").attr("data-slick-index", slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass("slick-cloned");
                    }
                    _.$slideTrack.find(".slick-cloned").find("[id]").each((function() {
                        $(this).attr("id", "");
                    }));
                }
            }
        };
        Slick.prototype.interrupt = function(toggle) {
            var _ = this;
            if (!toggle) _.autoPlay();
            _.interrupted = toggle;
        };
        Slick.prototype.selectHandler = function(event) {
            var _ = this;
            var targetElement = $(event.target).is(".slick-slide") ? $(event.target) : $(event.target).parents(".slick-slide");
            var index = parseInt(targetElement.attr("data-slick-index"));
            if (!index) index = 0;
            if (_.slideCount <= _.options.slidesToShow) {
                _.slideHandler(index, false, true);
                return;
            }
            _.slideHandler(index);
        };
        Slick.prototype.slideHandler = function(index, sync, dontAnimate) {
            var targetSlide, animSlide, oldSlide, slideLeft, navTarget, targetLeft = null, _ = this;
            sync = sync || false;
            if (true === _.animating && true === _.options.waitForAnimate) return;
            if (true === _.options.fade && _.currentSlide === index) return;
            if (false === sync) _.asNavFor(index);
            targetSlide = index;
            targetLeft = _.getLeft(targetSlide);
            slideLeft = _.getLeft(_.currentSlide);
            _.currentLeft = null === _.swipeLeft ? slideLeft : _.swipeLeft;
            if (false === _.options.infinite && false === _.options.centerMode && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
                if (false === _.options.fade) {
                    targetSlide = _.currentSlide;
                    if (true !== dontAnimate && _.slideCount > _.options.slidesToShow) _.animateSlide(slideLeft, (function() {
                        _.postSlide(targetSlide);
                    })); else _.postSlide(targetSlide);
                }
                return;
            } else if (false === _.options.infinite && true === _.options.centerMode && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
                if (false === _.options.fade) {
                    targetSlide = _.currentSlide;
                    if (true !== dontAnimate && _.slideCount > _.options.slidesToShow) _.animateSlide(slideLeft, (function() {
                        _.postSlide(targetSlide);
                    })); else _.postSlide(targetSlide);
                }
                return;
            }
            if (_.options.autoplay) clearInterval(_.autoPlayTimer);
            if (targetSlide < 0) if (_.slideCount % _.options.slidesToScroll !== 0) animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll; else animSlide = _.slideCount + targetSlide; else if (targetSlide >= _.slideCount) if (_.slideCount % _.options.slidesToScroll !== 0) animSlide = 0; else animSlide = targetSlide - _.slideCount; else animSlide = targetSlide;
            _.animating = true;
            _.$slider.trigger("beforeChange", [ _, _.currentSlide, animSlide ]);
            oldSlide = _.currentSlide;
            _.currentSlide = animSlide;
            _.setSlideClasses(_.currentSlide);
            if (_.options.asNavFor) {
                navTarget = _.getNavTarget();
                navTarget = navTarget.slick("getSlick");
                if (navTarget.slideCount <= navTarget.options.slidesToShow) navTarget.setSlideClasses(_.currentSlide);
            }
            _.updateDots();
            _.updateArrows();
            if (true === _.options.fade) {
                if (true !== dontAnimate) {
                    _.fadeSlideOut(oldSlide);
                    _.fadeSlide(animSlide, (function() {
                        _.postSlide(animSlide);
                    }));
                } else _.postSlide(animSlide);
                _.animateHeight();
                return;
            }
            if (true !== dontAnimate && _.slideCount > _.options.slidesToShow) _.animateSlide(targetLeft, (function() {
                _.postSlide(animSlide);
            })); else _.postSlide(animSlide);
        };
        Slick.prototype.startLoad = function() {
            var _ = this;
            if (true === _.options.arrows && _.slideCount > _.options.slidesToShow) {
                _.$prevArrow.hide();
                _.$nextArrow.hide();
            }
            if (true === _.options.dots && _.slideCount > _.options.slidesToShow) _.$dots.hide();
            _.$slider.addClass("slick-loading");
        };
        Slick.prototype.swipeDirection = function() {
            var xDist, yDist, r, swipeAngle, _ = this;
            xDist = _.touchObject.startX - _.touchObject.curX;
            yDist = _.touchObject.startY - _.touchObject.curY;
            r = Math.atan2(yDist, xDist);
            swipeAngle = Math.round(180 * r / Math.PI);
            if (swipeAngle < 0) swipeAngle = 360 - Math.abs(swipeAngle);
            if (swipeAngle <= 45 && swipeAngle >= 0) return false === _.options.rtl ? "left" : "right";
            if (swipeAngle <= 360 && swipeAngle >= 315) return false === _.options.rtl ? "left" : "right";
            if (swipeAngle >= 135 && swipeAngle <= 225) return false === _.options.rtl ? "right" : "left";
            if (true === _.options.verticalSwiping) if (swipeAngle >= 35 && swipeAngle <= 135) return "down"; else return "up";
            return "vertical";
        };
        Slick.prototype.swipeEnd = function(event) {
            var slideCount, direction, _ = this;
            _.dragging = false;
            _.swiping = false;
            if (_.scrolling) {
                _.scrolling = false;
                return false;
            }
            _.interrupted = false;
            _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;
            if (void 0 === _.touchObject.curX) return false;
            if (true === _.touchObject.edgeHit) _.$slider.trigger("edge", [ _, _.swipeDirection() ]);
            if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
                direction = _.swipeDirection();
                switch (direction) {
                  case "left":
                  case "down":
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
                    _.currentDirection = 0;
                    break;

                  case "right":
                  case "up":
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
                    _.currentDirection = 1;
                    break;

                  default:
                }
                if ("vertical" != direction) {
                    _.slideHandler(slideCount);
                    _.touchObject = {};
                    _.$slider.trigger("swipe", [ _, direction ]);
                }
            } else if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        };
        Slick.prototype.swipeHandler = function(event) {
            var _ = this;
            if (false === _.options.swipe || "ontouchend" in document && false === _.options.swipe) return; else if (false === _.options.draggable && -1 !== event.type.indexOf("mouse")) return;
            _.touchObject.fingerCount = event.originalEvent && void 0 !== event.originalEvent.touches ? event.originalEvent.touches.length : 1;
            _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
            if (true === _.options.verticalSwiping) _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
            switch (event.data.action) {
              case "start":
                _.swipeStart(event);
                break;

              case "move":
                _.swipeMove(event);
                break;

              case "end":
                _.swipeEnd(event);
                break;
            }
        };
        Slick.prototype.swipeMove = function(event) {
            var curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength, _ = this;
            touches = void 0 !== event.originalEvent ? event.originalEvent.touches : null;
            if (!_.dragging || _.scrolling || touches && 1 !== touches.length) return false;
            curLeft = _.getLeft(_.currentSlide);
            _.touchObject.curX = void 0 !== touches ? touches[0].pageX : event.clientX;
            _.touchObject.curY = void 0 !== touches ? touches[0].pageY : event.clientY;
            _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
            verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
            if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
                _.scrolling = true;
                return false;
            }
            if (true === _.options.verticalSwiping) _.touchObject.swipeLength = verticalSwipeLength;
            swipeDirection = _.swipeDirection();
            if (void 0 !== event.originalEvent && _.touchObject.swipeLength > 4) {
                _.swiping = true;
                event.preventDefault();
            }
            positionOffset = (false === _.options.rtl ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
            if (true === _.options.verticalSwiping) positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
            swipeLength = _.touchObject.swipeLength;
            _.touchObject.edgeHit = false;
            if (false === _.options.infinite) if (0 === _.currentSlide && "right" === swipeDirection || _.currentSlide >= _.getDotCount() && "left" === swipeDirection) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
            if (false === _.options.vertical) _.swipeLeft = curLeft + swipeLength * positionOffset; else _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
            if (true === _.options.verticalSwiping) _.swipeLeft = curLeft + swipeLength * positionOffset;
            if (true === _.options.fade || false === _.options.touchMove) return false;
            if (true === _.animating) {
                _.swipeLeft = null;
                return false;
            }
            _.setCSS(_.swipeLeft);
        };
        Slick.prototype.swipeStart = function(event) {
            var touches, _ = this;
            _.interrupted = true;
            if (1 !== _.touchObject.fingerCount || _.slideCount <= _.options.slidesToShow) {
                _.touchObject = {};
                return false;
            }
            if (void 0 !== event.originalEvent && void 0 !== event.originalEvent.touches) touches = event.originalEvent.touches[0];
            _.touchObject.startX = _.touchObject.curX = void 0 !== touches ? touches.pageX : event.clientX;
            _.touchObject.startY = _.touchObject.curY = void 0 !== touches ? touches.pageY : event.clientY;
            _.dragging = true;
        };
        Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {
            var _ = this;
            if (null !== _.$slidesCache) {
                _.unload();
                _.$slideTrack.children(this.options.slide).detach();
                _.$slidesCache.appendTo(_.$slideTrack);
                _.reinit();
            }
        };
        Slick.prototype.unload = function() {
            var _ = this;
            $(".slick-cloned", _.$slider).remove();
            if (_.$dots) _.$dots.remove();
            if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) _.$prevArrow.remove();
            if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) _.$nextArrow.remove();
            _.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
        };
        Slick.prototype.unslick = function(fromBreakpoint) {
            var _ = this;
            _.$slider.trigger("unslick", [ _, fromBreakpoint ]);
            _.destroy();
        };
        Slick.prototype.updateArrows = function() {
            var _ = this;
            Math.floor(_.options.slidesToShow / 2);
            if (true === _.options.arrows && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
                _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
                _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
                if (0 === _.currentSlide) {
                    _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                    _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
                } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && false === _.options.centerMode) {
                    _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                    _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
                } else if (_.currentSlide >= _.slideCount - 1 && true === _.options.centerMode) {
                    _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
                    _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
                }
            }
        };
        Slick.prototype.updateDots = function() {
            var _ = this;
            if (null !== _.$dots) {
                _.$dots.find("li").removeClass("slick-active").end();
                _.$dots.find("li").eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass("slick-active");
            }
        };
        Slick.prototype.visibility = function() {
            var _ = this;
            if (_.options.autoplay) if (document[_.hidden]) _.interrupted = true; else _.interrupted = false;
        };
        $.fn.slick = function() {
            var i, ret, _ = this, opt = arguments[0], args = Array.prototype.slice.call(arguments, 1), l = _.length;
            for (i = 0; i < l; i++) {
                if ("object" == typeof opt || "undefined" == typeof opt) _[i].slick = new Slick(_[i], opt); else ret = _[i].slick[opt].apply(_[i].slick, args);
                if ("undefined" != typeof ret) return ret;
            }
            return _;
        };
    }));
    const menuButton = document.querySelector(".icon-menu");
    const navigation = document.querySelector(".header__navigation");
    const body = document.querySelector("body");
    document.querySelectorAll(".header__link");
    navigation.classList.remove("header__navigation--no-js");
    menuButton.addEventListener("click", (function() {
        if (navigation.classList.contains("header__navigation--closed")) {
            navigation.classList.remove("header__navigation--closed");
            navigation.classList.add("header__navigation--open");
        } else {
            navigation.classList.add("header__navigation--closed");
            navigation.classList.remove("header__navigation--open");
        }
    }));
    $(".slider").slick({
        dots: false,
        infinite: false,
        speed: 350,
        slidesToShow: 4,
        slidesToScroll: 4,
        draggable: true,
        responsive: [ {
            breakpoint: 1124,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        } ]
    });
    const animItems = document.querySelectorAll("._anim-items");
    let script_scroll = () => {
        if (animItems.length > 0) {
            window.addEventListener("scroll", animOnScroll);
            function animOnScroll() {
                for (let index = 0; index < animItems.length; index++) {
                    const animItem = animItems[index];
                    const animItemHeight = animItem.offsetHeight;
                    const animItemOffset = offset(animItem).top;
                    const animStart = 4;
                    let animItemPoint = window.innerHeight - animItemHeight / animStart;
                    if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) animItem.classList.add("_active"); else if (!animItem.classList.contains("_anim-no-hide")) animItem.classList.remove("_active");
                }
            }
            function offset(el) {
                const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return {
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft
                };
            }
            setTimeout((() => {
                animOnScroll();
            }), 300);
        }
    };
    script_scroll();
    window["FLS"] = true;
    isWebp();
})();
