import { firebaseConfig } from './config/firebase_Config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getFirestore, collection, where, getDocs, query } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";



const app = initializeApp(firebaseConfig)
const db = getFirestore(app) 

let userTable = document.getElementById("userTable")
let loading = document.getElementById("loading")
async function getAllCustomer() {
    const userRef = collection(db, "users")
    const data = await getDocs(userRef)
    console.log(data.docs)
    loading.style.display = "none"
    for (var index in data.docs) {
        console.log(data.docs[index].data())
        // console.log(value.data())
        let user = data.docs[index].data()
        if (user.imageUrl == undefined) {
            userTable.innerHTML += `
              <tr>
                    <th>${Number(index) + 1}</th>
                    <th>
                    
                 No Photo
                   </th>
                    <th>${user.email}</th>
                    <th>${user.name}</th>
                    
                    <th>${user.contactNo}</th>

                </tr>
            
            `


        }
        else {
            userTable.innerHTML += `
              <tr>
                    <th>${Number(index) + 1}</th>
                    <th>
                    <img src=${user.imageUrl} class="profile"/>
                   </th>
                    <th>${user.email}</th>
                    <th>${user.name}</th>
                    
                    <th>${user.contactNo}</th>

                </tr>
            
            `

        }


    }



}
getAllCustomer()