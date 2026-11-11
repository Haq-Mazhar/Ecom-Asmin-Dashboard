import { firebaseConfig } from './config/firebase_Config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getFirestore, collection, where, getDocs, query, doc, setDoc, serverTimestamp,
    deleteDoc,updateDoc } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";



const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const catName = document.getElementById("catName")
const catBtn = document.getElementById("catBtn")
const uptBtn = document.getElementById("uptBtn")
let cat = document.getElementById("cat") 

let loading = document.getElementById("loading")

catBtn.addEventListener("click", addNewCategory)

let selectedItem = null


async function addNewCategory() {
    const CategoryRef = doc(collection(db, "Category"));
    await setDoc(CategoryRef, {
        categoryName: catName.value,
        categoryKey: CategoryRef.id,
        createdAt: serverTimestamp()
    })
   
    getAllCategory()

}

async function getAllCategory() {
    const CategoryRef = collection(db, "Category");
    const data = await getDocs(CategoryRef)
    console.log(data.docs)
    loading.style.display = "none"
    cat.innerHTML = `
     <tr>
                    <th>S.no</th>
                    <th>Category Name</th>

                    <th>Status</th>
                </tr>
    `
    var index = 1;
    for (var value of data.docs) {
        console.log(value.data())
        cat.innerHTML += `
         <tr>
                    <th>${index}</th>
                    <th>${value.data()["categoryName"]}</th>


                    <th>
                        <button id=${value.data()['categoryKey']} class='btn btn-success' onclick='editCatagory(this)'>Edit</button>    
                        <button id=${value.data()['categoryKey']} class='btn btn-danger' onclick='DeleteDoc(this)'>Delete</button>    

                    </th>
                </tr>
        `
        index+=1;

    }

}


function editCatagory(e){
    console.log(e.id)
    catBtn.classList.add("d-none")
    uptBtn.classList.remove("d-none")
    uptBtn.addEventListener("click",uptadeCatagory)
    selectedItem = e
    const categoryName = e.parentNode.parentNode.children[1].innerText
    catName.value= categoryName

}

async function uptadeCatagory(){
    console.log(selectedItem.id)

    const categoryRef = doc(db,"Category",selectedItem.id)
     await updateDoc(categoryRef,{
        categoryName:catName.value
     })
     .then((val)=>{
        alert("Uptade Item")
        getAllCategory()
        catBtn.classList.remove("d-none")
        uptBtn.classList.add("d-none")
        catName.value=""
     })
     .catch((e)=>{
        console.log(e)
    })


}


async function DeleteDoc(e){
    const categoryRef = doc(db,"Category",e.id)

    await deleteDoc(categoryRef)
    .then((val)=>{
        alert("Delete Item")
        e.parentNode.parentNode.remove()
        getAllCategory()

    })
    .catch((e)=>{
        console.log(e)
    })

}

window.DeleteDoc=DeleteDoc
window.editCatagory=editCatagory



getAllCategory()



 