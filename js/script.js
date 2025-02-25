document.addEventListener("DOMContentLoaded", () => {
    const lines = [
        "HI, I'M",
        "COLE PLYMPTON",
        "IT SPECIALIST & DIGITAL SOLUTIONS DEVELOPER"
    ];

    const heroText = document.getElementById("hero-text");
    let lineIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const lineDelay = 500;

    function typeWriter() {
        if (lineIndex < lines.length) {
            const line = lines[lineIndex];

            if (charIndex < line.length) {
                heroText.innerHTML += line.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                heroText.innerHTML += "<br>";
                lineIndex++;
                charIndex = 0;
                setTimeout(typeWriter, lineDelay);
            }
        } else {
            // Show resume link after text animation finishes
            const resumeContainer = document.getElementById("resume-container");
            if (resumeContainer) {
                resumeContainer.classList.remove("hidden");
            }
        }
    }

    // Only start typing animation if hero text element exists
    if (heroText) {
        typeWriter();
    }

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
        } else {
            link.classList.remove("active");
        }
    });
});