
var SKGrid = function(element, options) {
	this.element = $(element);
	this.origin = this.element.clone();
	this.options = $.extend(true, {}, SKGrid.defaults, this.element.data(), options);
};

SKGrid.defaults = {
    requestType: "POST",
    url: "",
    renderHeader: false,
    renderLabels: false,
    rowClassDeterminator: undefined,
    cellClassDeterminator: undefined,
	labelClassDeterminator: undefined,
    labels: []
};

SKGrid.prototype.appendRows = function(rows) {
};

SKGrid.prototype.loadData = function(data) {
    var self = this;
    $.ajax({
        url: this.options.url,
        type: this.options.requestType,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
		data: data,
        success:    function (data) {
                        renderTable.call(self, data);
                    }
    });
};

SKGrid.prototype.clear = function(clearLabels, clearHeader) {
	if (clearLabels) {
        removeLabels.call(this);
	}
	if (clearHeader) {
		removeHeader.call(this);
	}
    removeBody.call(this);
};