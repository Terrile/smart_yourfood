/**
 * Created by Min on 2015/8/22.
 */
var element_id='';
var err_msg='';
var passed=true;

$(document).ready(function() {
    // all jQuery code goes here
    /*
    $('#phonenumber').on('input',function(e){
        validatephonenumber();
    });
    */
    $("#welcome").owlCarousel({

        navigation : false, // Show next and prev buttons
        autoPlay: 3000,
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true

        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });
});

function regsubmit(){
    var name=$('#accountname').val();
    var phone_num = $('#phonenumber').val();
    var pwd_1st = $('#pwd_1st').val();
    var pwd_2nd = $('#pwd_2nd').val();
    if(isvalidusername(name)&&isvalidphonenum(phone_num)&&isvalidpassword(pwd_1st)&&isvalidconfirm(pwd_1st,pwd_2nd))
    {
        $('#regform').submit();
    }
    alert(err_msg);
}

function validate_regform()
{
    var name = document.getElementById('name').value;
    var phonenum = document.getElementById('phone').value;
    var pwd = document.getElementById('password').value;
    if(isvalidusername(name)&&isvalidphonenum(phonenum)&&isvalidpassword(pwd))
    {
        alert('passed!');
    }
    alert(err_msg);
}

function isvalidusername( username)
{
    if(!username || username.length==0)
    {
        err_msg='用户名不能为空';
        return false;
    }

    var str_name = username.toString();
    var len = str_name.length;
    if(len<6 || len>24)
    {
        err_msg='请输入6-24位的用户名 ';
        return false;
    }
    return true;
}

function isvalidphonenum(phonenum)
{
    if(!phonenum || phonenum.length==0)
    {
        err_msg='电话号码不能为空';
        return false;
    }
    if(phonenum.length!=8)
    {
        err_msg='电话号码长度长度不对';
        return false;
    }
    var re=/^\d+$/;
    if(phonenum.match(re))
    {
        return true;
    }
    err_msg='电话号码只能为数字';
    return false;
}

function isvalidpassword(pwd)
{
    if(!pwd || pwd.length==0)
    {
        err_msg='密码不能为空';
        return false;
    }
    var len=pwd.length;
    if(len<6)
    {
        err_msg='密码太短';
        return false;
    }
    if(len>12)
    {
        err_msg='密码太长';
        return false;
    }

    var onlynum = /^\d+$/;
    if(pwd.match(onlynum))
    {
        err_msg='密码不能全为数字';
        return false;
    }
    var onlylowercase = /^[a-z]+$/;// new RegExp('^\w+$');
    if(pwd.match(onlylowercase))
    {
        err_msg='密码不能全为小写字母';
        return false;
    }
    return true;
}

function isvalidconfirm(pwd,confirm)
{
    console.log('pwd'+pwd+' confirm'+confirm);
    if(!confirm||confirm.length==0)
    {
        err_msg='请输入确认密码';
        console.log(err_msg);
        return false;
    }
    if(pwd===confirm)
    {
        console.log('test passed');
        return true;
    }
    console.log('test failed');
    err_msg='两次输入密码不一致';
    return false;
}
