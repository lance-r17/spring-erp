define(function(require) {
	'use restrict';

	var SockJS = require('sockjs-client');
	
	require('stompjs');

	function register(registrations) {
		var socket = SockJS('/erp');
		var stompClient = Stomp.over(socket);
		stompClient.connect({}, frame => {
			registrations.forEach(registration => {
				stompClient.subscribe(registration.route, registration.callback);
			});
		});
	}

	module.exports.register = register;
});