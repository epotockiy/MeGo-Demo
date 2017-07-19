let accordionBtns    = document.getElementsByClassName('accordion-btn');
let accordionItems   = document.getElementsByClassName('accordion-item');
let accordionPanels  = document.getElementsByClassName('panel');
let simplebarContent = document.getElementsByClassName('simplebar-content');

new SimpleBar(accordionPanels[0], {
	autoHide: true
});
new SimpleBar(accordionPanels[1], {
	autoHide: true
});
new SimpleBar(accordionPanels[2], {
	autoHide: true
});

accordionItems[0].style.borderBottom = '1px solid #e5e5e5';
accordionBtns[0].nextElementSibling.style.maxHeight = '146px';
accordionBtns[0].nextElementSibling.style.margin = '15px 25px 19px 20px';
accordionBtns[0].classList.toggle('active-btn');

for(let i = 0; i < accordionItems.length; ++i) {
	accordionBtns[i].onclick = function() {
		let panel = this.nextElementSibling;

		if(panel.style.maxHeight) {
			panel.style.maxHeight = null;
			panel.style.margin = '0 25px 0 20px';
			this.classList.toggle('active-btn');
			accordionItems[i].style.borderBottom = 'none';
		} else {
			for(let j = 0; j < accordionBtns.length; ++j) {
				accordionBtns[j].classList.remove('active-btn');
				let nextPanel = accordionBtns[j].nextElementSibling;

				nextPanel.style.maxHeight = null;
				nextPanel.style.margin = '0 25px 0 20px';
				accordionItems[j].style.borderBottom = 'none';
			}

			this.classList.toggle('active-btn');
			panel.style.maxHeight = '146px';
			panel.style.margin = '15px 25px 19px 20px';
			accordionItems[i].style.borderBottom = '1px solid #e5e5e5';
		}
	}
}
