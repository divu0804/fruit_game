const screens = document.querySelectorAll('.screen');
const choiceButton = document.querySelectorAll('.choiceButton');
const startBtn = document.getElementById('start');
const gameContainer = document.getElementById(`game-container`);
const time = document.getElementById(`time`);
const score = document.getElementById(`score`);
const message = document.getElementById(`quit`);

let seconds = 0,
    points = 0,
    selectedfruits = {};

startBtn.addEventListener('click', () => screens[0].classList.add(`up`));

choiceButton.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector(`img`);
        const src = img.getAttribute(`src`);
        const alt = img.getAttribute(`alt`);
        selectedfruits = {
            src,
            alt
        };
        screens[1].classList.add(`up`);
        setTimeout(createFruit,1000);
        startGame();
    })
})

function startGame() {
    setInterval(increaseTime,1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    time.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function createFruit() {
    const fruit = document.createElement(`div`);
    fruit.classList.add(`fruit`);
    const {x,y} = getRandomLocation();
    fruit.style.top = `${y}px`;
    fruit.style.left = `${x}px`;
    fruit.innerHTML = `<img src="${selectedfruits.src}" alt="${selectedfruits.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    fruit.addEventListener('click', catchfruit);
    gameContainer.appendChild(fruit);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

function catchfruit() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addfruits();
}

function addfruits() {
    setTimeout(createFruit, 1000);
    setTimeout(createFruit, 1500);
}

function increaseScore() {
    points++
    if(points > 19) {
        message.classList.add('visible')
    }
    score.innerHTML = `Score: ${points}`
}