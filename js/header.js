// header.js - Header functionality and animations

document.addEventListener("DOMContentLoaded", () => {
    // Make the gradient logo clickable to go to home page
    const gradientLogo = document.querySelector(".gradient-logo");
    if (gradientLogo) {
        gradientLogo.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    // Set active navigation link based on current page
    const currentPath = window.location.pathname.split("/").pop() || "index.html"; 
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
            
            // Add progress bar to active link
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            link.appendChild(progressBar);
        } else {
            link.classList.remove("active");
        }
    });
});