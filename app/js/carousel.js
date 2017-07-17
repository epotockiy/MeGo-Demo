(function () {
	var carousel = document.getElementsByClassName('carousel');
/*	var position = [];*/

	
		
	for (var i = 0; i < carousel.length; i++) {

		var carouselLists = carousel[i].querySelector('ul');
		carouselLists.style.marginLeft = 0 + 'px'; //задаем начальную позицию
		
		carousel[i].querySelector('.prev').addEventListener('click', function(event) {
			var list = event.target.parentNode.querySelector('ul');
			var listElems = list.querySelectorAll('li');
			var width = listElems[0].offsetWidth; // ширина элемента
			var position = parseInt(list.style.marginLeft); //считываем текщую позицию

			position = Math.min(position + width, 0)
			list.style.marginLeft = position + 'px';
		});

		carousel[i].querySelector('.next').addEventListener('click', function(event) {
			var list = event.target.parentNode.querySelector('ul');
			var listElems = list.querySelectorAll('li');
			var width = listElems[0].offsetWidth; // ширина элемента
			var count = listElems.length; //количество элементов
			var position = parseInt(list.style.marginLeft); //считываем текщую позицию

			position = Math.max(position - width, -width * (count - 1));
	  		list.style.marginLeft = position + 'px';
		});
	}
})();
