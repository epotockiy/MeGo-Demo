;(function($, undefined) {
  $.fn.Slider = function(config) {
    return this.each(function(index, container) {
      $(container).data('slider', new Slider(container, config));
    });
  };

  var Slider = function(container, config) {
    this.$container        = $(container);
    this.$sectionSwitch     = this.$container.find('.section-switch');
    this.$firstLevelSlider  = this.$container.find('.image-title-list ul');
    this.$secondLevelSlider = this.$container.find('.image-slider ul');
    this.$secondLevelItems  = this.$secondLevelSlider.children().find('.image');

    this.config = $.extend({
      numberOfSections: 3,
      activeClassName: 'active',
      slideOutClassName: 'slide-out',
      firstLevelItemHeight: this.$firstLevelSlider.height() / this.$firstLevelSlider.children().length
    }, config);

    this.currentSlideNumber = 0;
    this.prevSlideNumber = 0;

    this.init();
  };

  Slider.prototype.init = function() {
    this.$firstLevelSlider.parent().css({
      'height': this.config.firstLevelItemHeight * this.config.numberOfSections,
      'overflow-y': 'hidden'
    });

    for(var i = 0; i < this.$firstLevelSlider.children().length; ++i) {
      this.$firstLevelSlider.children().eq(i).attr('data-image-number', i);
    }

    for(var i = 0; i < this.$sectionSwitch.children().length; ++i) {
      this.$sectionSwitch.children().eq(i).attr('data-section-number', i);
    }

    this.$secondLevelSlider.parent().css({
      'width': this.$secondLevelItems.width(),
      'overflow-x': 'hidden'
    });

    this.$secondLevelSlider.css({
      'width': this.$secondLevelItems.width(),
      'height': this.$secondLevelItems.height()
    });

    this.$secondLevelSlider
      .find('li').css({
        'float': 'left',
        'position': 'absolute'
      });

    this.$secondLevelItems
      .css({
        'display': 'none'
      })
      .eq(0)
        .css('display', 'block');

    this.bindSectionSwitch();
    this.setAndBindSliderSwitch();
  };

  Slider.prototype.bindSectionSwitch = function() {
    var self = this, prevSectionNumber = 0;

    this.$sectionSwitch.on('click', '.image-section', function(event) {
      event.preventDefault();
      var sectionNumber = $(this).data('section-number');

      if(sectionNumber !== prevSectionNumber) {
        var currentSlideMargin = -sectionNumber * self.config.firstLevelItemHeight * self.config.numberOfSections;
        self.$firstLevelSlider.stop().animate({
          'margin-top': currentSlideMargin
        });

        var slideImages = self.$secondLevelSlider.find('li div.image');
        self.currentSlideNumber = sectionNumber * self.config.numberOfSections;

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

    this.$firstLevelSlider.on('click', 'li', function() {
      self.currentSlideNumber = $(this).data('image-number');

      if(self.currentSlideNumber !== self.prevSlideNumber) {
        self.$secondLevelItems
            .eq(self.prevSlideNumber)
            .hide('slide', { direction: 'right' }, 300);
        self.$secondLevelItems
            .eq(self.currentSlideNumber)
            .show('slide', { direction: 'left' }, 300);
      }

      self.prevSlideNumber = self.currentSlideNumber;
    });
  }
})(jQuery);
