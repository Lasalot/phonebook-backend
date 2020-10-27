const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')



const app = express();
//Date info
const currDate = new Date().toLocaleDateString()
//


app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

const Schema = mongoose.Schema;

const employeesSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: Number,
    eMail: String,
    image: String,
    dateCreated: Date,
});

const Model = mongoose.model
const Employee = Model('employees', employeesSchema)
mongoose.connect('/dolgozok?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error:'));
const collection = db.collection('employees')



//GET REQUESTS

// app.get('/', (req,res) => {
//     tesztAdat.save((err,result) => {
//         if(err) console.log(err)
//         console.log(result)
//         res.send("Got ya data")
//     })
//     })

app.get('/employees', (req, res) => {
    db.collection('employees').find().toArray().then(results => {
        res.render('employees.ejs', { entries: results })
    })
})

app.get("/new-employee", (req, res) => {
    res.render("newEmployee.ejs")

})



//POST REQUESTS

app.post('/new-employee', (req, res) => { //**create database info */
    db.collection('employees').insertOne(req.body).then(result => { console.log(result) }).catch(error => console.error(error))
    res.redirect('/employees')
})

//DELETE REQUEST

app.post('/del-employees', (req, res) => { //FOLYT KÖV//
    db.collection('employees').deleteOne({
        email: req.body.email
    }).then(result => res.json('Entry has been deleted')).then(res.redirect('/employees')).catch(error => console.error(error))
})





app.listen(3000)