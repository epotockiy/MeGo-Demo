

	var mobile_icon = document.getElementsByClassName('mobile-menu');
	var mobile_menu_list = document.getElementsByClassName('top-navbar-list');
	
	[].forEach.call(mobile_icon, function(el) {
		el.addEventListener('click' , function() {
			for( var i=0; i < mobile_menu_list.length; i++)  {
				if(mobile_menu_list[i].classList.contains('mobile-active')) {
					mobile_menu_list[i].classList.remove('mobile-active');
				}else{
					mobile_menu_list[i].classList.add('mobile-active');
				}

			}
		})
	})




		
