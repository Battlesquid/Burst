var sound, sound2, sound3, sound4, sound5, sound6;
var font, mgr;
var soundArr = [];
var menuloop, menuFlag;
var back;
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
        title: "Slowing Down",
        artist: "Garlagan",
        difficulty: "Advanced"
    }
};
var version = "1.0";
var menu, goArr = [];

function preload() {
    soundFormats('mp3', 'ogg');
    sound = loadSound('assets/loop.mp3', function () {
        console.log("Ready")
    });
    sound2 = loadSound('assets/loop2.mp3', function () {
        console.log("Ready")
    });
    sound3 = loadSound('assets/loop3.mp3', function () {
        console.log("Ready")
    });
    sound4 = loadSound('assets/loop4.mp3', function () {
        console.log("Ready")
    });
    sound5 = loadSound('assets/loop5.mp3', function () {
        console.log("Ready")
    });
    sound6 = loadSound('assets/loop6.mp3', function () {
        console.log("Ready")
    });
    menuloop = loadSound('assets/menuloop.mp3', function () {
        menuFlag = true;
    });


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
    mgr.menuloop = menuloop;
    mgr.font = font;
    mgr.soundArr = soundArr;
    mgr.songs = songs;
    mgr.version = version;
    mgr.menuFlag = menuFlag;

    mgr.wire();

    menu = createDiv('');
    menu.addClass('menu');
    menu.id("menu");
    menu.center();
    for (var i = 0; i < Object.keys(songs).length; i++) {
        console.log("Index:" + i);
        var b = createDiv(songs[i].title + "-");
        b.addClass('title');
        b.addClass(i);
        var sub = createElement('span', songs[i].artist);
        sub.addClass('subtitle');
        sub.parent(b);
        var go = createButton('Play');
        go.addClass('go');
        go.id(i);

        go.parent(b);
        goArr.push(go);
        console.log(goArr[i].id());


        b.parent(menu);
    }
    console.log(goArr.length);
    // for (var i = 0; i < goArr.length; i++) {
    //     console.log(i);
    //     console.log(goArr[i]);
    //     goArr[i].mouseClicked(function () {
    //         menu.hide();
    //         mgr.menuloop.stop();


    //         mgr.showScene(Spectrum, parseInt(goArr[i].id()));
    //     });
    // }
    menu.hide();
    back = createButton('Back');
    back.position(5, 5);
    back.hide();

    mgr.goArr = goArr;

    mgr.showScene(MainMenu);
}

function addToLoaded() {

}