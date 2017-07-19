let navbarNav = document.getElementById("navbar-nav");
let navbarOpen = document.getElementById("navbar-open");
let navbarClose = document.getElementById("navbar-close");
navbarOpen.onclick = onNavbarTogglerClick;
navbarClose.onclick = onNavbarTogglerClick;


function onNavbarTogglerClick() {
if (navbarNav.className === "navbar-nav") {
      navbarNav.className += " responsive";
  } else {
      navbarNav.className = "navbar-nav";
  }
};
