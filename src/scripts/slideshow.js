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
