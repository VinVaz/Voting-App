'use strict';

(function(){
	var submitButton = document.querySelector("#submit-button");
	var pollButton = document.querySelector(".poll-box-button");
	var chart = document.querySelector("#chart-result");
	var apiUrl = appUrl + '/api/clicks';
	
	function updateClickCount(data){
		var clicksObject = JSON.parse(data);
		var food = clicksObject.option.name;
		var votes = clicksObject.option.clicks;
		chart.innerHTML = `food = ${food} ,votes = ${votes}`;
	}
	function updatePolls(data){
		var clicksObject = JSON.parse(data);
		var poll = clicksObject.name;
		pollButton.innerHTML = poll;
	}
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateClickCount));
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updatePolls));
	
	submitButton.addEventListener('click', function(){
		ajaxFunctions.newRequest('POST', apiUrl, function(){
			ajaxFunctions.newRequest('GET', apiUrl, updateClickCount);
		});
	}, false);
})();
