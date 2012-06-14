function $(s) {
    return document.getElementById(s);
}

function $t(s) {
    return document.getElementsByTagName(s)[0];
}

var R;

var del = false;

function get_random_color() {
    var h = Math.random();
    var s = Math.random() * (0.8 - 0.1) + 0.1;
    var l = Math.random() * (0.8 - 0.2) + 0.2;
    var k = 'hsl(' + h + ',' + s + ',' + l + ')';
    return k;
}


Raphael.fn.triangle = function(x, y, size) {
    var path = ["M", x, y];
    path = path.concat(["L", (x + size / 2), (y + size)]);
    path = path.concat(["L", (x - size / 2), (y + size)]);
    return this.path(path.concat(["z"]).join(" "));
};

function rect(o) {
    var el = R.rect(o.x, o.y, o.w, o.h).attr({
        fill: get_random_color(),
        'stroke-width': 5
    });

    return el.drag(function (dx, dy) {
        if (this.orig.resize)
            this.attr({width: this.orig.w + dx, height: this.orig.h + dy});
        else
            this.attr({x: this.orig.x + dx, y: this.orig.y + dy});
    }, function (x, y) {
        this.orig = {
            x: this.attrs.x,
            y: this.attrs.y,
            dx: x - this.attrs.x,
            dy: y - this.attrs.y,
            w: this.attrs.width,
            h: this.attrs.height
        };

        this.orig.resize = check_border(this.orig);
        this.attr({ opacity: 0.5 });
    }, function () {
        this.orig = null;
        this.attr({ opacity: 1 });
    }).dblclick(function () {
        del = true;
        el.remove();
    });
}

function trig(o) {
    return R.triangle(o.x, o.y, o.s).attr({
        gradient: '90-#526c7a-#64a0c1'
    });
}

function check_border(o) {
    var dx = o.w - o.dx;
    var dy = o.h - o.dy;

    return dx < 5 || dy < 5;
}


var pl, cl, ci;

window.onload = function () {
    R = Raphael(0, 0, "100%", "100%");

    $t('svg').ondblclick = function(e) {
        if (del) {
            del = false;
            return;
        }
        rect({ x: e.x - 50, y: e.y - 50, w: 100, h: 100 });
    };

    pl = trig({ x : 0, y : 0, s: 100 }).transform('t100,10');

    ci = R.circle(100, 10, 5).attr({ fill: 'hsl(0.8,1,0.5)' });

    cl = R.circle(300, 100, 5).attr({ fill: 'hsl(0.2,1,0.5)' });

    R.set(ci, cl).drag(function (dx, dy) {
        this.attr({cx: this.orig.cx + dx, cy: this.orig.cy + dy });
    },
    function (x, y) {
        this.orig = {
            cx: this.attrs.cx,
            cy: this.attrs.cy
        };
        this.attr({ opacity: 0.5 });
    }, function () {
        this.orig = null;
        this.attr({ opacity: 1 });
    });

    pl.attr({ moved: false });

    pl.click(function () {
        var cit = 't' + ci.attrs.cx + ',' + ci.attrs.cy;
        var clt = 't' + cl.attrs.cx + ',' + cl.attrs.cy;

        //'t300,-100r-25'

        pl.attrs.moved = ! pl.attrs.moved;
        if (pl.attrs.moved)
            pl.stop().animate({ transform: clt }, 2000, '<>');
        else
            pl.stop().animate({ transform: cit }, 2000, '<>');
    });
};
