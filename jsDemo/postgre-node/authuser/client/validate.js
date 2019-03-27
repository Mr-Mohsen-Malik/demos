
function valid_mobile(mobile) {
    var mob = "" + mobile;
    var num = /^[0-9]{10}$/;
    if (!(num.test(mob))) {
        alert("Number should be of 10 digits!");
        return false;
    }
    return true;
}

function valid_email(email) {
    if (email == "") {
        alert("Email cannot be null!")
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        alert("You have entered an invalid email address!")
        return (false)
    }
    return true;
}


function valid_name(name) {
    if (name == "") {
        alert("Name cannot be null!");
        return false;
    }
    return true;

}


function validateFeilds(name, email, mobile) {
    if (valid_name(name) && valid_email(email) && valid_mobile(mobile)) {
        return true;
    }
    else {
        return false;
    }
}
