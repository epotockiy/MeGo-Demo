;(function($, undefined) {
	function slider() {
		
		var sliders = $("#slider");
		
		function init() {
			control(sliders);
			return sliders;
		}

		function control(sliders) {
			var nav = sliders.find(".left-nav");
			var centerSlider = sliders.find(".center-slider");
			var rightSlider = sliders.find(".right-slider");
			var navItems = nav.find("ul li");
			var centerSliderItems = centerSlider.find("ul li");
			var rightSliderItems = rightSlider.find("ul li");

			var centersliderElems = countCenterSLiderScroll(sliders);
			var rightSliderWidth = rightSliderWidthCalc();

			for (var i = 0; i < navItems.length; i++) {
				$(navItems[i]).attr("data-id", i+1);
			}

			for (var j = 0; j < centerSliderItems.length; j++) {
				$(centerSliderItems[j]).attr("data-id", j+1);
				$(rightSliderItems[j]).attr("data-id", j+1);
			}

			nav.on("click", function(event) {
				var target = $(event.target);
				moveCenter(nav, target, centersliderElems);
			});

			centerSlider.on("click", function(event) {
				var target = $(event.target);
				moveRight(centerSlider, target, rightSliderWidth);
			});

			function moveCenter(nav, clicked, sliderElems) {
				var clickedPosition = clicked.attr("data-id");
				var activeElem = nav.find("li.active");
				var activePosition = activeElem.attr("data-id");
				var slider = sliders.find(".center-slider ul");
				var activeSliderElem = slider.find("li.active");
				var newActiveSliderPos = 1 + (sliderElems.inColumn * (clickedPosition - 1));
				var newActiveSliderElem = slider.find("li[data-id=" + newActiveSliderPos + "]");
				var position = parseInt(slider.css("margin-top"));

				if(sliderElems.scroll != 1 && sliderElems.scroll >= clickedPosition) {
					moveRight(centerSlider, newActiveSliderElem, rightSliderWidth);
					
					activeSliderElem.removeClass("active");
					newActiveSliderElem.addClass("active");
					var moveCount = clickedPosition - activePosition;
					console.log(moveCount + ' ' + sliderElems.inColumn + " " + sliderElems.height);
					slider.css({
						"margin-top": position - (moveCount * sliderElems.inColumn * sliderElems.height)
					});
					activeElem.removeClass("active");
					clicked.addClass("active");

				}
			}

			function moveRight(centerSlider, clicked, rightSliderWidth) {
				var clickedPosition = clicked.attr("data-id");
				var activeElem = centerSlider.find("li.active");
				var activePosition = activeElem.attr("data-id");
				var slider = sliders.find(".right-slider ul");
				var activeSliderElem = slider.find("li.active");
				var newActiveSliderElem = slider.find("li[data-id=" + clickedPosition + "]");
				var position = parseInt(slider.css("margin-left"));
				var moveCount = clickedPosition - activePosition;
				
				newActiveSliderElem.addClass("active");

				if (moveCount > 0 && clickedPosition !== activePosition) {
					newActiveSliderElem.css({
						"margin-left": rightSliderWidth.width
					}).stop()
			          .animate({
			            'margin-left': 0
			          }, 300, function() {
			          	activeSliderElem.removeClass("active");
			          });

			          activeSliderElem.css({
						"margin-left": 0
					}).stop()
			          .animate({
			            'margin-left': -rightSliderWidth.width
			          }, 300);
				}
				else if(clickedPosition !== activePosition) {
					newActiveSliderElem.css({
						"margin-left": -rightSliderWidth.width
					}).stop()
			          .animate({
			            'margin-left': 0
			          }, 300, function() {
			          	activeSliderElem.removeClass("active");
			          });

			        activeSliderElem.css({
						"margin-left": 0
					}).stop()
			          .animate({
			            'margin-left': rightSliderWidth.width
			          }, 300);
				}

				activeElem.removeClass("active");
				clicked.addClass("active");
			}
		}

		function countCenterSLiderScroll(sliders) {
			var sliderHeight = sliders.find(".center-slider").height();
			var elements = sliders.find(".center-slider ul li");
			var elementHeight = elements.first().outerHeight(true);

			var countElemsInColumn = Math.floor(sliderHeight / elementHeight);
			var countScroll = Math.ceil(elements.length / countElemsInColumn);

			return {
				scroll: countScroll,
				inColumn: countElemsInColumn,
				height: elementHeight
			};
		}

		function rightSliderWidthCalc() {
			var list = sliders.find(".right-slider ul");
			var elems = list.find("li");
			var elemWidth = list.width();

			list.css({
				"width" : elemWidth
			});
			elems.css({
				"width" : elemWidth,
				"height" : list.height()
			});

			var width = elems.first().width();

			return {
				width: width
			};
		}

		return {
			init: init
		};
	}

	$(document).ready(function() {
		slider().init();
		$("#slider").hide();

	    $("header").find('li').on('click', function() {
	    	switch($(this).attr('id')) {

		        case "nav-js":
		        	$("#slider").show();
		        	$("#css-slider").hide();
		          	break;

		        case "nav-css":
		          	$("#slider").hide();
		        	$("#css-slider").show();
		        	break;

		        default:
		          	console.log("Error!");
		          	break;
	    	}
	    });		
  	});
})(jQuery);