const pianoKeys = document.querySelectorAll('.piano-key');
const btnLetters = document.querySelector('.btn-letters');
const btnNotes = document.querySelector('.btn-notes');
const btnFullscreen = document.querySelector('.fullscreen');

// FUNCTION: Playing sounds
const playAudio = function (src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};

const playingSound = function (e, key) {
    if (isDown) {
        if(e.target.classList.contains('piano-key')) {
            key.classList.add('piano-key-active');
            const note = e.target.dataset.note;
            const src = `assets/audio/${note}.mp3`;
            playAudio(src);
        };
    }
}

// Switch to letters
btnLetters.addEventListener('click', (e) => {
    pianoKeys.forEach(key => {
        key.classList.add('letter');
    });
    btnNotes.classList.remove('btn-active')
    btnLetters.classList.add('btn-active')
});

// Switch to notes
btnNotes.addEventListener('click', (e) => {
    pianoKeys.forEach(key => {
        key.classList.remove('letter');
    });
    btnLetters.classList.remove('btn-active')
    btnNotes.classList.add('btn-active')
});

// Playing sound when click mouse and over the keys
let isDown = true;

pianoKeys.forEach(key => {
    key.addEventListener('mousedown',(event) => {
        isDown = true;

        playingSound(event, key)

        pianoKeys.forEach(key => {
            key.addEventListener('mouseover', e => playingSound(e, key))
            key.addEventListener('mouseout', e => {
                key.classList.remove('piano-key-active');
            });
        });
    });

    window.addEventListener('mouseup', e => {
        key.classList.remove('piano-key-active');
        isDown = false;
    })
});

// Playing sound when key was pressed
window.addEventListener('keydown', (e) => {
    pianoKeys.forEach(key => {
        if (`Key${key.dataset.letter}` === e.code) {
            key.classList.add('piano-key-active');
            setTimeout(() => {
                key.classList.remove('piano-key-active');
            }, 100);
            const note = key.dataset.note;
            const src = `assets/audio/${note}.mp3`;
            playAudio(src);
        };
        key.addEventListener('keyup', e => {
            key.classList.remove('piano-key-active');
        });
    });
});

// Fullscreen API
const getFullscreenElement = function () {
    return document.fullscreenElement  // for Chrome
        || document.webkitFullscreenElement // for Opera
        || document.mozFullscreenElement // for Mozilla
        || document.msFullscreenElement   // for IE or Edge
}

const toggleFullscreen = function () {
    if (getFullscreenElement()) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen().catch(console.log)
    }
}

btnFullscreen.addEventListener('click', e => {
    toggleFullscreen();
});
