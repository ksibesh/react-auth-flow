import React, { createElement } from 'react';

const localStorageConst = 'rightStayHostAuth';
const actionConst = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT'
}

class AuthService {

	init(params) {
		this.store = params.store;
		this.loginPath = params.loginPath;
		this.defaultRedirectPath = params.defaultRedirectPath;
		this.redirectAction = params.redirectAction;

		return { 'authorization': this.authenticationReducer };
	}

	getContext() {
		return localStorage.getItem(localStorageConst);
	}

	redirect(path) {
		path = path || this.defaultRedirectPath;
		this.store.dispatch(this.redirectAction(path));
	}

	authenticationReducer(state={}, action) {
		if(!('type' in action)) {
			return sate;
		}

		let nextState = Object.assign({}, state);
		switch(action.type) {
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

		return nextState
	}

	login(token, context) {
		this.store.dispatch({
			type: actionConst.LOGIN,
			payload: {
				token: token,
				context: context
			}
		});
		localStorage.setItem(localStorageConst, token);
	}

	isAuthenticated() {
		let token = localStorage.getItem(localStorageConst);
		if( !token || token === null ){
			return false;
		} else {
			return true;
		}
	}

	logout() {
		this.store.dispatch({
			type: actionConst.LOGOUT
		});
		localStorage.removeItem(localStorageConst);
		this.redirect(this.loginPath);
	}

	requireAuth(wrappedComponent) {
		let redirectAction = this.redirectAction;
		let _instance = this;
		let store = this.store;
		let loginPath = this.loginPath;

		return class AuthenticatedComponent extends React.Component {
			componentWillMount() {
				this.checkAuth();
			}

			componentWillReceiveProps(nextProp) {
				this.checkAuth();
			}

			checkAuth() {
				if(!_instance.isAuthenticated()) {
					let redirectAfterLogin = this.props.location.pathname;
					log('inside instance');
					log(redirectAfterLogin);
					store.dispatch(redirectAction(loginPath + '?next=' + redirectAfterLogin));
				}
			}

			render() {
				let renderElement = _instance.isAuthenticated() && createElement(wrappedComponent, {...this.props});
				return renderElement;
			}
		}
	}
}

export const authService = new AuthService();