const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()



const app = express();
//Date info
const currDate = new Date().toLocaleDateString()
//


app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://' + process.env.DATABASE + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) console.log(error)
    console.log("DB connection OK")
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection error:'));
const collection = db.collection('employees')



//GET EMPLOYEES

app.get('/employees', (req, res) => {
    collection.find().toArray().then(results => {
        res.render('employees.ejs', { entries: results })
    })
    let email = req.query.email
    console.log(email)

})

//EMAIL ALREADY EXISTS

app.get('/emailExists', (req, res) => {
    res.render('emailExists')

})




//CREATE EMPLOYEE

app.post('/new-employee', (req, res) => { //**create database info */
    collection.findOne({
        email: req.body.email
    }, function (err, userExists) {
        if (userExists) {
            res.redirect('/emailExists')


        } else {
            collection.insertOne(req.body).then(result => { console.log(result) }).catch(error => console.error(error))
            res.redirect('/employees')

        }
    })
})

//DELETE EMPLOYEE

app.post('/del-employees', (req, res) => { //FOLYT KÖV//
    db.collection('employees').deleteOne({
        email: req.body.email
    }).then(result => res.json('Entry has been deleted')).then(res.redirect('/employees')).catch(error => console.error(error))
})





app.listen(process.env.PORT || 3000)