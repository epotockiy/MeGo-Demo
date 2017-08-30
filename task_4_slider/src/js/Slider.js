
var Slider = (function () {
    function Slider(baseElement) {
        this.baseElement=$(baseElement);
        this.submenuContainer = this.baseElement.find('.slider-submenu-container');
        // this.sliderContainerImage = $('.image-container');
        this.sliderImage = this.baseElement.find('.slider-image');
        this.sliderSubMenu = this.baseElement.find('.slider-submenu');
        this.sliderMenu = this.baseElement.find('.slider-menu');
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
                self.slideTo(dataIdOfMenuElement);
            }
        })
    };
    Slider.prototype.subMenuEventHandler = function () {
        var self = this;
        var preventSecondaryAnimation = null;
        this.sliderSubMenu.click(function (e) {
            var target = e.target;
            var dataIdOfSubMenuElement = target.getAttribute('data-subMenuItemId');
            if (dataIdOfSubMenuElement && dataIdOfSubMenuElement !== preventSecondaryAnimation) {
                preventSecondaryAnimation = dataIdOfSubMenuElement;
                self.slideImage(dataIdOfSubMenuElement);
            }
        })
    };
    Slider.prototype.slideImage = function (imageNumber) {
        this.sliderImage.animate({opacity: 0}, 'slow', function () {
            $(this)
                .css('background-image', "url('img/img" + imageNumber + ".png')")
                .animate({opacity: 1});
        });

    };
    Slider.prototype.slideTo = function (dataIdOfMenuElement) {
        this.submenuContainer.animate({top: -dataIdOfMenuElement * 3 * 45 + 'px'}, "slow");
    };
    // Slider.prototype.subMenuSlideAnimation = function () {
    //
    // };
    return Slider;
})();
export {Slider}