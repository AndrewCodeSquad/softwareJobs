var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Company    = require('./models/company.js'),  // .js file extension is optional
    seedDB     = require('./seeds.js');

// seedDB();
mongoose.connect('mongodb://localhost/softwareJobs');
// mongoose.connect('mongodb://test:test123@ds137826.mlab.com:37826/softwarejobs');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static('css'));

app.get('/', (req, res) => res.render('landing'));

app.get('/companies', (req, res) => { 
  //   Get all companies from the database
  Company.find({}, (err, allCompanies) => {
    if(err){
      console.log('THERE WAS AN ERROR: ' + err);
    } else {
      res.render('companies', {companies: allCompanies});
    }
  });
  //   res.render('companies', {companies: listOfcompanies}) 
});

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
app.get('/companies/new', (req, res) => { res.render('newCompany.ejs') });

// SHOW route
app.get('/companies/:id', (req, res) => { 
  //  .populate() brings comments from other collection to display with Companies vs displaying ID only
  Company.findById(req.params.id).populate('comments').exec( (err, foundCompany) => {
    if(err){
      console.log('THERE WAS AN ERROR: ' + err)
    } else {
//       console.log("FOUND COMPANY: " + foundCompany);
      // Render show.ejs with data in foundCompany
      res.render('show', {company: foundCompany});
    }
  })
});

app.listen(3000, () => {console.log('Software Jobs Database Server listening on port 3000!')});

// var listOfcompanies = [
//   { name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
//   { name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" },
//   { name: "Amwell", image: "https://www.americanwell.com/wp-content/themes/americanwell/assets/images/aw/logo-white.png" }
// ]
