// creates a <ol> list element and functions

var itemList = document.querySelector('#item-list');
itemList.addEventListener('click', myFunc, false);//itemList.addEventListener('click', myFunc, false);
itemList.count = 0;
// create form element
var form = document.querySelector('#item-form');
var edit = document.querySelector("#edit_item");


/*
document.getElementById("list").addEventListener("click",function(e) {
  if (e.target && e.target.matches("li.item")) {
    e.target.className = "foo"; // new class name here
    }
});
*/

// define buttons
refresh_button.addEventListener('click',refreshFunc,false);

function refreshFunc(evt)
{
	var count = itemList.count;
	const id = evt.target.parentElement.getAttribute('data-id');
	
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
	db.collection('spells')
		.orderBy('name','asc')
		.get().then(snapshot => {
			itemList.count = 0;
		        console.log('displaying contents of db...');
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


edit.addEventListener("click",function(){
	console.log("Edit button clicked");
	/*
	var x = document.getElementById("item-list");
	for (let element of x.children) {
		if(element.className == 'selected')
	 	{		 
 			var id = element.getAttribute('data-id');
			console.log("Editing ID: "+id);
		    	var ref = db.collection('spells').doc(id);
			ref.get().then(doc => {
				if(!doc.exists) {
					window.alert("no such document");
				} else {
					var o = {
							//date: doc.data().date,
							name: doc.data().name,
							level: doc.data().level,
							wordsA: doc.data().wordsA,
							wordsB: doc.data().wordsB,
							wordsC: doc.data().wordsC,
							subject: doc.data().subject
					};  //window.alert(obj.name)}
					
					
					// copy contents to form
					form.name.value =  o.name;
					form.level.value = o.level;
					form.wordsA.value = o.wordsA;
					form.wordsB.value = o.wordsB;
					form.wordsC.value = o.wordsC;
					form.subject.value = o.subject;
					
					// update new
					$('#item_submit').unbind().click(function(e){ //.unbind().// form.addEventListener('append', (e) => { e.preventDefault();
							e.preventDefault();	
						  	//e.stopImmediatePropagation();
							ref.update({
									name: form.name.value,
									level: form.level.value,
									wordsA: form.wordsA.value,
									wordsB: form.wordsB.value,
									wordsC: form.wordsC.value,
									subject: form.subject.value
								});	
								console.log("ID: "+id+" Edited");
								//itemList.removeEventListener('click', myFunc);
								return false;
					});
					
					$('#item_cancel').click(function(){
						return false;
					}
				}
			});
		}
	}
	*/
});


			
function myFunc(evt)
{
	const id = evt.target.parentElement.getAttribute('data-id');
	//evt.target.parentElement.getElementsByTagName('li').classList.add('selected');
	
	if(evt.target.nodeName == 'SPAN'){
		console.log(id + " was clicked");	
	    	const ref = db.collection("spells").doc(id);
		
		$('#edit_item').click(function(){
			try {
				var tableData = {};
				ref.get()
				.then(doc => {
					if(!doc.exists) {
						window.alert("no such document");
					} else {
						tableData = {
							//date: doc.data().date,
							name: doc.data().name,
							wordsA: doc.data().wordsA,
							wordsB: doc.data().wordsB,
							wordsC: doc.data().wordsC,
							subject: doc.data().subject
						};  //window.alert(tableData.name + " " + tableData.subject);
						
						form.name.value =  tableData.name;
						form.wordsA.value = tableData.wordsA;
						form.wordsB.value = tableData.wordsB;
						form.wordsC.value = tableData.wordsC;
						form.subject.value = tableData.subject;
						
					}
				})
			} catch (error) { 
				res.send(error);
			} //end of try
			


			$('#item_submit').click(function(){ //form.addEventListener('append', (e) => { e.preventDefault();
				db.collection("spells").doc(id).update({
					name: form.name.value,
					level: form.level.value,
					wordsA: form.wordsA.value,
					wordsB: form.wordsB.value,
					wordsC: form.wordsC.value,
					subject: form.subject.value
				});
				clearForm();
				refresh();
			});
		}); //end of edit item


		$('#delete_item').click(function(){
			ref.delete();
			refresh();
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

 // let cross = document.createElement('div');
 // cross.textContent = 'x';



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
  //li.appendChild(cross);
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

//save new to db
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
	refresh();
});

//edit to db
/*
form.addEventListener('append', (e) => {
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
	refresh();
});
*/

/*
form.addEventListener('cancel', (e) => {
    e.preventDefault();
	//refresh();
});
*/

// real-time listener
db.collection('spells').orderBy('level').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
	    if(change.type == 'added'){
		    console.log("New item: ", change.doc.data());
            
		    renderDB(change.doc);
	    }
	    
	    /*
	    if (change.type == 'modified'){
		    console.log("Modified item: ", change.doc.data());
		    
		    let li = itemList.querySelector('[data-id=' + change.doc.id + ']');
		    itemList.removeChild(li);
		    renderDB(change.doc);
		    
	    }
	    */

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
		//$("#item_submit").attr('value', 'Submit').attr('type','submit');
		display_add();
	});

	// Animate slide for edit form
	function display_edit(){
		 $( ".docs" ).toggleClass('blur-me');
		 display_full();
	}

	//Edit new document button show
  	$("#edit_item").click(function(){
		//$("#item_submit").attr('value', 'Append').attr('type','append');
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
		//$(this).unbind("mouseenter mouseleave");
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



