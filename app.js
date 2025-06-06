// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyANaNH7vhjY8J5s1fXEV1HkJYVyMX1MZ8c",
  authDomain: "safenest-86239.firebaseapp.com",
  projectId: "safenest-86239",
  storageBucket: "safenest-86239.appspot.com",
  messagingSenderId: "953155362365",
  appId: "1:953155362365:web:045cd9f3321b09a1edd454",
  measurementId: "G-DJKXC1E5MV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("✅ Registered Successfully"))
    .catch(err => alert("❌ " + err.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("auth-container").style.display = "none";
      document.getElementById("app-container").style.display = "block";
    })
    .catch(err => alert("❌ " + err.message));
}

function logout() {
  auth.signOut().then(() => {
    document.getElementById("auth-container").style.display = "block";
    document.getElementById("app-container").style.display = "none";
  });
}

function savePassword() {
  const user = auth.currentUser;
  const site = document.getElementById("site").value;
  const siteUser = document.getElementById("siteUser").value;
  const sitePass = document.getElementById("sitePass").value;

  if (user) {
    db.collection("users").doc(user.uid).collection("passwords").add({
      site, siteUser, sitePass
    }).then(() => {
      alert("🔐 Password Saved");
      document.getElementById("site").value = '';
      document.getElementById("siteUser").value = '';
      document.getElementById("sitePass").value = '';
    });
  }
}

function loadPasswords() {
  const user = auth.currentUser;
  const list = document.getElementById("password-list");
  list.innerHTML = "";

  if (user) {
    db.collection("users").doc(user.uid).collection("passwords").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const item = document.createElement("li");
          item.textContent = `${data.site} | ${data.siteUser} | ${data.sitePass}`;
          list.appendChild(item);
        });
      });
  }
      }
    
