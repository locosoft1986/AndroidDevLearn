    //The map use string as key and value
    //var gElement2idMap = new Object();
    function registerInteractElement(element, id, type)
    {
        var opElement = $(element);
        var valIdElement = $(id);

        if(opElement !== undefined && valIdElement !== undefined)
        {
            //gElement2idMap[element] = id; 

            opElement.click(function() {
                //if (JSInterface !== undefined)
                //{
                    //JSInterface.onElementSelected(id);

                //}
                //else
                {
                    alert(element + ' element clicked,the value element is ' + id);
                }
            });

            if(type == 0)
            {
                opElement.dblclick(function() {
                    //if (JSInterface !== undefined)
                    //{
                    //    JSInterface.showTextEditDialog(id);

                    //}
                    //else
                    {
                        alert(element + ' element double clicked,the value element is ' + id);
                    }
                });
            }     


        }

        //---------------- function end ---------------
    }


