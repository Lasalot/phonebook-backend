const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express();
//Date info
const currDate = new Date().toLocaleDateString()
//


app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

// MONGOOSE

mongoose.connect('mongodb+srv://' + process.env.DATABASE + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) console.log(error)
    console.log("DB connection OK")
})
const db = mongoose.connection;

let Schema = mongoose.Schema
let employeesSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    image: String,
    lastPassEmail: String,
    title: String,
    dateAdded: Date,
})
const Model = mongoose.model
const Employee = Model('Employees', employeesSchema)

db.on('error', console.error.bind(console, 'MongoDB Connection error:'));
const collection = db.collection('employees')

////////////////////////////

app.post('/test', (req, res) => {
    let Tszt = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    Tszt.save((err, result) => {
        if (err) console.log(err)
        console.log(result);
    })

    res.json({ "message": "data has been saved" })
})

//GET EMPLOYEES

app.get('/', (req, res) => {
    if (req.query.username === process.env.ID && req.query.pass === process.env.PASS) {
        collection.find().toArray().then(results => {
            res.render('employees.ejs', { entries: results })
        })
    } else {
        res.json({
            "error": "You are not permitted to view this page"
        })
    }


})

//EMAIL ALREADY EXISTS

app.get('/emailExists', (req, res) => {
    res.render('emailExists')

})




//CREATE EMPLOYEE
app.post('/new-employee', (req, res) => { //**create database info */
    let currDate = new Date()



    Employee.findOne({
        email: req.body.email
    }, function (err, userExists) {
        if (userExists) {
            res.redirect('/emailExists')


        } else {
            let data = new Employee({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                image: req.body.image,
                lastPassEmail: req.body.lastPassEmail,
                title: req.body.title,
                dateAdded: currDate
            })
            data.save(function (err) { if (err) { console.log(err) } }).then(result => { console.log(result) }).catch(error => console.error(error))
            setTimeout((function () { res.redirect('/' + '?' + 'username=' + process.env.ID + '&' + 'pass=' + process.env.PASS) }), 2000);

        }
    })
})

//DELETE EMPLOYEE

app.post('/del-employees', (req, res) => { //FOLYT KÖV//
    Employee.deleteOne({
        email: req.body.email
    }).then(res.redirect('/employees')).catch(error => console.error(error))
})


// UPDATE EMPLOYEE

app.post('/patch-employee', (req, res) => {
    Employee.find({
        _id: req.body.id
    }, function (err, result) {
        if (err) console.log(err)
        console.log(result)
    })
})



app.listen(process.env.PORT || 3000)