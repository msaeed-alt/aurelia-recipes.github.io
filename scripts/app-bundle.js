define('app',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);
  };
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
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <section class=\"hero\">\n    <h1 class=\"header\">Hello world!</h2>\n    <p>Don't worry, I'll be filled up soon with some great <a href=\"http://aurelia.io\"><mark>Javascript</mark></a> recipes.</p>\n  </section>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Poiret+One|Raleway\");\nhtml {\n  background: #0fb4e7;\n  /* Old browsers */\n  background: -moz-linear-gradient(45deg, #0fb4e7 0%, #78d3ed 100%);\n  /* FF3.6-15 */\n  background: -webkit-linear-gradient(45deg, #0fb4e7 0%, #78d3ed 100%);\n  /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(45deg, #0fb4e7 0%, #78d3ed 100%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0fb4e7', endColorstr='#78d3ed',GradientType=1 );\n  /* IE6-9 fallback on horizontal gradient */\n  height: 100%;\n  background-repeat: no-repeat;\n  background-attachment: fixed; }\n\nbody {\n  color: white;\n  font-family: 'Raleway', sans-serif; }\n\n.header {\n  font-family: 'Poiret One', cursive; }\n\nmark {\n  background-color: rgba(209, 98, 255, 0.56);\n  color: white; }\n\na {\n  text-decoration: none; }\n  a:hover {\n    text-decoration: none; }\n\n.hero {\n  font-size: 2rem; }\n  .hero .header {\n    font-size: 4rem; }\n"; });
//# sourceMappingURL=app-bundle.js.map