var utility, buffer, frasher, onsitemix;

var circularchartfn = function() {
        $("#uti").empty();
        $("#OnMix").empty();
        $("#buffer").empty();
        $("#fresher").empty();
	  var circular_chart = "/getResourceData?client="+dashboardclient+"&year="+dashboardyear+"&qrtr="+dashboardquarter;
	  $.getJSON(circular_chart, {
		format: "json"
	  }).done(function(data) {
         
                   utility=data[3].pie;
                   onsitemix=data[2].pie;
                   buffer=data[0].pie;
                   frasher=data[1].pie;
        
                 $('#uti').text(data[3].name);
                 $('#OnMix').text(data[2].name);
                 $('#buffer').text(data[0].name +' %');
                 $('#fresher').text(data[1].name + ' %');
	

var DonutChart = function (canvas, radius, lineWidth, arraySlices, label) {
    this._radius = radius;
    this._lineWidth = lineWidth; //px
    this._arraySlices = arraySlices;
    this._label = label;
    this._x_center = canvas.width / 2;
    this._y_center = canvas.height / 2;
    this._context = canvas.getContext("2d");

    this.drawCircle = function () {
        var context = this._context;
        context.lineWidth = this._lineWidth;
        var radius = this._radius;
        var offset_radians = -0.5 * Math.PI;
        var start_radians = offset_radians;
        var counterClockwise = true;
        var self = this;
        this._arraySlices.forEach(function (slice) {
            context.beginPath();
            context.strokeStyle = slice.color;
            var end_radians = start_radians - (Math.PI * 2) * slice.percent / 100;
            context.arc(self._x_center, self._y_center, radius,
            start_radians, end_radians, counterClockwise);
            context.stroke();
            start_radians = end_radians;
        });
    };

    this.drawText = function () {
        var fontSize = this._label.font_size;
        var context = this._context;
        context.font = fontSize + 'pt Arial';
        context.textAlign = 'center';
        context.fillStyle = this._label.color;
        var text = this._label.text;
        context.fillText(text, this._x_center, this._y_center + fontSize / 2);
    };

    this.render = function () {
        this.drawCircle();
        this.drawText();
    };

};



$(function () {
    //create canvas
    $("#chartContainer").empty();
    var canvasElem$ = $("<canvas/>");
    $("#chartContainer").append(canvasElem$);
    var canvas = $(canvasElem$).get(0);
    var sideLength = 60;
    canvas.width = canvas.height = sideLength;
    var lineWidth = 8;
    var radius = (sideLength - lineWidth) / 2;
    var label = "Label text";

    var slices = [{
        percent: utility,
        color: "#32bca2"
        
    },{ percent: 100-utility,
        color: "#7d7d7d"}];
    
    label = {
        text: slices[0].percent+'%',
        color: "#a2a2a2",
        font_size: 8
    };

    var donutChart = new DonutChart(canvas, radius, lineWidth, slices, label);
    donutChart.render();
});
        
        
        

$(function () {
    //create canvas
    $("#chartContainer1").empty();
    var canvasElem$ = $("<canvas/>");
    $("#chartContainer1").append(canvasElem$);
    var canvas = $(canvasElem$).get(0);
    var sideLength = 60;
    canvas.width = canvas.height = sideLength;
    var lineWidth = 8;
    var radius = (sideLength - lineWidth) / 2;
    var label = "Label text";

    var slices = [{
        percent: onsitemix,
        color: "#32bca2"
    },{ percent: 100-onsitemix,
        color: "#7d7d7d"}];
    
    label = {
        text: slices[0].percent+'%',
        color: "#a2a2a2",
        font_size: 8
    };

    var donutChart = new DonutChart(canvas, radius, lineWidth, slices, label);
    donutChart.render();
});
         


$(function () {
    //create canvas
    $("#chartContainer2").empty();
    var canvasElem$ = $("<canvas/>");
    $("#chartContainer2").append(canvasElem$);
    var canvas = $(canvasElem$).get(0);
    var sideLength = 60;
    canvas.width = canvas.height = sideLength;
    var lineWidth = 8;
    var radius = (sideLength - lineWidth) / 2;
    var label = "Label text";

    var slices = [{
        percent: buffer,
        color: "#32bca2"
    },{ percent: 100-buffer,
        color: "#7d7d7d"}];
    label = {
        text: slices[0].percent+'%',
        color: "#a2a2a2",
        font_size: 8
    };

    var donutChart = new DonutChart(canvas, radius, lineWidth, slices, label);
    donutChart.render();
});
      


$(function () {
    //create canvas
    $("#chartContainer3").empty();
    var canvasElem$ = $("<canvas/>");
    $("#chartContainer3").append(canvasElem$);
    var canvas = $(canvasElem$).get(0);
    var sideLength = 60;
    canvas.width = canvas.height = sideLength;
    var lineWidth = 8;
    var radius = (sideLength - lineWidth) / 2;
    var label = "Label text";

    var slices = [{
        percent: frasher,
        color: "#32bca2"
    },{ percent: 100-frasher,
        color: "#7d7d7d"}];
    label = {
        text: slices[0].percent+'%',
        color: "#a2a2a2",
        font_size: 8
    };

    var donutChart = new DonutChart(canvas, radius, lineWidth, slices, label);
    donutChart.render();
});
});

};