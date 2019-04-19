// creates a <table> element and a <tbody> element
const itemList = document.querySelector('#item-list');
// create form element
const form = document.querySelector('#add-item-form');

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
  wordsC.style.cssText = "padding: 3px 0px 6px 12px; display: block; border-bottom: 2px solid black";

  let subject = document.createElement('span');
  subject.style.cssText = "padding: 3px 0px 6px 12px; display: block;;";

  // create elements for labels for each data to display
  let label_name = document.createElement('span');
  label_name.textContent = "NAME"; //&nbsp;
  label_name.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";

  let label_words = document.createElement('span');
  label_words.textContent = "WORDS";
  label_words.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"; //border: 1px solid black";


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
 // li.appendChild( document.createTextNode( '\u00A0\u00A0' ) ); //blank space

  wordsA.style.display = "block";

  li.appendChild(wordsA);
  li.appendChild(wordsB);
  li.appendChild(wordsC);
  li.appendChild(subject);


  // put the <tbody> in the <table>
  itemList.appendChild(li);
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

		$("#label").html("Add Entry");
	  	 $('#close_app').show();
	}

// Add new document button show
	$("#new_item").click(function(){
		//$("#item_submit").attr('value', 'Submit').attr('type','submit');
		display_add();
	});

// Animate slide for edit form
/*
function display_edit(){
  $('.min').hide();
	 $('.sidebar').animate({width: '350px'});
 $(".max").hide().fadeIn(500);
   $( ".docs" ).toggleClass('blur-me');
	  $("#label").html("Edit Entry");
	  $('#close_app').show();
}
*/

//Edit new document button show
/*
  $("#edit_item").click(function(){
	  display_edit();
  });
*/

  $('#item_submit').click(function(){
    $(".content").hide();
	  $('.sidebar').animate({width: '54px'});
	  //$("#menutag").html("Menu");
	  	//$(".options").hide().fadeIn(2000);
	$( ".docs" ).toggleClass('blur-me');
	     $('#close_app').hide();
  });


  $('#close_app').click(function(){
    $(".content").hide();
	   $('.sidebar').animate({width: '54px'});
	//  $("#menutag").html("Menu");
//	$(".options").hide().fadeIn(2000);
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
			$(this).css("background-color", "yellow");
			var tableData = $(this).children("span").map(function(){return $(this).text();}).get();
			var id = $(this).attr('data-id');
			var docRef = db.collection("spells").doc(id);

			// put data on form
			form.name.value =  tableData[1];//name;//docRef.get().doc.data().fname;//db.collection('items').get().snapshot.doc(id).doc.data().fname;
			form.wordsA.value = tableData[1];//.wordsA;
    			form.wordsA.value = tableData[3];
    			form.wordsA.value = tableData[4];
    			form.subject.value = tableData[5];

			$('#edit_item').click(function(){
			form.addEventListener('submit', (e) => {
    			e.preventDefault();
    			db.collection('spells').doc(id).update({
            		name: form.name.value,
            		wordsA: form.wordsA.value,
	          	wordsB: form.wordsB.value,
	          	wordsC: form.wordsC.value,
            		subject: form.subject.value});
			});

		} else {
			$(this).css("background-color", "");
      			$("#edit_item").hide();
		}
	});

});
