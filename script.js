$(document).ready(function () {
    // Smooth scrolling for side dots
    $('.side-dots a').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    });
});

window.addEventListener("load", function () {
    const video = document.getElementById("myVideo");
    // This check is important. It prevents an error if the video element is not found.
    if (video) { 
        video.play();
    }
});