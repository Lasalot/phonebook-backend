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

function getNextSequenceValue(sequenceName) {
    var sequenceDocument = db.collection('counters').findOneAndReplace({
        query: { _id: sequenceName },
        update: { $inc: { sequence_value: 1 } },
        new: true
    });
    console.log(sequenceDocument.sequence_value)
    return sequenceDocument.sequence_value;
}

app.post('/new-employee', (req, res) => { //**create database info */
    backURL = req.header('Referer') || '/';
    collection.findOne({
        email: req.body.email
    }, function (err, userExists) {
        if (userExists) {
            res.redirect('/emailExists')


        } else {
            collection.insertOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                image: req.body.image,
                email: req.body.email,
                lastPassEmail: req.body.lastPassEmail,
                title: req.body.title,

            }).then(result => { console.log(result) }).catch(error => console.error(error))
            setTimeout((function () { res.redirect('/' + '?' + 'username=' + process.env.ID + '&' + 'pass=' + process.env.PASS) }), 2000);

        }
    })
})

//DELETE EMPLOYEE

app.post('/del-employees', (req, res) => { //FOLYT KÖV//
    db.collection('employees').deleteOne({
        email: req.body.email
    }).then(res.redirect('/employees')).catch(error => console.error(error))
})


// UPDATE EMPLOYEE

app.post('/patch-employee', (req, res) => {
    collection.findOne({
        email: req.body.email
    }, function (err, foundUser) {
        if (foundUser) {
            console.log(foundUser)
        } else {
            console.log("no user")
        }
    })
})



app.listen(process.env.PORT || 3000)