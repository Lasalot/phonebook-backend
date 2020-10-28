//ADD NEW EMPLOYEE
const addNewEmployee = document.querySelector('#add-new-employee')
const x = document.querySelector('#new-employee')

addNewEmployee.addEventListener('click', _ => {
  if (x.style.display === "block") {
    x.setAttribute("style", "animation-name: bwd;");
    addSleep();

  } else {
    x.setAttribute("style", "animation-name: fwd;");
    x.style.display = "block"
    console.log("Asd")
  }
})
function sleep1(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function addSleep() {
  await sleep1(500);
  x.style.display = "none";
}



//DELETE EMPLOYEE
const deleteEmployee = document.querySelector('#delete-employee-button')
const y = document.querySelector('#delete-employee')
deleteEmployee.addEventListener('click', _ => {
  if (y.style.display === "block") {
    y.setAttribute("style", "animation-name: bwd1;");
    delSleep();
    deleteEmployee.innerHTML = "Delete one entry"

  } else {
    y.setAttribute("style", "animation-name: fwd1;");
    y.style.display = "block"
    deleteEmployee.innerHTML = "Cancel"
  }
})

async function delSleep() {
  await sleep1(500);

  y.style.display = "none";
}


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

