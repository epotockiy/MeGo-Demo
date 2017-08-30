import 'jquery';
import  './css/main.scss';
// import './img/**/*'
var Slider = (function () {
    function Slider(numberOfSubMenuElements) {
        this.submenuContainer = $('.slider-submenu-container');
        // this.sliderContainerImage = $('.image-container');
        this.sliderImage = $('.slider-image');
        this.sliderSubMenu = $('.slider-submenu');
        this.numberOfSubMenuElements = numberOfSubMenuElements;
        this.sliderMenu = $('.slider-menu');
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
        var preventSecondaryAnimation=-1;
        this.sliderSubMenu.click(function (e) {
            var target = e.target;
            var dataIdOfSubMenuElement = target.getAttribute('data-subMenuItemId');
            if (dataIdOfSubMenuElement && dataIdOfSubMenuElement!==preventSecondaryAnimation) {
                preventSecondaryAnimation=dataIdOfSubMenuElement;
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
        this.submenuContainer.animate({top: -dataIdOfMenuElement * this.numberOfSubMenuElements * 45 + 'px'}, "slow");
    };
    // Slider.prototype.subMenuSlideAnimation = function () {
    //
    // };
    return Slider;
})();
function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('./img/', true, /\.png$/));
var slider = new Slider(3);

