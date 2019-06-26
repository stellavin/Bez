import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyBuYwjuPv7MYo-wlwhNYquJVYShg1WqrZQ",
    authDomain: "nenebez-bcaf1.firebaseapp.com",
    databaseURL: "https://nenebez-bcaf1.firebaseio.com",
    projectId: "nenebez-bcaf1",
    storageBucket: "nenebez-bcaf1.appspot.com",
    messagingSenderId: "527122886768",
    appId: "1:527122886768:web:77e7357f7fb0f410"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
