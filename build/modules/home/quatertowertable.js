/*
Settings
*/
jQuery.noConflict();
var $ = jQuery;
$(function () {
   if(sessionStorage.length === 0) {
        sessionStorage.setItem("db-selected-client","");
        sessionStorage.setItem("db-selected-year","");
        sessionStorage.setItem("db-current-quarter","");
    }
    dbsettings();  
    
});

function dbsettings(){
    var mainSettings = "/getAppSetting";
 
     $.getJSON(mainSettings, {
		format: "json"
	  }).done(function(data) {	

        var clientsdata = data.clients,
            yeardata = data.years;
                
        
        if(sessionStorage.getItem("db-selected-client") === null || sessionStorage.getItem("db-selected-client") === "") {
            sessionStorage.setItem("db-selected-client",clientsdata[0].name);
        }
        if(sessionStorage.getItem("db-selected-year") === null || sessionStorage.getItem("db-selected-year") === "") {
            sessionStorage.setItem("db-selected-year",yeardata[0].year);
        }
        if(sessionStorage.getItem("db-current-quarter") === null || sessionStorage.getItem("db-current-quarter") === "") {
            sessionStorage.setItem("db-current-quarter",data.settings.Current_Quarter);
        }

            dashboardclient = sessionStorage.getItem("db-selected-client");
            dashboardyear = sessionStorage.getItem("db-selected-year");
            dashboardquarter = sessionStorage.getItem("db-current-quarter");
        
		var updatedDate = data.settings.LastUpdatedDate;
        var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
		
        var date = new Date(updatedDate);
        var formattedDate = monthNames[date.getMonth()] + '\'' + date.getFullYear().toString().substr(2,2);        
        var updatedNewDATE = date.getDate() + nth(date.getDate()) + ' ' + monthNames[date.getMonth()] + date.getFullYear();
        
        
		$('#name-display').append("<lable>Welcome <name class=fontwight>" +dashboardclient+"</name></lable>");
		$('div.header span').html(formattedDate);
        $('#datedisplay').append("<label class=datechagnes>" +"Data for Q"+ dashboardquarter+ "&nbsp;&nbsp;|&nbsp;&nbsp;"+"</label>");
        $('#datedisplay').append("<label class=datechagnes>" + updatedNewDATE+ "</label>");
        
        
		$('#positionNo').text(data.settings.OpenPositionsCount); 
		$('#positionNo1').text(data.settings.BenchCount);
        
		
		$('#clients').empty();
		for (var i = 0; i < clientsdata.length; i++) {
            $('#clients').append("<option value='"+clientsdata[i].name+"'>"+clientsdata[i].name+"</option>");
		}
         $('#clients').append("<option value='RK'>RKTest</option>");
		
		$('#years').empty();
		for (var j = 0; j < yeardata.length; j++) {
			options = $('<option/>');
			options.append("<option value='+yeardata[j].year+'>"+yeardata[j].year+"</option>");
			$('#years').append(options);
		}
         $('#years').append("<option value='2017'>2017Test</option>");

        
        $('#clients').change(function(){
            var option = $(this).find('option:selected').val();
            sessionStorage.setItem("db-selected-client",option);
            dashboardclient = option;
            $('#name-display').empty();
            $('#name-display').append("<lable>Welcome <name class=fontwight>"+dashboardclient+"</name></lable>");
            //location.reload();
            tablefirstcall();
            chartsfn();
            circularchartfn();
        });
        
        $('#years').change(function(){        
            var optyear = $(this).find('option:selected').val();
            sessionStorage.setItem("db-selected-year",optyear);
            dashboardyear = optyear;
            //location.reload();
            tablefirstcall();
            chartsfn();
            circularchartfn();
        });
        
                
        $("#clients").val(dashboardclient).prop('selected', true);
        $("#clients option[value=" + dashboardclient + "]").attr('selected','selected');
        
        $("#years").val(dashboardyear).prop('selected', true);
        $("#years option[value=" + dashboardyear + "]").attr('selected','selected');
          
        tablefirstcall();
        chartsfn();
        circularchartfn();
	});  
}

var tablefirstcall = function() {
    $('#tabledataload').empty();
    $.getJSON("/getTowerQuarter?client="+dashboardclient+"&year="+dashboardyear+"&qrtr="+dashboardquarter, function(data) {
		var tr;
        for (var i = 0; i < data.length; i++) {
            tr = $('<tr/>');
            tr.append("<td class= gmfctarget-table>" + data[i].gmfc + " %" + "</td>");
            tr.append("<td class=gmfc-table>" + data[i].gmtarget + " %" + "</td>");
            $('#tabledataload').append(tr);
        }
	});
	
    $('#table1').empty();
    $.getJSON("/getRevSummary?client="+dashboardclient+"&year="+dashboardyear+"&qrtr="+dashboardquarter, function(data) {
		var tr;
		for (var i = (data.length-1); i >=0; i--) {
			tr = $('<tr/>');
            if(data[i].Name == "GM%") {
			tr.append("<td>" + data[i].Name + "</td>");
                if(data[i].FYPrevious !== null) {
			tr.append("<td>" + ((data[i].FYPrevious)*100).toFixed(1) + "%" + "</td>");
                } else{
                tr.append("<td> NA </td>");
                }
			tr.append("<td>" + ((data[i].Q1)*100).toFixed(1) + "%" + "</td>");
			tr.append("<td>" + ((data[i].Q2)*100).toFixed(1) + "%" + "</td>");
			tr.append("<td>" + ((data[i].Q3)*100).toFixed(1) + "%" + "</td>");
			tr.append("<td>" + ((data[i].Q4)*100).toFixed(1) + "%" + "</td>");
			tr.append("<td>" + ((data[i].FYCurrent)*100).toFixed(1) + "%" + "</td>");
			tr.append("<td>" + ((data[i].Target)*100).toFixed(1) + "%" + "</td>");
            } else {
            tr.append("<td>" + data[i].Name + "</td>");
			
                
                if(data[i].FYPrevious !== null) {
			         tr.append("<td>" + data[i].FYPrevious + "</td>");
                } else{
                     tr.append("<td> NA </td>");
                }
                
			tr.append("<td>" + data[i].Q1 + "</td>");
			tr.append("<td>" + data[i].Q2 + "</td>");
			tr.append("<td>" + data[i].Q3 + "</td>");
			tr.append("<td>" + data[i].Q4 + "</td>");
			tr.append("<td>" + data[i].FYCurrent + "</td>");
			tr.append("<td>" + data[i].Target + "</td>");
            }
			$('#table1').append(tr);
		}
		
	});
	
    $('#table2').empty();
    $.getJSON("/getRevCurrentQuarter?client="+dashboardclient+"&year="+dashboardyear+"&qrtr="+dashboardquarter, function(data) {
        var tr;
		for (var i = (data.length-1); i >=0; i--) {
			tr = $('<tr/>');
			
            if(data[i].Name == "GM%") {
            tr.append("<td><span class=current-first>" + ((data[i].Forecast)*100).toFixed(1) + "%" + "</span><br><span class=colorspan>" + data[i].Name + "&nbsp;Forecast" + "</span></td>");
            
            tr.append("<td><span class=current-middle>" + ((data[i].Target)*100).toFixed(1) + "%" + "</span><br><span class=colorspan>" + data[i].Name + "&nbsp;Target" + "</span></td>");
            } else {
            tr.append("<td><span class=current-first>" + data[i].Forecast + "</span><br><span class=colorspan>" + data[i].Name + "Forecast" + "</span></td>");
            
            tr.append("<td><span class=current-middle>" + data[i].Target + "</span><br><span class=colorspan>" + data[i].Name + "Target" + "</span></td>");
            }
		    
            tr.append("<td><span class=current-last>" + (data[i]["Target Acheievment"])*100 + "%" + "</span><br><span class=colorspan>" + "Target Acheievment" + "</span></td>");
			$('#table2').append(tr);
		}	
		
	});	
	
    $('#red_projects_table').empty();
    $.getJSON('http://localhost:5555/json/getDataPosition.json', function(data) {  //NEED to work on the red project service api after confirmation
		var tr;
		for (var i = 0; i < data.length; i++) {
			tr = $('<tr/>');
			tr.append("<td><span class=project-red>" + data[i].projectName + "</span>&nbsp;<span class=colorspan>" +data[i].Description + "</span></td>");
			$('#red_projects_table').append(tr);
		}
		
	});

};

function nth(d) {
  if(d>3 && d<21) return 'th';
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
} 