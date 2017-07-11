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

let slides = document.getElementsByClassName('slide');
let currentSlide = 1;
let nextBtn = document.getElementById('next-slide-btn');
let prevBtn = document.getElementById('prev-slide-btn');

showSlide(currentSlide);

nextBtn.onclick = function() {
	if(currentSlide + 1 > slides.length) {
		currentSlide = 1;
	} else {
		currentSlide += 1;
	}

	showSlide(currentSlide);
}

prevBtn.onclick = function() {
	if(currentSlide - 1 < 1) {
		currentSlide = slides.length;
	} else {
		currentSlide -= 1;
	}

	showSlide(currentSlide);
}

function showSlide() {
	for(let i = 0; i < slides.length; ++i) {
		slides[i].style.display = "none";
	}

	slides[currentSlide - 1].style.display = "inline-block";
}
