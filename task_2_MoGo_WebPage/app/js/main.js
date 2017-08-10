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
    $(".accordion-button").click(function () {
        var panels = $('.accordion-panel');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight !== "") {
            // for (var i = 0; i < panels.length; i++) {
            //         panels[i].style.maxHeight = null;}
            panel.style.maxHeight = null;
        } else {
            for (var i = 0; i < panels.length; i++) {
                    panels[i].style.maxHeight = null;
            }
            panel.style.maxHeight = "50px";
        }
    });
});