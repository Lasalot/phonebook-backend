const getId = prompt('What is the login name?')
const getPass = prompt("What is the password?")

const innerPass = process.env.PASS
const innerId = process.env.ID

if (innerPass === getPass && innerId === getId) {
  alert('alright go on')
}
else (
  window.location.href = "https://bitninja.io"
)

process.env.PORT