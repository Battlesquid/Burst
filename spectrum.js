var sound, font, spectrum, h;
var colorArr = [],
    group = [];
var spr, spr2, stage, player, shockwave, h;
var ang, flag = 2;

var xAxisX, xAxisY;
var steps;
var peakDetect, amplitude, a;

var soundDuration, plength = 0;
var lastPercent;
var beatArray = [];
var obsRotation = 20;
var burst;
var toggle = true;
var offset = 0;
var p;

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
    burst = new Group();
    playerInit();
}

function draw() {
    colorMode(HSB);
    background(0, 0, 21);

    spectrum = fft.analyze();
    updateAudioVisualizer();

    p.position.x = mouseX - width / 2;
    p.position.y = mouseY - height / 2;

    p.draw = function () {
        ellipse(0, 0, 50, 50);
    }
    drawSprites();

    peakDetect.update(fft);
    /* OVERLAY */

    camera.off();
    updateGameState();
    camera.on();
    push();
    translate(width / 2, height / 2);
    fill(0, 0, 40, lerp(0, amplitude.getLevel(), 0.5));
    rectMode(CENTER);
    rect(0, 0, width, height);
    pop();
    if (peakDetect.isDetected) {
        releaseWaveObstacle();
    }
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

function togglePlay() {
    if (sound.isPlaying()) {
        var lastPercent = map(sound.currentTime(), 0, soundDuration, 0, 100);
        sound.pause();
    } else {
        sound.play();
    }
}

function releasePaceObstacle() {
    var s = createSprite(0, 0, 10, 10);
    s.shapeColor = color(200);
    s.maxSpeed = 20;
    s.life = 100;
    s.rotation = obsRotation;
    s.setSpeed(20, obsRotation);
    obsRotation += 20;
}

function releaseWaveObstacle() {
    toggle = !toggle;
    offset = 0;
    if (toggle) {
        offset = 16;
    } else {
        offset = 0;
    }
    var sprRotation = 0;
    for (var i = 0; i < 10; i++) {
        var s = createSprite(0, 0, 25, 25);
        s.life = 500;
        s.rotation = sprRotation + offset;
        s.shapeColor = color(230);
        burst.add(s);
        sprRotation += (36 - offset);
    }
    for (var i = 0; i < burst.length; i++) {
        burst.get(i).setSpeed(15, burst.get(i).rotation - offset);
    }
}

// function releaseQuakeObstacle(waves = 4) {
//     for (var i = 0; i < waves; i++) {
//         toggle = !toggle;
//         if (toggle) {
//             releaseWaveObstacle(18);
//         } else {
//             releaseWaveObstacle();
//         }
//     }
// }

function updateAudioVisualizer() {
    push();
    translate(width / 2, height / 2);
    noStroke();
    strokeJoin(ROUND);
    ellipse(width / 2 + 500, height / 2 + 500, 1000, 1000);
    var radius = fft.getEnergy('bass');
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
                var c = map(spectrum[i], 0, 255, 0, 60);
                fill(200, 0, c);
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
                var c = map(spectrum[i], 0, 255, 0, 60);
                fill(200, 0, c);
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
                var c = map(spectrum[i], 0, 255, 0, 60);
                fill(200, 0, c);
                rect(2.5 * i - 450, 300, 2.5, -spectrum[i])
            }
            pop();
            break;
        default:
            break;
    }

    push();
    colorMode(HSB);
    fill(200, 75, a);
    ellipse(0, 0, rad + 10, rad + 10);
    fill(250);
    ellipse(0, 0, rad, rad);
    pop();
}
// function waveInterval() {
//     setInterval(releaseWaveObstacle, 400);
// }
// setInterval(releaseWaveObstacle, (140/60) * 500);

setInterval(releasePaceObstacle, (60 / 140) * 1000);


// class Block {
//     constructor(xp, yp, w, c, type) {
//         this.xp = xp;
//         this.yp = yp;
//         this.w = w;
//         this.c = c;
//         this.type = type;
//         (this.spr = createSprite(xp, yp, w, w)).setCollider('rectangle', 0, 0, w + 10, w + 10);
//         this.spr.draw = function () {

//             strokeJoin(ROUND);
//             stroke(93, 98, 234);
//             strokeWeight(20);
//             fill(44);
//             rect(0, 0, this.width, this.width);

//             stroke(255);
//             strokeWeight(20);
//             fill(255);
//             rect(0, 0, this.width - 10, this.width - 10);
//         }
//         this.spr.debug = true;
//     }
// }

// class Spike {
//     constructor(p1, p2, p3) {
//         this.p1 = p1;
//         this.p2 = p2;
//         this.p3 = p3;

//         triangle(p1, p2, p3);
//     }
// }

// class playerSprite {
//     constructor(xp, yp) {
//         this.xp = xp;
//         this.yp = yp;

//         (this.pspr = createSprite(xp, yp, 50, 50)).setCollider('circle', mouseX, mouseY, 25);

//         this.pspr.draw = function () {
//             fill(44);
//             ellipse(xp, yp, 50, 50);
//         }
//         this.pspr.debug = true;
//     }
// }
// /* 45x15 */

// class laserObj {
//     constructor(y, type, duration) {
//         this.y = y;
//         this.type = type;
//         this.duration = duration;


//     }
// }

function playerInit() {
    p = createSprite(0, 0, 50, 50);
    p.setCollider('circle', 0, 0, 25);
    p.debug = true;
    p.shapeColor = color(230);
}
