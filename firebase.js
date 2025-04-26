


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

if(submitBtn) {
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
}


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



//user login and data display from forms collection
let loginBtn = document.getElementById('loginBtn');

if(loginBtn) {
  loginBtn.addEventListener('click', (e) => {
  
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    if(email === '' || password === ''){
      alert('Please fill all fields');
      return;
    }
  
    e.preventDefault();
    showLoader();
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginForm').style.display = 'none';
        displayFormsData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        hideLoader();
        alert('Failed to login. Try again later');
        console.log('failed to login: ' + errorMessage);
      });
  });
}


const displayFormsData = () => {
  // Options for toLocaleString
  let options = {
    weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    timeZone: 'Europe/London', hour12: true
  };
  
 
  formsDb
  .orderBy('date', 'desc')
  .get()
    .then((querySnapshot) => {
      let tableDiv = document.getElementById('dataDiv');
      let count = 1;

      querySnapshot.forEach((doc) => {
        // Create a new div element
        const div = document.createElement('div');
        div.classList.add('m-4', 'p-4', 'shadow', 'bg-darker', 'border', 'border-warning');

        let date = new Date(doc.data().date);

        // Create the inner HTML content for the div
        div.innerHTML = `
          <h2><span>${count}. </span>${doc.data().name}</h2> <br/>
          <p>Date: ${date.toLocaleString('en-US', options)}</p>
          <p>Email: <a href="mailto:${doc.data().email}">${doc.data().email}</a></p>
          <p>Phone: <a href="tel:${doc.data().phone}">${doc.data().phone}</a></p>
          <p>Category: ${doc.data().category}</p>
          <p><span>Description: </span>${doc.data().description}</p>
        `;

        // Append the div to the table div
        tableDiv.appendChild(div);
        count++;
      });
      hideLoader();
    })
    .catch((error) => {
      hideLoader();
      console.log('Error getting documents: ', error);
    });
}





