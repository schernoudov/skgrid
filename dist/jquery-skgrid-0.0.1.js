var namespace = ".sk.jquery.skgrid";
var SKGrid = function(element, options) {
	this.element = $(element);
	this.origin = this.element.clone();
	this.options = $.extend(true, {}, SKGrid.defaults, this.element.data(), options);
};

SKGrid.defaults = {
};

SKGrid.prototype.appendRows = function(rows) {
};

SKGrid.prototype.joinLabels = function(labels) {
};
$.fn.skgrid = function(option) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
        var $this = $(this);
        var instance = $this.data(namespace);
        var options = typeof option === "object" && option;
        if (!instance && option === "destroy") {
            return;
        }
        if (!instance) {
            $this.data(namespace, (instance = new SKGrid(this, options)));
            init.call(instance);
        }
        if (typeof option === "string") {
            return instance[option].apply(instance, args);
        }
    });
};

$.fn.skgrid.Constructor = SKGrid;