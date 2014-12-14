
        
var stage, hint;
function StaticTextBox() {
    var textBoxBorder = new createjs.Shape();
    var textBoxBG = new createjs.Shape();
    var textBoxText = null;
    var stageJs = null;
    var textBoxIndicator = new createjs.Shape();
    
    
    refreshFontString = function() {
        var fontFinal = this.size + " " + this.font;
        if(this.isBold) {
            fontFinal += " " + "bold";
        }
        if(this.isItalic) {
            fontFinal += " " + "italic";
        }
        return fontFinal;
    };

    return {
        //The whole textbox property
        x : 0,
        y : 0,
        name : "",
        width : 0,
        height : 0,
        bgColor : "#FFFFFF",
        bgAlpha : 1.0,    
        showBg : false,
        text : "",
        isShowIndicator : false,
        indicatorColor : "#FF0000",
        
        //properties of the inner Text
        textMarginLeft : 0,
        textMarginTop : 0,
        textMarginRight : 0,
        textMarginBottom : 0,
        outline : 0,
        textAlign : "left",
        textBaseLine : "top",
        font : "Arial",
        color : null,
        size : "14px",
        isBold : false,
        isItalic : false,
        
        //border property
        borderWidth : 0,
        borderStyle : 0,
        borderColor : "#000000",
        borderAlpha : 1.0,
        borderRadius : 0,
        
        init : function (stageOutSide) {
            stageJs = stageOutSide;

            this.refreshBgRect();
            this.refreshBgBorder();
            textBoxBG.name = this.name;
            textBoxText = new createjs.Text(this.text, "14px Arial", null);
            this.refreshText();
            this.refreshIndicator();
            
            stageJs.addChild(textBoxBG);
            stageJs.addChild(textBoxBorder);
            stageJs.addChild(textBoxText);
            stageJs.addChild(textBoxIndicator);
            stageJs.update();
        },
    
        setPosition : function (newX, newY) {
            this.x = newX;
            this.y = newY;
            this.refresh();
        },
        
        refresh : function () {
            refreshBgRect();
            refreshBgBorder();
            refreshText();
            refreshIndicator();
        },
    
        refreshText : function() {
            textBoxText.font = refreshFontString();
            textBoxText.color = this.color;
            textBoxText.x = this.textMarginLeft + this.x;
            textBoxText.y = this.textMarginTop + this.y;
            textBoxText.lineWidth = this.width - this.textMarginLeft - this.textMarginRight;
            textBoxText.lineHeight = this.height - this.textMarginTop - this.textMarginBottom;
            textBoxText.outline = this.outline;
            textBoxText.textAlign = this.textAlign;
            textBoxText.textBaseLine = this.textBaseLine;
        },
    
        refreshBgRect : function() {
            textBoxBG.graphics.beginFill(this.bgColor).drawRoundRect (0, 0, this.width, this.height,this.borderRadius);
                
            textBoxBG.x = this.x;
            textBoxBG.y = this.y;
           
            if(this.showBg) {
                textBoxBG.alpha = this.bgAlpha;
            }
            else {
                textBoxBG.alpha = 0.0;
            }
            
            
        },
    
        refreshBgBorder : function () {
            textBoxBorder.graphics.beginStroke(this.borderColor);
            textBoxBorder.graphics.setStrokeStyle(this.borderStyle);
            textBoxBorder.snapToPixel = true;
            textBoxBorder.graphics.drawRect(0, 0, this.width, this.height);
            
            if(this.borderStyle) {
                textBoxBorder.alpha = this.borderAlpha;
            }
            else {
                textBoxBorder.alpha = 0.0;
            }
            textBoxBorder.x = this.x;
            textBoxBorder.y = this.y;
        },
        
        refreshIndicator : function () {
            textBoxIndicator.graphics.setStrokeStyle(2).beginStroke("#ff0000").drawRect(0, 0, this.width, this.height);
            textBoxIndicator.x = this.x;
            textBoxIndicator.y = this.y;
           
            if(this.borderStyle > 0 && this.borderAlpha > 0.0) {
                textBoxIndicator.alpha = 0.0;
            }
            else if(this.isShowIndicator){
                textBoxIndicator.alpha = 0.8;
            }
            else {
                textBoxIndicator.alpha = 0.0;
            }
        },
    
        
    
        
        //event handler for textbox
        on : function (event, fn) {
            textBoxBG.on(event, fn);
            stageJs.update();
        }
    
    
        
    
    };
}

function init() {
    stage = new createjs.Stage("tpl1_canvas");

    
    hint = new createjs.Text("Test press, click, doubleclick, mouseover, and mouseout", "14px Arial");
    hint.x = hint.y = 10;
    
    stage.addChild(hint);

    output = new createjs.Text("Text can listen to mouse movements", "14px Arial");
    output.x = 10;
    output.y = 50;
    output.lineHeight = 20;
    output.lineWidth = 100;
    stage.addChild(output);

    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = circle.y = 200;
    circle.name = "circle";
    stage.addChild(circle);

    // add a handler for all the events we're interested in:
    output.on("click", handleMouseEvent);
    circle.on("click", handleMouseEvent);
    
    var testTextbox = new StaticTextBox();
    testTextbox.showBg = true;
    testTextbox.name = "MyValue";
    testTextbox.x = 10;
    testTextbox.y = 200;
    testTextbox.width = 300;
    testTextbox.height = 100;
    testTextbox.bgColor = "grey";
    testTextbox.showBg = true;
    testTextbox.isShowIndicator = false;
    testTextbox.text = "This is text from textbox,中文测试";
    testTextbox.init(stage);
    testTextbox.on("click", handleMouseEvent);

    stage.update();
}

function handleMouseEvent(evt) {
    hint.text = "evt.target: "+evt.target+", evt.type: "+evt.type;

    // to save CPU, we're only updating when we need to, instead of on a tick:1
    stage.update();
}

$(document).ready(function() {
   init();               
});

