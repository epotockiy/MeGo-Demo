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

    this.bindSectionSwitch();
    this.setAndBindSliderSwitch();
  };

  Slider.prototype.bindSectionSwitch = function() {
    var self = this;

    this.$sectionSwitch.on('click', '.image-section', function() {
      self.$imageTitleListUl.animate({
        'margin-top': -parseInt($(this).data('section')) * self.imageTitleListItemHeight * 3
      }, 400);

    });
  };

  Slider.prototype.setAndBindSliderSwitch = function() {
    var self = this;

    this.sliderImageWidth = this.$imageSlider.find('.image').width();
    this.sliderContainerWidth = this.sliderImageWidth * this.$imageSliderUl.children().length;

    this.$imageSlider.css('width', this.sliderImageWidth);
    this.$imageSlider.css('overflow-x', 'hidden');
    this.$imageSliderUl.css('width', this.sliderContainerWidth);
    this.$imageSliderUl.find('li').css('float', 'left');

    this.$imageTitleListUl.on('click', 'li', function() {
      self.$imageSliderUl.animate({
        'margin-left': -$(this).data('number') * self.sliderImageWidth
      }, 400);
    });
  }
})(jQuery);
