let accordionBtns = document.getElementsByClassName('accordion-btn');

(function() {
	accordionBtns[0].nextElementSibling.style.maxHeight = '146px';
	accordionBtns[0].nextElementSibling.style.margin = '15px 25px 20px 20px';
	accordionBtns[0].classList.toggle('active-btn');
})();

for(let i = 0; i < accordionBtns.length; ++i) {
	accordionBtns[i].onclick = function() {
		let panel = this.nextElementSibling;

		if(panel.style.maxHeight) {
			panel.style.maxHeight = null;
			panel.style.margin = '0 25px 0 20px';
			this.classList.toggle('active-btn');
		} else {
			for(let j = 0; j < accordionBtns.length; ++j) {
				accordionBtns[j].classList.remove('active-btn');
				let nextPanel = accordionBtns[j].nextElementSibling;

				nextPanel.style.maxHeight = null;
				nextPanel.style.margin = '0 25px 0 20px';
			}

			this.classList.toggle('active-btn');
			panel.style.maxHeight = '146px';
			panel.style.margin = '15px 25px 20px 20px';
		}
	}
}
