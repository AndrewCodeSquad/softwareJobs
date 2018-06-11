var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var listOfcompanies = [
  { name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
  { name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
  { name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" },
  { name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
  { name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
  { name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" },
  { name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
  { name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
  { name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" },
  { name: "SmartBear Software", image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
  { name: "Wayfair", image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
  { name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" }
]

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static('css'));

app.get('/', (req, res) => res.render('landing'));

app.get('/companies', (req, res) => { res.render('companies', {companies: listOfcompanies}) });
app.post('/companies', (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  listOfcompanies.push({name: name, image: image});
  res.redirect('/companies');
});
app.get('/companies/new', (req, res) => {res.render('newCompany.ejs')});

app.listen(3000, () => {console.log('Software Jobs Database Server listening on port 3000!')});