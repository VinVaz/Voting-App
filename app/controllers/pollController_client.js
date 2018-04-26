'use strict';

(function(){
	var boxSpace = document.getElementById("poll-boxes-space");
	var apiUrl = appUrl + '/api/clicks';
	
	function createNewPollBox(){
		var link = document.createElement('A');
		link.setAttribute("href", "/profile");
		
		var button = document.createElement('BUTTON');
		button.setAttribute("class", "poll-box-button");
        
		link.appendChild(button);
		boxSpace.appendChild(link);
	}
	function updatePollBox(data){
		var clicksObject = JSON.parse(data);
		var poll = clicksObject.name;
		createNewPollBox();
		var pollButton = document.querySelector(".poll-box-button");
		pollButton.innerHTML = poll;
	}
	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updatePollBox));
})();
