
    /*function fetchAllCSS(a) {
        var sheets = document.styleSheets, o = {};
        for (var i in sheets) {
            var rules = sheets[i].rules || sheets[i].cssRules;
            for (var r in rules) {
                if (a.is(rules[r].selectorText)) {
                    o = $.extend(o, _css2json(rules[r].style), _css2json(a.attr('style')));
                }
            }
        }
        return o;
    }

    function _css2json(css) {
        var s = {};
        if (!css) return s;
        if (css instanceof CSSStyleDeclaration) {
            for (var i in css) {
                if ((css[i]).toLowerCase) {
                    s[(css[i]).toLowerCase()] = (css[css[i]]);
                }
            }
        } else if (typeof css == "string") {
            css = css.split("; ");
            for (var i in css) {
                var l = css[i].split(": ");
                s[l[0].toLowerCase()] = (l[1]);
            }
        }
        return s;
    }*/
    //The map use string as key and value
    //var gElement2idMap = new Object();
    function registerInteractElement(element, id, type)
    {
        var opElement = $(element);
        var valIdElement = $(id);
        var checkJSInterface = (typeof JSInterface != "undefined");

        if(opElement !== undefined && valIdElement !== undefined)
        {
            //checkJSInterface = (JSInterface !== undefined);
            /*if (type == 3)
            {
                $d = $(id)[0].contentWindow.document;
                $d.designMode="on";
                $d.contentEditable= true;
                $d.open();
                $d.close();
                
                var style = fetchAllCSS(valIdElement);
                $(id).contents().find('body').css(style);
            }*/
            if (checkJSInterface)
            {
                JSInterface.setType(type);
                var strElementValue = JSInterface.getValue();
                
                switch(type)
                {
                    case 1://images
                    case 2://music bgm
                        {
                            valIdElement.attr('src', strElementValue);
                        }
                        break;
                    /*case 3:
                        {
                            valIdElement.contents().find('body').text(strElementValue);
                        }
                        break;*/
                    case 0:
                    default:
                        {
                            valIdElement.text(strElementValue);
                        }
                        break;
                }
            }

            opElement.click(function() {
                if (checkJSInterface)
                {
                    JSInterface.onElementSelected(id);
                }
                else
                {
                    alert(element + ' element clicked,the value element is ' + id);
                }
            });

            if(type == 0)
            {
                opElement.dblclick(function() {
                    if (JSInterface !== undefined)
                    {
                        JSInterface.showTextEditDialog(id);
                    }
                    else
                    {
                        alert(element + ' element double clicked,the value element is ' + id);
                    }
                });
            }     


        }

        //---------------- function end ---------------
    }


