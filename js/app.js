//Exisiting data.
var existingData = [
    {"last_name": "Harris", "first_name": "Mike", "email_address": "mharris@updox.com", "specialty": "Pediatrics", "practice_name": "Harris Pediatrics"},
    {"last_name": "Wijoyo", "first_name": "Bimo", "email_address": "bwijoyo@updox.com", "specialty": "Podiatry", "practice_name": "Wijoyo Podiatry"},
    {"last_name": "Rose", "first_name": "Nate", "email_address": "nrose@updox.com", "specialty": "Surgery", "practice_name": "Rose Cutters"},
    {"last_name": "Carlson", "first_name": "Mike", "email_address": "mcarlson@updox.com", "specialty": "Orthopedics", "practice_name": "Carlson Orthopedics"},
    {"last_name": "Witting", "first_name": "Mike", "email_address": "mwitting@updox.com", "specialty": "Pediatrics", "practice_name": "Witting's Well Kids Pediatrics"},
    {"last_name": "Juday", "first_name": "Tobin", "email_address": "tjuday@updox.com", "specialty": "General Medicine", "practice_name": "Juday Family Practice"}
];

//Form input info with validation
var FormInputs = {
	last_name:{
		message:'Please enter the provider\'s last name',
		domLocation:'#last_name'
	},
	first_name:{
		message:'Please enter the provider\'s first name',
		domLocation:'#first_name'
	},
	email_address:{
		message:'Please enter the provider\'s email',
		domLocation:'#email_address'
	},
	specialty:{
		message:'Please enter the provider\'s specialty',
		domLocation:'#specialty'
	},
	practice_name:{
		message:'Please enter the provider\'s practice name',
		domLocation:'#practice_name'
	}
}


//Mother Provider Object
function Provider(lastName, firstName, emailAddress, specialty, practiceName){
	this.last_name = lastName;
	this.first_name = firstName;
	this.email_address = emailAddress;
	this.specialty = specialty;
	this.practice_name = practiceName;
}

//Adding to DOM
Provider.prototype.addProvider = function(){
	var html = '<tr><td><label><input type="checkbox" id="'+ this.email_address +'"></label></td><td align="left"><p class="name">'+ this.last_name + ',' + this.first_name + '</p>' + this.email_address + '</td><td>' + this.specialty + '<br>' + this.practice_name + '</td></tr>'; 
	$('#provider-list').append(html);
}


//Form Validation
function formValidation(str){
	var lettersNumbersReg = new RegExp(/^[A-Za-z0-9!@#$%^&.*()_ ]{1,40}$/);
	return lettersNumbersReg.test(str);
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
	//DOM removal
	$('#provider-list tr').remove();
	//Check to see if this is an init or a sort
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

//create provider form submit
$('#create_provider').submit((e)=>{
	e.preventDefault();
	//grabbing values. 
	let lastName = $(FormInputs.last_name.domLocation).val();
	let firstName = $(FormInputs.first_name.domLocation).val();
	let emailAddress = $(FormInputs.email_address.domLocation).val();
	let specialty = $(FormInputs.specialty.domLocation).val();
	let practiceName = $(FormInputs.practice_name.domLocation).val();
	var error = '';
	//Checking form inputs
	if(formValidation(lastName) === false){
		error += '<li>' + FormInputs.last_name.message + '</li>';
	}
	if(formValidation(firstName) === false){
		error += '<li>' + FormInputs.first_name.message + '</li>';
	}
	if(formValidation(emailAddress) === false){
		error += '<li>' + FormInputs.email_address.message + '</li>';
	}
	if(formValidation(specialty) === false){
		error += '<li>' + FormInputs.specialty.message + '</li>';
	}
	if(formValidation(practiceName) === false){
		error += '<li>' + FormInputs.practice_name.message + '</li>';
	}

	if (error == ''){
		let createdProvider = new Provider(lastName, firstName, emailAddress, specialty, practiceName);
		createdProvider.addProvider();
		//Adding to local Storage
		existingData = JSON.parse(localStorage.getItem('providerData'));
		existingData.push(createdProvider);
		loadLocalStorage(existingData);
		loadProviders(existingData);
		//resorting with the new provider
		var value = $('#sort-provider').val();
		sortingProviders(value)
	} else{
		//displaying the error messages
		$('#error').remove();
		$('.container').prepend('<div id="error"><ul>' + error + '</ul></div>');
	}
	
});

//removeing Provider
$('#remove-provider').click(function(){
	$('#provider-list input:checked').each(function(){
		var id = $(this).attr('id');
		existingData.forEach((data)=>{
			if(data.email_address === id){
				data.removed = true;
			}
		});
		$(this).parent().parent().parent().remove();
		loadLocalStorage(existingData);
	});
});

//sorting 
function sortingProviders(prop){
	existingData = JSON.parse(localStorage.getItem('providerData'));
	existingData.sort((a,b)=>{
		return (a[prop] > b[prop]);
	});
	loadProviders(existingData);
}

//Events
//sort by
$('#sort-provider').change(()=>{
	var value = $('#sort-provider').val();
	sortingProviders(value)
});

//Doc ready
$(function(){
	loadLocalStorage(existingData);
	loadProviders();
});