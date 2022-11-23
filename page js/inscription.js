import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import {getDatabase , ref , child , get , set , } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";



const firebaseConfig = {
  apiKey: "AIzaSyCvTxrF9KapxjinmFpFr9T07wsglr7l-9U",
  authDomain: "projet-javascript-46aba.firebaseapp.com",
  projectId: "projet-javascript-46aba",
  storageBucket: "projet-javascript-46aba.appspot.com",
  messagingSenderId: "45084340261",
  appId: "1:45084340261:web:419c721021c89204774fcc",
  measurementId: "G-QHG959LNVL",
  databaseURL : "https://projet-javascript-46aba-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const databaseRef = ref(database)

// ==================================================================
const form = document.getElementById("signin")

form.addEventListener('submit',(e) => {
     e.preventDefault()
     const nom = document.getElementById('nom').value
     const prenom = document.getElementById('prenom').value
     const date_naissance = document.getElementById('date').value
     const profession = document.getElementById('profession').value;
     const password = document.getElementById('password').value;
     const confirme_password = document.getElementById('confirme_password').value;
     const email = document.getElementById('email').value;
     const telephone = document.getElementById('telephone').value;
     const adresse = document.getElementById('adress').value;
     const organisation = document.getElementById('organisation').value;

     
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
     // Signed in 
          const user = userCredential.user;

          get(child(databaseRef , 'users/' + user.uid))
          .then(snapshot => {
               if(snapshot.exists()) { 
                    alert("Ce compte existe")
               } else {
                    set(ref(database ,  'users/' + user.uid ), {
                         nom : nom,
                         prenom : prenom,
                         date_naissance : date_naissance,
                         profession : profession,
                         password : password,
                         confirme_password : confirme_password,
                         email : email,
                         telephone : telephone,
                         adresse : adresse,
                         organisation : organisation
                    })
                     location.href = 'connexion.html';
                    form.reset();
               }
          })
         
          
     })
     .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          alert("Ce compte existe")
     });

})
