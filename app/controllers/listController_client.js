'use strict';

(function(){
	var dropDownList = document.getElementById("drop-down-list");
	var apiUrl = appUrl + '/api/clicks';
	
	function createNewOptionElement(name){
		var option = document.createElement('OPTION');
		option.innerHTML = name;
		dropDownList.appendChild(option);
	}
	function console(err, data){
		if(err) throw err;
		console.log(data);
	}
	function updateDropDownList(data, callback){
	  var pollObject = JSON.parse(data);
	  callback(null, pollObject);
	  /*
	  var numOfOptions = pollObject.pull.options.length;
	    for(var i = 0; i < numOfOptions; i++){
		var name = pollObject.pull.options[i].name;
		console.log(name);
	*/
		//createNewOptionElement(name);
	}
	
	createNewOptionElement("pizza");
	createNewOptionElement("burritos");
	
	//ajaxFunctions.ready(ajaxFunctions.newRequest('GET', apiUrl, updateDropDownList));
})();
