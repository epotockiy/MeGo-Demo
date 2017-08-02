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
          slideOutClassName: 'slide-out',
          imageHeight: 300,
          imageWidth: 400
        });
      }
    }

    function initCSSSlider() {
      var self = this;

      this.$container         = $('.css-slider');
      this.$sectionSwitch     = this.$container.find('.section-slider-list');
      this.$firstLevelSlider  = this.$container.find('.section-slider ul');
      this.$secondLevelSlider = this.$container.find('.image-slider');

      $('.slider').hide();
      this.$container.show();

      this.prevSlideNumber    = 0;
      this.currentSlideNumber = 0;

      this.config = {
        numberOfSections: 3,
        activeClassName: 'active',
        slideOutClassName: 'slide-out',
        firstLevelItemHeight: this.$firstLevelSlider.height() / this.$firstLevelSlider.children().length,
        imageHeight: 400,
        imageWidth: 400
      };

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
        this.$imageArray.push($('<li><div class="image" style="background-image: url(' + imagePath + ');"></div></li>'));
      }

      this.$imageArray[0].find('div').addClass('active');
      this.$secondLevelList.append(this.$imageArray[0]);

      this.$sectionSwitch.on('click', '.image-section', function() {
        var sectionNumber      = $(this).data('section-number'),
            currentSlideMargin = -sectionNumber * self.config.firstLevelItemHeight * self.config.numberOfSections;

        self.$firstLevelSlider.css({
          'margin-top': currentSlideMargin
        });

        self.currentSlideNumber = sectionNumber * self.config.numberOfSections;
        showNextSlide();
      });

      this.$firstLevelSlider.on('click', 'li', function() {
        self.currentSlideNumber = $(this).data('image-number');
        showNextSlide();
      });
    }

    function showNextSlide() {
      if(this.prevSlideNumber !== this.currentSlideNumber) {
        if(this.removeTimer) {
          clearTimeout(this.removeTimer);
          this.removeTimer = 0;
        }

        var self = this;
        this.$imageArray[this.currentSlideNumber].find('div')[0].className = 'image';
        this.$secondLevelList.append(this.$imageArray[this.currentSlideNumber]);

        setTimeout(function() {
          self.$secondLevelList.children().first().find('div')
              .removeClass(self.config.activeClassName)
              .removeClass(self.config.slideOutClassName);

          self.$secondLevelList.children().first().find('div')
              .removeClass(self.config.activeClassName)
              .addClass(self.config.slideOutClassName);

          self.$secondLevelList.children().last().find('div')
              .removeClass(self.config.slideOutClassName)
              .addClass(self.config.activeClassName);
        }, 1);

        this.removeTimer = setTimeout(function () {
          self.$secondLevelList.children().first().remove();
        }, 301);
      }

      this.prevSlideNumber = this.currentSlideNumber;
    }
  });
})(jQuery);

