// $(function () {
//
//     $(".accordion-button").click(function () {
//
//         var panels = $('.accordion-panel');
//         for (var i = 0; i < panels.length; i++) {
//             panels[i].style.maxHeight = null;
//         }
//         var panel = this.nextElementSibling;
//         console.log(panel);
//         if (panel.classList.contains("active-panel")) {
//             panel.style.maxHeight = null;
//             panel.classList.remove('active-panel');
//             console.log('kek');
//         } else {
//             panel.style.maxHeight = panel.scrollHeight + "px";
//             panel.classList.add('active-panel');
//         }
//     });
// });
$(function () {
    // $(".accordion-button").click(function () {
    //     var panels = $('.accordion-panel');
    //     var panel = this.nextElementSibling;
    //     if (panel.style.height !== "") {
    //         // for (var i = 0; i < panels.length; i++) {
    //         //         panels[i].style.maxHeight = null;}
    //         panel.style.height = null;
    //     } else {
    //         for (var i = 0; i < panels.length; i++) {
    //                 panels[i].style.height = null;
    //         }
    //         panel.style.height = "50px";
    //     }
    // var menu=document.getElementsByClassName('icon-menu')[0];

    // var icon_menu = $('.icon-menu');
    // console.log(icon_menu);
    $('.icon-menu').click(function () {

        toggleResponsiveMenu();
    });
    function toggleResponsiveMenu() {
        $('.menu').toggleClass('responsive');

        // var icon_menu = document.getElementsByClassName('icon-menu')[0];
        // if (icon_menu.className === "topnav") {
        //     icon_menu.className += " responsive";
        // } else {
        //     icon_menu.className = "topnav";
        // }
    }

    $(document).ready(function () {
        $('.bxslider').bxSlider({
            pager: false
        });
    });
    $(".accordion-panel").customScrollbar({});

    $('.accordion').collapsible({
        accordion: true,
        contentOpen: 0,
        animate: false
        // accordionUpSpeed: 150,
        // accordionDownSpeed: 400,
        //
        // collapseSpeed: 400,

    });
    $(".viewport").css("width", "auto")

});