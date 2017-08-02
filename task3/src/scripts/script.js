;(function($, undefined) {
  $(function() {
    $('.choose-buttons').find('button').on('click', function() {
      switch($(this).data('type')) {
        case 'js':
          initJQuerySlider();
          break;

        case 'css':
          initCSSSlider();
          break;

        default:
          console.log('Wrong type!');
          break;
      }
    });

    function initJQuerySlider() {
      $('.css-slider').hide();

      var $slider = $('.slider');
      $slider.show();

      if(!$slider.data('slider')) {
        $slider.Slider({
          numberOfSections: 3,
          activeClassName: 'active',
          slideOutClassName: 'slide-out'
        });
      }
    }

    function initCSSSlider() {
      var self = this;

      this.$container         = $('.css-slider');
      this.$sectionSwitch     = this.$container.find('.section-switch');
      this.$firstLevelSlider  = this.$container.find('.image-title-list ul');
      this.$secondLevelSlider = this.$container.find('.image-slider ul');
      this.$secondLevelItems  = this.$secondLevelSlider.children().find('.image');

      $('.slider').hide();
      this.$container.show();

      this.prevSlideNumber    = 0;
      this.currentSlideNumber = 0;

      this.config = {
        numberOfSections: 3,
        activeClassName: 'active',
        slideOutClassName: 'slide-out',
        firstLevelItemHeight: this.$firstLevelSlider.height() / this.$firstLevelSlider.children().length
      };

      this.$firstLevelSlider.parent().css({
        'height': this.config.firstLevelItemHeight * this.config.numberOfSections,
        'overflow-y': 'hidden'
      });


      for(var i = 0; i < this.$firstLevelSlider.children().length; ++i) {
        this.$firstLevelSlider.children().eq(i).attr('data-image-number', i);
      }

      this.$sectionSwitch.on('click', '.image-section', function() {
        var sectionNumber      = $(this).data('section-number'),
            currentSlideMargin = -sectionNumber * self.config.firstLevelItemHeight * self.config.numberOfSections;

        self.$firstLevelSlider.css({
          'margin-top': currentSlideMargin
        });

        self.currentSlideNumber = sectionNumber * self.config.numberOfSections;
        self.$secondLevelItems
            .eq(self.prevSlideNumber)
              .removeClass(self.config.slideOutClassName);

        if(self.prevSlideNumber !== self.currentSlideNumber) {
          self.$secondLevelItems
              .removeClass(self.config.slideOutClassName)
              .eq(self.prevSlideNumber)
                .removeClass(self.config.activeClassName)
                .addClass(self.config.slideOutClassName);
          self.$secondLevelItems
              .eq(self.currentSlideNumber)
              . addClass(self.config.activeClassName);
        }

        self.prevSlideNumber = self.currentSlideNumber;
      });

      this.$firstLevelSlider.on('click', 'li', function() {
        self.currentSlideNumber = $(this).data('image-number');
        self.$secondLevelItems
            .eq(self.prevSlideNumber)
              .removeClass(self.config.slideOutClassName);

        if(self.prevSlideNumber !== self.currentSlideNumber) {
          self.$secondLevelItems
              .removeClass(self.config.slideOutClassName)
              .eq(self.prevSlideNumber)
                .removeClass(self.config.activeClassName)
                .addClass(self.config.slideOutClassName);
          self.$secondLevelItems
              .eq(self.currentSlideNumber)
                .addClass(self.config.activeClassName);
        }

        self.prevSlideNumber = self.currentSlideNumber;
      });
    }
  });
})(jQuery);

