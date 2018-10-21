var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./models/user');
var cors = require('cors');

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
        //res.send({"Signup Page"});
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
        //res.sendFile(__dirname + '/public/login.html');
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