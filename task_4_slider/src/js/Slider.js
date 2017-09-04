var Slider = (function () {
    function Slider(baseElement) {
        this.baseElement = $(baseElement);
        this.versionSwitcher = this.baseElement.find('.versionSwitcher');
        this.subMenuContainer = this.baseElement.find('.slider-submenu-container');
        this.sliderImageContainer = this.baseElement.find('.image-container');
        this.sliderSubMenu = this.baseElement.find('.slider-submenu');
        this.sliderMenu = this.baseElement.find('.slider-menu');
        this.preventSecondaryAnimation = 0;
        this.isJSVersionOfSlider = true;

        // default initializer of slider
        this.defaultSliderInitializer();
        this.switchSliderVersion();
    }

    Slider.prototype.defaultSliderInitializer = function () {
        this.removeCssSubMenuClass();
        this.sliderInitializer();
    };

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

                if (self.isJSVersionOfSlider) {
                    this.preventSecondaryAnimation = dataIdOfMenuElement * 3;
                    self.slideToJS(dataIdOfMenuElement);
                }
                else {
                    this.preventSecondaryAnimation = dataIdOfMenuElement * 3;
                    self.slideToCSS(dataIdOfMenuElement);
                }
            }
        })
    };
    Slider.prototype.subMenuEventHandler = function () {
        var self = this;
        this.sliderSubMenu.click(function (e) {
            var target = e.target;
            var dataIdOfSubMenuElement = target.getAttribute('data-subMenuItemId');
            if (dataIdOfSubMenuElement) {

                if (self.isJSVersionOfSlider) {
                    self.slideImageJS(Number(dataIdOfSubMenuElement));
                }
                else {
                    self.slideImageCSS(Number(dataIdOfSubMenuElement));
                }
            }
        })
    };


    Slider.prototype.switchSliderVersion = function () {
        var self = this;
        console.log('kek');
        this.versionSwitcher.click(function (e) {
            var target = e.target;
            var versionOfSlider = target.getAttribute('data-sliderVersion');
            if (versionOfSlider === 'jsSlider') {
                target.classList.add('active-button');
                self.removeCssSubMenuClass();
                self.removeCssImageClass();
                self.isJSVersionOfSlider = true;
                self.sliderInitializer();
                console.log('js');
            }
            else if (versionOfSlider === 'cssSlider') {
                target.classList.add('active-button');
                self.addCssSubMenuClass();
                self.isJSVersionOfSlider = false;
                self.sliderInitializer();
                console.log('css');

            }
        });
    };
    Slider.prototype.removeCssImageClass = function () {
        this.baseElement.find('.slider-image').removeClass('slide-out-effect');
    };

    Slider.prototype.addCssSubMenuClass = function () {
        this.subMenuContainer.addClass('slide-effect');

    };
    Slider.prototype.removeCssSubMenuClass = function () {
        this.subMenuContainer.removeClass('slide-effect');

    };

    ////JS version of slider
    Slider.prototype.slideImageJS = function (imageNumber) {
        if (this.preventSecondaryAnimation !== imageNumber) {
            this.preventSecondaryAnimation = imageNumber;

            var newSliderImage = $('<div class="slider-image"></div>');
            this.sliderImageContainer.append(newSliderImage);

            newSliderImage
                .css({'background-image': "url('img/img" + imageNumber + ".png')", 'right': '430px'})
                .animate({right: '0'}, 300);
            this.sliderImageContainer
                .children()
                .first()
                .animate({left: '430px'}, 300, function () {
                    $(this).remove();
                })
        }
    };

    Slider.prototype.slideToJS = function (dataIdOfMenuElement) {
        this.subMenuContainer.animate({top: -dataIdOfMenuElement * 3 * 45 + 'px'}, "slow");//margin top transition
        this.slideImageJS(dataIdOfMenuElement * 3);
    };
    ///////////////////////////////
    // CSS version
    Slider.prototype.slideToCSS = function (dataIdOfMenuElement) {
        this.subMenuContainer.css({'top': -dataIdOfMenuElement * 3 * 45 + 'px'});//margin top transition
        this.slideImageCSS(dataIdOfMenuElement * 3);
    };
    Slider.prototype.slideImageCSS = function (imageNumber) {
        if (this.preventSecondaryAnimation !== imageNumber) {
            this.preventSecondaryAnimation = imageNumber;

            var newSliderImage = $('<div class="slider-image slide-in-effect"></div>');
            this.sliderImageContainer.append(newSliderImage);
            var previousSliderImage = this.sliderImageContainer.children().first();
            previousSliderImage.addClass('slide-out-effect');

            setTimeout(function () {
                newSliderImage
                    .css({'background-image': "url('img/img" + imageNumber + ".png')", 'right': '0px'});
                previousSliderImage
                    .removeClass('slide-in-effect')
                    .addClass('slide-out-effect')
                    .css({'left': '430px'});
                setTimeout(function () {
                    previousSliderImage.remove()
                }, 300)

            }, 1)
        }
    };
    return Slider;
})();
export {Slider}