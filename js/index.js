"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function (window) {
  if (!window.app) {
    window.app = {};
  }
  var breakpoints = {
    xxl: 1919,
    xl: 1439,
    lg: 1279,
    md: 991,
    sm: 575
  };
  var events = {}; // кастомные события

  window.app.config = {
    events: events,
    breakpoints: breakpoints
    // ...
  };
})(window);
(function (window) {
  if (!window.app) {
    window.app = {};
  }
  var checkResponse = function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status));
  };
  var checkResponseSuccess = function checkResponseSuccess(res) {
    if (res && res.success) {
      return res;
    }
    return Promise.reject("\u041E\u0442\u0432\u0435\u0442 \u043D\u0435 success: ".concat(res));
  };
  var buildHttpClient = function buildHttpClient(baseUrl) {
    return function (endpoint) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return fetch("".concat(baseUrl).concat(endpoint), options).then(checkResponse).then(checkResponseSuccess);
    };
  };
  var setObserver = function setObserver(element, handleObserve) {
    var manualConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var config = _objectSpread({
      childList: true
    }, manualConfig);
    var observer = new MutationObserver(function () {
      return handleObserve(element);
    });
    observer.observe(element, config);
  };
  var findAncestorsByClassName = function findAncestorsByClassName(el, className) {
    var stopElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var ancestorEls = [];
    var currentParent = el.parentElement;
    if (!currentParent) {
      return ancestorEls;
    }
    while (currentParent !== null && currentParent !== stopElement) {
      if (currentParent.classList.contains(className)) {
        ancestorEls = [].concat(_toConsumableArray(ancestorEls), [currentParent]);
      }
      currentParent = currentParent.parentElement;
    }
    return ancestorEls;
  };
  var findAncestorByClassName = function findAncestorByClassName(el, className) {
    var ancestorEl = el.parentElement;
    while (!ancestorEl.classList.contains(className)) {
      ancestorEl = ancestorEl.parentElement;
      if (!ancestorEl) {
        return null;
      }
    }
    return ancestorEl;
  };
  var buildComponentLogger = function buildComponentLogger(componentName) {
    return function (text) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var msg = context ? "".concat(componentName, ":").concat(context, ":").concat(text) : "".concat(componentName, ":").concat(text);
      console.debug(msg);
      if (data) {
        console.dir(data);
      }
    };
  };
  var debounce = function debounce(callee, timeoutMs) {
    return function perform() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && this.lastCall - previousCall <= timeoutMs) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(function () {
        return callee.apply(void 0, args);
      }, timeoutMs);
    };
  };
  var throttle = function throttle(callee, timeout) {
    var timer = null;
    return function perform() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (timer) return;
      timer = setTimeout(function () {
        callee.apply(void 0, args);
        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  };
  window.app.lib = {
    setObserver: setObserver,
    findAncestorsByClassName: findAncestorsByClassName,
    findAncestorByClassName: findAncestorByClassName,
    buildComponentLogger: buildComponentLogger,
    debounce: debounce,
    throttle: throttle,
    checkResponse: checkResponse,
    checkResponseSuccess: checkResponseSuccess,
    buildHttpClient: buildHttpClient
  };
})(window);

// COMPONENTS
(function (window) {
  var checkAutoplay = function checkAutoplay(slider, wrapper) {
    if (slider.autoplay) {
      if (slider.autoplay.running) {
        wrapper.classList.add('slider--autoplay');
      }
    }
  };
  var build = function build(element, id) {
    var type = element.dataset.slideType;
    var isMobile = window.innerWidth <= 768;
    if (type === 'banner') {
      var slider = new Swiper(element.querySelector('[data-slider="inner"]'), {
        spaceBetween: 8,
        slidesPerView: 'auto',
        autoplay: {
          delay: 4000
        },
        loop: true,
        pagination: {
          el: element.querySelector('[data-slider="pagination"]'),
          bulletClass: 'slider__pagination-item'
        }
      });
      checkAutoplay(slider, element);
      window.app.sliders = _objectSpread(_objectSpread({}, window.app.sliders), {}, _defineProperty({}, id, slider));
    } else if (type === 'cards') {
      var _slider = new Swiper(element.querySelector('[data-slider="inner"]'), {
        slidesPerView: 3,
        spaceBetween: 24,
        breakpoints: {
          0: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2
          },
          1025: {
            slidesPerView: 3
          }
        }
      });
      checkAutoplay(_slider, element);
      window.app.sliders = _objectSpread(_objectSpread({}, window.app.sliders), {}, _defineProperty({}, id, _slider));
    } else if (type === 'card-detail' && !isMobile) {
      var _slider2 = new Swiper(element.querySelector('[data-slider="inner"]'), {
        slidesPerView: 1,
        loop: true,
        navigation: {
          nextEl: element.querySelector('[data-slider-button="next"]'),
          prevEl: element.querySelector('[data-slider-button="prev"]')
        },
        pagination: {
          el: element.querySelector('[data-slider="pagination"]'),
          type: "fraction"
        }
      });
      checkAutoplay(_slider2, element);
      window.app.sliders = _objectSpread(_objectSpread({}, window.app.sliders), {}, _defineProperty({}, id, _slider2));
    }
  };
  var mount = function mount() {
    window.app.sliders = {};
    var sliders = Array.from(document.querySelectorAll('[data-slider-id]'));
    sliders.forEach(function (slider) {
      var sliderId = slider.dataset.sliderId;
      build(slider, sliderId);
    });
  };
  document.addEventListener('DOMContentLoaded', mount);
})(window);
(function (window) {
  // const coords = [
  //   [59.892156, 30.212439],
  //   [59.944697, 30.245771],
  //   [59.933482, 30.271222],
  //   [59.938150, 30.321607],
  //   [59.959083, 30.396410],
  //   [59.958564, 30.415143],
  //   [59.910977, 30.458294],
  // ]

  var pseudoData = {
    place1: {
      name: 'Название салона 1',
      address: 'г. Санкт-Петербург, ул. Марата дом 15.',
      phone: '8 (812) 509-42-41',
      time: 'Ежедневно с 10.00 до 22.00',
      images: ['../assets/media/detail-slide-1.jpg', '../assets/media/detail-slide-2.jpg', '../assets/media/detail-slide-1.jpg']
    },
    place2: {
      name: 'Название салона 2',
      address: 'г. Санкт-Петербург, ул. Марата дом 16.',
      phone: '8 (812) 509-42-41',
      time: 'Ежедневно с 10.00 до 22.00',
      images: ['../assets/media/detail-slide-1.jpg', '../assets/media/detail-slide-2.jpg', '../assets/media/detail-slide-1.jpg']
    },
    place3: {
      name: 'Название салона 3',
      address: 'г. Санкт-Петербург, ул. Марата дом 17.',
      phone: '8 (812) 509-42-41',
      time: 'Ежедневно с 10.00 до 22.00',
      images: ['../assets/media/detail-slide-1.jpg', '../assets/media/detail-slide-2.jpg', '../assets/media/detail-slide-1.jpg']
    },
    place4: {
      name: 'Название салона 4',
      address: 'г. Санкт-Петербург, ул. Марата дом 18.',
      phone: '8 (812) 509-42-41',
      time: 'Ежедневно с 10.00 до 22.00',
      images: ['../assets/media/detail-slide-1.jpg', '../assets/media/detail-slide-2.jpg', '../assets/media/detail-slide-1.jpg']
    },
    place5: {
      name: 'Название салона 5',
      address: 'г. Санкт-Петербург, ул. Марата дом 19.',
      phone: '8 (812) 509-42-41',
      time: 'Ежедневно с 10.00 до 22.00',
      images: ['../assets/media/detail-slide-1.jpg', '../assets/media/detail-slide-2.jpg', '../assets/media/detail-slide-1.jpg']
    },
    place6: {
      name: 'Название салона 6',
      address: 'г. Санкт-Петербург, ул. Марата дом 20.',
      phone: '8 (812) 509-42-41',
      time: 'Ежедневно с 10.00 до 22.00',
      images: ['../assets/media/detail-slide-1.jpg', '../assets/media/detail-slide-2.jpg', '../assets/media/detail-slide-1.jpg']
    },
    place7: {
      name: 'Название салона 7',
      address: 'г. Санкт-Петербург, ул. Марата дом 21.',
      phone: '8 (812) 509-42-41',
      time: 'Ежедневно с 10.00 до 22.00',
      images: ['../assets/media/detail-slide-1.jpg', '../assets/media/detail-slide-2.jpg', '../assets/media/detail-slide-1.jpg']
    }
  };
  var build = function build(element) {
    if (!element) return;
    var id = element.id;
    var cards = document.querySelectorAll('[data-coords]');
    var cardCover = document.querySelector('.cover');
    var parentElement = element.closest('.section--map');
    var cardsCoords = [];
    cards.forEach(function (card) {
      cardsCoords.push(card.dataset.coords.split(','));
    });
    var init = function init() {
      var myMap = new ymaps.Map(id, {
        center: [59.930267, 30.338968],
        zoom: 12,
        controls: []
      });
      var focusOnMarker = function focusOnMarker(map, target) {
        map.setCenter(target, 14, {
          checkZoomRange: true
        });
      };
      var MyIconContentLayout = ymaps.templateLayoutFactory.createClass("<img img class=\"map__marker\" src = '../assets/media/marker.svg' ></img > ");
      var MyIconHoverContentLayout = ymaps.templateLayoutFactory.createClass("<img img class=\"map__marker\" src = '../assets/media/marker-hover.svg' ></img > ");
      cardsCoords.forEach(function (marker) {
        var myPlacemark = new ymaps.Placemark(marker, {}, {
          iconLayout: MyIconContentLayout,
          iconShape: {
            type: 'Rectangle',
            coordinates: [[0, 0], [50, 50]]
          }
        });
        myPlacemark.events.add('mouseenter', function (e) {
          e.get('target').options.set('iconLayout', MyIconHoverContentLayout);
        });
        myPlacemark.events.add('mouseleave', function (e) {
          e.get('target').options.set('iconLayout', MyIconContentLayout);
        });
        myPlacemark.events.add('click', function (e) {
          var currentPlacemark = myPlacemark.geometry._coordinates.join(',');
          var targetElement = parentElement.querySelector("[data-coords='".concat(currentPlacemark, "']"));
          var dataId = targetElement.dataset.placeId;
          var card = document.querySelector('.modal-card');
          var cardTitle = card.querySelector('.modal-card__title');
          var cardInfos = card.querySelectorAll('.list-item__text');
          cardTitle.textContent = pseudoData[dataId].name;
          cardInfos[0].textContent = pseudoData[dataId].address;
          cardInfos[1].textContent = pseudoData[dataId].phone;
          cardInfos[2].textContent = pseudoData[dataId].time;
          cardCover.classList.add('active');
          focusOnMarker(myMap, marker);
          console.log(card, pseudoData[dataId]);
        });
        myMap.geoObjects.add(myPlacemark);
      });
    };
    ymaps.ready(init);
  };
  var mount = function mount() {
    var mapElements = document.querySelectorAll('.map');
    mapElements.forEach(function (element) {
      build(element);
    });
  };
  document.addEventListener('DOMContentLoaded', mount);
})(window);
(function (window) {
  var build = function build(element) {
    if (!element) return;
    var draggableContainer = element;
    var startY;
    var scrollTop;
    var isDown;
    draggableContainer.addEventListener('mousedown', function (e) {
      return mouseIsDown(e);
    });
    draggableContainer.addEventListener('mouseup', function (e) {
      return mouseUp(e);
    });
    draggableContainer.addEventListener('mouseleave', function (e) {
      return mouseLeave(e);
    });
    draggableContainer.addEventListener('mousemove', function (e) {
      return mouseMove(e);
    });
    function mouseIsDown(e) {
      isDown = true;
      startY = e.pageY - draggableContainer.offsetTop;
      scrollTop = draggableContainer.scrollTop;
    }
    function mouseUp(e) {
      isDown = false;
    }
    function mouseLeave(e) {
      isDown = false;
    }
    function mouseMove(e) {
      if (isDown) {
        e.preventDefault();
        var y = e.pageY - draggableContainer.offsetTop;
        var walkY = y - startY;
        draggableContainer.scrollTop = scrollTop - walkY;
      }
    }
  };
  var mount = function mount() {
    var mapElements = document.querySelectorAll('.draggable');
    mapElements.forEach(function (element) {
      build(element);
    });
  };
  document.addEventListener('DOMContentLoaded', mount);
})(window);
(function (window) {
  var build = function build(element) {
    if (!element) return;
    var closeButton = element.querySelector('[data-button="close"]');
    var modalCover = element.closest('.cover');
    closeButton.addEventListener('click', function () {
      modalCover.classList.remove('active');
    });
  };
  var mount = function mount() {
    var modalCards = document.querySelectorAll('.modal-card');
    modalCards.forEach(function (element) {
      build(element);
    });
  };
  document.addEventListener('DOMContentLoaded', mount);
})(window);

// UI
(function (window) {
  var _window$app = window.app,
    config = _window$app.config,
    lib = _window$app.lib;
  var build = function build(element) {
    var buttons = document.querySelectorAll('[data-tab-button]');
    var containers = document.querySelectorAll('[data-tab-container]');
    element.addEventListener('click', function () {
      var currentTab = element.dataset.tabButton;
      buttons.forEach(function (button) {
        if (button.dataset.tabButton === currentTab) {
          button.classList.add('active');
        } else button.classList.remove('active');
      });
      containers.forEach(function (container) {
        if (container.dataset.tabContainer === currentTab) {
          container.classList.add('active');
        } else container.classList.remove('active');
      });
    });
  };
  var mount = function mount() {
    var elements = Array.from(document.querySelectorAll('[data-tab-button]'));
    elements.forEach(build);
  };
  document.addEventListener('DOMContentLoaded', mount);
})(window);