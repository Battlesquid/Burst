var fft, spectrum, flag = 2;
var h = 0,
    s = 53,
    v = 95;

function MainMenu() {

    var me = this;

    this.setup = function () {
        createUIButton(width / 2, height / 2 + 400, 200, 100, "Play", false, hi);
        createUIButton(width / 2 - 400, height / 2 + 400, 200, 100, "About", false);
        createUIButton(width / 2 + 400, height / 2 + 400, 200, 100, "Create", false);
        fft = new p5.FFT();
        me.sceneManager.menuloop.loop();
    }
    this.draw = function () {
        background(40);
        colorMode(HSB);
        spectrum = fft.analyze();



        updateAudioVisualizer();
        textFont(this.sceneManager.font);
        fill(44);
        h += 0.10;
        if (h == 360)
            h = 0;
        stroke(h, s, v);
        push();



        strokeWeight(10);
        textAlign(CENTER, CENTER);
        textSize(90 + fft.getEnergy('mid') / 4);
        text("Burst", width / 2, height / 2);
        pop();
        textSize(30);
        textAlign(CENTER, BOTTOM);
        text("V " + me.sceneManager.version + " Beta", 150, height);
        renderUI();
    }
    this.mouseClicked = function () {
        uiDisplayStatus(true);
    }

    function hi() {
        allButtons[0].displayStatus = false;
        allButtons[1].displayStatus = false;
        allButtons[2].displayStatus = false;
        me.sceneManager.menuloop.stop();
        me.sceneManager.showScene(SongMenu);
    }
}

function SongMenu() {
    var index = 0;
    var me = this;
    var names = ["Disfigure - Hollah!", "Disfigure - Hollah!2", "Disfigure - Hollah!3", "Disfigure - Hollah!4", "Disfigure - Hollah!", "Disfigure - Hollah!"];
    this.setup = function () {
        createUIButton(width / 2 - 600, height / 2, 100, 100, "Prev.", true, decrement);
        createUIButton(width / 2 + 600, height / 2, 100, 100, "Next", true, increment);
        createUIButton(width / 2, height / 2, 900, 900, "GO", true, initGame);
    }
    this.draw = function () {
        background(44);
        textFont(this.sceneManager.font);

        renderUI();
        displaySong();
    }

    function displaySong() {
        push();
        noFill();
        stroke(230);
        ellipse(width / 2, height / 2, 900, 900);
        pop();
        push();
        textSize(30);
        textAlign(CENTER, CENTER);
        text(me.sceneManager.songs[index].title, width / 2, height / 2 - 250);
        pop();

    }

    function increment() {
        if (index < me.sceneManager.soundArr.length) {
            index++;
        }
    }

    function decrement() {
        if (index > 0) {
            index--
        }
    }

    function initGame() {
        me.sceneManager.showScene(Spectrum, index);
    }
}

function updateAudioVisualizer() {
    push();
    translate(width / 2, height / 2);
    noStroke();
    strokeJoin(ROUND);
    ellipse(width / 2 + 500, height / 2 + 500, 1000, 1000);
    var radius = fft.getEnergy('bass');
    var rad = fft.getEnergy('mid');
    a = fft.getEnergy('mid');
    push();
    rotate(frameCount / 200);


    push();
    colorMode(HSB);
    noStroke();
    for (var i = 0; i < 360; i++) {
        x = 1000 * cos(TWO_PI * i / 360);
        y = 1000 * sin(TWO_PI * i / 360);
        rotate(TWO_PI / 360);
        var c = map(spectrum[i], 0, 255, 0, 60);
        fill(200, 0, c);
        rect(0, 0, 5, spectrum[i] * 4);
    }

    pop();

    pop();

    push();
    colorMode(HSB);
    // fill(200, 75, a);
    // ellipse(0, 0, rad + 20, rad + 20);
    fill(57);
    ellipse(0, 0, rad + 250, rad + 250);

    pop();
    pop();
}