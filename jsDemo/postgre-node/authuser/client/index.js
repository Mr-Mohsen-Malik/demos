$(document).ready(function () {

    $(this).click(function (event) {
        if (event.target.value === "add")
            addRow();
        if (event.target.value.search("edit") > -1)
            editRow(event.target.id);
        if (event.target.value.search("update") > -1)
            if (confirm('Are you sure you want to update this record ? '))
                updateRow(event.target.id);
        if (event.target.value.search("delete") > -1)
            if (confirm('Are you sure you want to delete this record ? '))
                deleteRow(event.target.id);
    });

});

var getData;

//////////////////////////////-----------DELETE-----------///////////////////////////////////////////
function deleteRow(id) {
    $.post("http://localhost:4000/delRecord", { id: id })
        .done(function (data) {
            location.reload(true);
        });
    location.reload(true);
}
//////////////////////////////-----------ADD---------/////////////////////////////////////////////////////
function addRow() {
    var data = getData();
    var id = data.length + 1;
    var name = $("#name0").val();
    var email = $("#email0").val();
    var add = $("#address0").val();
    var mobile = $("#mobile0").val();
    if (validateFeilds(name, email, mobile))
        $.post("http://localhost:4000/addRecord", { id: id, name: name, email: email, address: add, mobile: mobile })
            .done(function (data) {
                location.reload(true);
            });
}
//////////////////////////////----------READ-----------////////////////////////////////////////
$.ajax({
    type: "GET",
    url: "http://localhost:4000/readRecords",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data, status, jqXHR) {
        getData = function () { return data; }
        showRows(data);

    },
    error: function (jqXHR, status) {
        console.log(jqXHR);
        alert('fail' + stalertatus.code);
    }

});
//////////////////////////////----------UPDATE--------------/////////////////////////////////
function updateRow(id) {


    var name = "#name" + id;
    var email = "#email" + id;
    var add = "#address" + id;
    var mobile = "#mobile" + id;

    name = $(name).val();
    email = $(email).val();
    add = $(add).val();
    mobile = $(mobile).val();
    if (validateFeilds(name, email, mobile)) {
        disableFeilds(id);
        showEditBtn(id);
        $.post("http://localhost:4000/updateRecord", { id: id, name: name, email: email, address: add, mobile: mobile })
            .done(function (data) {
                location.reload(true);
            });
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
function editRow(id) {
    enableFeilds(id);
    showUpdateBtn(id);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function showEditBtn(id) {
    var edit = "edit" + id;
    $(":focus").hide();
    $('[value~=' + edit + ']').show();
}
/////////////////////////////////////////////////////////////////////////////////////////
function showUpdateBtn(id) {
    var update = "update" + id;
    $(":focus").hide();
    $('[value~=' + update + ']').show();
}
///////////////////////////////////////////////////////////////////////////////////////////
function disableFeilds(id) {
    var name = "#name" + id;
    var email = "#email" + id;
    var address = "#address" + id;
    var mobile = "#mobile" + id;
    $(email).attr('disabled', 'disabled');
    $(name).attr('disabled', 'disabled');
    $(address).attr('disabled', 'disabled');
    $(mobile).attr('disabled', 'disabled');
}
/////////////////////////////////////////////////////////////////////////////////////////////
function enableFeilds(id) {
    var name = "#name" + id;
    var email = "#email" + id;
    var address = "#address" + id;
    var mobile = "#mobile" + id;
    $(name).removeAttr('disabled');
    $(email).removeAttr('disabled');
    $(address).removeAttr('disabled');
    $(mobile).removeAttr('disabled');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function showRows(rows) {
    var record = "";
    for (var i = 0; i < rows.length; i++)
        record += getRow(rows[i].id, rows[i].name, rows[i].email, rows[i].address, rows[i].mobile);
    console.log(record);
    $("#showRows").append(record);

}
///////////////////////////////////////////////////////////////////////////////////////////////////////

function getRow(id, Name, Email, Address, Mobile) {
    var row = "<tr><td>" + id + "</td>" +
        "<td><input id='name" + id + "' type='name' value='" + Name + "' class='form-control input-md' disabled/></td>" +
        "<td><input id='email" + id + "' type='email' value='" + Email + "' class='form-control input-md' disabled></td>" +
        "<td><input id='address" + id + "' type='address' value='" + Address + "' class='form-control input-md' disabled></td>" +
        "<td><input id='mobile" + id + "' type='text' value='" + Mobile + "' class='form-control input-md' disabled></td>" +
        "<td><div class='btn-group-vertical'>" +
        "<button value='update" + id + "' id=" + id + " type='button' class='btn btn-success btn-xs' style=' margin-bottom: 4px;display: none;' >Update</button>" +
        "<button value='edit" + id + "' id=" + id + " type='button' class='btn btn-primary btn-xs' style='margin-bottom: 4px;'><span class='glyphicon glyphicon-edit'></span>Edit</button>" +
        "<button value='delete" + id + "' id=" + id + " type='button' class='btn btn-danger btn-xs'><span class='glyphicon glyphicon-trash'></span>Delete</button>" +
        "</div></td></tr>"
    return row;
}


