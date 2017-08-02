;(function($, undefined) {
  $.fn.Slider = function(config) {
    return this.each(function(index, container) {
      $(container).data('slider', new Slider(container, config));
    });
  };

  var Slider = function(container, config) {
    this.$container        = $(container);
    this.$sectionSlider     = this.$container.find('.section-slider-list');
    this.$firstLevelSlider  = this.$container.find('.section-slider ul');
    this.$secondLevelSlider = this.$container.find('.image-slider');

    this.config = $.extend({
      numberOfSections: 3,
      activeClassName: 'active',
      slideOutClassName: 'slide-out',
      firstLevelItemHeight: this.$firstLevelSlider.height() / this.$firstLevelSlider.children().length,
      imageHeight: 400,
      imageWidth: 400
    }, config);

    this.currentSlideNumber = 0;
    this.prevSlideNumber    = 0;

    this.init();
  };

  Slider.prototype.init = function() {
    this.$secondLevelList = $('<ul></ul>');
    this.$secondLevelSlider.append(this.$secondLevelList);
    this.$imageArray = [];


    this.$firstLevelSlider.parent().css({
      'height': this.config.firstLevelItemHeight * this.config.numberOfSections,
      'overflow-y': 'hidden'
    });

    for(var i = 0; i < this.$firstLevelSlider.children().length; ++i) {
      this.$firstLevelSlider.children().eq(i).attr('data-image-number', i);
      var imagePath = 'images/image' + (i + 1) + '.jpg';
      this.$imageArray.push($('<li><div class="image" style="background-image: url(' + imagePath + ');"></div></li>'));
    }

    for(var i = 0; i < this.$sectionSlider.children().length; ++i) {
      this.$sectionSlider.children().eq(i).attr('data-section-number', i);
    }

    this.$secondLevelSlider.css({
      'width': this.config.imageWidth,
      'overflow-x': 'hidden'
    });

    this.$secondLevelList.css({
      'width': this.config.imageWidth,
      'height': this.config.imageHeight
    });

    this.$secondLevelList.append(this.$imageArray[0]);

    this.bindSectionSwitch();
    this.setAndBindSliderSwitch();
  };

  Slider.prototype.showNextSlide = function() {
    if(this.prevSlideNumber !== this.currentSlideNumber) {
      var self = this;

      this.$secondLevelList.append(this.$imageArray[this.currentSlideNumber]);
      this.$secondLevelList.children().last()
          .css('margin-left', -this.config.imageWidth)
          .stop()
          .animate({
            'margin-left': 0
          }, 300);
      this.$secondLevelList.children().first()
          .stop()
          .animate({
            'margin-left': this.config.imageWidth
          }, 300, function() {
            self.$secondLevelList.children().first().remove();
          });

      this.prevSlideNumber = this.currentSlideNumber;
    }
  };

  Slider.prototype.bindSectionSwitch = function() {
    var self = this, prevSectionNumber = 0;

    this.$sectionSlider.on('click', '.image-section', function(event) {
      event.preventDefault();
      var sectionNumber = $(this).data('section-number'),
          currentSlideMargin = -sectionNumber * self.config.firstLevelItemHeight * self.config.numberOfSections;

      self.$firstLevelSlider.stop().animate({
        'margin-top': currentSlideMargin
      });

      self.currentSlideNumber = sectionNumber * self.config.numberOfSections;
      if(self.currentSlideNumber !== self.prevSlideNumber) {
        self.showNextSlide();
      }
    });
  };

  Slider.prototype.setAndBindSliderSwitch = function() {
    var self = this;

    this.$firstLevelSlider.on('click', 'li', function() {
      self.currentSlideNumber = $(this).data('image-number');

      if(self.currentSlideNumber !== self.prevSlideNumber) {
        self.showNextSlide();
      }

      self.prevSlideNumber = self.currentSlideNumber;
    });
  }
})(jQuery);
