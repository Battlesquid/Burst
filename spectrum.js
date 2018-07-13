function Spectrum() {

    var soundArr = [];
    var font, spectrum, h;
    var flag = 2,
        changeBGFlag = false;
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
    var cues;
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
            cues = [5.658645833333333, 15.919979166666666, 17.706645833333333, 19.354645833333333, 21.0933125, 22.810645833333332, 24.5493125, 26.26664583333333, 29.7973125, 30.17064583333333, 30.986645833333334, 31.386645833333333, 31.818645833333335, 32.68264583333333, 33.08264583333333, 33.5093125, 34.367979166666665, 34.78397916666667, 35.2373125, 35.690645833333335, 36.09064583333333, 36.538645833333334, 36.97597916666667, 37.80797916666667, 38.239979166666664, 38.65597916666667, 39.535979166666664, 39.9413125, 40.39997916666667, 41.2053125, 41.80264583333334, 43.3973125, 43.8293125, 44.20797916666667, 45.0773125, 45.5093125, 45.946645833333335, 46.82664583333333, 47.24797916666667, 47.69597916666667, 48.12797916666667, 48.52797916666667, 49.01864583333333, 49.418645833333336, 49.839979166666666, 50.266645833333335, 50.69864583333333, 51.135979166666665, 51.546645833333336, 51.99997916666667, 52.3893125, 52.815979166666665, 53.2693125, 53.7173125, 54.10664583333333, 54.50664583333333, 54.95997916666666, 57.9093125, 59.626645833333335, 61.3493125, 63.0773125, 63.5253125, 63.9093125, 64.73064583333333, 66.46397916666666, 68.18664583333333, 69.93597916666667, 70.34664583333333, 70.79464583333333, 71.66397916666666, 72.50664583333334, 73.35997916666666, 74.2133125, 75.05597916666666, 75.93597916666667, 76.76797916666666, 77.27997916666666, 77.73864583333334, 78.57597916666667, 79.37597916666667, 80.2293125, 81.1093125, 81.94664583333333, 82.79997916666666, 83.65864583333334, 84.05864583333333, 87.9413125, 90.93864583333334, 91.37064583333333, 94.36797916666667, 97.80797916666667, 99.53064583333334, 101.19464583333334, 102.92797916666666, 104.6773125, 105.0773125, 105.51464583333333, 105.93064583333333, 106.34664583333333, 106.82664583333333, 107.24797916666667, 107.6693125, 108.07997916666666, 108.52797916666667, 108.77864583333333, 109.0293125, 109.23197916666666, 109.45064583333334, 109.6853125, 109.88797916666667, 110.1173125, 111.99997916666666, 112.36797916666667, 113.2373125, 113.6693125, 114.0373125, 114.95997916666667, 115.33864583333333, 115.78664583333334, 116.6773125, 117.07197916666667, 117.5093125, 118.3573125, 118.7893125, 119.2373125, 120.09064583333334, 120.52797916666667, 120.92797916666666, 121.80797916666667, 122.25597916666666, 122.69864583333333, 123.49864583333333, 125.65864583333334, 126.09597916666667, 126.52797916666667, 126.97597916666666, 127.41864583333333, 127.8453125, 128.26664583333334, 128.52797916666665, 128.92797916666666, 129.1413125, 130.7893125, 139.33864583333335, 139.78664583333332, 141.05597916666667, 141.4773125, 142.8053125, 143.19997916666668, 144.52797916666665, 145.8293125, 146.2453125, 146.69864583333333, 147.56797916666667, 147.97864583333333, 148.44797916666667, 149.2693125, 149.69064583333332, 150.0853125, 150.9173125, 151.3493125, 153.09864583333334];
            for (var i = 0; i < cues.length; i++) {
                this.sceneManager.soundArr[songIndex].addCue(cues[i], releaseWaveObstacle);
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
        camera.on();
        push();
        translate(width / 2, height / 2);
        fill(0, 0, 40, lerp(0, amplitude.getLevel(), 0.10));
        rectMode(CENTER);
        rect(0, 0, width, height);
        pop();
        // if (peakDetect.isDetected) {
        //     releaseWaveObstacle();
        // }
        // if (int(percent) == 3) {
        //     fadeBgOut();
        // }
        if (obHit)
            p.shapeColor = color(0, 64, 82);
        sound.onended(fadeBgOut);
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


    function hit() {
        obHit = true;
        console.log("hit");
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

    function fadeBgOut() {
        push();
        colorMode(RGB);
        polateColor -= 1 * (polateColor > 0 ? 1 : 0);
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
            var s;
            (s = createSprite(0, 0, 25, 25)).setDefaultCollider();
            s.life = 300;
            s.rotation = sprRotation + offset + 180;
            s.shapeColor = color(230);
            s.draw = function () {
                noFill();
                stroke(230);
                triangle(0, 30, 0, -30, 60, 0);
            }
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