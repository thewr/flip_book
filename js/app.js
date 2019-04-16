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
  let amount = document.createElement('span');
  let subject = document.createElement('span');

  name.textContent = doc.data().name;
  amount.textContent = doc.data().amount;
  subject.textContent = doc.data().subject;
 
  // append list
  li.appendChild(name);
  li.appendChild(amount);
  li.appendChild(subject);


  // put the <tbody> in the <table>
  itemList.appendChild(li);
}

// getting data
db.collection('items').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('items').add({
        name: form.name.value,
        amount: form.amount.value,
        subject: form.subject.value
    });
      form.name.value = '';
      form.amount.value = '';
      form.subject.value = '';
});
