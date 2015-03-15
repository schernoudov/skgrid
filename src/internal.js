var namespace = ".sk.jquery.skgrid";

var init = function(options) {

};

var renderTable = function(data) {
    if (data.headers && data.headers.length !== 0) {
        renderHeader.call(this, data.headers);
    }
    renderBody.call(this, data);
    var labels = (data.labels === null) || (data.labels === undefined) ? this.options.labels : data.labels;
    if (labels) {
        renderLabels.call(this, labels);
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

var renderBody = function(data) {
    wrapTable.call(this, data);
    if (data.rows && data.rows.length !== 0) {
        renderRows.call(this, data);
    } else if (data.columns && data.columns.length !== 0) {
        renderColumns.call(this, data);
    }
};

var renderRows = function(data) {
    for (var i = 0 ; i < data.rows.length ; i++) {
        var tr = $('<tr></tr>');
        if (this.options.rowClassDeterminator) {
            tr.addClass(this.options.rowClassDeterminator(i));
        }
        for (var property in data.rows[i]) {
            renderCell.call(this, tr, property, data.rows[i][property]);
        }
        $(tr).appendTo(this.element);
    }
};

var renderColumns = function(data) {
    for(var property in data.columns[0]) {
        var tr = $('<tr></tr>');
        if (this.options.rowClassDeterminator) {
            tr.addClass(this.options.rowClassDeterminator(i));
        }
        for (var i in data.columns) {
            renderCell.call(this, tr, property, data.columns[i][property]);
        }
        $(tr).appendTo(this.element);
    }
};

var wrapTable = function(data) {
    this.element.wrap("<div class='skgrid-wrapper'></div>");
    if (data.rows && data.rows.length !== 0) {
        this.element.wrap("<div style='overflow-x: auto' class='skgrid-table-wrapper'></div>");
    } else if (data.columns && data.columns.length !== 0) {
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

var renderLabels = function(labels) {
    var labelHolder = $("<div class='skgrid-label-wrapper'></div>");
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
        label.css('margin', '0px');
		if (this.options.labelClassDeterminator) {
			label.addClass(this.options.labelClassDeterminator(i));
		}
        label.css("line-height", rowHeight + "px");
    }
    labelHolder.css('top', this.element.children('thead').height());
    labelHolder.css('position', 'relative');
    labelHolder.css('float', 'left');
    labelHolder.insertBefore(this.element.parent());
};