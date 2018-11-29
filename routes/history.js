const express = require('express'),
	router = express.Router(),
	firebase = require('../bin/firebase_setup'),
	app = require('../app'),
	admin = require('firebase-admin'),
	functions = require('firebase-functions'),
	serviceAccount = require('../serviceAccountKey.json')
	
router.get('/history', (req, res) => {
	var currentUser = firebase.auth().currentUser;

	var labels = [],
	HRs = [],
	times = []
	
		if(currentUser){
			 var db = admin.firestore();
				var heartRateRef = db.collection(currentUser.email);
			
			var allHeartRates = heartRateRef.get()
			  .then(snapshot => {
			    snapshot.forEach(doc => {
		
			    
			      labels.push(doc.data().label)
			      HRs.push(doc.data().hr)
			      times.push(doc.data().date)

			    });
			    res.render('history', {labels: labels, HRs: HRs, times:times, user: currentUser.email})

			  })
			  .catch(err => {
			    console.log('Error getting documents', err);
			  });		
			

		}else{
			res.redirect('/login')
		}
	 
})

module.exports = router;