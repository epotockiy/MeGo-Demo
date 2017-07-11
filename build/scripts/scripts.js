let accordionBtns = document.getElementsByClassName('accordion-btn');

for(let i = 0; i < accordionBtns.length; ++i) {
	accordionBtns[i].onclick = function() {
		this.classList.toggle('active');
		let panel = this.nextElementSibling;

		if(panel.style.maxHeight) {
			panel.style.maxHeight = null;
			panel.style.margin = 0;
		} else {
			panel.style.maxHeight = '146px';
			panel.style.margin = '15px 25px 20px 20px';
		}
	}
}

let navbarNav = document.getElementById("navbar-nav");
let navbarOpen = document.getElementById("navbar-open");
let navbarClose = document.getElementById("navbar-close");
navbarOpen.onclick = onNavbarTogglerClick;
navbarClose.onclick = onNavbarTogglerClick;


function onNavbarTogglerClick() {
if (navbarNav.className === "navbar-nav") {
      navbarNav.className += " responsive";
  } else {
      navbarNav.className = "navbar-nav";
  }
};
