var mainNav = document.getElementById("js-menu")
var navBarToggle = document.getElementById("js-navbar-toggle")
var imageContainers = [...document.getElementsByClassName("image")]
var projectsNav = document.getElementById("js-navbar-projects-toggle")
var projectsDropdown = document.getElementById("js-projects-menu")

/**
 * image caption on click for mobile and image modal for click on medium to large devices
 */
imageContainers.forEach(imageContainer => {
    imageContainer.addEventListener("click", function () {
        // on medium to large devices, show image modal on click
        if (window.matchMedia("(min-width: 768px)").matches) {
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
    navBarToggle.children[0].classList.toggle("fa-bars")
    navBarToggle.children[0].classList.toggle("fa-times")
})

// Toggle icon color and theme
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('dark-mode-toggle');
    const iconMoon = document.getElementById('icon-moon');
    const iconSun = document.getElementById('icon-sun');
    const darkClass = 'dark-mode';

    function setIcons(isDark) {
        iconMoon.style.display = isDark ? 'inline' : 'none';
        iconSun.style.display = isDark ? 'none' : 'inline';
    }

    // Set initial state from localStorage or system preference
    const isDark = localStorage.getItem('theme') === 'dark' ||
        (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle(darkClass, isDark);
    setIcons(isDark);

    toggle.addEventListener('click', function() {
        const nowDark = !document.documentElement.classList.contains(darkClass);
        document.documentElement.classList.toggle(darkClass, nowDark);
        localStorage.setItem('theme', nowDark ? 'dark' : 'light');
        setIcons(nowDark);
    });
});