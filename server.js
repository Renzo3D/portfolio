const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.static("public"));
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/',(req, res) => {

    const data = {
        person:{
            firstName : 'Renzo',
            lastName: 'Pozo',
        }
    }

    res.render('index', data);
});

app.get('/contact',(req, res) =>{
    res.render('contact');
});

app.post('/thanks',(req, res) =>{
    const formData = req.body;
    formData['merge_fields'] = {
        FNAME: req.body.FNAME, 
        LNAME: req.body.LNAME
    }
    console.log(formData);
    //console.log(req.body);
    //data to send found in req.body
    // {"email_address":"katherinek33@gmail.com", "status":"subscribed", "merge_fields" : { FNAME: '', LNAME: ''}}
    //4f6c5697684af14a6163d6f4b619b1a2-us18
    axios.post('https://us18.api.mailchimp.com/3.0/lists/a54a57f485/members', formData, { 
        headers: {
            "Authorization": "Basic dGVzdDo0ZjZjNTY5NzY4NGFmMTRhNjE2M2Q2ZjRiNjE5YjFhMi11czE4",
            "Content-Type" : "application/json" 
        }
    }).then(response => {
        res.render('thanks', { contact : req.body })
    });
    // Do some work with req.query.firstName
    // https://facebook.us18.list-manage.com/subscribe/post?u=b9e4353b25de72e7597454479&amp;id=a54a57f485
});

app.listen(8080, () => {
    console.log('Listening at http://localhost:8080');
})

