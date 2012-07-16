{
    grid: {
		xAxis: {
			type: "date",
			name: "Time",
			unit: "s",   //will be used in tooltips for data dots
			labels: [1,2,3,4,5]
			//range: [0, 4]
		},
		yAxis: {
			type: "float",
			name: "Page response time",
			unit: "s"//,   //will be used in tooltips for data dots
			//range: [-2, 2]
		}
	},
	dataset:[
		{
			name: "Soem data 1",
			color: "#ff00ff",
			description: "Detailed description of this dataset",
			data:[ //Will contain array of dots
				{x:1306435889579, y:1.2, hint:"This is a description of this particular"},
				{x:1306535889579, y:1.6},
				{x:1306635889579, y:1.8},
				{x:1306735889579, y:2.0},
				{x:1306835889579, y:2.0}
			]
		},
		{
			name: "Some data 2",
			color: "#0000ff",
			description: "Detailed description of this dataset",
			data:[ //Will contain array of dots
				{x:1306435889579, y:-2.0,hint:"This is a description of this particular"},
				{x:1306535889579, y:1.0},
				{x:1306635889579, y:1.1},
				{x:1306735889579, y:1.1},
				{x:1306835889579, y:-1.0}
			]
		},
		{
			name: "Some data 3",
			color: "#ff0000",
			description: "Detailed description of this dataset",
			data:[ //Will contain array of dots
				{x:1306435889579,	y:-2.0,hint:"This is a description of this particular"},
				{x:1306535889579,y:3.05},
				{x:1306635889579,y:0.1},
				{x:1306735889579,y:2.1},
				{x:1306835889579, y:-1.0}
			]
		}
	]
}
