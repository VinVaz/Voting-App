'use strict';

(function(){

	function toggleById(id){
		var a = document.getElementById(id);
		if(a.style.display == 'none'){
			a.style.display = 'block'
		}else a.style.display = 'none'
	}
 
	document.getElementById("profile-btn").addEventListener('click', function(){
		toggleById('profile-list');
	});
	
	window.onclick = function(event){
	  if(!event.target.matches(".profile-btn")){
          var a = document.getElementById('profile-list');
          a.style.display = 'none'	  
	  }	
	}
	
})();