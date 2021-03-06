var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    passport	    = require('passport'),
    LocalStrategy = require('passport-local'),
    Company       = require('./models/company'),  // .js extension is optional here
    Comment       = require('./models/comment'),
    User 			    = require('./models/user'),
    seedDB        = require('./seeds');

// mongoose.connect('mongodb://localhost/softwareJobs');  // local database on CodeAnywhere
mongoose.connect('mongodb://test:test123@ds137826.mlab.com:37826/softwarejobs');  // mLab database
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/css', express.static('css'));
// seedDB();  // seed the database with sample data to aid in initial debugging

// PASSPORT CONFIG
app.use(require('express-session')({
	secret: 'CodeSquad grads are the best',
	resave: false,
	saveUninitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom middleware to pass currentUser to all EJS templates
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

// WEBSITE HOME PAGE
app.get('/', (req, res) => res.render('landing'));

// INDEX OF COMPANIES (main companies page)
app.get('/companies', (req, res) => { 
  //   Get all companies from the database
  Company.find({}, (err, allCompanies) => {
    if(err){
      console.log('THERE WAS AN ERROR: ' + err);
    } else {
      res.render('companies/index', {companies: allCompanies});
    }
  });
});

// GET THE "NEW COMPANY" FORM
app.get('/companies/new', isLoggedIn, (req, res) => { res.render('companies/new') });

// CREATE NEW COMPANY IN DATABASE
app.post('/companies', isLoggedIn, (req, res) => {
  // Save user input from request body into individual variables
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  // Create a new company and save to database
  Company.create({
    name: name,
    image: image,
    description: desc
  }, function (err, newCompany){
    if(err){
      console.log(err);
    }
  })
  // Redirect back to /companies
  res.redirect('/companies');
});

// SHOW INDIVIDUAL COMPANY
app.get('/companies/:id', (req, res) => { 
  // "comments" is an array, so .populate() adds actual comments data into foundCompany
  Company.findById(req.params.id).populate('comments').exec((err, foundCompany) => {
    if(err){
      console.log('THERE WAS AN ERROR: ' + err)
    } else {
      // Render show.ejs with data in foundCompany
      res.render('companies/show', {company: foundCompany});
    }
  })
});

// ==================
//   COMMENT ROUTES
// ==================

// Show comment form
app.get('/companies/:id/comments/new', isLoggedIn, (req, res) =>{
  Company.findById(req.params.id, (err, foundCompany) => {
    if(err){
      console.log('THERE WAS AN ERROR: ' + err);
    } else {
      res.render('comments/new', {company: foundCompany});
    }
  })
});

app.post('/companies/:id/comments', isLoggedIn, (req, res) => {
  // look up company using ID
  Company.findById(req.params.id, (err, foundCompany) => {
    if(err){
      console.log(err);
      res.redirect('/companies');
    } else {
      // create new comment in db
      Comment.create(req.body.comment, (err, newComment) => {
        if(err){
          console.log(err);
        } else {
          foundCompany.comments.push(newComment);
          foundCompany.save();
          res.redirect('/companies/' + foundCompany._id);
        }
      })
    }
  });
});


// ==================
//   AUTH ROUTES
// ==================

// Show registration form
app.get('/register', (req, res) => {
	res.render('register');
});

// Save new user to database
app.post('/register', (req, res) => {
	// Put username from HTTP request into newUser variable
	var newUser = new User({ username: req.body.username });
	// .register saves username to db and hashes the password before saving it as well
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log('THERE WAS AN ERROR: ' + err);
			return res.render('register');
		}
		// Once user is signed up, we log them in and redirect to main companies page
		passport.authenticate('local')(req, res, () => { res.redirect('/companies'); });
	});
});

// Show login form
app.get('/login', (req, res) => { res.render('login'); });

// Check login credentials against the database
app.post('/login', passport.authenticate('local', {
		successRedirect: '/companies',
		failureRedirect: '/login'
	}), function(req, res){
});

// Logout
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

app.listen(3000, () => {console.log('Software Jobs Web Server listening on port 3000!')});
