;(function($, undefined) {
  $(function() {
    var $navbarNav          = $(".menu.clearfix");
    var $expandingListItems = $navbarNav.find('.expanding');
    var $submenus           = $(".submenu");
    var $navbarOpen         = $(".navbar-open");
    var $navbarClose        = $(".navbar-close");

    $navbarOpen.on('click', function() {
      $navbarNav.show();
    });

    $navbarClose.on('click', function() {
      $navbarNav.hide();
    });

    $.each($expandingListItems, function(index) {
      $(this).on('click', function(event) {
        event.preventDefault();

        $.each($submenus, function(index) {
          $submenus.eq(index).hide();
        });
        $submenus.eq(index).show();
      });
    });
  });
})(jQuery);
