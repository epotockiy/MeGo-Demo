;(function($, undefined) {
  $.fn.Slider = function(config) {
    return this.each(function(index, container) {
      $(container).data('slider', new Slider(container, config));
    });
  };

  var Slider = function(container, config) {
    this.$container         = $(container);
    this.$sectionSlider     = this.$container.find('.section-slider-list');
    this.$firstLevelSlider  = this.$container.find('.section-slider ul');
    this.$secondLevelSlider = this.$container.find('.image-slider');

    this.config = $.extend({
      numberOfSections: 3,
      activeClassName: 'active',
      slideOutClassName: 'slide-out',
      firstLevelItemHeight: this.$firstLevelSlider.height() / this.$firstLevelSlider.children().length,
      imageHeight: 400,
      imageWidth: 400,
      sliderType: 'js'
    }, config);

    this.currentSlideNumber = 0;
    this.prevSlideNumber    = 0;

    this.init();
  };

  Slider.prototype.init = function() {
    this.createInitialMarkup();
    this.bindSectionSwitch();
    this.setAndBindSliderSwitch();
  };

  Slider.prototype.createInitialMarkup = function() {
    this.$container.find('p.title').remove();
    this.$container.prepend('<p class="title">' + this.config.sliderType.toUpperCase() + 'slider</p>');

    this.$secondLevelList = $('<ul></ul>');
    this.$imageArray = [];

    if(!this.$secondLevelSlider.find('ul').length) {
      this.$secondLevelSlider.append(this.$secondLevelList);
    }
    this.$firstLevelSlider.parent().css({
      'height': this.config.firstLevelItemHeight * this.config.numberOfSections,
      'overflow-y': 'hidden'
    });

    this.$secondLevelSlider.css({
      'width': this.config.imageWidth,
      'overflow-x': 'hidden'
    });

    this.$secondLevelList.css({
      'width': this.config.imageWidth,
      'height': this.config.imageHeight
    });

    for(var i = 0; i < this.$firstLevelSlider.children().length; ++i) {
      this.$firstLevelSlider.children().eq(i).attr('data-image-number', i);
      var imagePath = 'images/image' + (i + 1) + '.jpg';
      this.$imageArray.push(
          $('<li>' +
              '<div class="image ' + (this.config.sliderType === 'css' ? 'image-margin' : '') +'"' +
              ' style="background-image: url(' + imagePath + ');">' +
              '</div>' +
              '</li>')
      );
    }

    for(var i = 0; i < this.$sectionSlider.children().length; ++i) {
      this.$sectionSlider.children().eq(i).attr('data-section-number', i);
    }
    //add comments
    this.$imageArray[0].find('.image').addClass('active');
    this.$secondLevelList.append(this.$imageArray[0]);
  };

  Slider.prototype.showNextSlideJQuery = function() {
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
    }

    this.prevSlideNumber = this.currentSlideNumber;
  };

  Slider.prototype.showNextSlideCSS = function() {
    if(this.prevSlideNumber !== this.currentSlideNumber) {
      var self = this;
      this.$imageArray[this.currentSlideNumber].find('.image')[0].className = 'image image-margin';
      this.$secondLevelList.append(this.$imageArray[this.currentSlideNumber]);

      setTimeout(function() {
        self.$secondLevelList.children().first().find('.image')
            .removeClass(self.config.activeClassName)
            .removeClass(self.config.slideOutClassName);

        self.$secondLevelList.children().first().find('.image')
            .removeClass(self.config.activeClassName)
            .addClass(self.config.slideOutClassName);

        self.$secondLevelList.children().last().find('.image')
            .removeClass(self.config.slideOutClassName)
            .addClass(self.config.activeClassName);
      }, 1);

      this.removeTimer = setTimeout(function () {
        if(self.$secondLevelList.children().length > 1) {
          self.$secondLevelList.children().first().remove();
        }
      }, 301);
    }

    this.prevSlideNumber = this.currentSlideNumber;
  };

  Slider.prototype.bindSectionSwitch = function() {
    var self = this, prevSectionNumber = 0;

    this.$sectionSlider.on('click', '.image-section', function(event) {
      event.preventDefault();
      var sectionNumber = $(this).data('section-number'),
          currentSlideMargin = -sectionNumber * self.config.firstLevelItemHeight * self.config.numberOfSections;

      self.currentSlideNumber = sectionNumber * self.config.numberOfSections;
      self.$firstLevelSlider.css({
        'margin-top': currentSlideMargin
      });

      switch(self.config.sliderType) {
        case 'js':
          self.showNextSlideJQuery();
          break;

        case 'css':
          self.showNextSlideCSS();
          break;

        default:
          console.log('Wrong type of slider!');
          break
      }
    });
  };

  Slider.prototype.setAndBindSliderSwitch = function() {
    var self = this;

    this.$firstLevelSlider.on('click', 'li', function() {
      self.currentSlideNumber = $(this).data('image-number');
      switch(self.config.sliderType) {
        case 'js':
          self.showNextSlideJQuery();
          break;

        case 'css':
          self.showNextSlideCSS();
          break;

        default:
          console.log('Wrong type of slider!');
          break
      }
    });
  }
})(jQuery);
