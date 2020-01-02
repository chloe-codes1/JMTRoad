import firebase from 'firebase';

let self = this;
 
// Initialize Firebase
var config = {
  apiKey: "enter api key",
    authDomain: "test-4e9a6.firebaseapp.com",
    databaseURL: "https://test-4e9a6.firebaseio.com",
    projectId: "test-4e9a6",
    storageBucket: "test-4e9a6.appspot.com",
    messagingSenderId: "90275796882"
};
firebase.initializeApp(config);
 
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload){
 
    const title = "Hello World";
    const options = {
            body: payload.data.status
    };
 
    return self.registration.showNotification(title,options);
});
