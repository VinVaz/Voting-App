'use strict';

(function(){
	var boxSpace = document.getElementById("poll-boxes-space");
	var apiUrl = appUrl + '/api/app/polls';
	
	function createNewPollBox(name){
		var newLink = document.createElement('A');
		var address = "/profile";
		newLink.setAttribute("href", address);
		
		var newButton = document.createElement('BUTTON');
		newButton.setAttribute("class", "poll-box-button");
		newButton.innerHTML = name;
		
		newLink.appendChild(newButton);
		boxSpace.appendChild(newLink);
	}
	
	function updatePollBox(data){
		var pollObject = JSON.parse(data);
		for(var i = 0; i < pollObject.length; i++){
			var pollName = pollObject[i].name;
		    createNewPollBox(pollName);
		}	
	}

	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updatePollBox));
})();
