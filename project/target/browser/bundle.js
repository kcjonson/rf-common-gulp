/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var Base = __webpack_require__(3);

	// Base for Webpack, not server side.

	// Snag the initial state that was passed from the server side
	var initialStateHTML = document.getElementById('initial-state').innerHTML;
	var initialState = initialStateHTML ? JSON.parse(initialStateHTML) : {};

	ReactDOM.render(React.createElement(Base, {
		user: initialState.user
	}), document.getElementById('react-app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = react;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = react-dom;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var request = __webpack_require__(4);

	//var Button = require('rf-ui/Button')
	//var Button = require('rf-ui/lib/Button')
	var Button = __webpack_require__(5).Button;

	__webpack_require__(11);

	module.exports = React.createClass({
		displayName: 'exports',

		getInitialState: function getInitialState() {
			return {
				user: this.props.user
			};
		},

		componentWillMount: function componentWillMount() {
			if (!this.state.user) {
				this._requestData();
			};
		},

		render: function render() {
			return React.createElement(
				'div',
				{ className: 'Base' },
				React.createElement(
					'h1',
					null,
					'Base'
				),
				React.createElement(
					'p',
					null,
					'Hello ',
					this.state.user
				),
				React.createElement(Button, null)
			);
		},

		_requestData: function _requestData() {
			var t = this;
			request('GET', '/api/base').end(function (res) {
				if (res && res.status == 200) {
					t.setState({
						user: res.body.user
					});
				}
			});
		}

	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = superagent;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	

	module.exports = {
		'Button': __webpack_require__(6)
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(7);


	var Button = (function (_React$Component) {
		_inherits(Button, _React$Component);

		function Button() {
			_classCallCheck(this, Button);

			_get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, arguments);
		}

		_createClass(Button, [{
			key: 'render',
			value: function render() {
				return _react2['default'].createElement(
					'button',
					{ className: 'Button' },
					'I am button.'
				);
			}
		}]);

		return Button;
	})(_react2['default'].Component);

	exports['default'] = Button;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);