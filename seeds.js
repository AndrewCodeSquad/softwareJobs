var mongoose = require("mongoose"),
    Company  = require("./models/company"),
    Comment  = require("./models/comment");
 
var data = [
    {
        name: "Athena Health", 
        image: "https://www.athenahealth.com/sites/ahcom/themes/ah_theme/assets/images/logo-color.svg",
        description: "Focus on the work that matters most: Unleash yourself from the repetitive tasks, data hiccups, and time-stealing technology that stand between you and your best patient care."
    },
    {
        name: "Kronos", 
        image: "http://codesquad-test.org/bootcamp/Kronos_logo.png",
        description: "Workforce solutions--- Guided by decades of experience and innovation, Kronos® offers the industry’s most powerful suite of tools and services to manage and engage your entire workforce from pre-hire to retire. And because workforce needs are constantly changing, Kronos solutions are designed to evolve with you to help meet the challenges you face every day — regardless of your industry or where you do business."
    },
    {
        name: "SmartBear Software", 
        image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png",
        description: "Software powers the world. At SmartBear, we know that for every application, there is a software team working hard behind the scenes to keep users happy. We create the software tools that development, testing, and operations teams use to deliver the highest quality and best performing software possible, shipped at seemingly impossible velocities. With products for code review, API and UI level testing, and monitoring across mobile, web and desktop applications, we equip every member of your team with tools to ensure quality at every stage of the software cycle."
    },
    {
        name: "Wayfair", 
        image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png",
        description: "Wayfair offers a zillion things home. With one of the world's largest online selections of furniture, home furnishings, décor and goods, including more than ten million products from over 10,000 suppliers, Wayfair helps people find the perfect product at the right price. Our extensive selection and superior customer service coupled with the convenience of online shopping, make it easier than ever before to find exactly what you want for your home at a price you can afford."
    }
]
 
function seedDB(){
   //Remove all companies
   Company.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed companies!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
             //add a few companies
            data.forEach(function(seed){
                Company.create(seed, function(err, company){  // data instead of company?
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Added a company");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     company.comments.push(comment);
//                                     company.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
                    }
                });
            });
//         });
    }); 
}
 
module.exports = seedDB;