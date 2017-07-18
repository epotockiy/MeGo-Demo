(function() {
	var respNav = document.getElementById('responsive-nav');
	var burgerIcon = document.getElementById('burger-icon');
	var respList = document.getElementById('responsive-nav-list');
	var closeIcon = document.getElementById('close-icon');

	burgerIcon.onclick = function() {
		respList.style.display = "block";
	}

	closeIcon.onclick = function() {
		respList.style.display = "";
	}
})();