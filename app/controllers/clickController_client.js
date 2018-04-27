'use strict';

(function(){
	var submitButton = document.querySelector("#submit-button");
	var chart = document.querySelector("#chart-result");
	var apiUrl = appUrl + '/api/clicks';
	var deleteApiUrl = appUrl + '/api/clicks/user';
	
	function updateClickCount(data){
		//var clicksObject = JSON.parse(data);
		//var food = clicksObject.options[0].name;
		//var votes = clicksObject.options[0].clicks;
		chart.innerHTML = `ok`;
	}
	
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateClickCount));
	/*
	submitButton.addEventListener('click', function(){
		ajaxFunctions.newRequest('POST', apiUrl, function(){
			ajaxFunctions.newRequest('GET', apiUrl, updateClickCount);
		});
	}, false);
	*/
	submitButton.addEventListener('click', function(){
		//ajaxFunctions.newRequest('POST', deleteApiUrl, function(){
			ajaxFunctions.newRequest('POST', deleteApiUrl, updateClickCount);
		//});
	}, false);
})();
