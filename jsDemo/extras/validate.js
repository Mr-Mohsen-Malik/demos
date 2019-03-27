

function mobile(){
	var mno = document.forms["myForm"]["mno"];
	var num = /^[0-9]{10}+$/;
	if(!(num.test(mno))){
        alert("Number should be of 10 digits!");
        return false;
    }

}

function email(){
	var email = document.forms["myForm"]["email"].value;
	if(email==""){
		alert("Email cannot be null!")
	}
else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
    alert("You have entered an invalid email address!")
    return (false)
}}

function pass(){
	var pass = document.forms["myForm"]["pass"].value;
   if(pass==""){
        alert("Please enter a password!");
        return false;
    }
}

function name(){
	var fname = document.forms["myForm"]["fname"].value;
	var lname = document.forms["myForm"]["lname"].value;
	if(fname=="" || lname==""){
        alert("Name cannot be null!");
        return false;
    }

}


function validateForm2() {
	name();
	email();
	mobile();
    

    
}

function validateForm1() {
	email();
	pass();
    
    
}