$(document).ready(
    function () {
       $('#addBtn').click(function(){
             var clonedEntry = $('ul.template.commontype').children().clone();
             //if(AndroidJava !== "undefined")
             {
                 $('#ptitle', clonedEntry).text(AndroidJava.getTitle());
             }
             clonedEntry.appendTo('#maincontentlist');
           }
        ); 
    }
    
);

