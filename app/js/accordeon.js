

	var title = document.getElementsByClassName('accordion-title');
	var content = document.getElementsByClassName('accordion-content');
	var b = 0;
	for( var i=0; i < title.length; i++) {
		title[i].addEventListener('click' , function() {
			console.log(b++);
			if(!(this.classList.contains('active'))) {
				for( var i=0; i < title.length; i++){
					title[i].classList.remove('active');
					console.log("remove");
				}
				this.classList.add('active');
			}
		})
	}




