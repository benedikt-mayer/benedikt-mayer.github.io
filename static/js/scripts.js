var mainNav = document.getElementById("js-menu")
var navBarToggle = document.getElementById("js-navbar-toggle")
var homeNav = document.getElementById("js-home")

navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active")
    homeNav.children[0].classList.toggle("hidden")
    navBarToggle.children[0].classList.toggle("fa-bars")
    navBarToggle.children[0].classList.toggle("fa-times")
})