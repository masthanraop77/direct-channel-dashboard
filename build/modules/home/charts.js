
var chartsfn = function() {

    $('#quarter_view').empty();
    var quarterView = "/getTowerView?client="+dashboardclient+"&year="+dashboardyear+"&qrtr="+dashboardquarter;
	  $.getJSON(quarterView, {
		format: "json"
	  }).done(function( data ) {

     var line1 = [],line2 = [],ticks = [];
    
    for(var i=data.length - 1;i>=0;i--) {
        line1.push([data[i].expected,data[i].name]);
            line2.push([data[i].achieved,data[i].name]);
            ticks.push(data[i].name);
    }
    
    var plot2b = $.jqplot('quarter_view',[line1,line2], {
            
             seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true, location: 'e', edgeTolerance: -15 },
				
                rendererOptions: {
					shadowOffset: 0,
                    highlightMouseOver: false,
                    barDirection: 'horizontal',
                    barPadding: -1
                }
            },
			axesDefaults: {
				rendererOptions: {
					baselineWidth: 1.5,
					drawBaseline: false
				}
			},
            axes: {
		xaxis: {
                tickOptions:{
                	formatString: "%#.1f",
			showGridline: false,
			showLabel: false,
			showTicks : false,
			mark : null
                }
             },

                yaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickOptions:{
				    showGridline: false,
					showLabel: false,
					mark : null

                }
                }
            },
			seriesColors: [ "#7d7d7d", "#32bca2"],
			grid:{background:'#ffffff',shadow:false,drawBorder:false}

        });
    });
     
        $('#quarter_view').bind('jqplotDataHighlight', 
            function (ev, seriesIndex, pointIndex, data) {
                $('#info2b').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data+ ', pageX: '+ev.pageX+', pageY: '+ev.pageY);
            }
        );    
        $('#quarter_view').bind('jqplotDataClick', 
            function (ev, seriesIndex, pointIndex, data) {
                $('#info2c').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data+ ', pageX: '+ev.pageX+', pageY: '+ev.pageY);
            }
        );
             
        $('#quarter_view').bind('jqplotDataUnhighlight', 
            function (ev) {
                $('#info2b').html('Nothing');
            }
        );

    
    $.jqplot.config.enablePlugins = true;
    
        
    $('#csat').empty();
        var csatView = "/getCSATData?client="+dashboardclient+"&year="+dashboardyear+"&qrtr="+dashboardquarter;
	  $.getJSON(csatView, {
		format: "json"
	  }).done(function( data ) {
	
     var s1 = [],ticks = [];
     
     $.each(data, function(index, item) {
            s1.push(item.y);
            ticks.push(item.name);
});
        
    	var plot5 = $.jqplot('csat', [s1], {
            animate: !$.jqplot.use_excanvas,
	    seriesDefaults:{
		renderer:$.jqplot.BarRenderer,
		rendererOptions: {
                    shadowOffset: 0,
                    highlightMouseOver: false,
		            barDirection: 'horizontal',                    
                    barPadding: 20,
                    barWidth: 18
		},
		pointLabels: {show: true, location: 'e', edgeTolerance: -15, formatString: '%#.1f'}
	    },
            axesDefaults: {
                rendererOptions: {
                    baselineWidth: 1.5,
                    drawBaseline: false
                }
            },
	    axes: {
		yaxis: {
		    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks,
                    tickOptions:{
                        showGridline: false,
                        mark : null
                    }
		},
                xaxis: {
                    tickOptions:{
                        showGridline: false,
                        showLabel: false,
                        mark : null
                    }
                }
	    },
            seriesColors: ["#32bca2"],
			grid:{background:'#ffffff',shadow:false,drawBorder:false},
            gridPadding: {
                top: 35
            }
	});
            
        });
        
        $('#csat').bind('jqplotDataClick', 
                function (ev, seriesIndex, pointIndex, data) {
                    $('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
                }
            );


        $.jqplot.config.enablePlugins = true;
    $('#red_projects').empty();
        var redProjView = "/getREDData?client="+dashboardclient+"&year="+dashboardyear+"&qrtr="+dashboardquarter;
	  $.getJSON(redProjView, {
		format: "json"
	  }).done(function( data ) {
          
      var s1 = [],ticks = [];
      
      $.each(data, function(index, item) {
            s1.push(item.y);
            ticks.push(item.name);
          
});
         
       var plot1 = $.jqplot('red_projects', [s1],  {
            
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
				rendererOptions: {
					shadowOffset: 0,
                    highlightMouseOver: false,
					barWidth: 28,
					barMargin: 5
                },
                pointLabels: {show: true}
            },
			axesDefaults: {
				rendererOptions: {
					baselineWidth: 1.5,
					drawBaseline: false
				}
			},
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks,
					tickOptions:{
					showGridline: false,
					showTicks : false,
					mark : null
					}
                },
				yaxis: {
					tickOptions:{
				    showGridline: false,
					showLabel: false,
					showTicks : false,
					mark : null

                }
                }
            },
			seriesColors: ["#32bca2"],
			grid:{background:'#ffffff',shadow:false,drawBorder:false}
        });
        });
        
        $('#red_projects').bind('jqplotDataClick', 
            function (ev, seriesIndex, pointIndex, data) {
                $('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );

        
    $.jqplot.config.enablePlugins = true;
    
    $('#attrition').empty();
    var attritionView = "/getAttritionData?client="+dashboardclient+"&year="+dashboardyear+"&qrtr="+dashboardquarter;
	  $.getJSON(attritionView, {
		format: "json"
	  }).done(function( data ) {

var s1 = [],ticks = [];

$.each(data, function(index, item) {
            s1.push(item.y);
            ticks.push(item.name);
});
    
    var plot1 = $.jqplot('attrition', [s1], {
        
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
				rendererOptions: {
					shadowOffset: 0,
                    highlightMouseOver: false,
					barWidth: 28

                },
                pointLabels: { show: true }
            },
			axesDefaults: {
				rendererOptions: {
					baselineWidth: 1.5,
					drawBaseline: false
				}
			},
            axes: {
                xaxis: {
						renderer: $.jqplot.CategoryAxisRenderer,
						ticks: ticks,
						tickOptions:{
						showGridline: false,
						showTicks : false,
						mark : null
					}
                },
				yaxis: {
							tickOptions:{
							formatString: "%#.1f",
							showGridline: false,
							showLabel: false,
							showTicks : false,
							mark : null

						}
                }
            },
			seriesColors: ["#32bca2"],
			grid:{background:'#ffffff',shadow:false,drawBorder:false},			
            gridPadding: {
                top: 35
            }
        });
          
});
        $('#attrition').bind('jqplotDataClick', 
            function (ev, seriesIndex, pointIndex, data) {
                $('#info1').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );
    };
