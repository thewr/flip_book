
// creates a <ol> list element and functions
// create form element
var form = document.querySelector('#add-item-form');
var itemList = document.querySelector('#item-list');

itemList.addEventListener('click', myFunc, false);//itemList.addEventListener('click', myFunc, false);

itemList.count = 0;



// create form element
var form = document.querySelector('#item-form');

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

function refresh() {

	while(itemList.firstChild){
		itemList.count -= 1;
		itemList.removeChild(itemList.firstChild);
	}
	alert("Displaying");

	db.collection('applications').get().then(snapshot => {
	    snapshot.docs.forEach(doc => {
		renderDB(doc);
	    });
	});//end of get data
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
	const id = evt.target.parentElement.getAttribute('data-id');

	if(evt.target.nodeName == 'SPAN'){// && evt.taget.className = 'selected') {
            console.log(id + " was clicked");
	    const ref = db.collection("applications").doc(id);
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

							$('#item_submit').click(function(){ //form.addEventListener('append', (e) => { e.preventDefault();
								db.collection("applications").doc(id).update({
									name: form.name.value,
									wordsA: form.wordsA.value,
									wordsB: form.wordsB.value,
									wordsC: form.wordsC.value,
									subject: form.subject.value
								});
								clearForm();
								refresh();
							});
							return;
						});

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
/*
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
*/

form.addEventListener('cancel', (e) => {
    e.preventDefault();
	refresh();
});



$(function(){
	$('.sidebar').hide();
});


