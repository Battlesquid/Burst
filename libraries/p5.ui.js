(function (root, factory) {
    if (typeof define === 'function' && define.amd)
        define('p5.ui', ['p5'], function (p5) {
            (factory(p5));
        });
    else if (typeof exports === 'object')
        factory(require('../p5'));
    else
        factory(root['p5']);
}(this, function (p5) {





}));

var shapeGroup = [];

p5.prototype.shapeSprite = function (xp, yp, w, h, type) {
    this.xPos = xp;
    this.yPos = yp;
    this.width = w;
    this.height = h;

    shapeGroup.push(this);
}

p5.prototype.drawShapes = function () {
    for (var i = 0; i < shapeGroup.length; i++) {
        rect(this.xPos, this.yPos, this.width, this.height);
        strokeJoin(ROUND);
        strokeWeight(20);
        switch (this.type) {
            case "reg":
                stroke(93, 98, 234);
                fill(44);
                rect(0, 0, this.width, this.width);
                break;
            case "bounce":
                stroke();
                fill();
                rect(this.xPos, this.yPos, this.width, this.height);
                break;
        }
    }
}