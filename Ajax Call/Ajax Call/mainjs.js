var data;

console.log(1);
//console.time('ajaxTime');

fetch("https://api.propublica.org/congress/v1/113/senate/members.json",{
		method:"GET",
		headers: {
			'X-API-Key': 'aV58nB7F64h3FlIA3ivirUIQSXuTljDVvHZ8qXzB'
		}	

}).then(function(response){
		if (response.ok){
			console.log(2);

	return response.json();
}

}).then(function(json){
	data = json;
	console.log(3);
//	console.log(data);
//	console.log(data.results[0]);
//	printData()
//	console.timeEnd('ajaxTime');
	
}).catch(function (error){
	 console.log("Request failed:" + error.message);
});

//
//function printData(){
//	console.log(data)
//}

console.log(4);