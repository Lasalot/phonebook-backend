//ADD NEW EMPLOYEE
const addNewEmployee = document.querySelector('#add-new-employee')
const x = document.querySelector('#new-employee')
addNewEmployee.addEventListener('click', _ => {
  if (x.style.display === "block") {
    x.style.display = "none"
  } else {
    x.style.display = "block"
    console.log("ASd")
  }
})

//DELETE EMPLOYEE
const deleteEmployee = document.querySelector('#delete-employee-button')
const y = document.querySelector('#delete-employee')
deleteEmployee.addEventListener('click', _ => {
  if (y.style.display === "block") {
    y.style.display = "none"
    deleteEmployee.innerHTML = "Delete one entry"

  } else {
    y.style.display = "block"
    deleteEmployee.innerHTML = "Cancel"
  }
})



const delButton = document.querySelector('#delete-entry-button')


delButton.addEventListener('click', _ => {

  const delValue = document.querySelector('#delete-entry-value').value
  const answer = prompt('Are you sure you wish to delete ' + delValue + "? (Options are : Yes or No)")

  if (answer === 'yes' || 'Yes' || 'Igen' || 'igen') {
    $.ajax('/del-employees', {
      type: "POST",
      data: {
        email: delValue
      },
      success: location.reload()
    })
  } else if (answer === 'no' || 'No' || 'nem' || 'Nem') {
    location.reload()
  }


})

