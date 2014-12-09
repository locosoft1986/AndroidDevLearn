    //The map use string as key and value
    //var gElement2idMap = new Object();
    function registerInteractElement(element, id, type)
    {
        var opElement = $(element);
        var valIdElement = $(id);
        var checkJSInterface = false;

        if(opElement !== undefined && valIdElement !== undefined)
        {
            //checkJSInterface = (JSInterface !== undefined);
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


