var admin = require('firebase-admin'),
	serviceAccount = require('../serviceAccountKey.json'),
	firebase = require('firebase');
var config = {
    apiKey: "AIzaSyDfLPBrtxBDL3dekc6TdF7zEySEDnTJVMI",
    authDomain: "ecgproject-edcc2.firebaseapp.com",
    databaseURL: "https://ecgproject-edcc2.firebaseio.com",
    storageBucket: "ecgproject-edcc2.appspot.com",
  };

  firebase.initializeApp(config);

  admin.initializeApp({
  				credential: admin.credential.cert(serviceAccount)
				});
			var db = admin.firestore();

  //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

// module.exports = firebase;


module.exports = firebase;