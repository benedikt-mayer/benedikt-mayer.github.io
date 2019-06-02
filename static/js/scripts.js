var mainNav = document.getElementById("js-menu")
var navBarToggle = document.getElementById("js-navbar-toggle")
var homeNav = document.getElementById("js-home")
var imageContainers = [...document.getElementsByClassName("image")]

/**
 * image caption on click for mobile and image modal for click on desktop
 */
imageContainers.forEach(imageContainer => {
    imageContainer.addEventListener("click", function () {
        // on desktop, show image modal on click
        if (window.matchMedia("(min-width: calc((760px + 10rem) / 0.7))").matches) {
            document.getElementById("imageModal").style.display = "grid"
            document.getElementById("imageModalImage").src = imageContainer.getElementsByTagName("p")[0].getElementsByTagName("img")[0].src.replace(".jpg", "_large.jpg")
            document.getElementById("imageModalCaption").innerHTML = imageContainer.getElementsByClassName("caption")[0].getElementsByTagName("p")[0].innerHTML
        }
    })
})

/**
 * close modal on escape
 */
document.addEventListener('keyup', function (event) {
    if (event.key === 'Escape') {
        document.getElementById("imageModal").style.display = "none"
    }
});

/**
 * navigation toggle for mobile
 */
navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active")
    homeNav.children[0].classList.toggle("hidden")
    navBarToggle.children[0].classList.toggle("fa-bars")
    navBarToggle.children[0].classList.toggle("fa-times")
})