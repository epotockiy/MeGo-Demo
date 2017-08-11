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

    $(".accordion-panel").customScrollbar();

    $('#collapse-menu').collapsible({
        accordion: true,
        contentOpen: 0
    });
    // $('#collapse-menu').collapsible({
    //     contentOpen: 0 // menu item 1
    // });


    // });
});