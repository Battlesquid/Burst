function MainMenu() {
    var h = 0,
        s = 53,
        v = 95;
    var me = this;
    this.setup = function () {
        createUIButton(width / 2, height / 2 + 200, 200, "Play", false, hi);
        createUIButton(width / 2 - 400, height / 2 + 300, 200, "About", false);
        createUIButton(width / 2 + 400, height / 2 + 200, 200, "Create", false);

    }
    this.draw = function () {
        background(200);
        colorMode(HSB);
        textFont(this.sceneManager.font);
        textSize(90);
        textAlign(CENTER);
        fill(44);
        h += 0.10;
        if (h == 360)
            h = 0;
        stroke(h, s, v);
        strokeWeight(10);
        text("Spectrum", width / 2, height / 2);

        renderUI();
    }
    this.mouseClicked = function () {
        uiDisplayStatus(true);
    }

    function hi() {
        allButtons[0].displayStatus = false;
        allButtons[1].displayStatus = false;
        allButtons[2].displayStatus = false;

        me.sceneManager.showScene(SongMenu);
    }
}

function SongMenu() {
    var index = 0;
    var me = this;
    var names = ["Disfigure - Hollah!", "Disfigure - Hollah!2", "Disfigure - Hollah!3", "Disfigure - Hollah!4", "Disfigure - Hollah!", "Disfigure - Hollah!"];
    this.setup = function () {
        createUIButton(width / 2 - 600, height / 2, 100, "", true, decrement);
        createUIButton(width / 2 + 600, height / 2, 100, "", true, increment);
        createUIButton(width / 2, height / 2, 900, "GO", true, playSong);
    }
    this.draw = function () {
        background(200);
        textFont(this.sceneManager.font);
        displaySong();
        renderUI();
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
        text(names[index], width / 2, height / 2 - 250);
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
    function playSong() {
        me.sceneManager.showScene(Spectrum, index);
    }
}