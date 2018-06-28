var allButtons = [];

p5.prototype.createUIButton = function (rx, ry, w, h, label, displayStatus, callback) {
    var b = new Button(rx, ry, w, h, label, displayStatus, callback);
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
                rectMode(CENTER);
                strokeCap(ROUND);
                strokeJoin(ROUND);
                rect(allButtons[i].rx, allButtons[i].ry, allButtons[i].w, allButtons[i].h);
                if (mouseX >= allButtons[i].rx - allButtons[i].w / 2 && mouseX <= allButtons[i].rx + allButtons[i].w / 2 && mouseY >= allButtons[i].ry - allButtons[i].h / 2 && mouseY <= allButtons[i].ry + allButtons[i].h / 2) {
                    push();
                    fill(55);
                    rect(allButtons[i].rx, allButtons[i].ry, allButtons[i].w, allButtons[i].h);
                    pop();
                    if (mouseWentDown(LEFT)) {
                        allButtons[i].callback();
                    }
                }
                push();
                fill(230);
                textSize(allButtons[i].w / 4);
                textAlign(CENTER, CENTER);
                noStroke();
                text(allButtons[i].label, allButtons[i].rx, allButtons[i].ry);
                pop();
                // ellipse(allButtons[i].x, allButtons[i].y, allButtons[i].d);
                // noStroke();
                // var distX = mouseX - allButtons[i].x;
                // var distY = mouseY - allButtons[i].y;
                // var distance = sqrt((distX * distX) + (distY * distY));
                // if (distance <= allButtons[i].d / 2) {
                //     push();
                //     strokeWeight(1);
                //     stroke(230);
                //     ellipse(allButtons[i].x, allButtons[i].y, allButtons[i].d + 20, allButtons[i].d + 20);
                //     pop();
                //     if (mouseWentDown(LEFT)) {
                //         allButtons[i].callback();
                //     }
                // }
                // fill(44);
                // textAlign(CENTER, CENTER);
                // textSize(allButtons[i].d / 4);
                // text(allButtons[i].label, allButtons[i].x, allButtons[i].y);
                // pop();
                pop();
            }
        }
    }
}
p5.prototype.uiButton = function (id) {

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

function Button(rx, ry, w, h, label, displayStatus, callback) {
    this.rx = rx;
    this.ry = ry;
    this.w = w;
    this.h = h;
    this.label = label;
    this.displayStatus = displayStatus || true;
    this.callback = callback || function () {};

    allButtons.push(this);
}

function UIGroup() {

}