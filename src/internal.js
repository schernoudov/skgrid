var namespace = ".sk.jquery.skgrid";

var init = function(options) {

};

var renderTable = function(data) {
    if (this.options.renderHeader) {
        renderHeader.call(this, data.header);
    }
    renderColumns.call(this, data.data);
    if (this.options.renderLabels) {
        renderLabels.call(this);
    }
};

var renderHeader = function(header) {

};

var renderColumns = function(data) {

};

var renderLabels = function() {

};