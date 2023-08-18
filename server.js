const express = require('express');
const path = require('path');


const dotenv = require('dotenv');

const bodyParser = require('body-parser');
const {check, validationResult }  = require('express-validator');
const nodemailer = require('nodemailer');





const app = express();


const appRoutes = require('./routes/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




dotenv.config({ path: 'config/config.env' });

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(appRoutes);
// console.log(process.env.PORT);

// if (process.env.NODE_ENV !== 'PRODUCTION') {
//     require('dotenv').config({ path: 'backend/config/config.env' });
// }

const PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
   
});



app.get('/', (req, res) => {
    res.render('index')
});


//Home contact to joe Bravo 

app.post('/', [
    //Checking for validation in input from user
     check('name', 'Username must not be empty')
     .exists()
     .isLength({ min: 3 }),
 
     check('email', 'Email is not valid')
     .isEmail()
     .normalizeEmail(),
 
     check('cellnumber', 'Please, enter a valid Phone number!')
     .exists()
     .isLength({ min: 9 }),
 
     check('message', 'Please, message must not be empty!')
     .exists()
     .isLength({ min: 10 }),
 
 
 
 
 
 
 ], (req, res) => {
     //Checking for validation in input from user
     const errors = validationResult(req);
     if(!errors.isEmpty()) {
         // return res.status(422).json({errors: errors.array()});
         console.log("")
         const alert = errors.array()
          //  return alert;
        res.render('', {
             alert
            
         })
     }  else {
 
      let transporter = nodemailer.createTransport({
       
       host: process.env.HOST_NAME,
       port: 465,
       secure: true,
       auth: {
         user: process.env.RECEIVER_EMAIL,
         pass: process.env.EMAIL_PASS,
       },
     })
     let mailOptions = {
       from: process.env.RECEIVER_EMAIL,       //process.env.RECEIVER_EMAIL, //'"Moses Darko" <moses@themdsoft.com>', // sender address
       to: process.env.RECEIVER_EMAIL, // list of receivers
       name: req.body.name,
       sender: req.body.email,
       phone: req.body.cellnumber,
       subject: 'Help  '+ req.body.name , // Subject line
       text:
       'Sender email: ' +
         req.body.email +
         '\n\n' +
         'Name: ' +
         req.body.name +
         '\n\n' +
         'phone number:  ' +
         req.body.cellnumber + '\n\n' +
         ' Message:' + 
         req.body.message, // plain text body
   
       // html: '<b>NodeJS Email Tutorial</b>' // html body
     }
   
     transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
         return console.log(error)
       }
      console.log('Message %s sent: %s', info.messageId, info.response)
      res.render('submitted');
     })
 
     }
     
     // console.log(req.body)
   });


app.get('/contact-us', (req, res) => {
    res.render('contactForm');
} );



app.post('/contact-us', [
    //Checking for validation in input from user
     check('username', 'Username must not be empty')
     .exists()
     .isLength({ min: 3 }),
 
     check('email', 'Email is not valid')
     .isEmail()
     .normalizeEmail(),

     check('state', 'State must not be empty')
     .exists()
     .isLength({ min: 4 }),

     check('zip', 'Zip code must not be empty')
     .exists()
     .isNumeric()
     .isLength({ min: 5 }),
 
     check('cellnumber', 'Please, enter a valid Phone number!')
     .exists()
     //.isNumeric()
     .isLength({ min: 9 }),


 
     check('message', 'Please, message must not be empty!')
     .exists()
     .isLength({ min: 10 }),
 

 
 ], (req, res) => {
     //Checking for validation in input from user
     const errors = validationResult(req);
     if(!errors.isEmpty()) {

    console.log("Please, Value must entered correctly")
        // return res.status(422).json({errors: errors.array()});
      // req.body.errorFeedback =  res.status(422).json({errors: errors.array()});
         const alert = errors.array()
          return alert;
        res.render('', {
          alert
            
         })
     }  else {
 
         let transporter = nodemailer.createTransport({
       host: process.env.HOST_NAME,
       port: 465,
       secure: true,
       auth: {
         user: process.env.RECEIVER_EMAIL,
         pass: process.env.EMAIL_PASS,
       },
     })
     let mailOptions = {
       from: process.env.RECEIVER_EMAIL, //'"Moses Darko" <moses@themdsoft.com>', // sender address
       to: process.env.RECEIVER_EMAIL, // list of receivers
       name: req.body.username,
       sender: req.body.email,
       phone: req.body.cellnumber,
       subject: req.body.username, // Subject line
       text:
       'Sender email: ' +
         req.body.email +
         '\n\n' +
         'Name: ' +
         req.body.username +
         '\n\n' +
         'Phone number:  ' + 
         req.body.cellnumber + '\n\n' +
         'State:  ' + req.body.state + '\n\n' +
         'Zip: ' + req.body.zip  + '\n\n' +
         
         ' Message: ' + 
         req.body.message + '\n\n' +' Email: ' + 
         req.body.inputMessage + '\n\n' +' Phone: ' + req.body.inputPhone + '\n\n' +' Disclaimer & Private policy: ' + req.body.PDsigned
         
         // plain text body
   
       // html: '<b>NodeJS Email Tutorial</b>' // html body
     }
   
     transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
         return console.log(error)
       }
     // console.log('Message %s sent: %s', info.messageId, info.response)
     res.render('submitted');
     })
 
     }
     
     // console.log(req.body)
   });



// console.log('Now the value for PORT is', process.env.PORT);

