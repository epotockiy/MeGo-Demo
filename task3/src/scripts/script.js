;(function($, undefined) {
  $(function() {
    $('.choose-buttons').find('button').on('click', function() {
      if($(this).data('type') === 'js') {
        $('.css-slider').css('display', 'none');

        var $slider = $('.slider');
        $slider.css('display', 'block');

        if(!$slider.data('slider')) {
          $slider.Slider();
        }
      }

      if($(this).data('type') === 'css') {
        $('.slider').css('display', 'none');
        $('.css-slider').css('display', 'block');
      }
    })
  });
})(jQuery);

