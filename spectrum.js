var sound, font, spectrum, h;
var colorArr = [],
    group = [];
var spr, spr2, stage, player, shockwave, h;
var ang, flag = 1;

var xAxisX, xAxisY;
var steps;
var peakDetect, amplitude, a;

var soundDuration, plength = 0;
var lastPercent;
var beatArray = [];

function preload() {
    sound = loadSound('assets/loop.mp3');
    font = loadFont('assets/TheBoldFont.ttf');
}

function setup() {
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.mouseClicked(togglePlay);
    fft = new p5.FFT();
    peakDetect = new p5.PeakDetect();
    amplitude = new p5.Amplitude();
    song = new p5.SoundLoop(function () {
        sound.play();
    });
    amplitude.setInput(sound);
    sound.amp(0.5);
    sound.setVolume(1);
    textFont(font);
    textAlign(CENTER);
    h = 0;
    smooth();
    noCursor();
    if (sound.isLoaded())
        sound.play();
}

function draw() {
    colorMode(HSB);
    background(0, 0, 21);
    ellipse(mouseX, mouseY, 50, 50);

    spectrum = fft.analyze();

    push();
    translate(width / 2, height / 2);
    noStroke();
    strokeJoin(ROUND);
    ellipse(width / 2 + 500, height / 2 + 500, 1000, 1000);
    var radius = fft.getEnergy('treble');
    var rad = fft.getEnergy('mid');
    a = fft.getEnergy('mid');
    if (keyWentDown('1')) {
        flag = 1;
    }
    if (keyWentDown('2')) {
        flag = 2;
    }
    if (keyWentDown('3'))
        flag = 3;

    switch (flag) {
        case 1:
            push();
            colorMode(HSB);
            noStroke();
            for (var i = 0; i < 360; i++) {
                x = 100 * cos(TWO_PI / 360);
                y = 100 * sin(TWO_PI / 360);
                var c = map(spectrum[i], 0, 255, 0, 100);
                fill(200, c, 87);
                rect(x, y, 2, spectrum[i]);
                rotate(TWO_PI / 360);
            }
            pop();
            break;
        case 2:
            push();
            colorMode(HSB);
            noStroke();
            for (var i = 0; i < 360; i++) {
                x = 100 * cos(TWO_PI * i / 360);
                y = 100 * sin(TWO_PI * i / 360);
                rotate(TWO_PI / 360);
                var c = map(spectrum[i], 0, 255, 0, 100);
                fill(200, c, 87);
                rect(0, 0, 2, spectrum[i]);
            }
            pop();
            break;
        case 3:
            push();
            rectMode(CORNER);
            colorMode(HSB);
            noStroke();
            for (var i = 0; i < 360; i++) {
                var c = map(spectrum[i], 0, 255, 0, 100);
                fill(200, c, 87);
                rect(2.5 * i - 450, 300, 2.5, -spectrum[i])
            }
            pop();
            break;
        default:
            break;
    }

    shockwave += 100;

    push();
    colorMode(HSB);
    fill(200, 75, a);
    ellipse(0, 0, rad + 10, rad + 10);

    fill(250);
    ellipse(0, 0, rad, rad);
    push()
    strokeWeight(15);
    stroke(255);
    noFill();
    arc(0, 0, shockwave, shockwave, 0, 2 * PI);
    if (lerp(0, amplitude.getLevel(), 0.5) > 0.10) {
        shockwave = 0;
    }
    pop();
    drawSprites();
    // var bright = map(amplitude.getLevel(), 0, )
    translate(0, 0);
    fill(0, 0, 100, lerp(0, amplitude.getLevel(), 0.5));
    console.log(lerp(0, amplitude.getLevel(), 0.5));
    rectMode(CENTER);
    rect(0, 0, width, height);

    rotate((TWO_PI / 360));
    peakDetect.update(fft);
    /* OVERLAY */

    noStroke();
    fill(0, 0, 100);
    pop();
    camera.off();
    updateGameState();
    camera.on();
}

function updateGameState() {
    if (sound.isPlaying()) {
        soundDuration = sound.duration();
        plength = map(sound.currentTime(), 0, soundDuration, 0, width);
        noStroke();
        fill(0, 0, 94);
        rect(0, height - 20, plength, 20);

        percent = map(sound.currentTime(), 0, soundDuration, 0, 100);
        textSize(20);
        text(str(int(percent)) + "%", 30, height - 30);
    } else {
        textSize(20);
        text(str(int(lastPercent)) + "%", 30, height - 30);
    }
}

function releaseShock() {
    shockwave = 0;
}

function togglePlay() {
    if (sound.isPlaying()) {
        var lastPercent = map(sound.currentTime(), 0, soundDuration, 0, 100);
        sound.pause();
    } else {
        sound.play();
    }
}

class Block {
    constructor(xp, yp, w, c, type) {
        this.xp = xp;
        this.yp = yp;
        this.w = w;
        this.c = c;
        this.type = type;
        (this.spr = createSprite(xp, yp, w, w)).setCollider('rectangle', 0, 0, w + 10, w + 10);
        this.spr.draw = function () {

            strokeJoin(ROUND);
            stroke(93, 98, 234);
            strokeWeight(20);
            fill(44);
            rect(0, 0, this.width, this.width);

            stroke(255);
            strokeWeight(20);
            fill(255);
            rect(0, 0, this.width - 10, this.width - 10);
        }
        this.spr.debug = true;
    }
}

class Spike {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;

        triangle(p1, p2, p3);
    }
}

class playerSprite {
    constructor(xp, yp) {
        this.xp = xp;
        this.yp = yp;

        (this.pspr = createSprite(xp, yp, 50, 50)).setCollider('circle', mouseX, mouseY, 25);

        this.pspr.draw = function () {
            fill(44);
            ellipse(xp, yp, 50, 50);
        }
        this.pspr.debug = true;
    }
}
/* 45x15 */

class laserObj {
    constructor(y, type, duration) {
        this.y = y;
        this.type = type;
        this.duration = duration;


    }
}
