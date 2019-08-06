var keycloak = Keycloak({
	url : 'https://sso.prod.cloud.retest.org/auth',
	realm : 'customer',
	clientId : 'babelfish'
});

window.addEventListener("load", function(event) {
	keycloak.init({
		onLoad : 'login-required'
	}).success(function() {
		console.log("Sending login info.")
		chrome.runtime.sendMessage({
			'message' : 'recheck-web_login',
			'token' : keycloak.token
		});
		window.close();
	}).error(function(errorData) {
		document.getElementById('messages').innerHTML = '<b>Failed to load data. Error: ' + JSON.stringify(errorData) + '</b>';
	});
});

if (chrome.runtime) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.message === 'recheck-web_aborted') {
			window.close();
		}
	});
}