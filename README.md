# react-auth-flow
Library to handle authentication flow for react-redux application, it exports a singleton reference of AuthService class.

**Installation**
```
npm install react-auth-flow --save
```

Steps to setup - 

**Import AuthService**

```javascript
import AuthService from 'react-auth-flow';
```

**Initialize the service by passing some initial setup arguments**

> The *init* method of **AuthService** class returns a reducer which is needed to be registered in store

```javascript
AuthService.init({
  'store': store,
  'loginPath': loginPath,
  'defaultRedirectPath': defaultRedirectPath,
  'redirectAction': redirectAction,
  'localStorageKey': localStorageKey
});
```

| Key | Description |
| --- | --- |
| `store` | redux store |
| `loginPath` | login route of the configured UI router (will be redirected to this path if the user is not authenticated) |
| `defaultRedirectPath` | user will be redirected to this path if login is successful, in case user requested some authenticated route then it will be redirected to that route after successful login |
| `redirectAction` | action method which will redirect to the path evalued by the library, in case of react-router-redux it should be 'push' |
| `localStorageKey` | key name by which the user context is saved in local storage |


**Authenticating routes using react router and react-auth-flow**

You can authenticate your component using *requireAuth* method of the library

```javascript
AuthService.requireAuth(YourComponent);
```

*Example-*

```javascript
import AuthService from 'react-auth-flow';

<Router history={history}>
	<Route path="/" component={AuthService.requireAuth(YourComponent)}/>
</Router>
```

*Basic Example-*
```javascript
import {createStore, combineReducers} from 'redux';
import {routerReducer, push} from 'react-router-redux';
import AuthService from 'react-auth-flow';

const store = createStore(combineReducers({
  router: routerReducer,
}));

let authReducer = AuthService.init({
  store: store,
	loginPath: '/login',
	defaultRedirectPath: '/',
	redirectAction: push,
	localStorageKey: 'sampleKey'
});

```

*Live Example-*
```javascript
import {createStore, combineReducers} from 'redux';
import {routerReducer, push} from 'react-router-redux';
import AuthService from 'react-auth-flow';

const makeRootReducer = (asyncReducers) => {
	return combineReducers({
    router: routerReducer,
	});
}

const injectReducer = (store, reducerList) => {
	for(let key in reducerList) {
		store.asyncReducers[key] = reducerList[key];
	}
	store.replaceReducer(makeRootReducer(store.asyncReducers));
}

const store = createStore(combineReducers({
  makeRootReducer()
}));
store.asyncReducers = {};

let authReducer = AuthService.init({
  store: store,
	loginPath: '/login',
	defaultRedirectPath: '/',
	redirectAction: push,
	localStorageKey: 'sampleKey'
});
injectReducer(store, authReducer);
```
