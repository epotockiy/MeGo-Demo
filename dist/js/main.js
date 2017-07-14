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
// Поиск всех внутренних оступов у кнопок аккордеона
var panelPaddingCalc = function(panel) {
    return parseInt(window.getComputedStyle(panel).paddingTop) + parseInt(window.getComputedStyle(panel).paddingBottom);
}
    var acc = document.getElementsByClassName("accordion");

    for (var i = 0; i < acc.length; i++) {    
        acc[i].onclick = function() {
            var activeButton = document.querySelector(".what-we-do-accordion .active");

            if(activeButton != null) {
                var activePanel = activeButton.nextElementSibling; //выпадающая текстовая панель с классом .active
                var activePanelText = activePanel.getElementsByTagName("p");
            }
             
            var buttonHeight = this.offsetHeight * i; // высота всех кнопок
            var buttonMargin = buttonsMarginCalc(); // высота всех отступов у кнопок
            
            var parentContainer = this.parentNode; // родительский контейнер с заданной высотой
            var parentHeight = parentContainer.offsetHeight; // находим выосту контейнера

            var panel = this.nextElementSibling; // панель с текстом
            var panelText = panel.getElementsByTagName("p"); // текст внутри панели
            var panelPadding = panelPaddingCalc(panel); // поиск внутренних отступов у панели с текстом

            if (activeButton == null) {
                panel.style.maxHeight = parentHeight - buttonHeight - buttonMargin + "px";
                this.classList.toggle("active");
                panelPadding = panelPaddingCalc(panel);
                panelText[0].style.maxHeight = parseInt(panel.style.maxHeight) - panelPadding + "px";
                
            } else if(activeButton == this) {
                panel.style.maxHeight = null;
                panelText[0].style.maxHeight = null;
                this.classList.toggle("active");
                
            } else {
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