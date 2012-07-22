[Oculus Charts](http://ishubin.github.com/oculus-charts/) - Javascript charts for simple graph display in a browser
===================

Demo
--------------------

Try some live examples [here](http://ishubin.github.com/oculus-charts/)


How to use it?
--------------------
Just define an empty div with custom id in your html document

    <div id="myPlot" style="background:black;"></div>

Then in your javascript create a chart and specify the id of the plot and its size 

    var bars = OculusBarChart.create("myChart", 500, 400);

Pie Chart
--------------------

    var pie = OculusPieChart.create("plotPie", 400, 400);
    pie.chartData = {
        dataset:[
            {
                name: "Fruits",
                color: "#aa0000",
                value: 140
            },
            {
                name: "Vegetables",
                color: "#00aa00",
                value: 30
            },
            {
                name: "Meat",
                color: "#0000aa",
                value: 30
            }
        ]
    };
    pie.settings.line.width = 2;
    pie.settings.line.color = "#fff";
    pie.settings.innerText.showAlways = true;
    pie.settings.outterText.showAlways = false;
    pie.drawChart();

![image](http://ishubin.hithub.com/oculus-charts/images/pie-chart-example.png)

Line Chart
--------------------
    var lines = OculusLineChart.create("plotLine", 550, 400);
    lines.name = "Line chart demo";
    lines.grid.axis.x.name = "Time";
    lines.grid.axis.x.unit = "s";
    lines.grid.axis.x.range = [0, 4];
    lines.grid.axis.x.type = "number";

    lines.grid.axis.y.name = "Percent";
    lines.grid.axis.y.unit = "%";
    lines.grid.axis.y.range = [-2.0, 2.5];

    var chartData = {
        dataset:[
            {
                name: "Some data1",
                color: "#ff00ff",
                data:[
                    {x: 0,   y: 1.2, hint:"Small hint"},
                    {x: 1, y: 1.6},
                    {x: 2, y: 1.8},
                    {x: 3, y: 2.0},
                    {x: 4, y: 2.0}
                ]
            },
            {
                name: "Some data2",
                color: "#00ff00",
                data:[
                    {x: 0,   y:-1.2},
                    {x: 1, y: 0.6},
                    {x: 2, y: -1.8},
                    {x: 3, y: 1.0},
                    {x: 4, y: 2.5}
                ]
            }
        ]
    };
    lines.chartData = chartData;
    lines.settings.line.fill = false;
    lines.settings.line.glow = true;
    lines.drawChart();

![image](http://ishubin.hithub.com/oculus-charts/images/line-chart-example.png)

Bar Chart
--------------------
    var bars = OculusBarChart.create("plotBar", 550, 400);
    bars.name = "Bar chart demo";
    bars.grid.axis.x.name = "Day";
    bars.grid.axis.x.unit = null;
    bars.grid.axis.x.range = [0, 4];
    bars.grid.axis.x.type = "label";
    bars.grid.axis.x.labels = [
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday"
    ];

    bars.grid.axis.y.name = "Percent";
    bars.grid.axis.y.unit = "%";
    bars.grid.axis.y.range = [-2.0, 2.5];

    var chartData = {
        dataset:[
            {
                name: "Some data1",
                color: "#a00",
                data:[
                    {x: 0,   y: 1.2, hint:"Small hint"},
                    {x: 1, y: 1.6},
                    {x: 2, y: 1.8},
                    {x: 3, y: 2.0},
                    {x: 4, y: 2.0}
                ]
            },
            {
                name: "Some data2",
                color: "#0a0",
                data:[
                    {x: 0,   y: -1.2},
                    {x: 1, y: 0.6},
                    {x: 2, y: -1.8},
                    {x: 3, y: 1.0},
                    {x: 4, y: 2.5}
                ]
            }
        ]
    };
    bars.chartData = chartData;
    bars.settings.gloss.on = true;
    bars.settings.gloss.value = 0.3;
    bars.settings.gloss.color = "#fff";

    //Changing the text color
    bars.settings.textColor = "#000";
    bars.grid.settings.text.color = "#000";
    bars.grid.settings.text.axis.color = "#000";
    bars.grid.settings.rect.color = "#000";
    bars.grid.settings.rect.opacity = 0.3;

    bars.drawChart();

![image](http://ishubin.hithub.com/oculus-charts/images/var-chart-example.png)

License
--------------------

This library is distributed under Apache 2 license. For more information please read [license](http://apache.org)


