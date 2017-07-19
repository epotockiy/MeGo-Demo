(function() {
	var respNav = document.getElementById('responsive-nav');
	var burgerIcon = document.getElementById('burger-icon');
	var respList = document.getElementById('responsive-nav-list');
	var closeIcon = document.getElementById('close-icon');

	burgerIcon.addEventListener('click', function(event){
		respList.style.display = "block";
	});

	closeIcon.addEventListener('click', function(event) {
		respList.style.display = "";
	});
	
})();