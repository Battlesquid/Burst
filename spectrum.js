function Spectrum() {

    var soundArr = [];
    var font, spectrum, h;
    var flag = 2;
    var obHit;

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
    var percent = 0;
    var musicPoints = [];
    var count = 0;
    var me = this;
    var score = 100;
    var fft;
    this.setup = function () {
        soundArr = me.sceneManager.soundArr;
        songIndex = me.sceneArgs;
        console.log("Song Index:" + songIndex);
        console.log(soundArr);
        fft = new p5.FFT();
        peakDetect = new p5.PeakDetect();
        amplitude = new p5.Amplitude();
        amplitude.setInput(soundArr[songIndex]);
        soundArr[songIndex].amp(0.5);
        soundArr[songIndex].setVolume(1);
        textFont(this.sceneManager.font);
        textAlign(CENTER);
        h = 0;
        smooth();
        noCursor();
        allObs = new Group();
        burst = new Group();
        playerInit();

        if (soundArr[songIndex].isLoaded()) {

            for (var i = 0; i < cueMap[songIndex].length; i++) {
                this.sceneManager.soundArr[songIndex].addCue(cueMap[songIndex][i], releaseWaveObstacle);
            }


            var blur = createDiv("");
            blur.addClass("blur");
            blur.position(0, 0);

            var overlay = createDiv(this.sceneManager.songs[songIndex].title);
            overlay.addClass("titleOverlay");
            overlay.center();
            var br = createElement('br', "");
            br.parent(overlay);
            var sub = createElement('span', this.sceneManager.songs[songIndex].artist);
            sub.addClass('subtitleOverlay');
            sub.parent(overlay);

            $('.titleOverlay').fadeIn(3000, function () {
                $(this).fadeOut(3000);
            });
            $('.subtitleOverlay').fadeIn(3000, function () {
                $(this).fadeOut(3000);
            });
            $('.blur').fadeIn(3000, function () {
                $(this).fadeOut(3000);
            });
            soundArr[songIndex].play();
        }
    }

    this.draw = function () {

        colorMode(HSB);
        background(0, 0, polateColor);
        displayHUD();
        spectrum = fft.analyze();
        updateAudioVisualizer();

        p.position.x = mouseX - width / 2;
        p.position.y = mouseY - height / 2;

        p.draw = function () {
            noStroke();
            ellipse(0, 0, 50, 50);
        }
        p.overlap(burst, hit);
        drawSprites();

        peakDetect.update(fft);
        camera.off();
        updateGameState();
        push();
        textAlign(RIGHT, BOTTOM);
        textSize(40);
        textFont(me.sceneManager.font);
        fill(200);
        text("Score:" + score, width, height);
        pop();
        camera.on();
        push();
        translate(width / 2, height / 2);
        fill(0, 0, 40, lerp(0, amplitude.getLevel(), 0.10));
        rectMode(CENTER);
        rect(0, 0, width, height);
        pop();
        if (obHit)
            p.shapeColor = color(0, 64, 82);
        sound.onended(showStats);
        if (mouseWentDown(RIGHT)) {
            musicPoints.push(soundArr[songIndex].currentTime());
            console.log(musicPoints);
        }
    }

    function updateGameState() {
        if (soundArr[songIndex].isPlaying()) {
            soundDuration = soundArr[songIndex].duration();
            plength = map(soundArr[songIndex].currentTime(), 0, soundDuration, 0, width);
            percent = map(soundArr[songIndex].currentTime(), 0, soundDuration, 0, 100);
        }
    }

    function togglePlay() {
        if (sound.isPlaying()) {
            var lastPercent = map(sound.currentTime(), 0, soundDuration, 0, 100);
            soundArr[songIndex].pause();
        } else {
            soundArr[songIndex].play();
        }
    }

    function updateAudioVisualizer() {
        count++;
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

    function showStats() {

    }

    function hit() {
        obHit = true;
        console.log("hit");
        score--;
    }
    setInterval(releasePaceObstacle, (60 / 140) * 1000);
    // setInterval(releaseWaveObstacle, (60 / 140 * 4) * 1000)

    function playerInit() {
        p = createSprite(0, 0, 50, 50);
        p.setCollider('circle', 0, 0, 25);
        p.shapeColor = color(230);
    }

    function displayHUD() {
        push();
        push();
        colorMode(HSB);
        translate(width / 2, height / 2);
        noFill();
        stroke(0, 0, 84, 0.5);
        arc(0, 0, fft.getEnergy('bass') * 2 + 100, fft.getEnergy('bass') * 2 + 100, 0, map(soundArr[songIndex].currentTime(), 0, soundDuration, 0, TWO_PI));
        pop();


        pop();
    }

    function releasePaceObstacle() {
        var s = createSprite(0, 0, 10, 10);
        s.shapeColor = color(200);
        s.maxSpeed = 20;
        s.life = 100;
        s.rotation = obsRotation;
        s.draw = function () {
            noFill();
            stroke(230);
            ellipse(0, 0, 10, 10);
        };
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
            push();
            colorMode(RGB);
            var s;
            (s = createSprite(0, 0, 25, 25)).setDefaultCollider();
            s.life = 200;
            s.rotation = sprRotation + offset + 180;
            s.shapeColor = color(230, 230, 230);
            // console.log(s.life * 0.01);
            s.draw = function () {
                noFill();
                stroke(230);
                triangle(0, 30, 0, -30, 60, 0);
            }
            burst.add(s);
            allObs.add(s);
            sprRotation += 36;
            pop();
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

    function releaseQuakeObstacle() {
        for (var i = 0; i < 2; i++) {
            setInterval(releaseWaveObstacle, 700);
        }
        clearInterval(releaseWaveObstacle);
    }

    function platformObstacle() {
        var w = int(random(0, 10));
        var h = int(random(0, 10));
        var x = int(random(0, width - w));
        var y = int(random(0, height - h));
        var s = createSprite(x, y, w, h);
        s.life = 100;
        s.draw = function () {
            noFill();
            stroke(230);
            rect(0, 0, 20 * w, 20 * h);
        }
        allObs.add(s);
    }
}