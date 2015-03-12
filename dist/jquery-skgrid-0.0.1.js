(function ($, window, undefined) {
    /*jshint validthis: true */
    "use strict";

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
    if (data.rows) {
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
        this.element.wrap("<div style='overflow-x: auto'></div>");
    } else if (data.columns) {
        this.element.wrap("<div style='overflow-x: scroll'></div>");
    }
};

var renderLabels = function() {
    var labelHolder = $("<div class='label-wrapper'></div>");
    var labels = this.options.labels;
    var borderWidth = this.element.css("border-width");
    var borderStyle = this.element.css("border-style");
    var borderColor = this.element.css("border-color");
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
        label.css("border-top-width", borderWidth);
        label.css("border-top-style", borderStyle);
        label.css("border-top-color", borderColor);
        label.css("border-left-width", borderWidth);
        label.css("border-left-style", borderStyle);
        label.css("border-left-color", borderColor);

        if (i == labels.length - 1) {
            label.css("border-bottom-width", borderWidth);
            label.css("border-bottom-style", borderStyle);
            label.css("border-bottom-color", borderColor);
        }
    }
    labelHolder.css('top', this.element.children('thead').height());
    labelHolder.insertBefore(this.element.parent());
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
    labels: []
};

SKGrid.prototype.appendRows = function(rows) {
};

SKGrid.prototype.loadData = function() {
    var self = this;
    $.ajax({
        url: this.options.url,
        type: this.options.requestType,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:    function (data) {
                        renderTable.call(self, data);
                    }
    });
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