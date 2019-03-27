
$(document).ready(function(){
	$("#submit").attr('disabled', 'disabled');
    $("#fname").blur(fname);
    $("#lname").blur(lname);
    $("#email").blur(email);
    $("#pass").blur(pass);
    $("form").keyup(submit);


    
});

function submit(){

	$("#submit").attr('disabled', 'disabled');

	var fname = $("#fname").val();
	var lname = $("#lname").val();
	var email = $("#email").val();
	var pass = $("#pass").val();

	if (!( fname=="" || lname == "" || email == "" || pass == "")) {
	$("#submit").removeAttr('disabled');
		
	}
}


function email(){
	var email = $("#email") ;
	if(email.val()==""){
		$("#em").html("Email cannot be null!");
		email.focus();
		return false;
	}
else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.val()))){
    $("#em").html("You have entered an invalid email address!");
    email.focus();
    return false;
}
$("#em").html("");
return true;
}

function pass(){
	var pass = $("#pass").val();
   if(pass==""){
        $("#pw").html("Please provide your Passwrd!");
        myForm.pass.focus();
        return false;
    }
    $("#pw").html("");
    return true ;
}

function fname(){
	var fname = $("#fname").val();
	if(fname==""){
        $("#fn").html("Please provide your First Name!");
        myForm.fname.focus();
        return false;
    }
    $("#fn").html("");
    return true ;

}
function lname(){
	var lname = $("#lname").val();
	if(lname==""){
        $("#ln").html("Please provide your Last Name!");
        myForm.lname.focus();
        return false;
    }
    $("#ln").html("");
    return true;

}