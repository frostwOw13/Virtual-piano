const pianoKeys = document.querySelectorAll('.piano-key');
const btnLetters = document.querySelector('.btn-letters');
const btnNotes = document.querySelector('.btn-notes');

// FUNCTION: Playing sounds
const playAudio = function (src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};

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
        if (isDown) {
            if(event.target.classList.contains('piano-key')) {
                key.classList.add('piano-key-active');
                const note = event.target.dataset.note;
                const src = `assets/audio/${note}.mp3`;
                playAudio(src);
            };
        }
        pianoKeys.forEach(key1 => {
            key1.addEventListener('mouseover', e => {
                if (isDown) {
                    if(e.target.classList.contains('piano-key')) {
                        key1.classList.add('piano-key-active');
                        const note1 = e.target.dataset.note;
                        const src1 = `assets/audio/${note1}.mp3`;
                        playAudio(src1);
                    };
                }
            });
            key1.addEventListener('mouseout', e => {
                key1.classList.remove('piano-key-active');
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
    });
});
