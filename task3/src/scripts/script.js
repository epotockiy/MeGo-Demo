;(function($, undefined) {
  $(function() {
    $('.choose-buttons').find('button').on('click', function() {
      if($(this).data('type') === 'js') {
        $('.css-slider').css('display', 'none');
        $('.slider').css('display', 'block').Slider();
      }

      if($(this).data('type') === 'css') {
        $('.slider').css('display', 'none');
        $('.css-slider').css('display', 'block');
      }
    })
  });
})(jQuery);

