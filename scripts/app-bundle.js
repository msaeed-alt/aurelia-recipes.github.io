define('app',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var App = exports.App = function () {
        function App() {
            _classCallCheck(this, App);

            this.router = null;
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
            this.router = router;
            config.title = 'Aurelia';
            config.map([{
                route: ['', 'home'],
                name: 'home',
                title: 'Recipe Book',
                moduleId: 'home/home'
            }, {
                route: 'recipes',
                name: 'recipes',
                title: 'Recipes',
                moduleId: 'recipes/home',
                nav: true
            }, {
                route: 'instructions',
                name: 'instructions',
                title: 'Instructions',
                moduleId: 'instructions/home',
                nav: true
            }, {
                route: 'source-code',
                name: 'source-code',
                title: 'Source Code',
                moduleId: 'source-code/home',
                nav: true
            }]);
        };

        return App;
    }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('home/home',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Home = exports.Home = function Home() {
        _classCallCheck(this, Home);
    };
});
define('instructions/home',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Instructions = exports.Instructions = function Instructions() {
        _classCallCheck(this, Instructions);
    };
});
define('recipes/home',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Recipes = exports.Recipes = function Recipes() {
        _classCallCheck(this, Recipes);
    };
});
define('resources/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(config) {
        config.globalResources(['resources/elements/nav-bar/nav-bar', 'resources/attributes/svg-inject']);
    }
});
define('source-code/home',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var SourceCode = exports.SourceCode = function SourceCode() {
        _classCallCheck(this, SourceCode);
    };
});
define('resources/attributes/svg-inject',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SvgInjectCustomAttribute = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var SvgInjectCustomAttribute = exports.SvgInjectCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaFramework.Loader), _dec(_class = function () {
        function SvgInjectCustomAttribute(element, loader) {
            _classCallCheck(this, SvgInjectCustomAttribute);

            this.element = element;
            this.loader = loader;
            window.loader = this.loader;
        }

        SvgInjectCustomAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {
            this.loader.loadText(newValue + '.svg').then(function (svgText) {
                console.log(svgText);
            });
        };

        return SvgInjectCustomAttribute;
    }()) || _class);
});
define('resources/elements/nav-bar/nav-bar',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavBar = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor;

    var NavBar = exports.NavBar = (_class = function () {
        function NavBar() {
            _classCallCheck(this, NavBar);

            _initDefineProp(this, 'router', _descriptor, this);
        }

        NavBar.prototype.bind = function bind() {};

        return NavBar;
    }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'router', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"milligram.css\"></require>\n  <require from=\"./app.css\"></require>\n  <nav-bar router.bind=\"router\"></nav-bar>\n  <router-view></router-view>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Poiret+One|Raleway\");\nhtml {\n  height: 100%;\n  background-repeat: no-repeat;\n  background-attachment: fixed; }\n\nbody {\n  font-family: 'Raleway', sans-serif;\n  margin: 0; }\n"; });
define('text!recipes/articles/2-16-17_So_You_Want_To_Build_A_Recipe_Site.html', ['module'], function(module) { module.exports = "<template><p>So you want to build a recipe site...</p>\n</template>"; });
define('text!instructions/home.html', ['module'], function(module) { module.exports = "<template>\n    <require from='./home.css'></require>\n    instructions\n</template>"; });
define('text!instructions/home.css', ['module'], function(module) { module.exports = ""; });
define('text!home/home.html', ['module'], function(module) { module.exports = "<template>\n    <require from='./home.css'></require>\n    <section class=\"container\">\n        <div class=\"row\">\n            <header class=\"column\">\n                <h1>Hello world!</h2>\n            </header>\n        </div>\n        <div class=\"row\">\n            <div class=\"column\">\n                <p>Don't worry, I'll be filled up soon with some great <a href=\"http://aurelia.io\"><mark>Javascript</mark></a> recipes.</p>\n            </div>\n        </div>\n    </section>\n</template>"; });
define('text!home/home.css', ['module'], function(module) { module.exports = ""; });
define('text!recipes/home.html', ['module'], function(module) { module.exports = "<template>\n    <require from='./home.css'></require>\n    <section class=\"container\">\n        <div class=\"row\">\n            <header class=\"column\">\n                <h1>Delicious Recipes</h2>\n            </header>\n        </div>\n        <div class=\"row\">\n            <div class=\"column\">\n                <compose view=\"recipes/articles/2-16-17_So_You_Want_To_Build_A_Recipe_Site.html\" containerless></compose>\n            </div>\n        </div>\n    </section>\n</template>"; });
define('text!recipes/home.css', ['module'], function(module) { module.exports = ""; });
define('text!source-code/home.html', ['module'], function(module) { module.exports = "<template>\n    <require from='./home.css'></require>\n    source code\n</template>"; });
define('text!source-code/home.css', ['module'], function(module) { module.exports = ""; });
define('text!resources/elements/nav-bar/nav-bar.html', ['module'], function(module) { module.exports = "<template>\n  <require from='./nav-bar.css'></require>\n  <nav class=\"nav-container\">\n    <ul class=\"nav-items\">\n      <li class=\"brand nav-item\">\n        <a href=\"#\" title=\"home\">Recipe Book</a>\n        <svg class=\"nav-chevron\" svg-inject=\"resources/images/svg/Chevron\"></svg>\n      </li>\n      <li class=\"nav-item ${nav.isActive ? 'active' : ''}\" repeat.for=\"nav of router.navigation\">\n        <a href.bind=\"nav.href\" title.bind=\"nav.title\">\n          <span>${nav.title}</span>\n        </a>\n      </li>\n    </ul>\n  </nav>\n</template>"; });
define('text!resources/elements/nav-bar/nav-bar.css', ['module'], function(module) { module.exports = "nav-bar {\n  display: block;\n  height: 50px;\n  background-color: #7AB6DB; }\n  nav-bar .nav-container {\n    height: 100%; }\n  nav-bar .nav-items {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    height: 100%;\n    display: -webkit-box;\n    /* OLD - iOS 6-, Safari 3.1-6 */\n    display: -moz-box;\n    /* OLD - Firefox 19- (buggy but mostly works) */\n    display: -ms-flexbox;\n    /* TWEENER - IE 10 */\n    display: -webkit-flex;\n    /* NEW - Chrome */\n    display: flex; }\n  nav-bar .nav-item {\n    height: 100%;\n    padding: 0 1rem;\n    line-height: 50px;\n    color: white;\n    text-shadow: 0px 0px 0px transparent;\n    transition: text-shadow .2s ease-in-out; }\n    nav-bar .nav-item.active {\n      background-color: #5594c2; }\n    nav-bar .nav-item:hover {\n      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.67); }\n    nav-bar .nav-item a, nav-bar .nav-item a:hover {\n      color: inherit;\n      text-decoration: none; }\n      nav-bar .nav-item a:hover, nav-bar .nav-item a:hover:hover {\n        text-decoration: none; }\n  nav-bar .nav-chevron {\n    display: inline-block;\n    width: 8px;\n    height: 8px; }\n  nav-bar .brand {\n    background-color: black;\n    color: white; }\n"; });
//# sourceMappingURL=app-bundle.js.map