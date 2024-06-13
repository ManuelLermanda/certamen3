// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsM81t_D-EhMmOvK8omXNW-biGZKWrqTo",
  authDomain: "evaluacion3-61018.firebaseapp.com",
  projectId: "evaluacion3-61018",
  storageBucket: "evaluacion3-61018.appspot.com",
  messagingSenderId: "800597593922",
  appId: "1:800597593922:web:405e584dc773c8999c42db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
//función para guardar datos
export const save = (emp) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento
    //collection es una función de firestore que recibe la base de datos y la colección
    addDoc(collection(db, 'Reserva'), emp)
}
//función que trae todos los documentos de la colección
export const getData = (data) => {
    //onSnapshot es el método que permite traer todos los documentos y asignarlos a variable
    onSnapshot(collection(db, 'Reserva'), data)
}

export const remove = (id) => {
  //deleteDoc es una función de firestore que permite eliminar un documento 
  //doc es una función de firestore que permite traer un documento por su id
  deleteDoc(doc(db, 'Reserva', id))
}

//selectOne función que me permite selección un documento 
//getDoc es la función firestore que permite obtener un documento por su id
export const selectOne = (id) => getDoc(doc(db, 'Reserva', id))

//función que permite editar un documento 
export const edit = (id, emp) => {
  //updateDoc es la función de firestore que permite modificar un documento
  updateDoc(doc(db, 'Reserva', id), emp) //emp contiene los datos que reemplazarán el documento
}

