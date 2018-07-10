var sound, sound2, sound3, sound4, sound5, sound6;
var font, mgr;
var soundArr = [];
var menuloop, menuFlag;
var songs = {
    0: {
        title: "Hollah!",
        artist: "Disfigure",
        difficulty: "Beginner"
    },
    1: {
        title: "Nirmiti",
        artist: "Xtrullor",
        difficulty: "Beginner"
    },
    2: {
        title: "One!",
        artist: "HOVERBOOTS",
        difficulty: "Normal"
    },
    3: {
        title: "Time Leaper",
        artist: "Hinkik",
        difficulty: "Normal"
    },
    4: {
        title: "Pill",
        artist: "Heuse and Zeus X Crona (feat. Emma Sameth) ",
        difficulty: "Advanced"
    },
    5: {
        title: "Hollah!",
        artist: "Disfigure",
        difficulty: "Advanced"
    }
};
var version = "1.0";
var menu;
function preload() {
    soundFormats('mp3', 'ogg');
    sound = loadSound('assets/loop.mp3');
    sound2 = loadSound('assets/loop2.mp3');
    sound3 = loadSound('assets/loop3.mp3');
    sound4 = loadSound('assets/loop4.mp3');
    sound5 = loadSound('assets/loop5.mp3');
    sound6 = loadSound('assets/loop6.mp3');
    menuloop = loadSound('assets/menuloop.mp3', function() {
        menuFlag = true;
    });


    font = loadFont('assets/TheBoldFont.ttf');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    soundArr = soundArr = [sound, sound2, sound3, sound4, sound5, sound6];

    menu = createDiv('');
    menu.addClass('menu');
    menu.position(0, 0);
    for(var i = 0; i < Object.keys(songs).length; i++) {
        var b = createDiv(songs[i].title);
        b.addClass('item');
        b.parent(menu);
    }
    menu.hide();

    mgr = new SceneManager();
    mgr.sound = sound;
    mgr.sound2 = sound2;
    mgr.sound3 = sound3;
    mgr.sound4 = sound4;
    mgr.sound5 = sound5;
    mgr.sound6 = sound6;
    mgr.menuloop = menuloop;
    mgr.font = font;
    mgr.soundArr = soundArr;
    mgr.songs = songs;
    mgr.version = version;
    mgr.menuFlag = menuFlag;

    mgr.wire();
    mgr.showScene(MainMenu);
}

function addToLoaded() {

}