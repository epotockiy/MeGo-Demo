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
(function () {
// Поиск всех оступов у кнопок аккордеона
var buttonsMarginCalc = function() {
    var acc = document.getElementsByClassName("accordion");
    var buttonsMarginHeight = 0;
    for (var i = 0; i < acc.length; i++) {
        buttonsMarginHeight += parseInt(window.getComputedStyle(acc[i]).marginTop);
    }

    return buttonsMarginHeight;
}
// Поиск всех внутренних оступов у панелей аккордеона
var panelPaddingCalc = function(panel) {
    return parseInt(window.getComputedStyle(panel).paddingTop) + parseInt(window.getComputedStyle(panel).paddingBottom);
}

var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {    
    acc[i].onclick = function() {
        var activeButton = document.querySelector(".what-we-do-accordion .active");

        if(activeButton != null) {
            var activePanel = activeButton.nextElementSibling; //открытая текстовая панель
            var activePanelText = activePanel.getElementsByTagName("p"); // текст открытой панели
        }
         
        var buttonHeight = this.offsetHeight * i; // высота всех кнопок
        var buttonMargin = buttonsMarginCalc(); // высота всех отступов у кнопок
        
        var parentContainer = this.parentNode; // родительский контейнер с заданной высотой
        var parentHeight = parentContainer.offsetHeight; // находим высоту контейнера

        var panel = this.nextElementSibling; // панель с текстом
        var panelText = panel.getElementsByTagName("p"); // текст внутри панели
        var panelPadding = panelPaddingCalc(panel); // поиск внутренних отступов у панели с текстом

        // Высота для панелей и текста в панелях аккордиона зависит от высоты родительского контейнера.
        // Чтобы найти max высоту панели, берется высота родительского контейнера и от нее отнимается высота всех конопок + высота всех отступов между ними
        // Чтобы найти max высоту текста внутри панели, берется высота панели и от нее отнимаются внутренние отсутпы
        // Высота контейнера и все отступы задаются через css
        if (activeButton == null) { // если все вкладки закрыты
            panel.style.maxHeight = parentHeight - buttonHeight - buttonMargin + "px";
            this.classList.toggle("active");
            panelPadding = panelPaddingCalc(panel);
            panelText[0].style.maxHeight = parseInt(panel.style.maxHeight) - panelPadding + "px";
            
        } else if(activeButton == this) { // если кликают на открытую вкалдку
            panel.style.maxHeight = null;
            panelText[0].style.maxHeight = null;
            this.classList.toggle("active");
            
        } else { // если кликают на закрытую вкалдку, и при этом есть открытая
            activePanel.style.maxHeight = null;
            activePanelText[0].style.maxHeight = null;
            activeButton.classList.remove("active");
            
            this.classList.toggle("active");
            panel.style.maxHeight = parentHeight - buttonHeight - buttonMargin + "px";
            panelPadding = panelPaddingCalc(panel);
            panelText[0].style.maxHeight = parseInt(panel.style.maxHeight) - panelPadding + "px";
        }        
    }
}
})();
(function () {
	var carousel = document.getElementsByClassName('carousel');
	
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