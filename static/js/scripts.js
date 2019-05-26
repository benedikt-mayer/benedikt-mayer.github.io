var mainNav = document.getElementById("js-menu")
var navBarToggle = document.getElementById("js-navbar-toggle")
var homeNav = document.getElementById("js-home")
var imageContainers = [...document.getElementsByClassName("image")]

/**
 * image caption on click for mobile and image modal for click on desktop
 */
imageContainers.forEach(imageContainer => {
    imageContainer.addEventListener("click", function () {
        // on mobile, show caption over image on tap
        if (window.matchMedia("(max-width: 767px)").matches){
            let captions = [...imageContainer.getElementsByClassName("caption")]
            captions.forEach(caption => {
                caption.classList.toggle("visible")
            })
            let images = [...imageContainer.getElementsByTagName("p")]
            images.forEach(image => {
                image.classList.toggle("hover")
            })
        } 
        // on desktop, show image modal on click
        else{
            document.getElementById("imageModal").style.display = "grid"
            document.getElementById("imageModalImage").src = imageContainer.getElementsByTagName("p")[0].getElementsByTagName("img")[0].src.replace(".jpg", "_large.jpg")
            document.getElementById("imageModalCaption").innerHTML = imageContainer.getElementsByClassName("caption")[0].getElementsByTagName("p")[0].innerHTML
        }
    })
})

/**
 * navigation toggle for mobile
 */
navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active")
    homeNav.children[0].classList.toggle("hidden")
    navBarToggle.children[0].classList.toggle("fa-bars")
    navBarToggle.children[0].classList.toggle("fa-times")
})