// cable-connector-game.js
document.addEventListener('DOMContentLoaded', function() {
    // Hide the game initially
    const gameContainer = document.getElementById('cable-game-container');
    const gameButton = document.getElementById('reveal-game-button');
    
    if (gameButton) {
        gameButton.addEventListener('click', function() {
            gameContainer.classList.remove('hidden');
            gameButton.classList.add('hidden');
            initGame();
            
            // Scroll to the game container
            gameContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Game variables
    let score = 0;
    let timeLeft = 60; // 60 seconds
    let gameActive = false;
    let timer;
    let cables = [];
    let ports = [];
    let connectedPairs = 0;
    let requiredPairs = 5; // Number of successful connections needed
    
    // Cable types with matching ports
    const cableTypes = [
        { 
            name: 'Ethernet', 
            cableImg: 'assets/game/ethernet-cable.png', 
            portImg: 'assets/game/ethernet-port.png' 
        },
        { 
            name: 'HDMI', 
            cableImg: 'assets/game/hdmi-cable.png', 
            portImg: 'assets/game/hdmi-port.png' 
        },
        { 
            name: 'SDI', 
            cableImg: 'assets/game/sdi-cable.png', 
            portImg: 'assets/game/sdi-port.png' 
        },
        { 
            name: 'XLR', 
            cableImg: 'assets/game/xlr-cable.png', 
            portImg: 'assets/game/xlr-port.png' 
        },
        { 
            name: 'Coaxial', 
            cableImg: 'assets/game/coaxial-cable.png', 
            portImg: 'assets/game/coaxial-port.png' 
        },
        { 
            name: 'USB', 
            cableImg: 'assets/game/usb-cable.png', 
            portImg: 'assets/game/usb-port.png' 
        },
        { 
            name: 'DisplayPort', 
            cableImg: 'assets/game/displayport-cable.png', 
            portImg: 'assets/game/displayport-port.png' 
        }
    ];
    
    function initGame() {
        // Reset game state
        score = 0;
        timeLeft = 60;
        gameActive = true;
        connectedPairs = 0;
        
        // Get game elements
        const timerDisplay = document.getElementById('game-timer');
        const scoreDisplay = document.getElementById('game-score');
        const cableContainer = document.getElementById('cable-container');
        const portContainer = document.getElementById('port-container');
        const gameResult = document.getElementById('game-result');
        
        // Clear containers
        cableContainer.innerHTML = '';
        portContainer.innerHTML = '';
        gameResult.innerHTML = '';
        
        // Update displays
        timerDisplay.textContent = timeLeft;
        scoreDisplay.textContent = score;
        
        // Select random cable types for this round
        const selectedTypes = [...cableTypes];
        shuffleArray(selectedTypes);
        const roundTypes = selectedTypes.slice(0, requiredPairs);
        
        // Create cables and ports
        cables = [];
        ports = [];
        
        roundTypes.forEach(type => {
            // Create cable
            const cable = document.createElement('div');
            cable.className = 'cable-item';
            cable.dataset.type = type.name;
            cable.innerHTML = `<img src="${type.cableImg}" alt="${type.name} Cable" draggable="true">`;
            cableContainer.appendChild(cable);
            cables.push(cable);
            
            // Create port
            const port = document.createElement('div');
            port.className = 'port-item';
            port.dataset.type = type.name;
            port.innerHTML = `<img src="${type.portImg}" alt="${type.name} Port">`;
            portContainer.appendChild(port);
            ports.push(port);
            
            // Make cable draggable
            cable.setAttribute('draggable', true);
            cable.addEventListener('dragstart', handleDragStart);
        });
        
        // Shuffle the port order to make it more challenging
        shufflePortElements(portContainer);
        
        // Setup port drop zones
        ports.forEach(port => {
            port.addEventListener('dragover', handleDragOver);
            port.addEventListener('drop', handleDrop);
            // Add dragenter and dragleave events for better visual feedback
            port.addEventListener('dragenter', function(e) {
                e.preventDefault();
                this.classList.add('dragover');
            });
            port.addEventListener('dragleave', function(e) {
                this.classList.remove('dragover');
            });
        });
        
        // Start the timer
        startTimer();
    }
    
    function handleDragStart(e) {
        // Only allow dragging if not already connected
        if (e.target.closest('.cable-item').classList.contains('connected')) {
            e.preventDefault();
            return false;
        }
        
        e.dataTransfer.setData('text/plain', e.target.closest('.cable-item').dataset.type);
        e.target.closest('.cable-item').classList.add('dragging');
    }
    
    function handleDragOver(e) {
        e.preventDefault(); // Allow drop
        // Don't highlight if already connected
        if (!e.target.closest('.port-item').classList.contains('connected')) {
            e.target.closest('.port-item').classList.add('dragover');
        }
    }
    
    function handleDrop(e) {
        e.preventDefault();
        const portElement = e.target.closest('.port-item');
        portElement.classList.remove('dragover');
        
        // Skip if port is already connected
        if (portElement.classList.contains('connected')) {
            return;
        }
        
        const cableType = e.dataTransfer.getData('text/plain');
        const portType = portElement.dataset.type;
        
        // Find the cable element being dragged
        const cableElement = document.querySelector(`.cable-item.dragging`);
        if (!cableElement) return;
        
        cableElement.classList.remove('dragging');
        
        if (cableType === portType) {
            // Correct match
            playSound('correct');
            score += 10;
            document.getElementById('game-score').textContent = score;
            
            // Disable matched items but keep them visible with green background
            cableElement.classList.add('connected');
            portElement.classList.add('connected');
            cableElement.setAttribute('draggable', false);
            
            // Update connected pairs
            connectedPairs++;
            
            // Check if all required connections are made
            if (connectedPairs >= requiredPairs) {
                endGame(true);
            }
        } else {
            // Incorrect match
            playSound('wrong');
            score = Math.max(0, score - 5); // Subtract points, but don't go below 0
            document.getElementById('game-score').textContent = score;
            
            // Visual feedback for incorrect match
            portElement.classList.add('wrong-match');
            setTimeout(() => {
                portElement.classList.remove('wrong-match');
            }, 500);
        }
    }
    
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(function() {
            timeLeft--;
            document.getElementById('game-timer').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame(false);
            }
        }, 1000);
    }
    
    function endGame(isWin) {
        gameActive = false;
        clearInterval(timer);
        
        const gameResult = document.getElementById('game-result');
        const resultMessage = document.createElement('div');
        
        if (isWin) {
            playSound('win');
            resultMessage.innerHTML = `
                <h3>Great job!</h3>
                <p>You successfully connected all cables with a score of ${score}!</p>
                <div class="achievement">🏆 Cable Management Expert 🏆</div>
                <button id="play-again-btn" class="game-button">Play Again</button>
            `;
        } else {
            playSound('lose');
            resultMessage.innerHTML = `
                <h3>Time's up!</h3>
                <p>You connected ${connectedPairs} out of ${requiredPairs} cables.</p>
                <p>Final score: ${score}</p>
                <button id="play-again-btn" class="game-button">Try Again</button>
            `;
        }
        
        gameResult.appendChild(resultMessage);
        
        // Setup play again button
        document.getElementById('play-again-btn').addEventListener('click', function() {
            initGame();
        });
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function shufflePortElements(container) {
        const portElements = Array.from(container.children);
        container.innerHTML = '';
        shuffleArray(portElements).forEach(element => {
            container.appendChild(element);
        });
    }
    
    function playSound(type) {
        const sound = document.getElementById(`sound-${type}`);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Error playing sound:', e));
        }
    }
});