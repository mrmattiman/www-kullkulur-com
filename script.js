const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');

startBtn.addEventListener('click', () => {
    gameContainer.innerHTML = `
        <h1 style="color:red; font-size: 100px;">🔴</h1>
        <p>Tħobbu l-aħmar?</p>
        <button id="iva">Iva</button>
        <button id="le">Le</button>
    `;

    const ivaBtn = document.getElementById('iva');
    const leBtn = document.getElementById('le');

    ivaBtn.addEventListener('click', () => {
        gameContainer.innerHTML = `
            <div style="background-color: yellow; padding: 50px; border-radius: 12px;">
                <p>Tħobbu l-isfar?</p>
                <button id="yellow-iva">Iva</button>
                <button id="yellow-le">Le</button>
            </div>
        `;

        document.getElementById('yellow-iva').addEventListener('click', () => {
            gameContainer.innerHTML = `<p>Il-logħba mitmuma. Għada tirċievi r-rigal.</p>`;
        });

        document.getElementById('yellow-le').addEventListener('click', () => {
            gameContainer.innerHTML = `<p>mwahahahaha... Creepy path begins!</p>`;
            document.body.style.backgroundColor = 'darkred';
        });
    });

    leBtn.addEventListener('click', () => {
        gameContainer.innerHTML = `
            <div style="background-color: blue; color:white; padding: 50px; border-radius: 12px;">
                <p>Tħobbu l-ikħal?</p>
                <button id="blue-iva">Iva</button>
                <button id="blue-le">Le</button>
            </div>
        `;

        document.getElementById('blue-iva').addEventListener('click', () => {
            gameContainer.innerHTML = `<p>Kompli tbissem 🌈</p>`;
        });

        document.getElementById('blue-le').addEventListener('click', () => {
            gameContainer.innerHTML = `<p>mwahahahaha... Creepy path begins!</p>`;
            document.body.style.backgroundColor = 'darkblue';
        });
    });
});