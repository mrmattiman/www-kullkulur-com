const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const heartbeat = document.getElementById('heartbeat');
const whisper = document.getElementById('whisper');

startBtn.addEventListener('click', () => {
    showRedCircle();
});

// Red Circle Question
function showRedCircle() {
    gameContainer.innerHTML = `
        <h1 style="color:red; font-size:120px; text-shadow:2px 2px 5px #ff0000;">🔴</h1>
        <p style="font-size:24px;">Tħobbu l-aħmar?</p>
        <button id="iva">Iva</button>
        <button id="le">Le</button>
    `;
    document.getElementById('iva').addEventListener('click', showYellowWorld);
    document.getElementById('le').addEventListener('click', startUltimateCreepyPath);
}

// Yellow World
function showYellowWorld() {
    gameContainer.innerHTML = `
        <div style="background-color: yellow; padding:50px; border-radius:12px;">
            <p style="font-size:24px;">Tħobbu l-isfar?</p>
            <button id="yellow-iva">Iva</button>
            <button id="yellow-le">Le</button>
        </div>
    `;
    document.getElementById('yellow-iva').addEventListener('click', () => {
        gameContainer.innerHTML = `<p>Il-logħba mitmuma. Għada tirċievi r-rigal.</p>`;
    });
    document.getElementById('yellow-le').addEventListener('click', startUltimateCreepyPath);
}

// Blue World
function showBlueWorld() {
    gameContainer.innerHTML = `
        <div style="background-color: blue; color:white; padding:50px; border-radius:12px;">
            <p style="font-size:24px;">Tħobbu l-blu?</p>
            <button id="blue-iva">Iva</button>
            <button id="blue-le">Le</button>
        </div>
    `;
    document.getElementById('blue-iva').addEventListener('click', () => {
        gameContainer.innerHTML = `<p>Kompli tbissem 🌈</p>`;
    });
    document.getElementById('blue-le').addEventListener('click', startUltimateCreepyPath);
}

// Ultimate Creepy Path with Fonts & Audio
function startUltimateCreepyPath() {
    document.body.style.backgroundColor = '#0a000a';
    gameContainer.classList.add('creepy');

    // Play subtle sounds
    heartbeat.volume = 0.1;
    heartbeat.play();
    whisper.volume = 0.05;
    whisper.play();

    // Ask Għaliex?
    gameContainer.innerHTML = `
        <p style="color:#ff9999; font-size:24px;">Għaliex għażilt Le?</p>
        <input type="text" id="reason" placeholder="Ikteb hawn..." style="font-size:18px; padding:5px; width:60%;"/>
        <button id="submit-reason" style="font-size:18px; padding:5px 15px; margin-top:10px;">Ibgħat</button>
        <p id="feedback" style="margin-top:20px; opacity:0; color:#ff6666; font-size:20px;"></p>
    `;

    document.getElementById('submit-reason').addEventListener('click', () => {
        const reason = document.getElementById('reason').value.trim();
        const feedback = document.getElementById('feedback');

        feedback.innerText = reason === "" ? 
            "qed tara xi ħaġa titbiddel?" : 
            `…għażilt: "${reason}"… id-dinja qed tbiddel madwarek…`;

        let opacity = 0;
        let fade = setInterval(() => {
            opacity += 0.01;
            feedback.style.opacity = opacity;
            if(opacity >= 1) clearInterval(fade);
        }, 30);

        setTimeout(showUltimateCreepyMessages, 2500);
    });
}

// Creepy Messages with Changing Fonts
function showUltimateCreepyMessages() {
    const messages = [
        '…xi ħaġa qiegħda ħdejk',
        '…ma tistax tmur lura…',
        '…qed tħares lejk',
        'mela qed tibża?',
        '…rajt x'hemm warajk?'
    ];

    gameContainer.innerHTML = `<p id="creepy-text" style="opacity:0; font-size:24px; color:#ff9999;"></p>`;
    let creepyText = document.getElementById('creepy-text');
    let index = 0;

    function showNextMessage() {
        if(index >= messages.length) {
            ultimateFlickerGlitch();
            return;
        }

        // Random font size & style
        let fontSizes = [22,24,26,28,30,32,34];
        let fonts = ["Arial","Verdana","Courier New","Georgia","Impact","Lucida Console"];
        creepyText.style.fontSize = fontSizes[Math.floor(Math.random()*fontSizes.length)] + "px";
        creepyText.style.fontFamily = fonts[Math.floor(Math.random()*fonts.length)];
        creepyText.style.textShadow = `${Math.floor(Math.random()*5)}px ${Math.floor(Math.random()*5)}px 8px #ff0000`;

        creepyText.innerText = messages[index];
        let opacity = 0;
        let fade = setInterval(() => {
            opacity += 0.01;
            creepyText.style.opacity = opacity;
            if(opacity >= 1) clearInterval(fade);
        }, 30);

        index++;
        setTimeout(showNextMessage, 1800);
    }

    showNextMessage();
}

// Final Flicker & Continuous Font Glitch
function ultimateFlickerGlitch() {
    let count = 0;
    let interval = setInterval(() => {
        gameContainer.style.opacity = (count % 2 === 0) ? 0.3 : 1;
        let r = Math.floor(Math.random()*50);
        let b = Math.floor(Math.random()*50);
        document.body.style.backgroundColor = `rgb(${r},0,${b})`;
        gameContainer.style.textShadow = `${Math.floor(Math.random()*5)}px ${Math.floor(Math.random()*5)}px 8px #ff0000`;
        count++;
        if(count > 20) clearInterval(interval);
    }, 150);

    setTimeout(() => {
        gameContainer.innerHTML = `<p id="final-warning" style="color:#ff3333; font-size:32px;">…tħossok imsawwat u ma tistax tmur lura…</p>`;
        let finalText = document.getElementById('final-warning');
        setInterval(() => {
            let fontSizes = [30,32,34,36,38];
            let fonts = ["Arial","Verdana","Courier New","Georgia","Impact","Lucida Console"];
            finalText.style.fontSize = fontSizes[Math.floor(Math.random()*fontSizes.length)] + "px";
            finalText.style.fontFamily = fonts[Math.floor(Math.random()*fonts.length)];
            finalText.style.color = `rgb(${200+Math.floor(Math.random()*55)},0,0)`;
        }, 300);
    }, 3000);
}