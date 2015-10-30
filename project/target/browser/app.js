'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Base = require('./components/Base');

// Base for Webpack, not server side.

// Snag the initial state that was passed from the server side
var initialStateHTML = document.getElementById('initial-state').innerHTML;
var initialState = initialStateHTML ? JSON.parse(initialStateHTML) : {};

ReactDOM.render(React.createElement(Base, {
	user: initialState.user
}), document.getElementById('react-app'));