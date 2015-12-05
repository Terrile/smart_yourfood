/**
 * Created by Min on 2015/8/23.
 */
$(document).ready(function() {
    // all jQuery code goes here
    $('#phonenumber').on('input',function(e){
        validatephonenumber();
    });

    $('#phonenumber').on('input',function(e){
        validate1stpwd();
    });

});

function loginsubmit(){
    //alert('Hello world!');
    var phone_num = $('#phonenumber').val();

    if(validatephonenumber())
    {
        $('#loginsubmit').submit();
        return true;
    }
    else{
        alert('手机号码格式不正确');
        return false;
    }
    //alert(phone_num);
}

function validatephonenumber(){
    var phone_num = $('#phonenumber').val();
    $("#phonenum_chkres").removeClass("glyphicon-ok");
    $("#phonenum_chkres").removeClass("glyphicon-remove");
    if(phone_num.length==6)
    {
        $("#phonenum_chkres").addClass("glyphicon-ok");
        $("#phonenum_chkres").css("color","darkgreen");
        return true;
    }
    else{
        $("#phonenum_chkres").addClass("glyphicon-remove");
        $("#phonenum_chkres").css("color","red");
        return false;
    }

}

function validate1stpwd(){
    var pwd_1st = $('#password').val();
    $("#1stpwd_chkres").removeClass("glyphicon-ok");
    $("#1stpwd_chkres").removeClass("glyphicon-remove");
    if(pwd_1st.length>=6)
    {
        $("#1stpwd_chkres").addClass("glyphicon-ok");
        $("#1stpwd_chkres").css("color","darkgreen");
        return true;
    }
    else{
        $("#1stpwd_chkres").addClass("glyphicon-remove");
        $("#1stpwd_chkres").css("color","red");
        return false;
    }
}