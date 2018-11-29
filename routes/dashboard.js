const express = require('express'),
	router = express.Router(),
	firebase = require('../bin/firebase_setup'),
	app = require('../app'),
	admin = require('firebase-admin'),
	functions = require('firebase-functions'),
	serviceAccount = require('../serviceAccountKey.json'),
	data = []
	
	//handles dashboard functionality
router.get('/dashboard', (req, res) => {
	var currentUser = firebase.auth().currentUser;
	
	//checks if user exists

		if(currentUser){
			 var db = admin.firestore();
				var heartRateRef = db.collection(currentUser.email);

			//gets user HR data from firebase database and stores it in an array named "data"
			//renders the dashboard page and passes data through and the user's email
			
			var allHeartRates = heartRateRef.get()
			  .then(snapshot => {
			    snapshot.forEach(doc => {
			    
			      data.push(doc.data().hr)

			    });
			    console.log(data)
			    res.render('dashboard', {data: data, user: currentUser.email})

			  })
			  .catch(err => {
			    console.log('Error getting documents', err);
			  });		
			

		}else{
			res.redirect('/login')
		}
	 
})

module.exports = router;