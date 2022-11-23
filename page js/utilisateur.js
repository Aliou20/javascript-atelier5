import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
          import { getAuth , signInWithEmailAndPassword ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
          // import {getFirestore , addDoc , collection , getDocs , query ,Timestamp , updateDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
          import {getDatabase , ref , child , get , set , push , onChildAdded, serverTimestamp , update} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
          
          const firebaseConfig = {
            apiKey: "AIzaSyCvTxrF9KapxjinmFpFr9T07wsglr7l-9U",
            authDomain: "projet-javascript-46aba.firebaseapp.com",
            projectId: "projet-javascript-46aba",
            storageBucket: "projet-javascript-46aba.appspot.com",
            messagingSenderId: "45084340261",
            appId: "1:45084340261:web:419c721021c89204774fcc",
            measurementId: "G-QHG959LNVL"
          };

          const app = initializeApp(firebaseConfig);
          const auth = getAuth();
          const database = getDatabase()
          const databaseRef = ref(database)
          const profil_name = document.getElementById("profil_name")
          // const db = getFirestore(app)

          auth.onAuthStateChanged(user => {
              
               get(child(databaseRef,'users/' + user.uid))
               .then(snapshot => {
                    if(snapshot.exists()) {
                         const data = snapshot.val()
                         profil_name.innerHTML = `${data.prenom} ${data.nom}`
                    }
               })


               // =======================================================================================


               
               const tbody = document.getElementById("tbody")
               
               const totalEffectif = document.getElementById('total_membre')
               let tableauMembres = []
               const postListRef = ref(database, 'membres');
               
               onChildAdded(postListRef, (data) => {
                    
                    let membres = data.val()
                    tableauMembres.push(data.val())
                   

                    // ========================= afficher membres ============================================================

                    let date = (new Date(membres.date_debut)).toDateString()
                    tbody.innerHTML += `
                         <tr>
                              <td>${membres.prenom} ${membres.nom}</td>
                              <td>${date}</td>
                              <td>300.000 FCFA</td>
                              <td>Progression</td>
                              <td>Terminer</td>
                              <td>
                                   <ion-icon name="eye-outline" class="affiche" id="${membres.idMembres}"></ion-icon>
                                   <ion-icon name="archive-outline" class="archiver" id="${membres.idMembres}"></ion-icon>
                                   <ion-icon name="ban-outline" class="bloquer" id="${membres.idMembres}"></ion-icon>
                              </td>
                         </tr>
                         `
                    
                    // ======================================= Afficher l'information du membre ================================

                    function informationMembres() {
                         const affiche = document.querySelectorAll('.affiche')
                         affiche.forEach((btns, index) => {
                              
                              btns.addEventListener('click', (e) => {
                                   const findAffiche = tableauMembres.find(btn => btn.idMembres === btns.id)
                                   const titreForm = document.getElementById("titre_form")
                                   const btnAjouterMembre = document.getElementById('btn_ajouter_membre')
                                   const btnModifierMembre = document.getElementById('btn_modifier_membre')
                                   
                                   btnModifierMembre.style.display = "block"
                                   btnAjouterMembre.style.display = "none"
                                   titreForm.innerHTML = "Modifier un membre"
                                   modal.style.display="block"

                            
                                   document.getElementById('nom').value = findAffiche.nom;
                                   document.getElementById('prenom').value = findAffiche.prenom;
                                   document.getElementById('date').value = findAffiche.date_naissance;
                                   document.getElementById('profession').value = findAffiche.profession;
                                   document.getElementById('password').value = findAffiche.password
                                   document.getElementById('confirme_password').value = findAffiche.confirme_password
                                   document.getElementById('email').value = findAffiche.email;
                                   document.getElementById('telephone').value = findAffiche.telephone;
                                   document.getElementById('adress').value = findAffiche.affiche
                                   document.getElementById('organisation').value = findAffiche.organisation

                                   // const nom = findAffiche.nom
                                   // const prenom = findAffiche.prenom
                                   // const date_naissance = findAffiche.date_naissance
                                   // const profession = findAffiche.profession
                                   // const password = findAffiche.password
                                   // const confirme_password = findAffiche.confirme_password
                                   // const email = findAffiche.email
                                   // const telephone = findAffiche.telephone
                                   // const adresse = findAffiche.adresse
                                   // const organisation = findAffiche.organisation

                                   console.log(findAffiche.idMembres);
                                  function updateMembre() {
                              
                                        update(ref(database,"membres/" + findAffiche.idMembres), {
                                             nom : document.getElementById('nom').value,
                                             prenom : document.getElementById('prenom').value,
                                             date_naissance : document.getElementById('date').value,
                                             profession : document.getElementById('profession').value ,
                                             password : document.getElementById('password').value ,
                                             confirme_password : document.getElementById('confirme_password').value,
                                             email : document.getElementById('email').value,
                                             telephone : document.getElementById('telephone').value , 
                                             adresse :  document.getElementById('adress').value ,
                                             organisation : document.getElementById('organisation').value

                                        })
                                  }
                                   // update(ref(database), 'membres/' + data.key)
                                   // Write the new post's data simultaneously in the posts list and the user's post list.
                                   // const updates = {};
                                   // updates['/posts/' + newPostKey] = postData;
                                   // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

                                   //  update(ref(db), updates);
                                   btnModifierMembre.addEventListener('click', (e) => {
                                        e.preventDefault();
                                        updateMembre()
                                                                      
                                   })
                                   
                              })
                         })
                    }
                    informationMembres()
               })
               
                    // let ref = getDocs(collection(db, "membres"))
                    
                    // .then(snapshot => {
                    //      let data = snapshot.docs;
                    //      data.forEach(element  => {
                    //           if(user.uid === element.data().id) {
                    //                membres.push(element.data())
                                   
                    //           }
                              
                    //      });

                         
                    //      membres.forEach((membre, index) => {
                    //           let date = new Date(membre.date_debut.seconds * 1000).toLocaleDateString()
                    //           let dateId = new Date(membre.date_debut.seconds * 1000)
     

                    //           tbody.innerHTML += `
                    //                <tr>
                    //                     <td>${membre.prenom} ${membre.nom}</td>
                    //                     <td>${date}</td>
                    //                     <td>300.000 FCFA</td>
                    //                     <td>progression</td>
                    //                     <td>Términeé</td>
                    //                     <td>
                    //                          <ion-icon name="eye-outline" id="${membre.idMembres}" class="masquer"></ion-icon>
                    //                          <ion-icon name="archive-outline" id="archiver" archiver="${membre.idMembres}"></ion-icon>
                    //                          <ion-icon name="ban-outline id="${membre.idMembres}""></ion-icon>
                    //                     </td>
                    //                </tr>
                    //           `
                    //      // ===================== total membre ================================================
                    //           index = index + 1
                    //           totalEffectif.innerHTML = `${index} Membres`

                    //      // ======================= vue =======================================================
                         
                    // })
                    //      const vues = document.querySelectorAll('.masquer')
                    //      vues.forEach(vue => {
                    //           vue.addEventListener('click', () => {
                    //                const find = membres.find(el => el.idMembres  === vue.id)
                                   
                    //           })
                    //      })
                         
                    // })
               
          // ================================================= Deconnection btn =====================================================

               const deconnection = document.getElementById("deconnection")
               const icon_deconnect = document.getElementById("caret-down-outline")
               icon_deconnect.addEventListener('click', () => {
               deconnection.style.display  = "flex"
               })

          
               deconnection.addEventListener("click", () => {
                    auth.signOut()
                    .then(() => {
                         alert("User is disconnect")
                         location.href = "connexion.html"
                    })
                    .catch(error => {
                         alert("User is not disconnect")
                    })
               })


          // ========================= modal =========================================

          const ajouter = document.getElementById("ajouter")
          const modal = document.getElementById("conteneur_modal")
          const close_modal = document.getElementById('conteneur_close')
          
          ajouter.addEventListener("click", () => {
               modal.style.display = "block"
          })
          close_modal.addEventListener('click', () => {
               modal.style.display = "none"
          })


     })


     // ======================================== AJOUTER UN MEMBRE ========================
     
     const form = document.getElementById('membre_form')
          
     form.addEventListener('submit', (e) => {
          e.preventDefault();
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
          

          auth.onAuthStateChanged(user => {
               // let date = (new Date(timestamp.toDate())).toDateString();           
               // =============== ajouter membre ===============
               // let ref = getDocs(collection(db, "membres"))
               // .then(snapshot => {
               //      snapshot.forEach(data => {

               //           if(data.exists()) {
               //                addDoc(collection(db , "membres"), {
               //                     id : user.uid,
               //                     idMembres : data.id,
               //                     nom : nom,
               //                     prenom : prenom,
               //                     date_naissance : date_naissance,
               //                     profession : profession,
               //                     password : password,
               //                     confirme_password : confirme_password,
               //                     email : email,
               //                     telephone : telephone,
               //                     adresse : adresse,
               //                     organisation : organisation,
               //                     date_debut : Timestamp.fromDate(new Date()),
               //                     archiver : false
               //                })
               //                .then(user => {
               //                     location.reload()   
               //                });
                              
               //           }
               //      })
               // })
               // .catch(user => {
               //      console.log(user);
               // })
               
               
               const postListRef = ref(database, 'membres');
               const newPostRef = push(postListRef);
               set(newPostRef, {
                    idAdmi : user.uid,
                    idMembres : newPostRef.key,
                    nom : nom,
                    prenom : prenom,
                    date_naissance : date_naissance,
                    profession : profession,
                    password : password,
                    confirme_password : confirme_password,
                    email : email,
                    telephone : telephone,
                    adresse : adresse,
                    organisation : organisation,
                    date_debut : serverTimestamp(),
                    archiver : false,
                    bloquer : false
               });
               
               location.reload()
          
          })

        
     })
