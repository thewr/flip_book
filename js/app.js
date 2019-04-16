$(function(){
  $(".content").hide();
  $("#add_item_button").click(function(){
    $(".content").hide().fadeIn(1000);
   // $("#add_item_button").hide();
  });
  $('#item_submit').click(function(){
    $(".content").show().fadeOut(1000);
   // $("add_item_button").show();
  });
});

// creates a <table> element and a <tbody> element
const itemList = document.querySelector('#item-list');

// create form element
const form = document.querySelector('#add-item-form');


// create element & render cafe
function renderCafe(doc){
  // create list document object
  let li = document.createElement('li');
  li.setAttribute('data-id', doc.id);  //Each document gets an id.

  //let date = document.createElement('span');
  //let label = document.createElement('span');//.setAttribute("style","display: inline-block;");
  //let fname = document.createElement('span');
  //let lname = document.createElement('span');
  let name = document.createElement('span');
  let amount = document.createElement('span');
  let info = document.createElement('span');

  name.textContent = doc.data().name;
  amount.textContent = doc.data().amount;
  info.textContent = doc.data().info;
 
  // append list
  li.appendChild(name);
  li.appendChild(amount);
  li.appendChild(info);


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
