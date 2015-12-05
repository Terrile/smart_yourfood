/**
 * Created by Min on 2015/9/30.
 */
$(document).ready(function() {
    var curpage="#updateaccount_";
    var pageid = $("#currentpage").attr('pageid');
    if(pageid)
    {
        curpage=pageid;
    }
    $(".rightpanel").hide();
    console.log(curpage);
    $(curpage).show();
    // all jQuery code goes here
    $("#orderhistory").hover(function(){
            $(".rightpanel").hide();
            $("#orderhistory_").show();
        }
    );
    $("#updateaddress").hover(function(){
            $(".rightpanel").hide();
            $("#updateaddress_").show();
        }
    );

    $("#updateaccount").hover(function(){
            $(".rightpanel").hide();
            $("#updateaccount_").show();
        }
    );

    $("#newsletter").hover(function(){
            $(".rightpanel").hide();
            $("#newsletter_").show();
        }
    );

    $("#logout").hover(function(){
            $(".rightpanel").hide();
            $("#logout_").show();
        }
    );

    $("#popupbutton").click(function(){
        $("#updateusername").dialog({width:450});
    });
});