var sound, sound2, sound3, sound4, sound5, sound6;
var soundArr = [];
var font, spectrum, h;
var flag = 2,
    changeBGFlag = false;

var peakDetect, amplitude, a;

var soundDuration, plength = 0;
var lastPercent;
var obsRotation = 20;
var burst;
var toggle = true;
var offset = 0;
var p;
var songIndex;
var allObs;
var polateColor = 21;

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
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.mouseClicked(togglePlay);
    soundArr = [sound, sound2, sound3, sound4, sound5, sound6];
    songIndex = 0;
    fft = new p5.FFT();
    peakDetect = new p5.PeakDetect();
    amplitude = new p5.Amplitude();
    amplitude.setInput(soundArr[songIndex]);
    soundArr[songIndex].amp(0.5);
    soundArr[songIndex].setVolume(1);
    textFont(font);
    textAlign(CENTER);
    h = 0;
    smooth();
    noCursor();
    allObs = new Group();
    burst = new Group();
    playerInit();
    if (soundArr[songIndex].isLoaded())
        soundArr[songIndex].play();
}

function draw() {
    colorMode(HSB);
    background(0, 0, polateColor);

    spectrum = fft.analyze();
    updateAudioVisualizer();
    // if (changeBGFlag) {
    //     p.position.x = lerp(p.position.x, mouseX - width / 2, 0.05);
    //     p.position.y = lerp(p.position.y, mouseY - height / 2, 0.05);
    // }
    p.position.x = mouseX - width / 2;
    p.position.y = mouseY - height / 2;

    p.draw = function () {
        noStroke();
        ellipse(0, 0, 50, 50);
    }
    p.collide(allObs, hit);
    drawSprites();

    peakDetect.update(fft);
    camera.off();
    updateGameState();
    camera.on();
    push();
    translate(width / 2, height / 2);
    fill(0, 0, 40, lerp(0, amplitude.getLevel(), 0.10));
    rectMode(CENTER);
    rect(0, 0, width, height);
    pop();
    if (peakDetect.isDetected) {
        releaseWaveObstacle();
    }
    if (int(percent) == 3) {
        changeBGFlag = true;
    }
}

function updateGameState() {
    if (soundArr[songIndex].isPlaying()) {
        soundDuration = soundArr[songIndex].duration();
        plength = map(soundArr[songIndex].currentTime(), 0, soundDuration, 0, width);
        noStroke();
        fill(0, 0, 94);
        rect(0, height - 20, plength, 20);
        percent = map(soundArr[songIndex].currentTime(), 0, soundDuration, 0, 100);
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
        offset = 18;
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
        allObs.add(s);
        sprRotation += 36;
    }
    for (var i = 0; i < burst.length; i++) {
        burst.get(i).setSpeed(15, burst.get(i).rotation);
    }
}

function releaseWallObstacle() {
    var dirArr = [0, 180];
    var direction = int(random(0, 2));
    var index = int(random(0, 1));
    var s = createSprite(0 + (direction == 1 ? window.innerWidth : 0), 0, 10, 80);
    s.life = 200;
    s.shapeColor = color(230);
    allObs.add(s);

    s.setSpeed(20, dirArr[index]);
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
    push();
    rotate(frameCount / 200);
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
    pop();

    push();
    colorMode(HSB);
    fill(200, 75, a);
    ellipse(0, 0, rad + 10, rad + 10);
    fill(250);
    ellipse(0, 0, rad, rad);
    
    pop();
}
function releaseQuakeObstacle() {
    for (var i = 0; i < 2; i++) {
        setInterval(releaseWaveObstacle, 700);
    }
    clearInterval(releaseWaveObstacle);
}
function hit() {
    p.shapeColor = color(0);
}
setInterval(releasePaceObstacle, (60 / 140 * 2) * 1000);

function playerInit() {
    p = createSprite(0, 0, 50, 50);
    p.setCollider('circle', 0, 0, 25);
    p.debug = true;
    p.shapeColor = color(230);
}
