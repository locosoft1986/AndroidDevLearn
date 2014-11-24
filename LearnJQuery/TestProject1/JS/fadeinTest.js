$(document).ready( function () {
    $("#message").fadeIn(1000);
    $("#result").draggable();
});

$("#message").click(function (e) {
    $("#message").fadeOut(1000);
} );

$("#begin").click(function () {
 
    var textSrc = $("#testSrc").val();

    if(textSrc.length !== 0) {
        $("#result").text("");
        var spanList = "<span>" + textSrc.split("").join("</span><span>") + "</span>";

        $(spanList).css("color","darkred").hide().appendTo("#result").each(function (i) {
            $(this).delay(16*i).fadeIn(1000, function(){
                $(this).css("color","black");
            });
        });
    }
});