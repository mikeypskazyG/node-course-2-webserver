//expressjs.com express framework has its own website
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
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
// app.use((req, res, next) => {
//   res.render('maint.hbs');
// });
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
app.get('/bad', (req, res) => {
  res.send({//'baddd page'
//     errorMessage: 'unable to fulfill this request'
      errorMessage: 'unable to HANDLE this request'  //THIS IS AN OBJECT !!
  });
});
// TO GO TO THIS PAGE: TYPE in browser: localhost:3000/bad
app.listen(3000, ()=> {
  console.log('server is up on port 3000');
}); //common port for developing locally
