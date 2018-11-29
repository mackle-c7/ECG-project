const express = require('express'),
	router = express.Router(),
	firebase= require('../bin/firebase_setup')


router.get('/login', (req, res) => {

	  res.render('login')
})

router.post('/login', (req,res) => {

//Gets input from user on login page
var username = req.body.username,
    password = req.body.password;

//Logs user in using Firebase authentication
 firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
  //handles error messages
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage+errorMessage)

});

//checks for state change in authentication and then redirects
 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    res.redirect('/dashboard')
  } else {
    res.redirect('/login')
  }

})

})


module.exports = router;