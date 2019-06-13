
// creates a <ol> list element and functions
// create form element
var form = document.querySelector('#item-form');
var itemList = document.querySelector('#item-list');
const db_name = "spells";
var flag_refresh = true;
var flag_update = false;

itemList.addEventListener('click', myFunc, false);//itemList.addEventListener('click', myFunc, false);

// define buttons
refresh_button.addEventListener('click',refreshFunc,false);

function refreshFunc(evt)
{
	var count = itemList.count;
	const id = evt.target.parentElement.getAttribute('data-id');

	//alert	("Doc ID: " + id);

	while(itemList.firstChild){
		itemList.removeChild(itemList.firstChild);
	}
	//get data
	db.collection('spells')
		.orderBy('name','asc')
		.get().then(snapshot => {
		itemList.count = 0;
	    snapshot.docs.forEach(doc => {
		    itemList.count += 1;
		renderDB(doc);
	    });
	});//end of get data
}

var tmp;
function refresh() {
	if(flag_refresh==true){
	db.collection('spells')
		.orderBy('name','asc')
		.get().then(snapshot => {
			itemList.count = 0;
		        console.log('displaying contents of db..');
			while(itemList.firstChild){
				itemList.removeChild(itemList.firstChild);
			}
	    		snapshot.docs.forEach(doc => {
				itemList.count += 1;
				console.log(itemList.count);
				renderDB(doc);
	    });
	});//end of get data
		clearForm();
		flag_refresh = false;
	}
}

function clearForm()
{
      form.name.value = '';
      form.wordsA.value = '';
      form.wordsB.value = '';
      form.wordsC.value = '';
      form.subject.value = '';
}

function myFunc(evt)
{
	flag_refresh = true;
	const id = evt.target.parentElement.getAttribute('data-id');
	
	if(evt.target.nodeName == 'SPAN'){
            console.log(id + " was clicked");	
	    var ref = db.collection("spells").doc(id);	
		try {		
			ref.get()
			.then(doc => {
				if(!doc.exists) {
					throw("no such document");
				} else {		
					$('#edit_item').click(function(){
			
						form.name.value =  doc.data().name;
						form.wordsA.value = doc.data().wordsA;
						form.wordsB.value = doc.data().wordsB;
						form.wordsC.value = doc.data().wordsC;
						form.subject.value = doc.data().subject;

						$('#item_submit').click(function(){
							return db.runTransaction(function(transaction) {
							    // This code may get re-run multiple times if there are conflicts.
							    return transaction.get(ref).then(function(doc) {
								if (!doc.exists) {
								    throw "Document does not exist!";
								}

								// Update fields to reflect change.
								 var tableData = {
									name: form.name.value,
									wordsA: form.wordsA.value,
									wordsB: form.wordsB.value,
									wordsC: form.wordsC.value,
									subject: form.subject.value
								};  

								transaction.update(ref, tableData);
								//clearForm();
								//flag_refresh = true;
								//setTimeout(location.reload.bind(location), 10000);
								//refresh();
							    });
								}).then(function() {
							    		console.log("Transaction successfully committed!");
								}).catch(function(error) {
							    		console.log("Transaction failed: ", error);
							});

						});
					}); //endofedit			
				}
			})
		} catch (error) {
			res.send(error);
		}


						$('#delete_item').click(function(){
							ref.delete();
							itemList.count -= 1;
						});//end-of-delete_item event
	} 
}

// create element & render cafe
function renderDB(doc){
  // create list document elements
  let li = document.createElement('li');
  li.setAttribute('data-id', doc.id);  //Each document gets an id.
  let name = document.createElement('span');
  name.classList.add("span_format_name");
  //name.style.cssText = "padding: 3px 0px 3px 12px; font-size: 16px; border-bottom: 2px solid black";
  //name.classList.add("title");
  let wordsA = document.createElement('span');
  wordsA.style.cssText = "padding: 3px 0px 3px 12px; font-size: 16px;";
  let wordsB = document.createElement('span');
  wordsB.style.cssText = "padding: 3px 0px 6px 12px; font-size: 16px;";
  let wordsC = document.createElement('span');
  wordsC.style.cssText = "font-family: Arial, Helvetica, sans-serif; font-size: 16px; padding: 3px 0px 6px 12px; display: block; border-bottom: 2px solid black";

  let subject = document.createElement('span');
  subject.style.cssText = "padding: 3px 0px 6px 12px; display: block;";

  let cross = document.createElement('div');
  cross.textContent = 'x';



  // create elements for labels for each data to display
  let label_name = document.createElement('span');
  label_name.textContent = "NAME"; //&nbsp;
  label_name.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  let label_words = document.createElement('span');
  label_words.textContent = "WORDS";
  label_words.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";
	
  let label_subject = document.createElement('span');
  label_subject.textContent = "DESCRIPTION";
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

  li.appendChild(label_words);
  li.appendChild(wordsA);	
  li.appendChild(wordsB);
  li.appendChild(wordsC);
	
  li.appendChild(label_subject);
  li.appendChild(subject);

  // put the <tbody> in the <table>
  itemList.appendChild(li);
}

// get data initially
/*
db.collection('spells').get().then(snapshot => {
	itemList.count = 0;
    snapshot.docs.forEach(doc => {
	itemList.count += 1;
        renderDB(doc);
    });
});
*/

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
	clearForm();
	// generate new db 
	//refresh();
});

form.addEventListener('cancel', (e) => {
    e.preventDefault();
	//refresh();
});

// real-time listener
db.collection('spells').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
	    if(change.type == 'added'){
		    console.log("New item: ", change.doc.data());
            
		    renderDB(change.doc);
	    }
	    if (change.type == 'modified'){
		    console.log("Modified item: ", change.doc.data());
		    
		    let li = itemList.querySelector('[data-id=' + change.doc.id + ']');
		    itemList.removeChild(li);
		    renderDB(change.doc);
		    
	    }
	    if (change.type == 'removed'){
		    console.log("Removed item: ", change.doc.data());
		    
		    let li = itemList.querySelector('[data-id=' + change.doc.id + ']');
		    itemList.removeChild(li);
	    }
    });
});



//JQUERY FUNCTIONS
$(function(){
	$("#edit_item").hide();
	$("#delete_item").hide();
	$('.sidebar').hide();
	
	// Animate slide for create new form	
	function display_add(){
		flag_refresh = true;
		console.log(flag_refresh);
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
		 $(".content").show();
	         $('.sidebar').show();
	    	 //$('.sidebar').animate({width: '33%'});
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
		//location.reload();
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
		 $(".content").show();

	         $('.sidebar').show();
	    	 //$('.sidebar').animate({width: '33%'});
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
  });
	
$('#item_cancel').click(function(){
 	 $('.sidebar').hide();
         $(".min").show();
	 $( ".docs" ).toggleClass('blur-me');
	 clearForm();
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
			$("#edit_item").show();
			$("#delete_item").show();
		} else {

      			$("#edit_item").hide();
			$("#delete_item").hide();

		}
		

	});

});



