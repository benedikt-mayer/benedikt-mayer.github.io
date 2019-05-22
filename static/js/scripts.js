var mainNav = document.getElementById("js-menu")
var navBarToggle = document.getElementById("js-navbar-toggle")
var homeNav = document.getElementById("js-home")
var imageContainers = [...document.getElementsByClassName("image")]

navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active")
    homeNav.children[0].classList.toggle("hidden")
    navBarToggle.children[0].classList.toggle("fa-bars")
    navBarToggle.children[0].classList.toggle("fa-times")
})
console.log(imageContainers)
imageContainers.forEach(imageContainer => {
    imageContainer.addEventListener("click", function () {
        captions = [...imageContainer.getElementsByClassName("caption")]
        captions.forEach(caption => {
            caption.classList.toggle("visible")
        })
        images = [...imageContainer.getElementsByTagName("p")]
        images.forEach(image => {
            image.classList.toggle("hover")
        })
    })
});

navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active")
    homeNav.children[0].classList.toggle("hidden")
    navBarToggle.children[0].classList.toggle("fa-bars")
    navBarToggle.children[0].classList.toggle("fa-times")
})