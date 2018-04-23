'use strict';

(function(){
	var apiUrl = appUrl + '/api/clicks';
	var submitButton = document.getElementById("submit-button");
	var chart = document.getElementById("chart-result");
	
	function updateClickCount(data){
		var clicksObject = JSON.parse(data);
		chart.innerHTML = clicksObject;
	}
	
	submitButton.addEventListener('click', function(){
	   ajaxFunctions.ajaxRequest('POST', apiUrl, function(){
			ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
		});
	});
})();