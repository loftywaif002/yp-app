var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./models/user');
var cors = require('cors');
var bcrypt = require('bcrypt');
var Sequelize = require('sequelize');

//Invoke an instance of express application.
var app = express();
app.use(cors());
app.options('*', cors());
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'yp-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};


app.route('/signup')
    .get(sessionChecker, (req, res) => {
        
    })
    .post((req, res) => {
    	console.log(`first name is ${req.body.firstname}`);
    	console.log(`Email is ${req.body.email}`);
        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            zipcode: req.body.zipcode
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.send(user.dataValues);
            console.log(user.dataValues.firstname);
        })
        .catch(error => {
            res.redirect('/signup');
        });
});

// route for user name updates
app.route('/updatenames')
    .get(sessionChecker, (req, res) => {
        
    })
  .put((req, res) => {
        var email = req.body.email;
         var firstname = req.body.firstname;
          var lastname = req.body.lastname;

        User.findOne({ where: { email: email } }).then(function (user) {
            if (!user) {
                res.sendStatus(404);
            }else {
                user.updateAttributes({
                 firstname : firstname,
                 lastname : lastname,
                });
                console.log(user.dataValues);
                res.send(user.dataValues);
            }
        });
  });


// route for user name updates
app.route('/updateEmails')
    .get(sessionChecker, (req, res) => {
        
    })
  .put((req, res) => {
        var email = req.body.email;
        var updatedEmail = req.body.newemail;
        User.findOne({ where: { email: email } }).then(function (user) {
            if (!user) {
                res.sendStatus(404);
            }else {
                user.updateAttributes({
                 email : updatedEmail
                });
                console.log(user.dataValues);
                res.send(user.dataValues);
            }
        });
  });


// route for user password updates
app.route('/updatePassword')
    .get(sessionChecker, (req, res) => {
        
    })
  .put((req, res) => {
        var email = req.body.email;
        var updatedPassword = req.body.newpassword;

        User.findOne({ where: { email: email } }).then(function (user) {
            if (!user) {
                res.sendStatus(404);
            }else {
                const salt = bcrypt.genSaltSync();
                var hashedPass = bcrypt.hashSync(updatedPassword, salt);
                user.updateAttributes({
                 salt: salt,   
                 password : hashedPass
                });
                console.log(user.dataValues);
                res.send(user.dataValues);
            }
        });
  });

// route for user password updates
app.route('/updateLocation')
    .get(sessionChecker, (req, res) => {
        //Implement GET
    })
  .put((req, res) => {
        var email = req.body.email;
        var address = req.body.address;
        var city = req.body.city;
        var state = req.body.state;
        var zipcode = req.body.zipcode;
        var phone = req.body.phone;
        var website = req.body.website;
        var serviceArea = req.body.serviceArea;
        var businessName = req.body.businessName;

        User.findOne({ where: { email: email } }).then(function (user) {
            if (!user) {
                res.sendStatus(404);
            }else {
                user.updateAttributes({
                  address: address,
                  city: city,
                  state: state,
                  zipcode: zipcode,
                  phone : phone,
                  website : website,
                  service_areas: serviceArea,
                  business_name : businessName
                });
                console.log(user.dataValues);
                res.send(user.dataValues);
            }
        });
  });

// route for bussiness name query
app.route('/query')
    .get((req, res) => {
         console.log(req);
    })
  .post((req, res) => {
     //post implementation
     var query = req.body.query;
     User.findAll({ where: { business_name: { [Sequelize.Op.like]: '%'+query+'%' } } }).then(function (user) {
            if (!user) {
                res.sendStatus(404);
            }else{
                var jsonString = JSON.stringify(user);
                var obj = JSON.parse(jsonString);
                console.log(obj);
                res.json(obj);
            }
        });
  });

// yp route for User Logout

app.post('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


/*Authorization/Database access=>Code goes here**Important=Above the block of code below*/


if(process.env.NODE_ENV !== 'production') {
	const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
	app.use(webpackMiddleware(webpack(webpackConfig)));
}else{
   app.use(express.static('dist')); /*opens up dist directory for the app*/
   app.get('*',(req,res)=>{
   	res.sendFile(path.join(__dirname, 'dist/index.html'));
   });
}

app.listen(process.env.PORT || 5000, () => console.log('Listening'));