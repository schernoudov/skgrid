var namespace = ".sk.jquery.skgrid";

var init = function(options) {

};

var renderTable = function(data) {
    if (this.options.renderHeader) {
        renderHeader.call(this, data.header);
    }
    renderColumns.call(this, data);
    if (this.options.labels.length !== 0) {
        renderLabels.call(this);
    }
};

var renderHeader = function(header) {

};

var renderColumns = function(data) {
    $(tr).appendTo(this.element);
    for (var i = 0 ; i < data.rows.length ; i++) {
        var tr = $("<tr></tr>");
        if (this.options.rowClassDeterminator) {
            tr.addClass(this.options.rowClassDeterminator(i));
        }
        for (var property in data.rows[i]) {
            var cellData = data.rows[i][property];
            if (this.options.cellClassDeterminator) {
                $("<td></td>")
                    .addClass(this.options.cellClassDeterminator(i, cellData))
                    .html(cellData)
                    .appendTo(tr);
            } else {
                $("<td></td>").html(cellData).appendTo(tr);
            }
        }
        $(tr).appendTo(this.element);
    }
    this.element.wrap("<div class='table-wrapper'></div>");
};

var renderLabels = function() {
    var labelHolder = $("<div class='label-wrapper'></div>");
    var labels = this.options.labels;
    for (var i in labels) {
        var label = $("<label style='display: block'></label>");
        label
             .html(labels[i])
             .appendTo(labelHolder);
        var rowHeight = this.element
                                .children("tbody")
                                .children()
                                .eq(i)
                                .height();
        label.css("height", rowHeight);
        label.addClass("table-label");
        label.css("line-height", rowHeight + "px");
    }
    labelHolder.css('top', this.element.children('thead').height());
    labelHolder.insertBefore(this.element.parent());
};