

	var left_pointer = document.getElementById('left-pointer');
	var right_pointer = document.getElementById('right-pointer');
	var qoutes = document.getElementsByClassName('quote-content');
	var counter = qoutes.length;
	var nextSlider = 0;

	left_pointer.addEventListener('click' , function() {
		for(var i=0; i < counter; i++) {
			if(qoutes[i].classList.contains('active')){
				nextSlider = (i-1+counter) % counter;
				qoutes[i].classList.remove('active');
				qoutes[nextSlider].classList.add('active');
				return 0;
			}
		}
	})	

	right_pointer.addEventListener('click' , function() {
		for(var i=0; i < counter; i++) {
			if(qoutes[i].classList.contains('active')){
				nextSlider = (i+1) % counter;
				qoutes[i].classList.remove('active');
				qoutes[nextSlider].classList.add('active');
				return 0;
			}
		}
	})	




