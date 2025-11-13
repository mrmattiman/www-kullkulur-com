document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById('start-btn');
    const gameContainer = document.getElementById('game-container');
    const heartbeat = document.getElementById('heartbeat');
    const whisper = document.getElementById('whisper');

    // Start button
    startBtn.addEventListener('click', () => {
        startBtn.style.display = "none"; // hide button after click
        showRedCircle();
        // Play audio softly
        heartbeat.volume = 0.1;
        heartbeat.play();
        whisper.volume = 0.05;
        whisper.play();
    });

    // RED CIRCLE QUESTION
    function showRedCircle() {
        gameContainer.innerHTML = `
            <h1 style="color:red; font-size:100px;">🔴</h1>
            <p style="font-size:22px;">Tħobbu l-aħmar?</p>
            <button id="iva">Iva</button>
            <button id="le">Le</button>
        `;
        document.getElementById('iva').addEventListener('click', showYellowWorld);
        document.getElementById('le').addEventListener('click', showBlueWorld);
    }

    // YELLOW WORLD
    function showYellowWorld() {
        gameContainer.innerHTML = `
            <div style="background-color: yellow; padding:40px; border-radius:10px;">
                <p style="font-size:22px;">Tħobbu l-isfar?</p>
                <button id="yellow-iva">Iva</button>
                <button id="yellow-le">Le</button>
            </div>
        `;
        document.getElementById('yellow-iva').addEventListener('click', () => {
            gameContainer.innerHTML = `<p>Il-logħba mitmuma. Għada tirċievi r-rigal.</p>`;
        });
        document.getElementById('yellow-le').addEventListener('click', startCreepyPath);
    }

    // BLUE WORLD
    function showBlueWorld() {
        gameContainer.innerHTML = `
            <div style="background-color: blue; color:white; padding:40px; border-radius:10px;">
                <p style="font-size:22px;">Tħobbu l-blu?</p>
                <button id="blue-iva">Iva</button>
                <button id="blue-le">Le</button>
            </div>
        `;
        document.getElementById('blue-iva').addEventListener('click', () => {
            gameContainer.innerHTML = `<p>Kompli tbissem 🌈</p>`;
        });
        document.getElementById('blue-le').addEventListener('click', startCreepyPath);
    }

    // CREEPY PATH (Uneasy)
    function startCreepyPath() {
        document.body.style.backgroundColor = "#0a000a"; // dark background
        gameContainer.style.transition = "all 0.5s ease";
        gameContainer.style.color = "#ff9999";

        gameContainer.innerHTML = `
            <p style="font-size:22px;">Għaliex għażilt Le?</p>
            <input type="text" id="reason" placeholder="Ikteb hawn..." style="font-size:18px; padding:5px; width:60%; margin-top:10px;">
            <button id="submit-reason" style="font-size:18px; padding:5px 15px; margin-top:10px;">Ibgħat</button>
            <p id="feedback" style="margin-top:20px; opacity:0; font-size:20px;"></p>
        `;

        document.getElementById('submit-reason').addEventListener('click', () => {
            const reason = document.getElementById('reason').value.trim();
            const feedback = document.getElementById('feedback');
            feedback.innerText = reason === "" ? 
                "għaliex?" : 
                `…għażilt: "${reason}"qed tara?`;

            fadeIn(feedback, () => {
                showCreepyMessages();
            });
        });
    }

    // Fade-in helper
    function fadeIn(element, callback) {
        let opacity = 0;
        element.style.opacity = 0;
        const fade = setInterval(() => {
            opacity += 0.02;
            element.style.opacity = opacity;
            if(opacity >= 1) {
                clearInterval(fade);
                if(callback) callback();
            }
        }, 30);
    }

    // Creepy messages sequence
    function showCreepyMessages() {
        const messages = [
            "…xi ħaġa qed tħares.",
            "…ma tistax tmur lura.",
            "qiegħda tħares lejk.",
            "ħares warajk.",
            "mhux qed tara?",
            "għaliex għamilt hekk?"
        ];

        gameContainer.innerHTML = `<p id="creepy-text" style="opacity:0; font-size:22px;"></p>`;
        let creepyText = document.getElementById('creepy-text');
        let index = 0;

        function showNext() {
            if(index >= messages.length) {
                finalUneasyMessage();
                return;
            }

            // Subtle font and color changes
            const fonts = ["Arial","Verdana","Courier New","Georgia"];
            const sizes = [22,24,26];
            creepyText.style.fontFamily = fonts[Math.floor(Math.random()*fonts.length)];
            creepyText.style.fontSize = sizes[Math.floor(Math.random()*sizes.length)] + "px";
            creepyText.style.color = `rgb(${200+Math.floor(Math.random()*55)},0,0)`;
            creepyText.style.opacity = 0;

            creepyText.innerText = messages[index];
            fadeIn(creepyText, () => {
                setTimeout(() => {
                    index++;
                    showNext();
                }, 1500);
            });
        }

        showNext();
    }

    // Final uneasy message
    function finalUneasyMessage() {
        gameContainer.innerHTML = `<p id="final-msg" style="font-size:26px; color:#ff6666;">dejjem ħa tkun qed tħares. qatt mhux ħa titbiegħed minnek.</p>`;
        const finalMsg = document.getElementById('final-msg');

        // Slow subtle font jitter
        setInterval(() => {
            const fonts = ["Arial","Verdana","Courier New","Georgia"];
            const sizes = [26,28,30];
            finalMsg.style.fontFamily = fonts[Math.floor(Math.random()*fonts.length)];
            finalMsg.style.fontSize = sizes[Math.floor(Math.random()*sizes.length)] + "px";
        }, 500);
    }
});
