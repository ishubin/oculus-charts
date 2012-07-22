/*******************************************************************************
 * Copyright 2012 Ivan Shubin http://mindengine.net
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/


OculusObject = new Object();
OculusObject.addAll = function(sourceObject){
    for (var e in sourceObject){
        this[e] = sourceObject[e];
    }
}

OculusObject.extend = function(){
     var obj = new Object();
	 obj.addAll = OculusObject.addAll;
     obj.addAll(this);
     return obj;
}
OculusObject.create = function(){
    return this.extend();
}

var OculusChartUtils = {
    getMousePosition: function(e) {
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) 	{
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
            posx = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        return {x:posx,y:posy};
    },
    
    getElementPosition:function(element) {
        var posx=0;
        var posy=0;
        if(element) {
            obj=element;
            if(obj.offsetParent) {
                do{
                    posx+=obj.offsetLeft;
                    posy+=obj.offsetTop;
                }while(obj=obj.offsetParent)
            }
        }
        return {x:posx, y:posy};
    }
}




Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(i-1>=0&&format.charAt(i-1)=="\\"){returnStr+=curChar;}else if(replace[curChar]){returnStr+=replace[curChar].call(this);}else if(curChar!="\\"){returnStr+=curChar;}}return returnStr;};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate();},D:function(){return Date.replaceChars.shortDays[this.getDay()];},j:function(){return this.getDate();},l:function(){return Date.replaceChars.longDays[this.getDay()];},N:function(){return this.getDay()+1;},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},w:function(){return this.getDay();},z:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((this-d)/86400000);},W:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((((this-d)/86400000)+d.getDay()+1)/7);},F:function(){return Date.replaceChars.longMonths[this.getMonth()];},m:function(){return(this.getMonth()<9?'0':'')+(this.getMonth()+1);},M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},n:function(){return this.getMonth()+1;},t:function(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),0).getDate()},L:function(){var year=this.getFullYear();return(year%400==0||(year%100!=0&&year%4==0));},o:function(){var d=new Date(this.valueOf());d.setDate(d.getDate()-((this.getDay()+6)%7)+3);return d.getFullYear();},Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},a:function(){return this.getHours()<12?'am':'pm';},A:function(){return this.getHours()<12?'AM':'PM';},B:function(){return Math.floor((((this.getUTCHours()+1)%24)+this.getUTCMinutes()/60+this.getUTCSeconds()/3600)*1000/24);},g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},H:function(){return(this.getHours()<10?'0':'')+this.getHours();},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},u:function(){var m=this.getMilliseconds();return(m<10?'00':(m<100?'0':''))+m;},e:function(){return"Not Yet Supported";},I:function(){return"Not Yet Supported";},O:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+'00';},P:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+':00';},T:function(){var m=this.getMonth();this.setMonth(0);var result=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,'$1');this.setMonth(m);return result;},Z:function(){return-this.getTimezoneOffset()*60;},c:function(){return this.format("Y-m-d\\TH:i:sP");},r:function(){return this.toString();},U:function(){return this.getTime()/1000;}};

Math.log10 = function (n){
    return Math.log(n) / Math.LN10;
}


/*********************************************************/
/*                   Rect                                */
/*                                                       */
/*                                                       */
/*********************************************************/
var Rect = OculusObject.extend();
Rect.addAll({
    create: function(left, top, right, bottom){
        var rect = this.extend();
        rect.left = left;
        rect.top = top;
        rect.right = right;
        rect.bottom = bottom;
        return rect;
    },
    getWidth: function(){
        return this.right - this.left;
    },
    getHeight: function(){
        return this.bottom - this.top;
    },
    isIn: function (p){
        if(p.x >= this.left && p.x<= this.right && p.y>=this.top && p.y<=this.bottom){
            return true;
        }
        return false;
    }
});

/*********************************************************/
/*                   OculusAxis                          */
/*                                                       */
/*********************************************************/
var OculusAxis = OculusObject.extend();
OculusAxis.addAll({
    create: function (type, steps, range){
		var axis = OculusAxis.extend();
		if(type!=null){
			axis.type = type;
		}
		else axis.type = "number"; //can be "date", "number", "float", "label"
		if(steps!=null){
			axis.steps = steps;
		}
		if(range!=null){
			axis.range = range;
		}
		else axis.range = [0, 10];
		
		axis.name = "Undefined"; //will be displayed on the top of the axis
        axis.unit = "u"; //null value will not be displayed on a grid at all
	    
	    axis.steps= 1;
	    
	    axis.labels = []; //used only in case if the type was defined as "label"
	
	    axis.dateFormat= "j.m.Y G:i:s"; //Documentation for date format can be found here http://jacwright.com/projects/javascript/date_format
		return axis;
	},
	
    calculateOptimalSteps: function (width, stepWidth){
		if(this.type != "label"){
			return Math.round(width/stepWidth);
		}
		else return this.labels.length-1;
	},
	
	//Returns the string text for the specified value
	getLabelText: function (value) {
		if(this.type=="date") {
			value = Math.round(value);
			var d = new Date(value);
			return "" + d.format(this.dateFormat);
		}
		else if(this.type == "number" || this.type == "float") {
		    //return "" + Math.round(value);
		    if(value!=0){
		        var st = Math.round(Math.log10(Math.abs(this.range[1]-this.range[0])));
		        if(st>3){
		            return ""+Math.round(value);
		        }
		        else{
		            if(st>-4){
		                var xst = 4 - st;
		                var s10 = Math.pow(10,xst);
		                return ""+((Math.round(value*s10))/s10);
		            }
		            else return ""+value.toExponential(3);
                }
		    }
		    else return "0";
		}
		else if(this.type=="label"){
			return this.labels[Math.round(value)];
		}
		else return ""+value;
	}
});

/*********************************************************/
/*                   OculusGrid                          */
/*                                                       */
/*********************************************************/
var OculusGrid = OculusObject.extend();
OculusGrid.addAll({

    create: function(){
        var grid = OculusGrid.extend();
        grid.rect = Rect.create();
        grid.axis = {
            x: OculusAxis.create("number", 1, [0,10]),
		    y: OculusAxis.create("number", 1, [0,10])
        };
        grid.settings = {
            rect:{
                on:true,
                color:"#ffffff",
                opacity:0.2,
                background:"#888888",
                strokeWidth:2
            },
		    text: {
		        color:"white",
		        fontSize:15,
			    axis: {
				    color:"white",
				    fontSize:12
			    }
		    },
		    axis: {
			    x: {
				    lines: {
					    on:true,
					    color:"#444444",
					    strokeWidth:1,
					    strokeDash:". "
				    },
				    labels: {
					    compactForm:true
				    }
                },
			    y: {
				    lines: {
					    on:true,
					    color:"#444444",
					    strokeWidth:1,
					    strokeDash:". "
				    }
                }
		    }
        };
        return grid;
    },

    //Defines the rectangle to which the data should be drawn
    setRect: function(left, top, right, bottom){
        this.rect.top = top;
        this.rect.left = left;
        this.rect.bottom = bottom;
        this.rect.right = right;
    },
    getRect: function (){
        return this.rect;
    },
	setAxisRange: function(xMin, xMax, yMin, yMax){
		this.axis.x.range = [xMin, xMax];
		this.axis.y.range = [yMin, yMax];
	},
	
    //Calculates the amount of steps for both axises based on optimal step width
    calculateOptimalSteps: function (xStepWidth, yStepWidth){
        if(xStepWidth==null){
            xStepWidth = 50;
        }
        if(yStepWidth==null)yStepWidth = xStepWidth;
        if(xStepWidth>0 && yStepWidth>0){
			this.axis.x.steps = this.axis.x.calculateOptimalSteps(this.rect.getWidth(), xStepWidth);
            this.axis.y.steps = this.axis.y.calculateOptimalSteps(this.rect.getHeight(), yStepWidth);
        }
    },
    
    /**
	* Transforms chart coords to screen coords.
	* returns the following structure:
	* {
	*     x - x coord on screen
	*     y - y coord on screen
	* }
	*/
	translateToScreen: function(x, y){
	    if(this.axis.x.type == "label"){
			this.axis.x.range = [0,this.axis.x.labels.length-1];
		}
		if(this.axis.y.type == "label"){
			this.axis.y.range = [0,this.axis.y.labels.length-1];
		}
	    var kx, lx, ky, ly;
	    kx = (this.rect.right - this.rect.left)/(this.axis.x.range[1] - this.axis.x.range[0]);
	    lx = this.rect.left - kx*this.axis.x.range[0];
	    
	    ky = (this.rect.top - this.rect.bottom)/(this.axis.y.range[1] - this.axis.y.range[0]);
	    ly = this.rect.bottom - ky*this.axis.y.range[0];
	
	    var scrx = Math.round(kx*x + lx);
	    var scry = Math.round(ky*y + ly);
	    
		return {x:scrx, y:scry};
	},
	
    drawGrid: function() {
        var r = this.raphael;
        
        if(this.settings.rect.on) {
            var sr = this.settings.rect;
            r.rect(this.rect.left, this.rect.top, this.rect.getWidth(), this.rect.getHeight()).attr({stroke:sr.color,"stroke-width":sr.strokeWidth,fill:sr.background,opacity:sr.opacity});
        }
		
        this.calculateOptimalSteps();
        //Drawing x axis lines
		if(this.settings.axis.x.lines.on && this.axis.x.steps>0) {
            var slx = this.settings.axis.x.lines;
            var delta = this.rect.getWidth()/this.axis.x.steps;
            for(var i=1; i<this.axis.x.steps; i++){
                var x = Math.round(i*delta)+this.rect.left;
                r.path("M"+x+" "+this.rect.top+"L"+x+" "+this.rect.bottom).attr({stroke:slx.color,"stroke-dasharray":slx.strokeDash,"stroke-width":slx.strokeWidth});
            }
			//Drawing x axis labels
			var dx = (this.axis.x.range[1] - this.axis.x.range[0])/this.axis.x.steps;
			for(var i=0; i<this.axis.x.steps+1;i++){
				
				var textString = null;
				if(this.axis.x.type!="label"){
					textString = this.axis.x.getLabelText(i*dx + this.axis.x.range[0]);
				}
				else textString = this.axis.x.getLabelText(i);
				
				var x = Math.round(i*delta)+this.rect.left;
				var sta = this.settings.text.axis;
				
				
				var text = r.text(x+10, this.rect.bottom+sta.fontSize,""+textString).attr({"text-anchor":"start", stroke:"none", fill:sta.color, "font-size":sta.fontSize});
				//Rotating the text to 45 degrees so it would fit better
				
				if(this.settings.axis.x.labels.compactForm == true){
					text.attr({"transform":"r-45","text-anchor":"end"});
				}
			}
        }
        //Drawing x axis name and unit
        if(this.axis.x.name!=null){
            var str = this.axis.x.name;
            if(this.axis.x.unit!=null){
                str += " ("+this.axis.x.unit + ")";
            }
            r.text(this.rect.right, this.rect.top-20,"" + str).attr({"text-anchor":"end", stroke:"none", fill:this.settings.text.color, "font-size":this.settings.text.fontSize});
        }
        
        //Drawing y axis lines
        if(this.settings.axis.y.lines.on && this.axis.y.steps>0) {
            var sly = this.settings.axis.y.lines;
            var delta = this.rect.getHeight()/this.axis.y.steps;
            for(var i=1; i<this.axis.y.steps; i++){
                var y = Math.round(i*delta)+this.rect.top;
                r.path("M"+this.rect.left+" "+y+"L"+this.rect.right+" "+y).attr({stroke:sly.color,"stroke-dasharray":sly.strokeDash,"stroke-width":sly.strokeWidth});
            }
			
			//Drawing y axis labels
			var dy = (this.axis.y.range[1] - this.axis.y.range[0])/this.axis.y.steps;
			for(var i=0; i<this.axis.y.steps+1;i++){
				var textString = null;
				if(this.axis.y.type!="label"){
					textString = this.axis.y.getLabelText(this.axis.y.range[1] - i*dy);
				}
				else textString = this.axis.y.getLabelText(i);
				
				var y = Math.round(i*delta)+this.rect.top;
				var sta = this.settings.text.axis;
				r.text(this.rect.left - sta.fontSize, y, textString).attr({"text-anchor":"end", stroke:"none", fill:sta.color, "font-size":sta.fontSize});
			}
        }
        //Drawing y axis name and unit
        if(this.axis.y.name!=null){
            var str = this.axis.y.name;
            if(this.axis.y.unit!=null){
                str += " ("+this.axis.y.unit + ")";
            }
            r.text(this.rect.left - 90, Math.round((this.rect.bottom-this.rect.top)/2),"" + str).attr({ transform:"r-90", stroke:"none", fill:this.settings.text.color, "font-size":this.settings.text.fontSize});
        }
    }
});


/*********************************************************/
/*                   OculusChart                         */
/*                                                       */
/*********************************************************/
var OculusChart = OculusObject.extend();
OculusChart.addAll({
    create: function(elementId, width, height) {
        var chart = this.extend();
        chart.name = "Undefined chart";
        chart.grid = OculusGrid.create();
        chart.settings = {
            textColor:"white",
            chartHeader:{
                fontSize:15,
                fontWeight:"bold"
            },
            hint:{
                fontSize:12,
			    fontColor: "white",
			    fontLabelColor: "#5555ff",
                background:"black",
                strokeColor:"#d0d0d0",
                strokeWidth:3
            }
        };
        chart.rect = Rect.create(0,0,width,height);
        chart.changeGridRect(width, height);
        chart.raphael = Raphael(elementId, width, height);
        chart.plot = document.getElementById(elementId);
        return chart;
    },

    changeGridRect: function (width, height) {
        //Calculating grid rect
        var x1=0,y1=0,x2=0,y2=0;
        //Calculating the top of the grid rect based on chart header text height

        var ty = this.rect.top + this.settings.chartHeader.fontSize;
        y1 = ty + this.settings.chartHeader.fontSize+20;
        
        //TODO This should be later calculated based on the maximum width of text labels for "y" axis
        x1 = this.rect.left + 120;
        x2 = this.rect.right - 20;
        
        //TODO this should be calculated based on the maximum height of text labels for "x" axis
        y2 = this.rect.bottom - 100;
        this.grid.setRect(x1,y1,x2,y2);
    },
    
    //Returns the instance of timer for animating the loading icon
    drawLoadingIcon: function() {
        if(this.loadingIconTimer!=null) {
            this.stopLoadingIcon();
        }
        var r = this.raphael;
        var cx = Math.round(this.getRect().getWidth()/2);
        var cy = Math.round(this.getRect().getHeight()/2);
        var mr = Math.min(this.getRect().getWidth(), this.getRect().getHeight());
        var r2 = mr/6;
        var r1 = 30;
        
        var n = 8;
        
        var angle = 0;
        var x1,y1,x2,y2;
        var s = r.set();
        for(var i=0; i<n; i++) {
            angle = Math.PI*2*i/n;
            x1 = cx + Math.round(r1*Math.cos(angle));
            y1 = cy + Math.round(r1*Math.sin(angle));
            x2 = cx + Math.round(r2*Math.cos(angle));
            y2 = cy + Math.round(r2*Math.sin(angle));
            this.loadingIconSet = s.push(r.path("M"+x1+","+y1+" L"+x2+","+y2).attr({stroke:"white","stroke-width":8, opacity:0.6*(i+1)/n}));
        }
        
        var angle = 0;
        var da = 360/n;
        s.rotate(0, cx, cy);
        this.loadingIconTimer = setInterval(function(){
            angle+= da;
            s.rotate(angle, cx, cy);
        },50);
        
    },
    
    stopLoadingIcon: function (){
        if(this.loadingIconTimer!=null){
            clearInterval(this.loadingIconTimer);
            this.loadingIconTimer = null;
			this.loadingIconSet.remove();
        }
    },

	    
    //Defines the rect where the chart will be rendered
    setRect: function(left, top, right, bottom){
        this.rect.top = top;
        this.rect.left = left;
        this.rect.bottom = bottom;
        this.rect.right = right;
    },
    getRect: function (){
        return this.rect;
    },
	
	drawChart: function (){
        var r = this.raphael;
        var tx = Math.round((this.rect.right - this.rect.left)/2);
        var ty = this.rect.top +this.settings.chartHeader.fontSize;
        r.text(tx, ty, this.name).attr({stroke:"none", "text-anchor":"middle", fill:this.settings.textColor, "font-size":this.settings.chartHeader.fontSize, "font-weight":this.settings.chartHeader.fontWeight});
        
        this.grid.raphael = this.raphael;
		if(this.grid != null){
			this.grid.drawGrid();
		}
    },
	
	//Returns the type of the hint
	//checking in what area of the plot this hint is located
		//the number of location is dipsplayed below
		// ---------
		// | 0 | 1 |
		// ---------
		// | 2 | 3 |
		// ---------
	getHintType: function (x, y){
	    var p = this.grid.translateToScreen(x, y);
		var location = 0;
	    var midx = Math.round(this.grid.rect.left + this.grid.rect.getWidth()/2);
	    var midy = Math.round(this.grid.rect.top + this.grid.rect.getHeight()/2);
	    if(p.x > midx && p.y < midy) location = 1;
	    else if(p.x < midx && p.y > midy) location = 2;
	    if(p.x > midx && p.y > midy) location = 3;
	    return location;
	},
	
	//Creates a hint box for the specified value on a plot, fills it with text and returns a refference to this Raphael object
	drawHint: function (x, y, ofx, ofy, caption, color, hintText){
	    var r = this.raphael;
		var p = this.grid.translateToScreen(x, y);
		
		var location = this.getHintType(x, y);
			    
	    //Getting the text and checking how much pixels it would take to fit on the screen
	    var textRowY = this.grid.axis.y.getLabelText(y);
	    var textRowX = this.grid.axis.x.getLabelText(x);
	    
	    if(this.grid.axis.y.unit != null && this.grid.axis.y.unit != "") {
	        textRowY += " " + this.grid.axis.y.unit;
	    }
	    if(this.grid.axis.x.unit != null && this.grid.axis.x.unit != "") {
	        textRowX += " " + this.grid.axis.x.unit;
	    }
	    var textLength = Math.max(textRowY.length,textRowX.length);
	    var xi = 1, yi = 1;
	    if(location == 0){
	        xi = 1; yi = 1;
	    }
	    else if(location == 1) {
	        xi = -1; yi = 1;
	    }
	    else if(location == 2) {
	        xi = 1; yi = -1;
	    }
	    else if(location == 3) {
	        xi = -1; yi = -1;
	    }
	    
	    var fontSize = this.settings.hint.fontSize;
	    var k1 = 20, k2 = 10;
	    var tx = p.x + k2*xi + fontSize;
	    var ty = Math.round(p.y + k2*yi + fontSize/2) + fontSize;
	    
		var sh = this.settings.hint;
		
	    var texts = [
            r.text(tx, ty, caption).attr({stroke:"none", fill:color, "font-weight":"bold", "font-size": fontSize, "text-anchor": "start"}),
            r.text(tx, ty + fontSize + 2, "Y:").attr({stroke:"none", fill:sh.fontLabelColor, "font-weight":"bold", "font-size": fontSize, "text-anchor": "start"}),
	        r.text(tx + fontSize + 5, ty + fontSize + 2, textRowY).attr({stroke:"none", fill:sh.fontColor, "font-size": fontSize, "text-anchor": "start"}),
	        r.text(tx, ty + 2*(fontSize + 2), "X:").attr({stroke:"none", fill:sh.fontLabelColor, "font-weight":"bold", "font-size": fontSize, "text-anchor": "start"}),
	        r.text(tx + fontSize + 5, ty + 2*(fontSize + 2), textRowX).attr({stroke:"none", fill:sh.fontColor, "font-size": fontSize, "text-anchor": "start"})
	    ];
        if ( hintText != null && hintText != "" ) {
            texts.push(r.text(tx + fontSize + 5, ty + 3 * (fontSize  + 2), hintText).attr({stroke:"none", fill:sh.fontColor, "font-size": fontSize, "text-anchor": "start"}));
        }
	    
	    var htextset = r.set();
	    for (var i=0; i<texts.length; i++){
	        htextset.push(texts[i]);
	    }
	    var bbox = htextset.getBBox();
	    var w = bbox.width + fontSize*2;
	    var h = bbox.height + fontSize*2;
	    //drawing hint figure in specified direction
	    var points = [[0, 0], [k1*xi, k2*yi], [(k2+w)*xi, k2*yi], [(k2+w)*xi, (k2+h)*yi], [k2*xi, (k2+h)*yi], [k2*xi, k1*yi], [0,0]];
	    var path = "M";
	    for(var i=0; i<points.length; i++){
	        if(i>0)path+="L";
	        path += points[i][0]+" "+points[i][1];
        }
        var hset = r.set();
        hset.push(r.path(path).attr({transform:"t" + (p.x + ofx)+"," + (p.y + ofy), stroke:sh.strokeColor, "stroke-width":sh.strokeWidth, fill:sh.background}));
        htextset.toFront();
	    
        var ttx=ofx, tty=ofy;
        if ( xi < 0 ) {
            ttx = ofx-w;
        }
        if ( yi < 0 ) {
            tty = ofy-h;
        }
        htextset.transform("t" + ttx + "," + tty);
        
        hset.push(htextset);
		return hset;
	},
	//Clears everything on the plot and draws chart again
	redraw: function (newRaphael){
		var r = this.raphael;
		r.clear();
		if ( newRaphael != null ) {
			this.raphael = newRaphael;
		}
		this.drawChart();
	}
});

/*****************************************************************/
/*                      OculusLineChart                          */
/*                                                               */
/*****************************************************************/
var OculusLineChart = OculusChart.extend();
OculusLineChart.addAll({
    super_create : OculusChart.create,
    create: function(elementId, width, height){
        var chart = this.super_create(elementId, width, height);
        chart.settings.line = {
	        fill: false,
	        glow: false
        };
        return chart;
    },
    super_drawChart: OculusChart.drawChart,
    drawChart: function (){
		//calling the parents method in order to draw the grid and other chart related stuff
        this.super_drawChart();
        
		//Used to check if the new point should be shown
        var previousPoint = null;
		var globalLineChartPoints = [];
		var grid = this.grid;
		//Assigning onmousemove event in order to display hints on the points
		this.plot.onmousemove = function(e){
			var mp = OculusChartUtils.getMousePosition(e);
			var pp = OculusChartUtils.getElementPosition(this);
			//Calculating the relative mouse coordinates
			mp.x = mp.x - pp.x;
			mp.y = mp.y - pp.y;
			
			if(grid.rect.isIn(mp)){
			    //Searching for the closest point to the mouse cursor
			    var closestPoint = null;
			    var d = 10000000000;
			    for(var i = globalLineChartPoints.length-1; i>=0; i--){
				    var point = globalLineChartPoints[i];
				    var dtemp = (point.x-mp.x)*(point.x-mp.x)+(point.y-mp.y)*(point.y-mp.y);
				    if(d>dtemp){
					    d = dtemp;
					    closestPoint = point;
				    }
			    }
			
			    if(closestPoint != previousPoint){
				    if(previousPoint!=null){
					    previousPoint.onout();
				    }
				    previousPoint = closestPoint;
				    closestPoint.onover();
			    }
			}
			else if(previousPoint!=null){
			    previousPoint.onout();
			    previousPoint = null;
			}
		};
		var r = this.raphael;
		//Drawing lines
        if(this.chartData!=null){
            var dataset = this.chartData.dataset;
            if(dataset!=null){
            
                //Calculating the bezier curve points
                for(var j=0; j<dataset.length; j++){
                    var ds = dataset[j];
                    
                    //Drawing lines
                    //Generating path for lines
                    var path = ""
					var firstPoint = null;
					var lastPoint = null;
                    for(var i=0; i<ds.data.length; i++){
                        if(i==0){
                            path += "M";
                        }
                        else path += "L";
                        var point = this.grid.translateToScreen(ds.data[i].x,ds.data[i].y);
						if(i==0)firstPoint = point;
						if(i==ds.data.length-1)lastPoint = point;
                        path+=point.x+" "+point.y;
                        
                    }
                    var pathLine = r.path(path).attr({stroke:ds.color,"stroke-width":2});
					if(this.settings.line.glow){
						r.path(path).attr({stroke:ds.color,"stroke-width":7,opacity:0.2});
						r.path(path).attr({stroke:ds.color,"stroke-width":11,opacity:0.1});
                    }
					
					if(this.settings.line.fill){
						path += "L"+lastPoint.x+" "+this.grid.rect.bottom+" L"+firstPoint.x+" "+this.grid.rect.bottom+" L"+firstPoint.x+" "+firstPoint.y;
						r.path(path).attr({fill:ds.color,opacity:0.2});
					}
					var lineChart = this;
					for(var i=0; i<ds.data.length; i++){
                        var point = this.grid.translateToScreen(ds.data[i].x,ds.data[i].y);
                        globalLineChartPoints[globalLineChartPoints.length] = {
                            ox:ds.data[i].x,
                            oy:ds.data[i].y,
                            caption: ds.name,
                            color: ds.color,
                            hintText:ds.data[i].hint,
							circle: r.circle(point.x,point.y,3).attr({fill:ds.color, stroke:"none"}).toFront(), 
							x:point.x, 
							y:point.y,
							pathLine: pathLine,
							lineChart: this,
							onover: function(){
								if(this.hint == null)   {
    								this.hint =  lineChart.drawHint(this.ox, this.oy, 0, 0, this.caption, this.color, this.hintText).attr({"opacity":0.0});
    							}
    							this.pathLine.toFront();
								this.hint.toFront().animate({"fill-opacity":0.8, "opacity":1.0},500, ">");
								this.circle.animate({r:10, opacity:0.6},500,"bounce");
								this.circle.toFront();
							},
							onout: function(){
								this.circle.animate({r:3, opacity:1.0},500,">");
								this.hint.remove();
								this.hint = null;
							}
						};
                    }
                }
            }
        }
    }
});





/*****************************************************************/
/*                      OculusBarChart                           */
/*                                                               */
/*****************************************************************/
var OculusBarChart = OculusChart.extend();
OculusBarChart.addAll({
    super_create : OculusChart.create,
    create: function(elementId, width, height){
        var chart = this.super_create(elementId, width, height);
        chart.settings.gloss = {
            on: false,
            value: 0.3,
            color: "#fff"
        }
        return chart;
    },
    super_drawChart: OculusChart.drawChart,
    drawChart: function (){
		if(this.grid.axis.x.type == "label"){ 
			this.grid.axis.x.labels[this.grid.axis.x.labels.length] = "";
			this.grid.axis.x.range = [0,this.grid.axis.x.labels.length-1];
			
			
			//calling the parents method in order to draw the grid and other chart related stuff
			this.super_drawChart();
			var r = this.raphael;
			
			//Drawing bars
			if(this.chartData!=null){
				var dataset = this.chartData.dataset;
				if(dataset!=null){
				
					//Calculating bar width
					var bw = Math.round(this.grid.getRect().getWidth()/(this.grid.axis.x.labels.length*dataset.length));
			        
			        //Used to check if the new point should be shown
                    var previousPoint = null;
			        var globalLineChartPoints = new Array();
			        var grid = this.grid;
			        //Assigning onmousemove event in order to display hints on the points
		            this.plot.onmousemove = function(e) {
		                var mp = OculusChartUtils.getMousePosition(e);
			            var pp = OculusChartUtils.getElementPosition(this);
			            //Calculating the relative mouse coordinates
			            mp.x = mp.x - pp.x;
			            mp.y = mp.y - pp.y;
			            if(grid.rect.isIn(mp)){
			                //Searching for the closest point to the mouse cursor
			                var closestPoint = null;
			                for(var i = globalLineChartPoints.length-1; i>=0; i--){
				                var point = globalLineChartPoints[i];
				                if(mp.x > point.rect[0] && mp.x < point.rect[2] && mp.y > point.rect[1] && mp.y < point.rect[3]) {
			                        closestPoint = point;
				                    break;
				                }
			                }
			                
			                if(closestPoint != previousPoint && closestPoint!=null){
				                if(previousPoint!=null){
					                previousPoint.onout();
				                }
				                previousPoint = closestPoint;
				                closestPoint.onover();
			                }
			            }
			            else if(previousPoint!=null){
			                previousPoint.onout();
			                previousPoint = null;
			            }
		            };
					
					for(var j=0; j<dataset.length; j++){
						var ds = dataset[j];
						var offset = bw*j;
						for(var i=0; i<ds.data.length; i++){
							var point = this.grid.translateToScreen(ds.data[i].x,ds.data[i].y);
							
							var h = this.grid.rect.bottom - point.y;
							var s = r.set();
							
                            var bar = r.rect(point.x + offset, point.y, bw, h).attr({stroke:ds.color, "stroke-width":1, fill:ds.color});
							s.push(bar);
                            
                            var light = null;
                            if ( this.settings.gloss.on ) {
    							light = r.rect(point.x + offset+2, point.y+2, bw/2, h-2).attr({stroke:"none", fill:this.settings.gloss.color, "opacity":this.settings.gloss.value});
    							s.push(light);
                            }
							
							var barChart = this;
							globalLineChartPoints[globalLineChartPoints.length] = {
							    ox: ds.data[i].x, 
							    oy: ds.data[i].y,
                                settings: barChart.settings,
                                hintText: ds.data[i].hint,
                                caption: ds.name,
                                color: ds.color,
							    bar: s,
							    bw: bw,
							    offset: offset,
								light: light,
							    rect:[point.x + offset, point.y, bw + point.x + offset, h + point.y],
							    onover: function(){
                                    if ( this.light != null ) {
							            this.light.animate({"opacity":0.0}, 500, ">");
                                    }
									this.bar.animate({"fill-opacity":this.settings.gloss.value}, 500, ">");
									if(this.hint == null){
							            this.hint = barChart.drawHint(this.ox, this.oy, Math.round(this.offset+bw/2), 0, this.caption, this.color, this.hintText);
									}
									this.hint.toFront();
							    },
							    onout: function(){
                                    if ( this.light != null ) {
							            this.light.animate({"opacity":this.settings.gloss.value}, 500, ">");
                                    }
							        this.bar.animate({"fill-opacity":1.0}, 500, ">");
									this.hint.remove();
									this.hint = null;
							    }
							};
						}
					}
				}
			}
		}
	}
});


var OculusPieChart = OculusChart.extend();
OculusPieChart.addAll({
    super_create : OculusChart.create,
    create: function(elementId, width, height){
        var chart = this.super_create(elementId, width, height);

        chart.settings = {
            line: {
                width: 1,
                color: "#333"
            },
            outterText: {
                weight: "bold",
                size: "14px",
                color: "black",
                showAlways:false
            },
            innerText: {
                weight: "bold",
                size: "14px",
                color: "white",
                showAlways:false
            }
        };
        return chart;
    },
    drawChart: function(){
        var r = this.raphael;
        
        //Calculating the total amount for all datasets
        var total = 0;
        for(var i=0;i<this.chartData.dataset.length;i++){
            total += this.chartData.dataset[i].value;
        }
        if(total!=null && total>0){
            //Calculating the radius of the pie
            var radius = Math.round(Math.min(this.getRect().getWidth(), this.getRect().getHeight())/2-50);
            
            //Drawing each piece of pie
            
            var sx, sy;
            var cx = Math.round(this.getRect().getWidth()/2);
            var cy = Math.round(this.getRect().getHeight()/2);
            var tx, ty, sx2, sy2;
            
            sx = cx + radius;
            sy = cy;
            var radius2 = 20;
            sx2 = cx + radius + radius2;
            sy2 = cy;
            
            var angle = 0;
            var da = 0;
            var globalPieces = new Object();
            for(var i=0; i<this.chartData.dataset.length; i++){
                var v = this.chartData.dataset[i].value;
                
                da = 2*Math.PI*v/total;
                var textAngle = angle+da/2;
                angle+=da;
                tx = Math.round(radius*Math.cos(angle) + cx);
                ty = Math.round(radius*Math.sin(angle) + cy);
                
                var tx2 = Math.round((radius+radius2)*Math.cos(angle) + cx);
                var ty2 = Math.round((radius+radius2)*Math.sin(angle) + cy);
                
                var largeArcFlag = 0;
                if(da>Math.PI){
                    largeArcFlag = 1;
                }
                
                var piecePath = "M"+cx+","+cy+" L"+sx+","+sy+" A"+radius+","+radius+" 0 "+largeArcFlag+" 1 "+tx+","+ty+" z";
                var selectedPath = "M"+cx+","+cy+" L"+(sx2)+","+(sy2)+" A"+(radius+radius2)+","+(radius+radius2)+" 0 "+largeArcFlag+" 1 "+tx2+","+ty2+" z";
                var piece = r.path(piecePath).attr({stroke:this.settings.line.color, "stroke-width":this.settings.line.width, fill:this.chartData.dataset[i].color, "fill-opacity":0.7});
                var textValueOpacity = 0.0;
                if ( this.settings.innerText.showAlways ) {
                    textValueOpacity = 1.0;
                }
                var textValue = r.text(cx + Math.round(radius*0.7*Math.cos(textAngle)), cy + Math.round(radius*0.7*Math.sin(textAngle)), v)
                    .attr({
                        stroke: "none", 
                        fill: this.settings.innerText.color,
                        "font-weight": this.settings.innerText.weight, 
                        "fill-opacity": textValueOpacity,
                        "text-anchor": "middle", 
                        "font-size": this.settings.innerText.size
                });
                var textNameOpacity = 0.0;
                if ( this.settings.outterText.showAlways ) {
                    textNameOpacity = 1.0;
                }
                var textName = r.text(cx + Math.round(radius*1.3*Math.cos(textAngle)), cy + Math.round(radius*1.3*Math.sin(textAngle)), this.chartData.dataset[i].name)
                    .attr({
                        stroke: "none", 
                        fill: this.settings.outterText.color,
                        "font-weight": this.settings.outterText.weight, 
                        "fill-opacity": textNameOpacity,
                        "text-anchor": "middle", 
                        "font-size": this.settings.outterText.size});
                var hoverPiece = r.path(selectedPath).attr({stroke:this.settings.line.color, "stroke-width":this.settings.line.width, fill:this.chartData.dataset[i].color, opacity:0.0})
                    .mouseover(function(){
                        var gp = globalPieces[this.id];
                        if(gp!=null){
                            gp.onover();
                        }
                    })
                    .mouseout(function(){
                        var gp = globalPieces[this.id];
                        if(gp!=null){
                            gp.onout();
                        }
                    });
                globalPieces[hoverPiece.id] = {
                    settings: this.settings,
                    piece: piece,
                    piecePath: piecePath,
                    selectedPath: selectedPath,
                    hoverPiece: hoverPiece,
                    textValue: textValue,
                    textName: textName,
                    onover:  function(){
                        this.piece.animate({path:this.selectedPath},"500","bounce");
                        if ( !this.settings.innerText.showAlways ) {
                            this.textValue.animate({"fill-opacity":1.0},"500",">");
                        }
                        if ( !this.settings.outterText.showAlways ) {
                            this.textName.animate({"fill-opacity":1.0},"500",">");
                        }
                    },
                    onout: function(){
                        this.piece.animate({path:this.piecePath},"500",">");
                        if ( !this.settings.innerText.showAlways ) {
                            this.textValue.animate({"fill-opacity":0.0},"500",">");
                        }
                        if ( !this.settings.outterText.showAlways ) {
                            this.textName.animate({"fill-opacity":0.0},"500",">");
                        }
                    }
                };
                
                sx = tx;
                sy = ty;
                
                sx2 = tx2;
                sy2 = ty2;
            }
            for(gp in globalPieces){
                globalPieces[gp].hoverPiece.toFront();
            }
            if ( this.settings.line.width > 0 ) {
                r.circle(cx, cy, this.settings.line.width*2).attr({stroke:this.settings.line.color, "fill":this.settings.line.color});
            }
        }
    }
});

