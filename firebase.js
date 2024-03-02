


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvnOV1V4FCZGrUPoI4ICcuYrkEv4M4yo8",
  authDomain: "pharmalister.firebaseapp.com",
  projectId: "pharmalister",
  storageBucket: "pharmalister.appspot.com",
  messagingSenderId: "1028020644936",
  appId: "1:1028020644936:web:6a87be6eb7a37cbea4fc7d"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const formsDb = firestore.collection("forms");


//extract form data
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', (e) => {

  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  let email = document.getElementById('email').value;
  let category = document.getElementById('category').value;
  let description = document.getElementById('description').value;

  if(name === '' || email === '' || category === '' || description === ''){
    alert('Please fill all fields');
    return;
  }

  e.preventDefault();

  let data = {
    name: name,
    email: email,
    phone: phone ?? '',
    category: category,
    description: description,
    date: new Date().toISOString(),
  };
  addDocumentToFirestore(data)
    .then(() => {
      alert('Data submitted successfully! We will get back to you soon.');
    })
    .catch((error) => {
      alert('Error submitting data. Please try again later.');
      console.log('Error adding data: ' + error);
    });
});


// Function to add a document to Firestore
const addDocumentToFirestore = (data) => {
  showLoader();
   return formsDb.doc(data.date).set(data)
    .then(() => {
      console.log('Document successfully written!');
      hideLoader();
      clearForm();
      return true;
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      hideLoader();
      throw error;
    });
};


const showLoader = () => {
  let preloader = document.getElementById('preloader');
  preloader.style.display = 'block';
}

const hideLoader = () => {
  let preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
}

const clearForm = () => {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('description').value = '';
}





