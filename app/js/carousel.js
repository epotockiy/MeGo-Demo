(function () {
	var carousel = document.getElementsByClassName('carousel');
	var contentWidth = 1200;
		
	for (var i = 0; i < carousel.length; i++) {

		var listElems = carousel[i].querySelectorAll('li');
		var width = contentWidth; // ширина изображения
		var count = listElems.length;
		var position = 0;		

		carousel[i].querySelector('.prev').addEventListener('click', function(event) {
			var list = event.target.parentNode.querySelector('ul');

			position = Math.min(position + width, 0)
			list.style.marginLeft = position + 'px';
		});

		carousel[i].querySelector('.next').addEventListener('click', function(event) {
			var list = event.target.parentNode.querySelector('ul');

			position = Math.max(position - width, -width * (count - 1));
	  		list.style.marginLeft = position + 'px';
		});
	}
})();
