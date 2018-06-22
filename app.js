var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Company    = require('./models/company.js'),  // .js extension is optional here
    Comment    = require('./models/comment.js'),
    seedDB     = require('./seeds.js');

mongoose.connect('mongodb://localhost/softwareJobs');  // local database on CodeAnywhere
// mongoose.connect('mongodb://test:test123@ds137826.mlab.com:37826/softwarejobs');  // mLab database
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static('css'));
// seedDB();  // seed the database with sample data to aid in initial debugging


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
app.get('/companies/new', (req, res) => { res.render('companies/new') });

// CREATE NEW COMPANY IN DATABASE
app.post('/companies', (req, res) => {
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
// ===================
app.get('/companies/:id/comments/new', (req, res) =>{
  Company.findById(req.params.id, (err, foundCompany) => {
    if(err){
      console.log('THERE WAS AN ERROR: ' + err);
    } else {
      res.render('comments/new', {company: foundCompany});
    }
  })
});

app.post('/companies/:id/comments', (req, res) => {
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

  // connect new comment to company
  // redirect to company show page
});

app.listen(3000, () => {console.log('Software Jobs Web Server listening on port 3000!')});
