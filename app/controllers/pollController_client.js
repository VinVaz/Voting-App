'use strict';

(function(){
	var boxSpace = document.getElementById("poll-boxes-space");
	var apiUrl = appUrl + '/api/polls';
	
	function createNewPollBox(pollName){
		
		var newForm = document.createElement('FORM');
		var address = "profile/" + pollName;
		newForm.setAttribute('action', address);
		
		var newButton = document.createElement('INPUT');
		newButton.setAttribute("class", "poll-box-button");
		newButton.setAttribute("value", pollName);
	    newButton.setAttribute("type", "submit");
		
		newForm.appendChild(newButton);
		boxSpace.appendChild(newForm);
	}
	
	function updatePollBox(data){
		var pollObject = JSON.parse(data);
		for(var i = 0; i < pollObject.length; i++){
			var pollName = pollObject[i];
		    createNewPollBox(pollName);
		}	
	}

	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updatePollBox));
})();
