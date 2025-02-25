document.addEventListener("DOMContentLoaded", () => {
    const lines = [
        "HI, I'M",
        "COLE PLYMPTON",
        "IT PROBLEM SOLVER"
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
            document.getElementById("resume-container").classList.remove("hidden");
        }
    }

    typeWriter();


    // Add LinkedIn and Bitbucket icons to gradient logo
    const gradientLogo = document.querySelector(".gradient-logo");
    const logoIcons = `
        <div class="logo-icon">
            <a href="https://www.linkedin.com/in/your-linkedin" target="_blank">
                <img src="assets/icons/linkedin.png" alt="LinkedIn">
            </a>
            <a href="https://bitbucket.org/your-bitbucket" target="_blank">
                <img src="assets/icons/bitbucket.png" alt="Bitbucket">
            </a>
        </div>
    `;
    gradientLogo.insertAdjacentHTML("beforeend", logoIcons);
});

document.addEventListener("DOMContentLoaded", () => {
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