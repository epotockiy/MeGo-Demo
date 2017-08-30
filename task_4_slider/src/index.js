import 'jquery';
import  './css/main.scss';
import {Slider} from './js/Slider';
///needed for taking all images
function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('./img/', true, /\.png$/));

///create Slider
$.fn.createNewSlider = function () {
    return this.each(function (i, baseElement) {
        new Slider(baseElement);
    });
};
$('.slider-plugin').createNewSlider();
