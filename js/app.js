
// creates a <ol> list element and functions
// create form element
var form = document.querySelector('#item-form');
var itemList = document.querySelector('#item-list');
itemList.count = 0;

function refresh() {

	while(itemList.firstChild){
		itemList.count -= 1;
		itemList.removeChild(itemList.firstChild);
	}
	alert("Displaying");

	db.collection('spells').get().then(snapshot => {
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
	$('.sidebar').hide();
});


