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
let tblBody = document.createElement("tbody");    
// get the reference for the body
var body = document.getElementsByTagName("body")[0];

// create form element
const form = document.querySelector('#add-item-form');


// create element & render cafe
function renderCafe(doc){
    
    // creates a table row
    let row = document.createElement("tr");
    itemList.setAttribute('data-id', doc.id);
    let name = document.createElement('td'); 
    let amount = document.createElement('td');
    let subject = document.createElement('td');
    name.textContent = doc.data().name;
    amount.textContent = doc.data().amount;
    subject.textContent = doc.data().subject;
    
    // append row
    row.appendChild(name);
    row.appendChild(amount);
    row.appendChild(subject);
    
    // add the row to the end of the table body  
    tblBody.appendChild(row);
    
    // put the <tbody> in the <table>
    itemList.appendChild(tblBody);
  // appends <table> into <body>
 //   body.appendChild(itemList);
  // sets the border attribute of tbl to 2;
   //itemList.setAttribute("border", "2");
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
