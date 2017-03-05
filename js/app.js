

var divStart = '<div><input type="checkbox"><p class="large-bold">', pEndPStartP = '</p><p>', pClass16 = '</p><p class="16-point">', divEnd = '</p></div>';

//Mother Provider Object
function Provider(lastName, firstName, emailAddress, specialty, practiceName){
	this.lastName = lastName;
	this.firstName = firstName;
	this.emailAddress = emailAddress;
	this.specialty = specialty;
	this.practiceName = practiceName;
}

//Adding to DOM
Provider.prototype.addProvider = function(){
	$('#provider-list').append(divStart + this.lastName + ', ' + this.firstName + pClass16 + this.specialty + pEndPStartP + this.emailAddress + pEndPStartP + this.practiceName);
}

//JSON loading
function loadProviders(){
	//grabbing local JSON data -  this only works on Mozilla. Other broswers block local json data
	$.getJSON('js/data.json', function(result){
		$.each(result, function(i, data) {
			//Adding each provider to the DOM
			var provider = new Provider(data.last_name, data.first_name, data.email_address, data.specialty, data.practice_name);
			provider.addProvider();
		});
	});
}


//Create provider form submit
$('#create_provider').submit(function(e){
	e.preventDefault();
	//grabbing values. 
	let lastName = $('#last_name').val();
	let firstName = $('#first_name').val();
	let emailAddress = $('#email_address').val();
	let specialty = $('#specialty').val();
	let practiceName = $('#practice_name').val();

	var createdProvider = new Provider(lastName, firstName, emailAddress, specialty, practiceName);
	createdProvider.addProvider();

});

//Doc ready
$(function(){
	loadProviders();
});