var allButtons = [];

p5.prototype.createUIButton = function (x, y, d, label, displayStatus, callback) {
    var b = new Button(x, y, d, label, displayStatus, callback);
}


p5.prototype.renderUI = function (bool) {
    bool = bool || true;
    if (bool) {
        for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i].displayStatus == true) {
                push();
                colorMode(RGB);
                noFill();
                stroke(240);
                ellipse(allButtons[i].x, allButtons[i].y, allButtons[i].d);
                noStroke();
                var distX = mouseX - allButtons[i].x;
                var distY = mouseY - allButtons[i].y;
                var distance = sqrt((distX * distX) + (distY * distY));
                if (distance <= allButtons[i].d / 2) {
                    fill(230);
                    ellipse(allButtons[i].x, allButtons[i].y, allButtons[i].d);
                    if (mouseWentDown(LEFT)) {
                        allButtons[i].callback();
                    }
                }
                fill(60);
                textAlign(CENTER, CENTER);
                textSize(allButtons[i].d / 4);
                text(allButtons[i].label, allButtons[i].x, allButtons[i].y);
                pop();
            }
        }
    }
}
p5.prototype.uiButton = function(id) {

}
p5.prototype.renderUIGroup = function (uigroup) {
    for (var i = 0; i < uigroup.length; i++) {

    }
}
p5.prototype.uiDisplayStatus = function (status) {
    if (status == false) {
        for (var i = 0; i < allButtons.length; i++) {
            allButtons[i].displayStatus = false;
        }
    }
    if (status == true) {
        for (var i = 0; i < allButtons.length; i++) {
            allButtons[i].displayStatus = true;
        }
    }
}

function Button(x, y, d, label, displayStatus, callback) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.label = label;
    this.displayStatus = displayStatus || true;
    this.callback = callback || function () {};

    allButtons.push(this);
}

function UIGroup() {

}