var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

// mongoose.connect('mongodb://localhost/softwareJobs');
mongoose.connect('mongodb://test:test123@ds137826.mlab.com:37826/softwarejobs');

// Schema set-up using Mongoose
var companySchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Company = mongoose.model('Company', companySchema);

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
  Company.findById(req.params.id, (err, foundCompany) => {
    if(err){
      console.log('THERE WAS AN ERROR: ' + err)
    } else {
      // Render show.ejs with data in foundCompany
      res.render('show', {company: foundCompany});
    }
  })
});

app.listen(3000, () => {console.log('Software Jobs Database Server listening on port 3000!')});

// Company.create(
//   {
//     name: "SmartBear Software", 
//     image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png",
//     description: "Software powers the world. At SmartBear, we know that for every application, there is a software team working hard behind the scenes to keep users happy. We create the software tools that development, testing, and operations teams use to deliver the highest quality and best performing software possible, shipped at seemingly impossible velocities. With products for code review, API and UI level testing, and monitoring across mobile, web and desktop applications, we equip every member of your team with tools to ensure quality at every stage of the software cycle."
//   }, function (err, company){
//   if(err){
//     console.log(err)
//   } else {
//     console.log('NEWLY ADDED COMPANY: ');
//     console.log(company);
//   }
// });

// var listOfcompanies = [
//   { name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
//   { name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" },
//   { name: "Amwell", image: "https://www.americanwell.com/wp-content/themes/americanwell/assets/images/aw/logo-white.png" }
// ]
