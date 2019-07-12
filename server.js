const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();  // handler for http request
hbs.registerPartials(__dirname +'/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();  // this uses expressjs, docs found here at expressjs.com
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\r\n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  console.log(log);
  next();
});
// app.use((req, res, next) =>{
//   res.render('maint.hbs');
// })
app.use(express.static(__dirname +'/public')); // middleware , look at expressjs.com

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle: ' Hello world#$! HOME PAGE',
    welcomeMessage: 'welcome to my website'
  })
  //res.send('<h1>Hello Express!</h1>');

});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
  //res.send('About page');
});
//Challenge create route at /bad, send back json message with errm message property
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'mikes projects'
  });
  //res.send('About page');
});
app.get('/bad', (req, res) => {
  res.send({//'baddd page'
//     errorMessage: 'unable to fulfill this request'
      errorMessage: 'unable to HANDLE this request'  //THIS IS AN OBJECT !!
  });
});
// TO GO TO THIS PAGE: TYPE in browser: localhost:3000/bad
app.listen(port, ()=> {
  console.log(`server is up on port ${port}`);
}); //common port for developing locally

//add a new projects page to website,
//rener a new url template, new html page, porfolio pla
//write partials in header.hbs
//test locally , make commit
//deploy lve to web git push heroku

//expressjs.com express framework has its own website

/*
  Date of use:
  IDE: Atom 1.25
  Notes: Launched on website: to launch locally:
    launch cmd window, navigate to folder, type nodemon server.js, and lanunch in
    the browser by typing localhost:3000.
    To quit local server: CTRL+C to quit
    to update heroku cli, go to cli.heroku.com
    url - http://mikesdemo.herokuapp.com/
    STATUS - need to update heroku cli and re deploy to heroku ( see gmail on this)
    helpful website: http://expressjs.com/

    to create a timestamp, create new variable
    var now = new Date().toString();
*/
