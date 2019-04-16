// creates a <table> element and a <tbody> element
const itemList = document.querySelector('#item-list');
// create form element
const form = document.querySelector('#add-item-form');

// create element & render cafe
function renderCafe(doc){
  // create list document object
  let li = document.createElement('li');
  li.setAttribute('data-id', doc.id);  //Each document gets an id.
  let name = document.createElement('span');
  let wordsA = document.createElement('span');
  let wordsB = document.createElement('span');
  let wordsC = document.createElement('span');
  let subject = document.createElement('span');
  let label = document.createElement('span');
  let label2 = document.createElement('span');

  name.textContent = doc.data().name;
  wordsA.textContent = doc.data().wordsA;
  wordsB.textContent = doc.data().wordsB;
  wordsC.textContent = doc.data().wordsC;
  subject.textContent = doc.data().subject;

  // append list
	
  label.textContent = "NAME"; //&nbsp;
  //label.style.display = "block"; 
  label.style.cssText = "padding: 2px; display: text-size: 8px; block; background: white"; //border: 1px solid black"; 
  li.appendChild(label);	
  //li.appendChild( document.createTextNode( '\u00A0\u00A0' ) ); //blank space
	
  name.style.display = "inline-block"; 
  name.style.cssText = "padding: 2px; display: text-size: 8px; block; background: white; border-bottom: 1px solid black"";
  li.appendChild(name);
  
  label2.textContent = "WORDS";
  label2.style.display = "block";

  li.appendChild(label2);
  li.appendChild( document.createTextNode( '\u00A0\u00A0' ) ); //blank space

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

	$('.max').hide();
	$('#close_app').hide();
//	$("#menutag").html("Menu");


	// Animate slide for create new form
	function display_add(){
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
	    	 $('.sidebar').animate({width: '350px'});
	         $(".max").hide().fadeIn(500);

		// $("#menutag").html("Add Entry");
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
  $("#options").hide();
	 $('.leftmenu').animate({width: '350px'});
 $(".content").hide().fadeIn(500);
   $( ".feedback" ).toggleClass('blur-me');
	  $("#menutag").html("Edit Entry");
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
	//$(this).toggleClass('active').siblings().removeClass('active');

	if($(this).hasClass('selected'))
	{
    	hover('off');
		//show available options
		//$("#edit_item").show();
		//$("#del_item").show();

/*
		var tableData; //= $(this).children("span").map(function(){return $(this).text();}).get();
		var id = $(this).attr('data-id');
		var docRef = db.collection("items").doc(id);

		docRef.get().then(function(doc) {
		    if (doc.exists) {
			var tableData = doc.data();
			console.log("Document data:", tableData);
		    } else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		    }
		}).catch(function(error) {
		    console.log("Error getting document:", error);
		});


		//var refData = docRef.get().get().doc.data().fname;//map(function(){return $(this).text();}).get();

		// put data on form
		form.fname.value =  tableData.fname;//docRef.get().doc.data().fname;//db.collection('items').get().snapshot.doc(id).doc.data().fname;
		form.lname.value = tableData.lname;
      		//form.email.value = tableData[3];
      		//form.dob.value = tableData[4];
      		//form.info.value = tableData[5];

		//$('#edit_item').click(function(){
		form.addEventListener('submit', (e) => {
    			e.preventDefault();
    			db.collection('items').doc(id).update({
				date: todaysDate(),
        			fname: form.fname.value,
        			lname: form.lname.value,
        			email: form.email.value,
				dob: form.dob.value,
        			info: form.info.value
			});
				clearForm();

			});

   		$('#del_item').on('click',function(){
        alert("Deleteing!!!");
        db.collection('items').doc(id).delete();
      });

      */

		}
  	else
  	{
        hover('on');
  		//	$("#edit_item").hide();
  		//	$("#del_item").hide();
  			clearForm();
  	}
  });

});
