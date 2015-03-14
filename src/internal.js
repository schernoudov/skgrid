var namespace = ".sk.jquery.skgrid";

var init = function(options) {

};

var renderTable = function(data) {
    if (data.headers && data.headers.length !== 0) {
        renderHeader.call(this, data.headers);
    }
    renderColumns.call(this, data);
    if (this.options.labels.length !== 0) {
        renderLabels.call(this);
    }
};

var renderHeader = function(header) {
    var tr = $('<tr></tr>');
    for(var i in header) {
        $('<th></th>')
            .html(header[i])
            .appendTo(tr);
    }
    $(tr)
        .appendTo($('<thead></thead>')
                        .appendTo(this.element));
};

var renderColumns = function(data) {
    var self = this;
    var tr;
    var property;
    var i;
    if (data.rows && data.rows.length !== 0) {
        for (i = 0 ; i < data.rows.length ; i++) {
            tr = $('<tr></tr>');
            if (this.options.rowClassDeterminator) {
                tr.addClass(this.options.rowClassDeterminator(i));
            }
            for (property in data.rows[i]) {
                renderCell.call(self, tr, property, data.rows[i][property]);
            }
            $(tr).appendTo(this.element);
        }
        this.element.wrap("<div style='overflow-x: auto'></div>");
    } else if (data.columns && data.columns.length !== 0) {
        for(property in data.columns[0]) {
            tr = $('<tr></tr>');
            if (this.options.rowClassDeterminator) {
                tr.addClass(this.options.rowClassDeterminator(i));
            }
            for (i in data.columns) {
                renderCell.call(self, tr, property, data.columns[i][property]);
            }
            $(tr).appendTo(this.element);
        }
        this.element.wrap("<div style='overflow-x: scroll'></div>");
    }
};

var renderCell = function(row, property, cellData) {
    if (this.options.cellClassDeterminator) {
        $("<td></td>")
            .addClass(this.options.cellClassDeterminator(property, cellData))
            .html(cellData)
            .appendTo(row);
    } else {
        $("<td></td>").html(cellData).appendTo(row);
    }
};

var renderLabels = function() {
    var labelHolder = $("<div class='sktable-label-wrapper'></div>");
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
        label.css('height', rowHeight);
        label.addClass(this.options.labelClassDeterminator(i));
        label.css("line-height", rowHeight + "px");
    }
    labelHolder.css('top', this.element.children('thead').height());
    labelHolder.insertBefore(this.element.parent());
};