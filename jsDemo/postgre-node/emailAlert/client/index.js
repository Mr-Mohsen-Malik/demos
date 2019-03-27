$(document).ready(function () {
    $('#btn_show').click(function () {
        $('#showUsers').html(getUser());
    });

    $('#btn_send').click(function () {
        $('#showAlerts').html(getAlert());
    });
});


var getData;
var getMsg;

function getAlert() {
    var data = getMsg();
    var i = 0;
    var msg = "<tr><th>Alerts..</th></tr>";
    while (i < data.length) {
        msg += "<tr><td>" + data[i] + "</td></tr>";
        i++
    }

    console.log(msg);
    return msg;
}

function getUser() {
    var data = getData();
    var users = " <tr>" +
        "<th>id</th>" +
        "<th>name</th>" +
        "<th>email</th>" +
        "</tr>";
    for (var i = 0; i < data.length; i++) {
        users += "<tr>"
            + "<td>" + data[i].id + "</td>"
            + "<td>" + data[i].name + "</td>"
            + "<td>" + data[i].email + "</td>"
            + "</tr>";
    }
    return users;
}

$.ajax({
    type: "GET",
    url: "http://localhost:5000/email_alert",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (allData, status, jqXHR) {
        alert("success - " + allData.data[0].name);// write success in " "
        getData = function () { return allData.data; }
        getMsg = function () { return allData.message; }

    },

    error: function (jqXHR, status) {
        // error handler
        console.log(jqXHR);
        alert('fail' + status.code);
    }
});