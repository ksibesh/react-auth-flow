'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var actionConst = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT'
};

var AuthService = function () {
	function AuthService() {
		_classCallCheck(this, AuthService);
	}

	_createClass(AuthService, [{
		key: 'init',
		value: function init(params) {
			this.store = params.store;
			this.loginPath = params.loginPath;
			this.defaultRedirectPath = params.defaultRedirectPath;
			this.redirectAction = params.redirectAction;
			this.localStorageConst = params.localStorageKey;

			return { 'authorization': this.authenticationReducer };
		}
	}, {
		key: 'getContext',
		value: function getContext() {
			return localStorage.getItem(this.localStorageConst);
		}
	}, {
		key: 'redirect',
		value: function redirect(path) {
			path = path || this.defaultRedirectPath;
			this.store.dispatch(this.redirectAction(path));
		}
	}, {
		key: 'authenticationReducer',
		value: function authenticationReducer() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var action = arguments[1];

			if (!('type' in action)) {
				return sate;
			}

			var nextState = Object.assign({}, state);
			switch (action.type) {
				case actionConst.LOGIN:
					nextState['token'] = action.payload.token;
					nextState['context'] = action.payload.context;
					break;
				case actionConst.LOGOUT:
					nextState['token'] = null;
					nextState['context'] = null;
					break;
				default:
					return state;
			}

			return nextState;
		}
	}, {
		key: 'login',
		value: function login(token, context) {
			this.store.dispatch({
				type: actionConst.LOGIN,
				payload: {
					token: token,
					context: context
				}
			});
			localStorage.setItem(this.localStorageConst, token);
		}
	}, {
		key: 'isAuthenticated',
		value: function isAuthenticated() {
			var token = localStorage.getItem(this.localStorageConst);
			if (!token || token === null) {
				return false;
			} else {
				return true;
			}
		}
	}, {
		key: 'logout',
		value: function logout() {
			this.store.dispatch({
				type: actionConst.LOGOUT
			});
			localStorage.removeItem(this.localStorageConst);
			this.redirect(this.loginPath);
		}
	}, {
		key: 'requireAuth',
		value: function requireAuth(wrappedComponent) {
			var redirectAction = this.redirectAction;
			var _instance = this;
			var store = this.store;
			var loginPath = this.loginPath;

			return function (_React$Component) {
				_inherits(AuthenticatedComponent, _React$Component);

				function AuthenticatedComponent() {
					_classCallCheck(this, AuthenticatedComponent);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(AuthenticatedComponent).apply(this, arguments));
				}

				_createClass(AuthenticatedComponent, [{
					key: 'componentWillMount',
					value: function componentWillMount() {
						this.checkAuth();
					}
				}, {
					key: 'componentWillReceiveProps',
					value: function componentWillReceiveProps(nextProp) {
						this.checkAuth();
					}
				}, {
					key: 'checkAuth',
					value: function checkAuth() {
						if (!_instance.isAuthenticated()) {
							var redirectAfterLogin = this.props.location.pathname;
							log('inside instance');
							log(redirectAfterLogin);
							store.dispatch(redirectAction(loginPath + '?next=' + redirectAfterLogin));
						}
					}
				}, {
					key: 'render',
					value: function render() {
						var renderElement = _instance.isAuthenticated() && (0, _react.createElement)(wrappedComponent, _extends({}, this.props));
						return renderElement;
					}
				}]);

				return AuthenticatedComponent;
			}(_react2.default.Component);
		}
	}]);

	return AuthService;
}();

exports.default = new AuthService();
//# sourceMappingURL=app.js.map
