

	var left_testimonial = document.getElementById('left-testimonial');
	var right_testimonial = document.getElementById('right-testimonial');
	var testimonial = document.getElementsByClassName('testimonial-content');
	var counter = testimonial.length;
	var nextSlider = 0;

	left_testimonial.addEventListener('click' , function() {console.log(counter);
		for(var i=0; i < counter; i++) {
			if(testimonial[i].classList.contains('active')){
				nextSlider = (i-1+counter) % counter;
				testimonial[i].classList.remove('active');
				testimonial[nextSlider].classList.add('active');
				return 0;
			}
		}
	})	

	right_testimonial.addEventListener('click' , function() {
		for(var i=0; i < counter; i++) {
			if(testimonial[i].classList.contains('active')){
				nextSlider = (i+1) % counter;
				testimonial[i].classList.remove('active');
				testimonial[nextSlider].classList.add('active');
				return 0;
			}
		}
	})	




