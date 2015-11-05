var React = require('react');
var request = require('superagent')
//var Button = require('rf-ui/Button');
var Button = require('rf-ui').Button

require('./Base.less');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			user: this.props.user
		}
	},

	componentWillMount: function() {
		if (!this.state.user) {
			this._requestData();
		};
	},

	render: function(){
		return (
			<div className='Base'>
				<h1>Base</h1>
				<p>Hello {this.state.user}</p>
				<Button onClick='_onButtonClick' />
			</div>
		)
	},

	_onClick: function() {
		console.log('hello')
	},

	_requestData: function() {
		var t = this;
		request('GET', '/api/base').end(function(res){
			if (res && res.status == 200) {
				t.setState({
					user: res.body.user
				});
			}
		});
	}

});