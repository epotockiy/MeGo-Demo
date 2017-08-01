;(function($, undefined) {
  $.fn.Slider = function() {
    return this.each(function(index, container) {
      $(container).data('slider', new Slider(container));
    });
  };

  var Slider = function(container) {
    this.$container        = $(container);
    this.$sectionSwitch    = this.$container.find('.section-switch');
    this.$imageTitleList   = this.$container.find('.image-title-list');
    this.$imageTitleListUl = this.$imageTitleList.find('ul');
    this.$imageSlider      = this.$container.find('.image-slider');
    this.$imageSliderUl    = this.$imageSlider.find('ul');

    this.init();
  };

  Slider.prototype.init = function() {
    this.imageTitleListLength = this.$imageTitleListUl.children().length;
    this.imageTitleListItemHeight = this.$imageTitleListUl.height() / this.imageTitleListLength;
    this.$imageTitleList.css('height', this.imageTitleListItemHeight * 3);
    this.$imageTitleList.css('overflow-y', 'hidden');

    for(var i = 0; i < this.$sectionSwitch.children().length; ++i) {
      this.$sectionSwitch.children().eq(i).attr('data-section', i);
    }

    for(var i = 0; i < this.$imageTitleListUl.children().length; ++i) {
      this.$imageTitleListUl.children().eq(i).attr('data-number', i);
    }

    this.sliderImageWidth = this.$imageSlider.find('div.image').width();

    this.$imageSlider.css('width', this.sliderImageWidth);
    this.$imageSlider.css('overflow-x', 'hidden');
    this.$imageSliderUl.css('width', this.sliderImageWidth).css('height', this.sliderImageWidth);
    this.$imageSliderUl
      .find('li').css({
        'float': 'left',
        'position': 'absolute'
      })
      .find('div.image').css({
        'width': this.sliderImageWidth,
        'display': 'none'
      })
      .eq(0).css('display', 'block');

    this.currentSlideNumber = 0;
    this.prevSlideNumber = 0;

    this.bindSectionSwitch();
    this.setAndBindSliderSwitch();
  };

  Slider.prototype.bindSectionSwitch = function() {
    var self = this, prevSectionNumber = 0;

    this.$sectionSwitch.on('click', '.image-section', function(event) {
      event.preventDefault();
      var sectionNumber = $(this).data('section');

      if(sectionNumber !== prevSectionNumber) {
        self.$imageTitleListUl.stop().animate({
          'margin-top': -sectionNumber * self.imageTitleListItemHeight * 3
        });

        var slideImages = self.$imageSliderUl.find('li div.image');
        self.currentSlideNumber = sectionNumber * 3;

        slideImages
            .eq(self.prevSlideNumber)
            .hide('slide', { direction: 'right' }, 400);
        slideImages
            .eq(self.currentSlideNumber)
            .show('slide', { direction: 'left' }, 400, function() {
              self.prevSlideNumber = self.currentSlideNumber;
            });

        prevSectionNumber = sectionNumber;
      }
    });
  };

  Slider.prototype.setAndBindSliderSwitch = function() {
    var self = this;

    this.$imageTitleListUl.on('click', 'li', function() {
      var slideImages = self.$imageSliderUl.find('li div.image');
      self.currentSlideNumber = $(this).data('number');

      if(self.currentSlideNumber !== self.prevSlideNumber) {
        slideImages
            .eq(self.prevSlideNumber)
            .hide('slide', { direction: 'right' }, 300);
        slideImages
            .eq(self.currentSlideNumber)
            .show('slide', { direction: 'left' }, 300);
      }

      self.prevSlideNumber = self.currentSlideNumber;
    });
  }
})(jQuery);
