function theFunction(name, profession) {
    console.log("My name is " + name + " and I am a " + profession + ".");
}
theFunction("John", "fireman");
theFunction.apply(undefined, ["Susan", "school teacher"]);
theFunction.call(undefined, "Claude", "mathematician");
theFunction.call(undefined, ["Matthew", "physicist"]); // used with the spread operator





var employees = [
{ name: "Santosh", age:25, emp_id:23, date_of_birth: '23/10/2015'},
{ name: "jyoti", age:93, emp_id:97, date_of_birth: '14/05/2011'},
{ name: "abhishe", age:99, emp_id:96, date_of_birth: '01/11/2009'},
{ name: "Amir", age:77, emp_id:16, date_of_birth: '24/08/2005'}
];
var text;
function loop_data(emp_start,emp_length){
	text = "<ol id='newid'>";
	for(var i=emp_start; i<emp_length; i++) {
		var newage = employees[i].age.toString().split("").reverse().join("");	//reverse age

		var dob = employees[i].date_of_birth;
		var getDate = moment(dob, "DD-MM-YYYY").add(1, 'days');  // add 1 day to the date of birth.
		var day = getDate.format('DD');
		var month = getDate.format('MM');
		var year = getDate.format('YYYY');

		text+= "<li>"+employees[i].name+"-"+employees[i].emp_id + "-" + newage + " -> "+ day + '/' + month + '/' + year +"</li>";
	}
	text += "</ol>";
}


loop_data(0,employees.length)
document.getElementById("list_emp").innerHTML = text;

var start = document.getElementById("start_loop");
var showData = document.getElementById("json_data");

function set_and_increase_localstorage_data(){
	employees.push(employees[3]);
	update_array();
	localStorage.setItem("empData", JSON.stringify(employees));
	var len = employees.length;
	console.log(len)
	if(len===8 || len>=8){
		window.clearInterval(setInt);
	}	

	getEmpdata();


}
var start = document.getElementById('start');
start.onclick = function(){

	//this function is not working properly. I want the setinterval work only if the the employees length is less than 9 array items
	if(employees.length < 9) {
			setInt = setInterval(set_and_increase_localstorage_data, 2000);
		} else {
			alert("Total 8 completed")
		}

}


//get localstorage data and show in the document.
if(localStorage.getItem("empData")){
	getEmpdata();
}

function getEmpdata(){

	myJsonData = localStorage.getItem("empData");
	if(myJsonData){
		var myData = JSON.parse(myJsonData);
		var oblen = myData.length;
		console.log("JS object stored in localstorage: " + oblen);

		//setItem to localstorage
		if(myJsonData){
			// JSON data into javascript object
			var output = "<div class='wrapper'>";
			for(var i=4;i<myData.length;i++){
				output += "<div class='item'>" + myData[i].name + "</div>";
			}
			output += "</div>";
		}

		document.getElementById('json_data').innerHTML = output;
		
	}
}






function update_array(){
	//changing data of employee array in 5 position and 8 position
	var len = employees.length;
	if(len === 5) {
		employees[4] = employees[0];
	} else if(len===8) {
		employees[7] = employees[1];
	} 

}