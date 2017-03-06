//Exisiting data.
var existingData = [
    {"last_name": "Harris", "first_name": "Mike", "email_address": "mharris@updox.com", "specialty": "Pediatrics", "practice_name": "Harris Pediatrics"},
    {"last_name": "Wijoyo", "first_name": "Bimo", "email_address": "bwijoyo@updox.com", "specialty": "Podiatry", "practice_name": "Wijoyo Podiatry"},
    {"last_name": "Rose", "first_name": "Nate", "email_address": "nrose@updox.com", "specialty": "Surgery", "practice_name": "Rose Cutters"},
    {"last_name": "Carlson", "first_name": "Mike", "email_address": "mcarlson@updox.com", "specialty": "Orthopedics", "practice_name": "Carlson Orthopedics"},
    {"last_name": "Witting", "first_name": "Mike", "email_address": "mwitting@updox.com", "specialty": "Pediatrics", "practice_name": "Witting's Well Kids Pediatrics"},
    {"last_name": "Juday", "first_name": "Tobin", "email_address": "tjuday@updox.com", "specialty": "General Medicine", "practice_name": "Juday Family Practice"}
];

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
	var html = '<div><input type="checkbox" id="'+ this.emailAddress +'"><p class="large-bold">'+ this.lastName + ',' + this.firstName + '</p><p class="16-point">' + this.specialty + '</p><p>' + this.emailAddress + '</p><p>' + this.practiceName + '</p></div>';
	$('#provider-list').append(html);
}

//JSON loading to local storage
function loadLocalStorage(data){
	if (typeof(Storage)!=="undefined"){
		//Adding exisiting providers to local storage
		localStorage.setItem('providerData',JSON.stringify(data));
	}else{
		alert('This only works with broswers that allow local storage.');
	}
}

//DOM controller
function loadProviders(data){
	$('#provider-list div').remove();
	if (typeof data === 'undefined'){
		var data = JSON.parse(localStorage.getItem('providerData'));
	}
	data.forEach((data)=>{
		if(data.removed !== true){
			var provider = new Provider(data.last_name, data.first_name, data.email_address, data.specialty, data.practice_name);
			provider.addProvider();
		}
	});
}

//Create provider form submit
$('#create_provider').submit((e)=>{
	e.preventDefault();
	//grabbing values. 
	let lastName = $('#last_name').val();
	let firstName = $('#first_name').val();
	let emailAddress = $('#email_address').val();
	let specialty = $('#specialty').val();
	let practiceName = $('#practice_name').val();

	let createdProvider = new Provider(lastName, firstName, emailAddress, specialty, practiceName);
	createdProvider.addProvider();
	//Adding to local Storage
	existingData = localStorage.getItem('providerData');
	existingData.push(createdProvider);
	loadExistingProviders(existingData);
});

//Removeing Provider
$('#remove-provider').click(function(){
	$('#provider-list input:checked').each(function(){
		var id = $(this).attr('id');
		existingData.forEach((data)=>{
			if(data.email_address === id){
				data.removed = true;
			}
		});
		$(this).parent().remove();
		loadLocalStorage(existingData);
	});
});

//Doc ready
$(function(){
	loadLocalStorage(existingData);
	loadProviders();
});