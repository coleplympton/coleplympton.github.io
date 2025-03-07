// scroll-progress.js - Scroll position indicator functionality

document.addEventListener("DOMContentLoaded", () => {
    // Scroll progress indicator
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initialize scroll position
    updateScrollProgress();
});

/**
 * Updates the scroll progress bar for the active navigation link
 */
function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / windowHeight) * 100;
    
    document.querySelectorAll('.nav-links a.active .progress-bar').forEach(progressBar => {
        progressBar.style.width = `${scrollPercentage}%`;
    });
}