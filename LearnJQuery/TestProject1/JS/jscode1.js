$(document).ready(
    function () {
        var elems = $("img");
        elems.mouseenter(
            function (e) {
                $(this).css("opacity", 0.5);
            }
        ).mouseout(
            function (e) {
                $(this).css("opacity", 1.0);
            }
        );
        
        elems.each(function (index,elem) {
            console.log("Element[" + index + "]: " + elem.tagName + " " + elem.src);
        });
        
        
        
        $("#buttonDiv").append("<label id = 'winSize' class = 'winSize'>" + "Window Size(" + window.innerWidth + ", " + window.innerHeight + ")</label>");

        
        $(window).resize(function (e) {            
            $("#winSize").html("Window Size(" + window.innerWidth + ", " + window.innerHeight + ")");
        } );
    }
    
);