// creates a <table> element and a <tbody> element
var itemList = document.querySelector('#item-list');
itemList.addEventListener('click', myFunc, false);
itemList.myParam = 'This is my parameter';
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
					});

			/*	 
	 		form.addEventListener('click','append', (e) => {
    					e.preventDefault();
					db.collection("spells").doc(id).update({
						name: form.name.value,
						wordsA: form.wordsA.value,
						wordsB: form.wordsB.value,
						wordsC: form.wordsC.value,
						subject: form.subject.value});
					});
						// put data on form
						form.name.value =  tableData.name;
						form.wordsA.value = tableData.wordsA;
						form.wordsB.value = tableData.wordsB;
						form.wordsC.value = tableData.wordsC;
						form.subject.value = tableData.subject;
					});	
					*/
}

// create form element
var form = document.querySelector('#add-item-form');

// create element & render cafe
function renderCafe(doc){
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
  subject.style.cssText = "padding: 3px 0px 6px 12px; display: block;;";

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

  li.appendChild(label_words);
  li.appendChild(wordsA);
  li.appendChild(wordsB);
  li.appendChild(wordsC);
  li.appendChild(subject);

  li.appendChild(cross);


  // put the <tbody> in the <table>
  itemList.appendChild(li);

  // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('spells').doc(id).delete();
    });
}

// getting data
db.collection('spells').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
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
});

$(function(){
	 $("#edit_item").hide();

	//$('#close_app').hide();
	//$("#label").html("Menu");
	$('.sidebar').hide();


	// Animate slide for create new form
	function display_add(){
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
	         $('.sidebar').show();
	    	 $('.sidebar').animate({width: '350px'});
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
	    	 $('.sidebar').animate({width: '350px'});
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
	  //$("#menutag").html("Menu");
	  	//$(".options").hide().fadeIn(2000);    
	  $(".min").show();

	$( ".docs" ).toggleClass('blur-me');
	     $('#close_app').hide();
  });


  	$('#close_app').click(function(){
    		$(".content").hide();
	   	$('.sidebar').animate({width: '54px'});
	 	$( ".docs" ).toggleClass('blur-me');
	     	$('#close_app').hide();
	});

	function hover(a){
	  if(a=='on')
	  {
	    $('li').hover(function(){
	      $(this).css("background-color", "yellow");
	      }, function(){
	      $(this).css("background-color", "");
	    });
	  }
	  else {
	    $('li').hover(function(){
	      $(this).css("background-color", "");
	      }, function(){
	      $(this).css("background-color", "");
	    });
	  }
	}
	
	$('#item-list').on('click','li',function() {
	$(this).toggleClass('selected').siblings().removeClass('selected');
		if($(this).hasClass('selected')){
			$("#edit_item").show();
			//hover('off');
			$(this).css("background-color", "yellow");
			
			//tableData = $(this).children("span").map(function(){return $(this).text();}).get();
			//var id = $(this).attr('data-id');
			//var docRef = db.collection("spells").doc(id);
		
/*
			$('#edit_item').click(function(){
						form.name.value =  tableData[1];
						form.wordsA.value = tableData[3];
						form.wordsB.value = tableData[4];
						form.wordsC.value = tableData[5];
						form.subject.value = tableData[7];
						console.log(tableData);

					});
					*/
		} else {
			$(this).css("background-color", "");
			//hover('on');
      			$("#edit_item").hide();
		}
	});

});
