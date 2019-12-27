// creates a <ol> list element and functions

var itemList = document.querySelector('#item-list');
itemList.count = 0;
// create form element
var form = document.querySelector('#item-form');
var edit = document.querySelector('#edit_item');



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

/*
	const data = doc.data();
	for (const key in data) {
	    const value = data[key];

			//alert("key: " + key + " value: " + value);
		if(value)
			{
			  label_name.textContent = key;
				//alert(key);
				var newDiv = document.createElement('span');
				newDiv.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"
				var newContent = document.createTextNode(key);
				var newDiv1 = document.createElement('span');
				newDiv1.classList.add("name_data");
				var newContent1 = document.createTextNode(value);
				newDiv.appendChild(newContent);
				newDiv1.appendChild(newContent1);
				li.appendChild(newDiv);
				li.appendChild(newDiv1);
			}
	   // // now key and value are the property name and value
	}
	*/

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

class Snap {
	constructor(){
		if(! Snap.instance){
      this._data = [];
      Snap.instance = this;
			//alert("constructor called");
    }

    return Snap.instance;
	}

	setData(doc){
		//var _data = [];
		var	data = doc.data();
		this.name = data.name;
		this.level = data.level;
		this.wordsA = data.wordsA;
		this.wordsB = data.wordsB;
		this.wordsC = data.wordsC;
		this.subject = data.subject;
	}

	//get(id){
	//	return this._data.find(d => d.id === id);
	//}

	setForm(){
		form.name.value =  this.name;
		form.level.value = this.level;
		form.wordsA.value = this.wordsA;
		form.wordsB.value = this.wordsB;
		form.wordsC.value = this.wordsC;
		form.subject.value = this.subject;
	}
}

//export default instance;

//itemList.addEventListener('click',selectedListener,false);


//JQUERY FUNCTIONS
$(function(){
	$('.sidebar').addClass('closed');
	$("#edit_item").hide();
	$("#delete_item").hide();
	$('.content').hide();
	$('.min').show();

	// Display min-sidebar
	function display_min(){
		$('.sidebar').addClass('closed');
		$("#edit_item").hide();
		$("#delete_item").hide();
		$('.content').hide();
		$('.min').show();
	}

	function display_full(){
		 $('.sidebar').removeClass('closed');
		 $( ".docs" ).toggleClass('blur-me');
		 $(".min").hide();
		 $(".content").show();
	         $(".max").hide().fadeIn(1000);
	}


	// Animate slide for create new form
	function display_add(){
		//flag_refresh = true;
		$("#item_edit").hide();
		$("#item_submit").show();
		display_full();
	}

	// Add new document button show
	$("#new_item").click(function(){
		//$("#item_submit").attr('value', 'Submit').attr('type','submit');
		display_add();
		clearForm();
	});

	// Animate slide for edit form
	function display_edit(){
		$("#item_edit").show();
		$("#item_submit").hide();
		 display_full();
	}

	//Edit new document button show
  	$("#edit_item").click(function(){
		//$("#item_submit").attr('value', 'Append').attr('type','append');
	  	display_edit();
 	 });

 	$("#item_submit").click(function(){
	        $( ".docs" ).toggleClass('blur-me');
		display_min();
  	});

	$("#item_edit").click(function(){
	        $( ".docs" ).toggleClass('blur-me');
		display_min();
  	});

	$("#item_cancel").click(function(){
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


//	$("#item-list").hover('li',function(){
//	    $(this).addClass( "selected" );
//	});


	$("#item-list").on('click','li',function() {
		let target = $(this);
		let others = $(this).siblings();

		target.toggleClass('selected');
		others.removeClass('selected');


		if(target.hasClass('selected')){
			$("#edit_item").show();
			$("#delete_item").show();
		} else {
			$("#edit_item").hide();
			$("#delete_item").hide();
		}

		//const id = $(this).attr('data-id');

	});

});


var selectedListener = function(e) {
	  //itemList.removeEventListener('click',selectListener);
		const element = e.target.parentElement;
		const id = element.getAttribute('data-id');
		//element.classList.add('selected');

		if(!element.hasAttribute('data-id'))
				return;
		else{
			const id = element.getAttribute('data-id');
		}

		var ref = db.collection("spells").doc(id);

		ref.get().then(doc=>{
		//	const spell = new Spell(doc);
		//	spell.setForm();

			const instance = new Snap();
			instance.setData(doc);
			instance.setForm();
			//Object.freeze(instance);
		});


		$('#delete_item').click(function(){
			if(!element.classList.contains('selected')) return;
			ref.delete();
		});


};

itemList.addEventListener('click',selectedListener,false);

var submit = document.querySelector('input[type=submit][value=Submit]');
//submit.addEventListener('click',)
submit.onclick = function(){
	db.collection('spells').add({
			name: form.name.value,
			level: form.level.value,
			wordsA: form.wordsA.value,
			wordsB: form.wordsB.value,
			wordsC: form.wordsC.value,
			subject: form.subject.value
	});
};

var apply = document.querySelector('input[type=submit][value=Apply]');
apply.onclick = function(){
	alert("Editing...");
	var x = document.getElementById("item-list");
	for (let element of x.children) {
		if(element.className == 'selected')
		{
			var id = element.getAttribute('data-id');
					var ref = db.collection('spells').doc(id);
					ref.update({
									name: form.name.value,
									level: form.level.value,
									wordsA: form.wordsA.value,
									wordsB: form.wordsB.value,
									wordsC: form.wordsC.value,
									subject: form.subject.value
								});
					}
				}
};

//save new to db
form.addEventListener('submit', (e) => {
    e.preventDefault();
		//var submit = document.querySelector('input[type=submit][value=Submit]');
	//	var apply = document.querySelector('input[type=submit][value=Apply]');

/*
		submit.onclick = function(){
    	db.collection('spells').add({
	        name: form.name.value,
					level: form.level.value,
	        wordsA: form.wordsA.value,
					wordsB: form.wordsB.value,
					wordsC: form.wordsC.value,
	        subject: form.subject.value
    	});
		};
*/

/*
		apply.onclick = function(){
			alert("Editing...");
			var x = document.getElementById("item-list");
			for (let element of x.children) {
				if(element.className == 'selected')
				{
					var id = element.getAttribute('data-id');
							var ref = db.collection('spells').doc(id);
							ref.update({
											name: form.name.value,
											level: form.level.value,
											wordsA: form.wordsA.value,
											wordsB: form.wordsB.value,
											wordsC: form.wordsC.value,
											subject: form.subject.value
										});
							}
						}
		};
		*/

//	clearForm();
	// generate new db
//	refresh();
});
