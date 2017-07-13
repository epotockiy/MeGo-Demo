let accordionBtns = document.getElementsByClassName('accordion-btn');

for(let i = 0; i < accordionBtns.length; ++i) {
	accordionBtns[i].onclick = function() {
		let panel = this.nextElementSibling;

		if(panel.style.maxHeight) {
			panel.style.maxHeight = null;
			panel.style.margin = 0;
		} else {
			for(let j = 0; j < accordionBtns.length; ++j) {
				accordionBtns[j].classList.remove('active-btn');
				let nextPanel = accordionBtns[j].nextElementSibling;
				console.log(nextPanel);

				nextPanel.style.maxHeight = null
				nextPanel.style.margin = 0;
			}

			this.classList.toggle('active-btn');
			panel.style.maxHeight = '146px';
			panel.style.margin = '15px 25px 20px 20px';
		}
	}
}
