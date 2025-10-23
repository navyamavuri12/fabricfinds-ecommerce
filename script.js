// --- Product Image Switching Logic ---

// Get the main image element (the big one)
var MainImg = document.getElementById("MainImg");

// Get all the small image elements (the four thumbnails)
var smallimg = document.getElementsByClassName("small-image");

// Function to handle the click on small images
function changeMainImage(event) {
    // 1. Change the source of the main image to the source of the clicked small image
    MainImg.src = event.target.src;

    // 2. Update the border style (optional, but good for visual feedback)
    // Remove 'active' class from all small images first
    for (let i = 0; i < smallimg.length; i++) {
        smallimg[i].classList.remove('active');
    }
    // Add 'active' class to the clicked small image
    event.target.classList.add('active');
}

// Attach the function to every small image when the page loads
for (let i = 0; i < smallimg.length; i++) {
    smallimg[i].addEventListener('click', changeMainImage);
}

// Set the first image as active when the page first loads
if (smallimg.length > 0) {
    smallimg[0].classList.add('active');
}