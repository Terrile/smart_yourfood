/**
 * Created by Min on 2015/9/19.
 */
$(document).ready(function() {
    // all jQuery code goes here
    $(".thumb").mouseover(function() {
        $(this).find(".thumboverlay").show();
    });
    $(".thumb").mouseout(function(){
        $(this).find(".thumboverlay").hide();
    });
});