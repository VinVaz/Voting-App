'use strict';

(function(){
	var boxSpace = document.getElementById("poll-boxes-space");
	var apiUrl = appUrl + '/api/polls';
	
	function createNewPollBox(){
		var link = document.createElement('A');
		//change this attribute later so that it can serve a specific user:
		link.setAttribute("href", "/profile");
		
		var button = document.createElement('BUTTON');
		button.setAttribute("class", "poll-box-button");
        
		link.appendChild(button);
		boxSpace.appendChild(link);
	}
	function updatePollBox(data){
			console.log("Im running");
		var pollObject = JSON.parse(data);
		var poll = pollObject.poll.name;
		createNewPollBox();
		//change this query selector so that it can perform 
		//changes for all of the buttons that will be created:
		var pollButton = document.querySelector(".poll-box-button");
		pollButton.innerHTML = poll;
	}

	ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updatePollBox));
})();
