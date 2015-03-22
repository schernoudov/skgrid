(function ($, window, undefined) {
    /*jshint validthis: true */
    "use strict";

var namespace = ".sk.jquery.skgrid";

var initialized = false;

var init = function(options) {
    wrapTable.call(this);
    wrapLabels.call(this);
    this.initialized = true;
    if (this.options.onInit) {
        this.options.onInit.call(this);
    }
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
    if (this.options.onRender) {
        this.options.onRender.call(this);
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

var removeHeader = function () {
  this.element.children('thead').remove();
};

var renderBody = function(data) {
    if (data.rows && data.rows.length !== 0) {
        renderRows.call(this, data);
    } else if (data.columns && data.columns.length !== 0) {
        renderColumns.call(this, data);
    }
};

var removeBody = function () {
    this.element.children('tbody').remove();
};

var renderRows = function(data) {
    var htmlString = "";
    for (var i = 0 ; i < data.rows.length ; i++) {
        var tr = $('<tr></tr>');
        if (this.options.rowClassDeterminator) {
            tr.addClass(this.options.rowClassDeterminator(i));
        }
        for (var property in data.rows[i]) {
            renderCell.call(this, tr, property, data.rows[i][property]);
        }
        htmlString += $(tr)[0].outerHTML;
    }
    $(htmlString).appendTo(this.element);
};

var renderColumns = function(data) {
	var columnIndex = 0;
    var htmlString = "";
    for(var property in data.columns[0]) {
        var tr = $('<tr></tr>');
        if (this.options.rowClassDeterminator) {
            tr.addClass(this.options.rowClassDeterminator(columnIndex));
        }
        for (var i in data.columns) {
            renderCell.call(this, tr, property, data.columns[i][property]);
        }
        htmlString += $(tr)[0].outerHTML;
		columnIndex++;
    }
    $(htmlString).appendTo(this.element);
};

var wrapTable = function() {
    this.element.wrap("<div class='skgrid-wrapper'></div>");
    this.element.wrap("<div style='overflow-x: auto' class='skgrid-table-wrapper'></div>");
};

var wrapLabels = function() {
    this.labelHolder = $("<div class='skgrid-label-wrapper'></div>");
    this.labelHolder.css('position', 'relative');
    this.labelHolder.css('float', 'left');
    this.labelHolder.insertBefore(this.element.parent());
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
    var htmlString = "";
    for (var i in labels) {
        var label = $("<label style='display: block'></label>");
        label
             .html(labels[i]);
        var currentRow = this.element
                                .children("tbody")
                                    .children()
                                        .eq(i);
        var rowHeight = currentRow.height() - parseInt(this.element.css('border-top-width'));
        label.css('height', rowHeight);
        label.css('margin', '0px');
		if (this.options.labelClassDeterminator) {
			label.addClass(this.options.labelClassDeterminator(i));
		}
        label.css("line-height", rowHeight + "px");
        htmlString += label[0].outerHTML;
    }
    $(htmlString).appendTo(this.labelHolder);
    this
        .labelHolder
            .css('top', this.element.children('thead').height() + 1);
};

var removeLabels = function() {
    this.labelHolder.children('label').remove();
};

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
})(jQuery, window);