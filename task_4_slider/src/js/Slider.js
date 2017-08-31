var Slider = (function () {
    function Slider(baseElement) {
        this.baseElement = $(baseElement);
        this.submenuContainer = this.baseElement.find('.slider-submenu-container');
        this.sliderImage = this.baseElement.find('.slider-image');
        this.sliderImageContainer = this.baseElement.find('.image-container');
        this.sliderSubMenu = this.baseElement.find('.slider-submenu');
        this.sliderMenu = this.baseElement.find('.slider-menu');
        this.preventSecondaryAnimation = null;
        this.sliderInitializer()
    }
    Slider.prototype.sliderInitializer = function () {
        this.menuEventHandler();
        this.subMenuEventHandler();
    };
    Slider.prototype.menuEventHandler = function () {
        var self = this;
        this.sliderMenu.click(function (e) {
            var target = e.target;
            var dataIdOfMenuElement = target.getAttribute('data-menuItemId');
            if (dataIdOfMenuElement) {
                this.preventSecondaryAnimation = dataIdOfMenuElement * 3;
                self.slideTo(dataIdOfMenuElement);
            }
        })
    };
    Slider.prototype.subMenuEventHandler = function () {
        var self = this;
        this.sliderSubMenu.click(function (e) {
            var target = e.target;
            var dataIdOfSubMenuElement = target.getAttribute('data-subMenuItemId');
            if (dataIdOfSubMenuElement) {
                self.slideImage(dataIdOfSubMenuElement);
            }
        })
    };
    Slider.prototype.slideImage = function (imageNumber) {
        if (this.preventSecondaryAnimation !== Number(imageNumber)) {
            this.preventSecondaryAnimation = imageNumber;
            var newSliderImage = $('<div class="slider-image"></div>');
            var self = this;
            this.sliderImageContainer.append(newSliderImage);
            newSliderImage
                .css({'background-image': "url('img/img" + imageNumber + ".png')", 'left': '430px'})
                .animate({left: '0'}, 400, function () {
                    self.sliderImageContainer.children().first().remove()
                });
        }
        else {
            return;
        }
    };
    Slider.prototype.slideTo = function (dataIdOfMenuElement) {
        this.submenuContainer.animate({top: -dataIdOfMenuElement * 3 * 45 + 'px'}, "slow");
        this.slideImage(dataIdOfMenuElement * 3);
    };
    return Slider;
})
();
export {Slider}