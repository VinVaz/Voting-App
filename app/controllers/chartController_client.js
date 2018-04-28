'use strict';

(function(){
	var submitButton = document.querySelector("#submit-button");
	var chart = document.querySelector("#chart-result");
	var apiUrl = appUrl + '/api/clicks';
	var deleteApiUrl = appUrl + '/api/clicks/user';
	
	function updateClickCount(data){
		var clicksObject = JSON.parse(data);

		var numOfOptions = clicksObject.poll.options.length;
		for(var i = 0; i < numOfOptions; i++){
		  var food = clicksObject.poll.options[i].name;
		  var votes = clicksObject.poll.options[i].clicks;
          chart.innerHTML = `food: ${food}, votes: ${votes}.\n`;
		}
	}
	
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateClickCount));
})();
