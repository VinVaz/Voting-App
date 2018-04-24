'use strict';

(function(){
	var submitButton = document.querySelector("#submit-button");
	var chart = document.querySelector("#chart-result");
	var apiUrl = appUrl + '/api/clicks';
	
	function updateClickCount(data){
		var clicksObject = JSON.parse(data);
		var food = clicksObject.option.name;
		var votes = clicksObject.option.clicks;
		chart.innerHTML = `food = ${food} ,votes = ${votes}`;
	}
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateClickCount));
	
	submitButton.addEventListener('click', function(){
		ajaxFunctions.ajaxRequest('POST', apiUrl, function(){
			ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
		});
	}, false);
})();
