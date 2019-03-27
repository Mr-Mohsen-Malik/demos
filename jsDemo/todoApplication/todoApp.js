$(document).ready(function(){
	$("#input_event").hide();
	$("#input_date").hide();
	$("#btn_add").hide();
	loadData();
	$("#addTask").click(showRow);
	$("#btn_add").click(addToLS);
	$(this).click(removeRow);
	$("#input_search").keypress(mysearch);
	$("#btn_today").click(searchToday);
});

////////////////////////////////////////////////////

function removeRow(){
	$("checkbox").change(function(event){
		console.log(event.target.value);

    			alert(event.target.value);
});

}



////////////////////////////////////////////////////
function loadData(){
	var table=document.getElementById("myTable");
	console.log(table);
	//localStorage.setItem("table","");
	document.getElementById("myTable").innerHTML = localStorage.getItem("table");
	}


///////////////////////////////////////////////////////
function addToLS(){

	var event=$("#input_event").val();
	var date=$("#input_date").val();
	var table=localStorage.getItem("table");

	var row="<tr>";
	row+="<td>"+addMark()+"</td>"+
		 "<td>"+event+"</td>"+
		 "<td>"+date+"</td></tr>";

	if (typeof(Storage) !== "undefined") {
		if(event!=="" && date!==""){
    	   if(table!==""){
    			table+=row;
    			localStorage.setItem("table",table);
    			}
    		else{
    			console.log("");
    			localStorage.setItem("table",row);
    			}
			}
		} 
  	else {
   		 document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
		}
var table2 = $("#myTable");
document.getElementById("myTable").innerHTML = localStorage.getItem("table");
	hideRow();
}



///////////////////////////////////////////////

function addMark(){
	return "<input type='checkbox' value='heloo'> ";
}


////////////////////////////////////////////////
function hideRow(){
	$("#input_event").hide(200);
	$("#input_date").hide(200);
	$("#btn_add").hide(200);
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
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
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
  input = date();
  filter = input;
  table = $("#myTable");
  tr = $("tr");
  for (i = 0; i < tr.length; i++) {
  	td="";
    td += tr[i].getElementsByTagName("td")[3];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        console.log("show");
      } else {
        tr[i].style.display = "none";
        console.log("hide");
      }
    }       
  }
}

/////////////////////////////////////////////
function date(){
	var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 
var tod="";
today = mm + '/' + dd + '/' + yyyy;
return ""+today;
}
