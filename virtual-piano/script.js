const pianoKeys = document.querySelectorAll('.piano-key');

// FUNCTION: Playing sounds
const playAudio = function (src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
};

// Playing sound when click mouse
pianoKeys.forEach(key => {
    key.addEventListener('click',(e) => {
        if(e.target.classList.contains('piano-key')) {
            const note = e.target.dataset.note;
            const src = `assets/audio/${note}.mp3`;
            playAudio(src);
          }   
    });
});

// Playing sound when key was pressed
window.addEventListener('keydown', (e) => {
    pianoKeys.forEach(key => {
        if (`Key${key.dataset.letter}` === e.code) {
            const note = key.dataset.note;
            const src = `assets/audio/${note}.mp3`;
            playAudio(src);
        };
    });
});
