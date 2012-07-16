
var chartData = {
    grid: {
		xAxis: {
			type: "number",
			name: "Date",
			axisLabel: "date"   //will be used in tooltips for data dots,
		},
		yAxis: {
			type: "float",
			name: "Page response time (s)",
			axisLabel: "response"   //will be used in tooltips for data dots
		}
	},
	dataset:[
		{
			name: "Some data1",
			color: "#ff00ff",
			description: "Detailed description of this dataset",
			data:[ //Will contain array of dots
				{x:0,	y:1.2,hint:"This is a description of this particular"},
				{x:1,y:1.6},
				{x:2,y:1.8},
				{x:3, y:2.0},
				{x:4, y:2.0}
			]
		},
		{
			name: "Some data2",
			color: "#0000ff",
			description: "Detailed description of this dataset",
			data:[ //Will contain array of dots
				{x:0,	y:-2.0,hint:"This is a description of this particular"},
				{x:1,y:1.0},
				{x:2,y:1.1},
				{x:3,y:1.1},
				{x:4, y:-1.0}
			]
		},
		{
			name: "Some data 3",
			color: "#ff0000",
			description: "Detailed description of this dataset",
			data:[ //Will contain array of dots
				{x:0,	y:-2.0,hint:"This is a description of this particular"},
				{x:1,y:1.0},
				{x:2,y:1.1},
				{x:3,y:1.1},
				{x:4, y:-1.0}
			]
		}
	]
};




window.onload = function(){
    var raphael = Raphael("plot", 500, 500);
    
    
	var r2 = Raphael("plot2", 500, 500);

    var bar = OculusBarChart.create();
    bar.setPlot(document.getElementById("plot3"));
    bar.setRaphael(raphael);
    bar.setRect(0,0,500,400);
    bar.grid.axis.x.name = "Time";
    bar.grid.axis.x.unit = "s";
    bar.grid.axis.x.range = [0,4];
    bar.grid.axis.x.type = "label";
	bar.grid.axis.x.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	
    bar.grid.axis.y.name = "Percent";
    bar.grid.axis.y.unit = "%";
    bar.grid.axis.y.range = [-2.0,2.5];
    
    bar.chartData = chartData;
    bar.drawChart();
	
	
	var pie = OculusPieChart.create();
	pie.setPlot(document.getElementById("plot"));
    pie.setRaphael(raphael);
    pie.setRect(0,0,500,400);
    pie.grid.axis.x.name = "Time";
    pie.grid.axis.x.unit = "s";
    pie.grid.axis.x.range = [0,4];
    pie.grid.axis.x.type = "label";
    pie.grid.axis.x.labels = ["0", "1", "2","3", "4"];
	
    pie.grid.axis.y.name = "Percent";
    pie.grid.axis.y.unit = "%";
    pie.grid.axis.y.range = [-2.0,2.5];
    
    pie.chartData = {
		dataset:[
			{
				name: "Fruits",
				color: "#ff0000",
				value:140
			},
			{
				name: "Vegetables",
				color: "#00ff00",
				value:30
			},
			{
				name: "Meat",
				color: "#0000ff",
				value:30
			}
		]
	};
    //pie.settings.line.fill = true;
	//pie.settings.line.glow = false;
	pie.drawChart();
	
	
	var lines = OculusLineChart.create();
	lines.setPlot(document.getElementById("plot2"));
    lines.setRaphael(r2);
    lines.setRect(0,0,500,400);
    /*lines.grid.axis.x.name = "Time";
    lines.grid.axis.x.unit = "s";
    lines.grid.axis.x.range = [0,3];
    lines.grid.axis.x.type = "number";
	
    lines.grid.axis.y.name = "Percent";
    lines.grid.axis.y.unit = "%";
    lines.grid.axis.y.range = [-2.0,2.5];
    
	var num = 30;
	var sx = lines.grid.axis.x.range[0];
	var dx = (lines.grid.axis.x.range[1] - lines.grid.axis.x.range[0])/num;
	chartData.dataset[0].data = new Array();
	chartData.dataset[1].data = new Array();
	for(var i=0;i<=num;i++){
		chartData.dataset[0].data[i] = {x:i*dx + sx, y:Math.random()*4-2};
		chartData.dataset[1].data[i] = {x:i*dx + sx, y:Math.random()*4-2};
	}
	
    lines.chartData = chartData;
	lines.settings.line.fill = false;
	lines.settings.line.glow = false;
	
    *///lines.drawChart();
	
	lines.loadChart("response.js");
	//lines.drawLoadingIcon();
	document.getElementById("makeBigger").onclick = function(){
		var plot = document.getElementById("plot2");
		plot.style.position = "absolute";
		var ws = window.size();
		plot.style.zIndex = 999;
		plot.style.top = 20;
		plot.style.left = 10;
		var w = ws.width - 40;
		var h = ws.height - 20;
		plot.style.width = w;
		plot.style.height = h;
		lines.setRect(0, 0, w, h);
		lines.redraw(Raphael("plot2", w, h));
	};
	//document.getElementById("makeBigger").onclick();
}

