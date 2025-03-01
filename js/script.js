document.addEventListener("DOMContentLoaded", () => {
    const lines = [
        "HI, I'M",
        "COLE PLYMPTON",
        "IT SPECIALIST",
        "& DIGITAL SOLUTIONS DEVELOPER"
    ];

    const heroText = document.getElementById("hero-text");
    
    // Pre-create the structure with empty divs for each line
    if (heroText) {
        // Clear any existing content
        heroText.innerHTML = '';
        
        // Create a div for each line
        lines.forEach((line, index) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'typed-line';
            lineDiv.id = `line-${index}`;
            heroText.appendChild(lineDiv);
        });
    }
    
    let lineIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const lineDelay = 100;

    function typeWriter() {
        if (lineIndex < lines.length) {
            const line = lines[lineIndex];
            const currentLineElement = document.getElementById(`line-${lineIndex}`);

            if (charIndex < line.length) {
                // Append the character to the current line
                currentLineElement.textContent += line.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
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
    
    // Scroll progress indicator
    window.addEventListener('scroll', updateScrollProgress);
    
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / windowHeight) * 100;
        
        document.querySelectorAll('.nav-links a.active').forEach(activeLink => {
            const progressBar = activeLink.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = `${scrollPercentage}%`;
            }
        });
    }
    
    // Add progress bar to active link
    document.querySelectorAll('.nav-links a.active').forEach(activeLink => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        activeLink.appendChild(progressBar);
        
        // Initialize scroll position
        updateScrollProgress();
    });
});