// creates a <ol> list element and functions
/*
import firebase from 'firebase';
import 'firebase/<package>';

// Initialize Firebase
var app = firebase.initializeApp({
    apiKey: "AIzaSyCntSwrxBash6pXzL9yaGCnQh0gQZPclG0",
    authDomain: "sales-91e4c.firebaseapp.com",
    databaseURL: "https://sales-91e4c.firebaseio.com",
    projectId: "sales-91e4c",
    storageBucket: "sales-91e4c.appspot.com",
    messagingSenderId: "533687143173"
  });
const storage = app.storage();
const db = firebase.firestore();
//const ref = storage.ref('path');
*/

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
//refresh_button.addEventListener('click',refreshFunc,false);
/*
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
*/

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

	var data = doc.data();

	for (var key in data) {
	  const value = data[key];
		if(value)
			{
			  //label_name.textContent = key;
				let div = document.createElement('span');
				div.style.cssText = "padding: 3px 0px 0px 6px; display: inline-block; font-weight: bold; width: 50%;"
				let text = document.createTextNode(key);
				let div1 = document.createElement('span');
				div1.classList.add("name_data");
				let text1 = document.createTextNode(value);
				div.appendChild(text);
				div1.appendChild(text1);
				li.appendChild(div);
				li.appendChild(div1);
			}
	   // // now key and value are the property name and value
	}

  // append list

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

	//    if (change.type == 'removed'){
	//	    console.log("Removed item: ", change.doc.data());
	//	    let li = itemList.querySelector('[data-id=' + change.doc.id + ']');
	//	    itemList.removeChild(li);
	//    }
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
		refresh();
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

			let instance = new Snap();
			instance.setData(doc);
			instance.setForm();
			//Object.freeze(instance);
		});


		$('#delete_item').click(function(){
			if(!element.classList.contains('selected')) return;
			ref.delete();
			refresh();
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
