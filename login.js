// Adapt that if developing the extension and loading unpacked...
const recheckWebExtensionId = 'ifbcdobnjihilgldbjeomakdaejhplii';

var keycloak = Keycloak({
// TODO url: 'https://sso.prod.cloud.retest.org/auth',
	url: 'https://sso.dev.cloud.retest.org/auth',
    realm: 'customer',
    clientId: 'babelfish'
});

window.addEventListener('load', function(event) {
    keycloak.init({ onLoad: 'login-required' })
        .success(function(){
        	chrome.runtime.sendMessage(recheckWebExtensionId, {
	        	'message': 'recheck-web_login',
	        	'token': keycloak.token
	        });
			window.close();
        })
        .error(function(errorData) {
            document.getElementById('messages').innerHTML = '<b>Failed to load data. Error: ' + JSON.stringify(errorData) + '</b>';
        });
});
