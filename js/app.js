
// creates a <table> element and a <tbody> element
var itemList = document.querySelector('#item-list');
itemList.addEventListener('click', myFunc, false);
itemList.myParam = 'This is my parameter';

// refresh the console (needs work)
function refresh() {

    setTimeout(function () {
        location.reload()
    }, 100);
}

// for selections
var $div = $("<div id='edit_item'>"+"Edit"+"</div>");  //{id: "foo", "class": "a"});

////// code to keep top content
/*
window.onscroll = function() {myFunction()};

var header = document.getElementById("top-container");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
*/
///////

function myFunc(evt)
{
	let id = evt.target.parentElement.getAttribute('data-id');
	var docRef = db.collection("spells").doc(id);
	       
	try {
		var tableData = {};
		docRef.get()
		.then(doc => {
			if(!doc.exists) {
				window.alert("no such document");
			} else {
				tableData = {
					doc: doc.data(),
					name: doc.data().name,
					wordsA: doc.data().wordsA,
					wordsB: doc.data().wordsB,
					wordsC: doc.data().wordsC,
				        subject: doc.data().subject
				};  //window.alert(tableData.name + " " + tableData.subject);
			}
		})
	} catch (error) {
	res.send(error);
	}
		 			$('#edit_item').click(function(){
					        form.name.value =  tableData.name;
						form.wordsA.value = tableData.wordsA;
						form.wordsB.value = tableData.wordsB;
						form.wordsC.value = tableData.wordsC;
						form.subject.value = tableData.subject;
						
						$('#item_submit').click(function(){ 
							//form.addEventListener('click','append', (e) => {
    							//e.preventDefault();
							db.collection("spells").doc(id).update({
								name: form.name.value,
								wordsA: form.wordsA.value,
								wordsB: form.wordsB.value,
								wordsC: form.wordsC.value,
								subject: form.subject.value
							});	
							refresh();
							// getting data
							/*
							db.collection('spells').get().then(snapshot => {
    							snapshot.docs.forEach(doc => {
        						renderDB(doc);
							});		
							*/
						});//end-of-item_submit
					});//end-of-edit_item event
	
			 		$('#delete_item').click(function(){
						docRef.delete();
						refresh();
					});//end-of-delete_item event

	

}

// create form element
var form = document.querySelector('#add-item-form');

// create element & render cafe
function renderDB(doc){
  // create list document elements
  let li = document.createElement('li');
  li.setAttribute('data-id', doc.id);  //Each document gets an id.
  let name = document.createElement('span');
  name.style.cssText = "padding: 3px 0px 3px 12px; font-size: 12px; border-bottom: 2px solid black";
  let wordsA = document.createElement('span');
  wordsA.style.cssText = "padding: 3px 0px 3px 12px; font-size: 12px;";
  let wordsB = document.createElement('span');
  wordsB.style.cssText = "padding: 3px 0px 6px 12px; font-size: 12px;";
  let wordsC = document.createElement('span');
  wordsC.style.cssText = "font-family: Arial, Helvetica, sans-serif; font-size: 12px; padding: 3px 0px 6px 12px; display: block; border-bottom: 2px solid black";

  let subject = document.createElement('span');
  subject.style.cssText = "padding: 3px 0px 6px 12px; display: block;";

  let cross = document.createElement('div');
  cross.textContent = 'x';



  // create elements for labels for each data to display
  let label_name = document.createElement('span');
  label_name.textContent = "NAME"; //&nbsp;
  label_name.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  let label_address = document.createElement('span');
  label_address.textContent = "ADDRESS";
  label_address.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  let label_website = document.createElement('span');
  label_website.textContent = "WEBSITE";
  label_website.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  let label_phone = document.createElement('span');
  label_phone.textContent = "PHONE";
  label_phone.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";
	
  let label_subject = document.createElement('span');
  label_subject.textContent = "LOG ENTRY";
  label_subject.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  // generate content for fields
  name.textContent = doc.data().name;
  wordsA.textContent = doc.data().wordsA;
  wordsB.textContent = doc.data().wordsB;
  wordsC.textContent = doc.data().wordsC;
  subject.textContent = doc.data().subject;

  // append list
  li.appendChild(label_name);
  li.appendChild(name);

  li.appendChild(label_address);
  li.appendChild(wordsA);
	
  li.appendChild(label_website);
  li.appendChild(wordsB);
	
  li.appendChild(label_phone);
  li.appendChild(wordsC);
	
  li.appendChild(label_subject);
  li.appendChild(subject);

 // li.appendChild(cross);


  // put the <tbody> in the <table>
  itemList.appendChild(li);

  // deleting data
  /*
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('spells').doc(id).delete();
    });
    */
}

// getting data
db.collection('spells').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderDB(doc);
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('spells').add({
        name: form.name.value,
        wordsA: form.wordsA.value,
	wordsB: form.wordsB.value,
	wordsC: form.wordsC.value,
        subject: form.subject.value
    });
      form.name.value = '';
      form.wordsA.value = '';
	form.wordsB.value = '';
	form.wordsC.value = '';
      form.subject.value = '';
	
	// generate new db
	refresh();
});

form.addEventListener('cancel', (e) => {
    e.preventDefault();
	refresh();
});


$(function(){
	$("#edit_item").hide();
	$("#delete_item").hide();
	$('.sidebar').hide();


	// Animate slide for create new form
	function display_add(){
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
	         $('.sidebar').show();
	    	// $('.sidebar').animate({width: '350px'});
	         $(".max").hide().fadeIn(500);

		//$("#label").html("Add Entry");
	  	 $('#close_app').show();
	}

	// Add new document button show
	$("#new_item").click(function(){
		$("#item_submit").attr('value', 'Submit').attr('type','submit');
		display_add();
	});

	// Animate slide for edit form
	function display_edit(){
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
	         $('.sidebar').show();
	    	// $('.sidebar').animate({width: '350px'});
	         $(".max").hide().fadeIn(500);

		//$("#label").html("Add Entry");
	  	 $('#close_app').show();
	}

	//Edit new document button show
  	$("#edit_item").click(function(){
	  $("#item_submit").attr('value', 'Append').attr('type','append');
	  display_edit();
  });

  $('#item_submit').click(function(){
    $(".content").hide();
	  $('.sidebar').hide();
	  $(".min").show();
	  $( ".docs" ).toggleClass('blur-me');
	  $('#close_app').hide();
  });
	
$('#item_cancel').click(function(){
 	refresh();	
});


  	$('#close_app').click(function(){
    		$(".content").hide();
	   	$('.sidebar').animate({width: '54px'});
	 	$( ".docs" ).toggleClass('blur-me');
	     	$('#close_app').hide();
	});

	
	$('#item-list').on('click','li',function() {
	$(this).toggleClass('selected').siblings().removeClass('selected');
		if($(this).hasClass('selected')){
			$(this).append($div);
			$("#edit_item").show();
			$("#delete_item").show();
			// change selected's background-color
			$(this).css("background-color", "rgb(225, 255, 107)");
		} else {
			$(this).css("background-color", "");
			 $div.remove();
      			$("#edit_item").hide();
			$("#delete_item").hide();

		}
	});

});
