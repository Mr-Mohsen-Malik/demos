$(document).ready(function(){
	$("#input_event").hide();
	$("#input_date").hide();
	$("#btn_add").hide();
	loadData();
  countrow();
  nextweek();
  $("#addTask").click(showRow);
  $("#btn_add").click(addToLS);
  $("#btn_remove").click(removeRow);
  $("#input_search").keyup(mysearch);
  $("#btn_inbox").click(loadData);
  $("#btn_today").click(searchToday);
  $("#btn_7days").click(search7days);
});



////////////////////////////////////////////////////
function search7days(){
  var today = new Date();
  var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
  var input, filter, table, tr, td, i;
  input = today;
  filter = nextweek;
  table = $("#myTable");
  tr = $("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    var day=new Date(td.innerHTML);
    console.log(day-today);


    {
      if ((day.getDate()-nextweek.getDate()> -7 && day.getDate()-today.getDate() <= 7) || ( day-today<0)){
        tr[i].style.display = "";
        
      } 

      else {
        tr[i].style.display = "none";
      }
    }       
  }

}
///////////////////////////////////////////////////
function nextweek(){
  var today = new Date();
  var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
  return nextweek;

}
////////////////////////////////////////////////////

function removeRow(){
  var row=[];
  var  tableArray= localStorage.getItem("tableArray");
  row2 =JSON.parse(tableArray);

  try { 
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length;

    for(var i=1; i<rowCount; i++) 
    {
     var row = table.rows[i];
     var chkbox = row.cells[0].childNodes[0];
     if(null != chkbox && true == chkbox.checked)
     {

      row2.splice(i, 1); 
      localStorage.setItem("tableArray",JSON.stringify(row2));             

      table.deleteRow(i);
      rowCount--;
      i--;
    }
  }
  countrow();  
}
catch(e){alert(e);}

}



////////////////////////////////////////////////////
function loadData(){
	var table=document.getElementById("myTable");
  var row=[];
  var trow="";
  var  tableArray= localStorage.getItem("tableArray");
  row =JSON.parse(tableArray);

  if(row!=="undefined" && row!==null){
    for(var i=0;i<row.length;i++)
      trow+=row[i];

    document.getElementById("myTable").innerHTML = trow;
  }
}


///////////////////////////////////////////////////////
function addToLS(){


  var row=[];
  var event=$("#input_event").val();
  var date=$("#input_date").val();
  var tableArray=localStorage.getItem("tableArray");

  if(tableArray!=="undefined" && tableArray!==null)
    {row=JSON.parse(tableArray);

    }
    if(row==""){
      row.push("<tr>"+
        "<th>Mark</th>"+
        "<th>Task</th>"+
        "<th>Date</th>"+
        "</tr>");
    }
    row.push("<tr>"+
      "<td>"+addMark()+"</td>"+
      "<td>"+event+"</td>"+
      "<td>"+date+"</td></tr>");

    if (typeof(Storage) !== "undefined") {
      if(event!=="" && date!==""){
        if(tableArray!==""){
         localStorage.setItem("tableArray",JSON.stringify(row));
       }
       else{
         localStorage.setItem("tableArray",JSON.stringify(row));
       }
     }
   } 
   else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
  countrow();
  loadData();
  hideRow();
}



///////////////////////////////////////////////

function addMark(){

	return "<input type='checkbox'> ";
}


////////////////////////////////////////////////
function hideRow(){
	$("#input_event").hide(200);
	$("#input_date").hide(200);
	$("#btn_add").hide(200);
  $("#input_event").val("");
  $("#input_date").val("");

}


///////////////////////////////////////////////
function showRow(){
	$("#input_event").toggle(150);
	$("#input_date").toggle(150);
	$("#btn_add").toggle(150);
}


//////////////////////////////////////////////
function mysearch() {
  var input, filter, table, tr, td, i;
  input = $("#input_search").val();
  filter = input.toUpperCase();
  table = $("#myTable");
  tr = $("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
        //console.log(td);

        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";

          } else {
            tr[i].style.display = "none";
        //console.log("hello");
      }
    }       
  }
}


///////////////////////////////////////////////
function searchToday() {
	
  var input, filter, table, tr, td, i;
  input = $("#input_search").val();
  filter = date();
  table = $("#myTable");
  tr = $("tr");
  for (i = 1; i < tr.length; i++) {

    td = tr[i].getElementsByTagName("td")[2];
       // console.log(td);

       if (td) {
     // console.log(filter);
     if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";

    } else {
      tr[i].style.display = "none";
        //console.log("hello");
      }
    }       
  }
}

/////////////////////////////////////////////
function date(){
	var today = new Date();
  var dd = today.getDate();
var mm = today.getMonth(); //January is 0!
var yyyy = today.getFullYear();
mm++;
if(dd<10) {
  dd = '0'+dd
} 

if(mm<10) {
  mm = '0'+mm
} 

today="";
today += yyyy + '-' + mm + '-' + dd;
return today;
}
///////////////////////////////////////////////
function countrow(){
  var row=[];
  var  tableArray= localStorage.getItem("tableArray");
  row =JSON.parse(tableArray);

  if(row!=="undefined" && row!==null){
    $("#tot").html(row.length-1);}
    else{
      $("#tot").html("0");
    }

  }
