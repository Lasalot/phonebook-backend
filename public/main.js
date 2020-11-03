//ADD NEW EMPLOYEE
//kekw
var firstName = document.querySelector('#new-employee').children[2]
var lastName = document.querySelector('#new-employee').children[2]
var phone = document.querySelector('#new-employee').children[2]
var image = document.querySelector('#new-employee').children[2]
var email = document.querySelector('#new-employee').children[2]
var lastPass = document.querySelector('#new-employee').children[2]
var title = document.querySelector('#new-employee').children[2]


var addNewEmployee = document.querySelector('#add-new-employee');
const x = document.querySelector('#new-employee');

addNewEmployee.addEventListener('click', _ => {
  if (x.style.display === "block") {
    x.setAttribute("style", "animation-name: bwd;");
    addNewEmployee.innerHTML = "Add new employee"
    addSleep()
  } else {
    x.setAttribute("style", "animation-name: fwd;");
    x.style.display = "block";
    addNewEmployee.innerHTML = "Cancel"
  }
})
function sleep1(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function addSleep() {
  await sleep1(500);
  x.style.display = "none";
  firstName.children[0].value = "";
  lastName.children[1].value = "";
  phone.children[2].value = "";
  image.children[3].value = "";
  email.children[4].value = "";
  lastPass.children[5].value = "";
  title.children[6].value = "";
}
//show-hide buttons

var showButtons = document.querySelector('#show-hide');
const z = document.querySelector('.hide-btn');
showButtons.addEventListener('click', _ => {
  if (z.style.display === "inline-block") {
    z.setAttribute("style", "animation-name: bwd2;");
    showSleep();
    showButtons.innerHTML = ">"
  } else {
    z.setAttribute("style", "animation-name: fwd2;");
    z.style.display = "inline-block"
    showButtons.innerHTML = "<"
  }
})

async function showSleep() {
  await sleep1(500);
  z.style.display = 'none';
}

//DELETE EMPLOYEE
const deleteEmployee = document.querySelector('#delete-employee-button')
const y = document.querySelector('#delete-employee')
deleteEmployee.addEventListener('click', _ => {
  if (y.style.display === "block") {
    y.setAttribute("style", "animation-name: bwd1;");
    delSleep();
    deleteEmployee.innerHTML = "Remove an employee"

  } else {
    y.setAttribute("style", "animation-name: fwd1;");
    y.style.display = "block"
    y.style.visibility = "visible"
    deleteEmployee.innerHTML = "Cancel"

  }
})

async function delSleep() {
  await sleep1(500);
  y.style.display = 'none';
}


// CHANGE TO TABLE VIEW OR CARD VIEW (VICA VERSA)

const changeView = document.querySelector('#change-view');
const employeeTable = document.querySelector('.table-hide');
const employeeCard = document.querySelector('#hide-cards');
changeView.addEventListener('click', _ => {

  if (employeeCard.style.display != "none") {
    employeeCard.style.display = "none";
    employeeTable.style.display = "table"
    changeView.innerHTML = "Card View"

  } else if (changeView.innerHTML === "Card View") {
    employeeCard.style.display = "block";
    employeeTable.style.display = "none"
    changeView.innerHTML = "Table View"
  }


});





// ASK PROMPT ON DELETE
const delButton = document.querySelector('#delete-entry-button')
delButton.addEventListener('click', _ => {
  const delValue = document.querySelector('#delete-entry-value').value
  const answer = prompt('Are you sure you wish to delete ' + delValue + "? (Options are : Yes or No)")

  if (answer === 'yes' || 'Yes' || 'Igen' || 'igen' || 'YES') {
    $.ajax('/del-employees', {
      type: "POST",
      data: {
        email: delValue
      },
      success: location.reload()
    })
  } else if (answer === 'no' || 'No' || 'nem' || 'Nem' || 'NO') {
    location.reload()
  }


})




// // get onclick data
// $(".phone").click(function (event) {


// });