const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');

startBtn.addEventListener('click', () => {
    showRedCircle();
});

// Red Circle Question
function showRedCircle() {
    gameContainer.innerHTML = `
        <h1 style="color:red; font-size:100px;">🔴</h1>
        <p>Tħobbu l-aħmar?</p>
        <button id="iva">Iva</button>
        <button id="le">Le</button>
    `;

    document.getElementById('iva').addEventListener('click', showYellowWorld);
    document.getElementById('le').addEventListener('click', startCreepyPath);
}

// Yellow World
function showYellowWorld() {
    gameContainer.innerHTML = `
        <div style="background-color: yellow; padding:50px; border-radius:12px;">
            <p>Tħobbu l-isfar?</p>
            <button id="yellow-iva">Iva</button>
            <button id="yellow-le">Le</button>
        </div>
    `;

    document.getElementById('yellow-iva').addEventListener('click', () => {
        gameContainer.innerHTML = `<p>Il-logħba mitmuma. Għada tirċievi r-rigal.</p>`;
    });

    document.getElementById('yellow-le').addEventListener('click', startCreepyPathWithTextbox);
}

// Blue World
function showBlueWorld() {
    gameContainer.innerHTML = `
        <div style="background-color: blue; color:white; padding:50px; border-radius:12px;">
            <p>Tħobbu l-blu?</p>
            <button id="blue-iva">Iva</button>
            <button id="blue-le">Le</button>
        </div>
    `;

    document.getElementById('blue-iva').addEventListener('click', () => {
        gameContainer.innerHTML = `<p>Kompli tbissem 🌈</p>`;
    });

    document.getElementById('blue-le').addEventListener('click', startCreepyPathWithTextbox);
}

// Creepy Path with Textbox
function startCreepyPathWithTextbox() {
    document.body.style.backgroundColor = '#1a001a'; // dark purple
    gameContainer.classList.add('creepy');

    // Step 1: Ask "Għaliex?"
    gameContainer.innerHTML = `
        <p style="color:#ffcccc; font-size:24px;">Għaliex għażilt Le?</p>
        <input type="text" id="reason" placeholder="Ikteb hawn." style="font-size:18px; padding:5px; width:60%;"/>
        <button id="submit-reason" style="font-size:18px; padding:5px 15px; margin-top:10px;">Ibgħat</button>
        <p id="feedback" style="margin-top:20px; opacity:0; color:#ff6666; font-size:20px;"></p>
    `;

    document.getElementById('submit-reason').addEventListener('click', () => {
        const reason = document.getElementById('reason').value.trim();
        const feedback = document.getElementById('feedback');

        if(reason === "") {
            feedback.innerText = "hemm xi ħaġa warajk.";
        } else {
            feedback.innerText = `…għażilt: "${reason}"id-dinja qed titbiddel madwarek...`;
        }

        // Fade in the feedback slowly
        let opacity = 0;
        let fade = setInterval(() => {
            opacity += 0.01;
            feedback.style.opacity = opacity;
            if(opacity >= 1) clearInterval(fade);
        }, 30);

        // After a short pause, start eerie messages
        setTimeout(showCreepyMessages, 2500);
    });
}

// Creepy messages sequence
function showCreepyMessages() {
    const messages = [
        '…xi ħaġa qed tarak',
        '…ma tistax tmur lura fejn kont',
        '…hemm xi ħaġa ħdejk, iżda ma tidhirx',
        '…missek għażilt iva. issa żgur ma tistax.'
    ];

    gameContainer.innerHTML = `<p id="creepy-text" style="opacity:0; font-size:24px; color:#ff9999;"></p>`;
    let creepyText = document.getElementById('creepy-text');
    let index = 0;

    function showNextMessage() {
        if(index >= messages.length) {
            flickerEffectFinal();
            return;
        }

        creepyText.innerText = messages[index];
        let opacity = 0;
        let fade = setInterval(() => {
            opacity += 0.01;
            creepyText.style.opacity = opacity;
            if(opacity >= 1) {
                clearInterval(fade);
                index++;
                setTimeout(showNextMessage, 1800);
            }
        }, 50);
    }

    showNextMessage();
}

// Final flicker/glitch effect
function flickerEffectFinal() {
    let count = 0;
    let interval = setInterval(() => {
        gameContainer.style.opacity = (count % 2 === 0) ? 0.4 : 1;
        count++;
        let r = Math.floor(Math.random()*30);
        let b = Math.floor(Math.random()*30);
        document.body.style.backgroundColor = `rgb(${r},0,${b})`;
        if(count > 12) clearInterval(interval);
    }, 180);

    setTimeout(() => {
        gameContainer.innerHTML = `<p style="color:#ff3333; font-size:28px;">qed tħossok imbeżżgħa. għaliex?</p>`;
    }, 2500);
}