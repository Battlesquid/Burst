function releasePaceObstacle() {
    var s = createSprite(0, 0, 10, 10);
    s.shapeColor = color(200);
    s.maxSpeed = 20;
    s.life = 100;
    s.rotation = obsRotation;
    s.draw = function() {
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
    s.draw = function() {
        noFill();
        stroke(230);
        rect(0, 0, 20 * w, 20 * h);
    }
    allObs.add(s);
}