'use strict';

var React = require('react');
var request = require('superagent');
var Button = require('rf-ui/Button');

require('./Base.css');

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