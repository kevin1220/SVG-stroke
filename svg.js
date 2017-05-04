var SVG = function(paths) {
    this.paths = paths;
    this.pathLengthCollection = [];
    for (var i = 0; i < paths.length; i++) {
        this.pathLengthCollection[i] = paths[i].getTotalLength();
        paths[i].style.strokeDasharray = paths[i].getTotalLength();
        paths[i].style.strokeDashoffset = paths[i].getTotalLength();
        paths[i].setAttribute("fill", "transparent");
    }
}
SVG.prototype.draw = function(options) {
    var i = 0;
    var duration = options.duration;
    var _this = this;
    _this.drawSingle(_this.paths[i], i, options);
    var start = setInterval(function() {
        i++;
        if (i == _this.paths.length) {
            clearInterval(start);
        } else {
            _this.drawSingle(_this.paths[i], i, options);
        }

    }, duration);
}
SVG.prototype.drawSingle = function(path, index, options) {
    var _this = this;
    var speed = _this.pathLengthCollection[index] / (options.duration / 60)
    /**
     * 如果需要定义画笔的颜色和画笔的宽度，把下面两行注释取消      
     */
    // path.setAttribute("stroke", options.stroke);
    // path.setAttribute("stroke-width", options.strokeWidth);
    path.style.strokeDashoffset -= speed;
    var start = setInterval(function() {
        if (path.style.strokeDashoffset <= speed) {
            path.style.strokeDashoffset = 0;
            clearInterval(start);
        } else {
            path.style.strokeDashoffset -= _this.pathLengthCollection[index] / (options.duration / 60);
        }
    }, 60);
}
