function $() { return document.getElementById.apply(document, arguments) };

var R;


Raphael.fn.triangle = function(x, y, size) {
    var path = ["M", x, y];
    path = path.concat(["L", (x + size / 2), (y + size)]);
    path = path.concat(["L", (x - size / 2), (y + size)]);
    return this.path(path.concat(["z"]).join(" "));
};

function rect(o) {
    return R.rect(o.x, o.y, o.w, o.h).attr({
        fill: 'hsb(' + o.c + ', 0.2, 1)'
    });
}

function trig(o) {
    return R.triangle(o.x, o.y, o.s).attr({
        gradient: '90-#526c7a-#64a0c1'
    });
}

window.onload = function () {
    R = Raphael(0, 0, "100%", "100%");

    var dashed = {fill: "none", stroke: "#666", "stroke-dasharray": "- "};

    var obstaculos = [
        rect({ x: 100, y: 100, w: 150, h: 150, c: 0 }),
        rect({ x: 310, y: 100, w: 100, h: 100, c: .3 }),
        rect({ x: 420, y: 250, w: 100, h: 150, c: .6 }),
        rect({ x: 530, y: 100, w: 100, h: 100, c: .9 })
    ];


      R.set.apply(R, obstaculos).drag(function (dx, dy) {
        this.attr({x: this.orig.x + dx, y: this.orig.y + dy});
    }, function () {
        this.orig = { x: this.attrs.x, y: this.attrs.y };
        this.attr({ opacity: 0.5 });
    }, function () {
        this.orig = null;
        this.attr({ opacity: 1 });
    });

    var pl = trig({ x : 200, y : 300, s: 100 });



    pl.click(function () {
        pl.animate({ transform: 't300,-100r-25' }, 2000, '<>');
    });
};
