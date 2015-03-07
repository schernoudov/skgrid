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