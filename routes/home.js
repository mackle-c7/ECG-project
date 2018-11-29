const express = require('express'),
	router = express.Router(),
	firebase = require('firebase');

router.get('/home', (req, res) => {

	var config = {
    apiKey: "AIzaSyDfLPBrtxBDL3dekc6TdF7zEySEDnTJVMI",
    authDomain: "ecgproject-edcc2.firebaseapp.com",
    databaseURL: "https://ecgproject-edcc2.firebaseio.com",
    projectId: "ecgproject-edcc2",
    storageBucket: "ecgproject-edcc2.appspot.com",
    messagingSenderId: "767794013524"
  };

  firebase.initializeApp(config);

	var ref = firebase.app().database().ref();

ref.on("value", function(snapshot) {
  console.log(snapshot.val('Heart Rates'));


});
    res.render('login')
})

module.exports = router;
