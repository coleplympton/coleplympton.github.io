// hero-typing.js - Hero section typing animation

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