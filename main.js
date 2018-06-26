var sound, sound2, sound3, sound4, sound5, sound6;
var font, mgr;
var soundArr = [];

function preload() {
    sound = loadSound('assets/loop.mp3');
    sound2 = loadSound('assets/loop2.mp3');
    sound3 = loadSound('assets/loop3.mp3');
    sound4 = loadSound('assets/loop4.mp3');
    sound5 = loadSound('assets/loop5.mp3');
    sound6 = loadSound('assets/loop6.mp3');

    font = loadFont('assets/TheBoldFont.ttf');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    soundArr = soundArr = [sound, sound2, sound3, sound4, sound5, sound6];
    mgr = new SceneManager();
    mgr.sound = sound;
    mgr.sound2 = sound2;
    mgr.sound3 = sound3;
    mgr.sound4 = sound4;
    mgr.sound5 = sound5;
    mgr.sound6 = sound6;
    mgr.font = font;
    mgr.soundArr = soundArr;
    mgr.wire();
    mgr.showScene(MainMenu);
}

function addToLoaded() {

}