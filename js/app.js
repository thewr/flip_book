// creates a <ol> list element and functions
// create form element
var form = document.querySelector('#item-form');
var itemList = document.querySelector('#item-list');
const db_name = "spells";
var flag_refresh = true;
var flag_update = false;

itemList.addEventListener('click', myFunc, false);

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
      form.level.value = '';
      form.wordsA.value = '';
      form.wordsB.value = '';
      form.wordsC.value = '';
      form.subject.value = '';
}

function myFunc(evt)
{
	
	//evt.target.parentElement.getElementsByTagName('li').classList.add('selected');
	
	if(evt.target.nodeName == 'SPAN'){
		const id = evt.target.parentElement.getAttribute('data-id');
	    	const ref = db.collection('spells').doc(id);
		var obj = {};
		console.log("id: " + id + " was clicked"); 
		
			try {			
				ref.get().then(doc => {
					if(!doc.exists) {
						window.alert("no such document");
					} else {
						obj = {
							//date: doc.data().date,
							name: doc.data().name,
							level: doc.data().level,
							wordsA: doc.data().wordsA,
							wordsB: doc.data().wordsB,
							wordsC: doc.data().wordsC,
							subject: doc.data().subject
						};  //window.alert(obj.name)
						
						$('#edit_item').click(function(){
							form.name.value =  obj.name;
							form.level.value = obj.level;
							form.wordsA.value = obj.wordsA;
							form.wordsB.value = obj.wordsB;
							form.wordsC.value = obj.wordsC;
							form.subject.value = obj.subject;
							
							$('#item_submit').click(function(){ //form.addEventListener('append', (e) => { e.preventDefault();
								ref.update({
									name: form.name.value,
									level: form.level.value,
									wordsA: form.wordsA.value,
									wordsB: form.wordsB.value,
									wordsC: form.wordsC.value,
									subject: form.subject.value
								});	
								return false;
							});
						}); //end of edit item		
					} 
				})
			} catch (error) { 
			res.send(error);
			} //end of try

			$('#delete_item').click(function(){
				ref.delete();
			});//end-of-delete_item event
	} else {
		return;
	}
}


// create element & render cafe
function renderDB(doc){
  // create list document elements
  let li = document.createElement('li');
  li.setAttribute('data-id', doc.id);  //Each document gets an id.
  let name = document.createElement('span');
  name.classList.add("name_data");
  let level = document.createElement('span');
  level.classList.add("name_data");
  let wordsA = document.createElement('span');
  wordsA.classList.add("words_data");
  let wordsB = document.createElement('span');
  wordsB.classList.add("words_data");
  let wordsC = document.createElement('span');
  wordsC.classList.add("words_data_last");
  //wordsC.style.cssText = "font-family: Arial, Helvetica, sans-serif; font-size: 16px; padding: 3px 0px 6px 12px; display: block; border-bottom: 2px solid black";

  let subject = document.createElement('span');
  subject.classList.add('subject_data');
  //subject.style.cssText = "padding: 3px 0px 6px 12px; display: block;";

  let cross = document.createElement('div');
  cross.textContent = 'x';



  // create elements for labels for each data to display
  let label_name = document.createElement('span');
  label_name.textContent = "NAME"; //&nbsp;
  label_name.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

 // create elements for labels for each data to display
  let label_level = document.createElement('span');
  label_level.textContent = "LEVEL"; //&nbsp;
  label_level.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";
	
  let label_words = document.createElement('span');
  label_words.textContent = "WORDS";
  label_words.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";
	
  let label_subject = document.createElement('span');
  label_subject.textContent = "DESCRIPTION";
  label_subject.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  // generate content for fields
  name.textContent = doc.data().name;
  level.textContent = doc.data().level;
  wordsA.textContent = doc.data().wordsA;
  wordsB.textContent = doc.data().wordsB;
  wordsC.textContent = doc.data().wordsC;
  subject.textContent = doc.data().subject;

  // append list
  li.appendChild(cross);
  li.appendChild(label_name);
  li.appendChild(name);
	
  li.appendChild(label_level);
  li.appendChild(level);
	
  li.appendChild(label_words);
  li.appendChild(wordsA);	
  li.appendChild(wordsB);
  li.appendChild(wordsC);
	
  li.appendChild(label_subject);
  li.appendChild(subject);

  // put the <tbody> in the <table>
  itemList.appendChild(li);
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('spells').add({
        name: form.name.value,
	level: form.level.value,
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
db.collection('spells').orderBy('level').onSnapshot(snapshot => {
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
	$('.sidebar').addClass('closed');
	$("#edit_item").hide();
	$("#delete_item").hide();
	$('.content').hide();
	$('.min').show();
	
	// Display min-sidebar
	function display_min(){
		 $(".min").show();
		 $(".content").hide();
		 $('.sidebar').addClass('closed');
	}
	
	function display_full(){
		 $('.sidebar').removeClass('closed');
		 $(".min").hide();
		 $(".content").show();
	         $(".max").hide().fadeIn(500);		
	}
	
	
	// Animate slide for create new form	
	function display_add(){
		//flag_refresh = true;
		$( ".docs" ).toggleClass('blur-me');
		display_full();
	}

	// Add new document button show
	$("#new_item").click(function(){
		$("#item_submit").attr('value', 'Submit').attr('type','submit');
		display_add();
	});

	// Animate slide for edit form
	function display_edit(){
		 $( ".docs" ).toggleClass('blur-me');
		 display_full();
	}

	//Edit new document button show
  	$("#edit_item").click(function(){
		$("#item_submit").attr('value', 'Append').attr('type','append');
	  	display_edit();
  });

  $('#item_submit').click(function(){
	       $( ".docs" ).toggleClass('blur-me');
	        $("#edit_item").hide();
		$("#delete_item").hide();
	  	//$("#item_submit").attr('value', 'Append').attr('type','append');
		display_min();
	      
		//refresh();
  });
	
$('#item_cancel').click(function(){
		//flag_refresh = true;
		$( ".docs" ).toggleClass('blur-me');
		$("#edit_item").hide();
		$("#delete_item").hide();
	
		if($('#item-list li').hasClass('selected')){
			$('#item-list li').removeClass('selected');
		}					  

		display_min();

		clearForm();
		//refresh();
});

	
	$('#item-list').on('click','li',function() {
		$(this).unbind("mouseenter mouseleave");
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



