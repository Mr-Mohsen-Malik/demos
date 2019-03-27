
$(document).ready(function(){
fetchData();
	$(this).click(function(event){
		console.log(event.target.value);
    			alert(event.target.value);
});


});


function fetchData(){
	
var xmlhttp = new XMLHttpRequest();
var t="";

xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
    	var myObj = JSON.parse(this.responseText);

    	t+="<tr>"+
    "<th>id</th>"+
    "<th>postId</th>"+
    "<th>name</th>"+
    "<th>email</th>"+
    "<th>body</th>"+
    "<th>Button</th>"+
  "</tr>"



    	for(var i=0 ; i<myObj.length ; i++){
    	t+="<tr>"
    		+"<td>"+myObj[i].id+"</td>"
    		+"<td>"+myObj[i].postId+"</td>"
    		+"<td>"+myObj[i].name+"</td>"
    		+"<td>"+myObj[i].email+"</td>"
    		+"<td>"+myObj[i].body+"</td>"
    		+"<td>"+addbtn(i)+"</td>"

    		+"</tr>";

    	
    	}

     $("#demo").html(t);
 }
   else{
   	$("#demo").html("wait...");

   } 
}


xmlhttp.open("GET", "https://jsonplaceholder.typicode.com/comments", true);
xmlhttp.send();
}
function addbtn(i){
	var x=1+i;
	type="<button value='"+x+"' >Button</button>";

	
	return type;
}
function showId(){
	alert("hello");
}