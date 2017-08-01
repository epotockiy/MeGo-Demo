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
        var self = this;
        $('.slider').css('display', 'none');

        this.currentSlideNumber = 0;
        this.prevSlideNumber = 0;

        this.$container        = $('.css-slider').css('display', 'block');
        this.$sectionSwitch    = this.$container.find('.section-switch');
        this.$imageTitleList   = this.$container.find('.image-title-list');
        this.$imageTitleListUl = this.$imageTitleList.find('ul');
        this.$imageSlider      = this.$container.find('.image-slider');
        this.$imageSliderUl    = this.$imageSlider.find('ul');

        this.imageTitleListLength = this.$imageTitleListUl.children().length;
        this.imageTitleListItemHeight = this.$imageTitleListUl.height() / this.imageTitleListLength;
        this.$imageTitleList.css('height', this.imageTitleListItemHeight * 3);
        this.$imageTitleList.css('overflow-y', 'hidden');
        this.$sliderDivs = self.$imageSliderUl.children().find('div');

        for(var i = 0; i < this.$imageTitleListUl.children().length; ++i) {
          this.$imageTitleListUl.children().eq(i).attr('data-number', i);
        }

        this.$sectionSwitch.on('click', '.image-section', function() {
          self.$imageTitleListUl.css({
            'margin-top': -$(this).data('section') * self.imageTitleListItemHeight * 3
          });
        });

        this.$imageTitleListUl.on('click', 'li', function() {
          self.currentSlideNumber = $(this).data('number');

          console.log(self.currentSlideNumber);
          console.log(self.prevSlideNumber);

          if(self.prevSlideNumber !== self.currentSlideNumber) {
            self.$sliderDivs.removeClass('active');
            self.$sliderDivs.removeClass('slide-out');

            self.$sliderDivs
                .eq(self.prevSlideNumber)
                .addClass('slide-out');
            self.$sliderDivs
                .eq(self.currentSlideNumber)
                .addClass('active');
          }

          self.prevSlideNumber = self.currentSlideNumber;
        });
      }
    });
  });
})(jQuery);

