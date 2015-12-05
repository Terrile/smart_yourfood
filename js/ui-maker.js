/**
 * Created by Min on 2015/11/29.
 */
$(document).ready(function() {
    // all jQuery code goes here
    var x = 0;
    var y = 0;
    var width=100;
    var height=100;
    var pos_type='relative';
    var target_ele =".search-bar";
    $(function() {

        $( "#dialog" ).dialog(
            {
                width: 800,
                height:500
            }
        );

        $( "#x_slider" ).slider({
            min: 1,
            max: 700,
            slide: function( event, ui ) {
                x = ui.value;
                $( "#x_val" ).val( ui.value );
                update();
            }
        });
        $( "#x_val" ).val($( "#x_slider" ).slider( "value" ) );

        $( "#y_slider" ).slider({
            min: 1,
            max: 700,
            slide: function( event, ui ) {
                y = ui.value;
                $( "#y_val" ).val( ui.value );
                update();
            }
        });

        $( "#width_slider" ).slider({
            min: 1,
            max: 700,
            slide: function( event, ui ) {
                width=ui.value;
                $( "#width_val" ).val( ui.value );
                update();
            }
        });

        $( "#height_slider" ).slider({
            min: 1,
            max: 700,
            slide: function( event, ui ) {
                height=ui.value;
                $( "#height_val" ).val( ui.value );
                update();
            }
        });

    });

    function get_value(str_input)
    {
        return str_input.replace('px','');
    }

    function display_property()
    {
        //display position type
        pos_type=$(target_ele).css("position");
        $("#pos_type").val(pos_type);
        //display x
        x = $(target_ele).css("margin-left");
        console.log('margin-left: '+x);
        x = get_value(x);
        $( "#x_slider" ).slider({
            value:x
        });
        $( "#x_val" ).val( x );
        //display y
        y = $(target_ele).css("margin-top");
        y = get_value(y);
        $( "#y_slider" ).slider({
            value:x
        });
        $( "#y_val" ).val( y );

        width=$(target_ele).css("width");
        width = get_value(width);
        $("#width_slider").slider({
            value:width
        });
        $( "#width_val" ).val( width );

        height=$(target_ele).css("height");
        height = get_value(height);
        $("#height_slider").slider({
            value:width
        });
        $( "#height_val" ).val( height );
        console.log('x: '+x+' y: '+y+' width: '+width+' height: '+height);
    }

    $('#ele_selector').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        target_ele = valueSelected;
        display_property();
    });

    function update()
    {
        //$(target_ele).css("background-color","blue");
        $(target_ele).css("margin-top",y);
        $(target_ele).css("margin-left",x);
        /*
        $(target_ele).css("top",y);
        $(target_ele).css("left",x);
        */
        $(target_ele).css("width",width);
        $(target_ele).css("height",height);
        console.log('X: '+x+' Y: '+y+' Width: '+width+' Height: '+height);
    }
});