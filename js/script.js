document.addEventListener("DOMContentLoaded", () => {
    // Hero text animation
    const lines = [
        "HI, I'M",
        "COLE PLYMPTON",
        "IT SPECIALIST",
        "& DIGITAL SOLUTIONS DEVELOPER"
    ];

    const heroText = document.getElementById("hero-text");
    
    if (heroText) {
        // Clear any existing content and pre-create structure
        heroText.innerHTML = '';
        
        // Create a div for each line
        lines.forEach((line, index) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'typed-line';
            lineDiv.id = `line-${index}`;
            heroText.appendChild(lineDiv);
        });
        
        // Start typing animation with faster speeds
        typeWriter(lines, 0, 0, 80, 80); // Reduced typing speed and line delay
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
            
            // Add progress bar to active link
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            link.appendChild(progressBar);
        } else {
            link.classList.remove("active");
        }
    });
    
    // Scroll progress indicator
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initialize scroll position
    updateScrollProgress();
});

/**
 * Recursive function to create a typewriter effect
 * @param {Array} lines - Array of text lines to animate
 * @param {number} lineIndex - Current line index
 * @param {number} charIndex - Current character index
 * @param {number} typingSpeed - Speed of typing animation in ms
 * @param {number} lineDelay - Delay between lines in ms
 */
function typeWriter(lines, lineIndex, charIndex, typingSpeed, lineDelay) {
    if (lineIndex < lines.length) {
        const line = lines[lineIndex];
        const currentLineElement = document.getElementById(`line-${lineIndex}`);

        if (charIndex < line.length) {
            // Append the character to the current line
            currentLineElement.textContent += line.charAt(charIndex);
            charIndex++;
            
            // Make the resume button appear when last line starts typing
            if (lineIndex === lines.length - 1 && charIndex === 1) {
                showResumeButton();
            }
            
            setTimeout(() => typeWriter(lines, lineIndex, charIndex, typingSpeed, lineDelay), typingSpeed);
        } else {
            lineIndex++;
            charIndex = 0;
            
            // If last line is completed, show resume button (as a fallback)
            if (lineIndex === lines.length) {
                showResumeButton();
            }
            
            setTimeout(() => typeWriter(lines, lineIndex, charIndex, typingSpeed, lineDelay), lineDelay);
        }
    }
}

/**
 * Shows the resume button by removing the hidden class
 */
function showResumeButton() {
    const resumeContainer = document.getElementById("resume-container");
    if (resumeContainer) {
        resumeContainer.classList.remove("hidden");
    }
}

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