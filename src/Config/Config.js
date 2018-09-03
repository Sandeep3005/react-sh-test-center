// Initialize Firebase
import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCocFzex6lEoygfgJ_ig5EzaivX5S0BKSk",
    authDomain: "sh-test-center.firebaseapp.com",
    databaseURL: "https://sh-test-center.firebaseio.com",
    projectId: "sh-test-center",
    storageBucket: "sh-test-center.appspot.com",
    messagingSenderId: "77749956808"
};
const settings = { timestampsInSnapshots: true };

const fire = firebase.initializeApp(config);
fire.firestore().settings(settings);

export { fire }
