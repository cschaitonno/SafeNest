// AES Encryption functions using CryptoJS
// Add this script to your index.html:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

const masterKey = prompt("🔐 Enter your master key (don’t forget it!)");

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, masterKey).toString();
}

function decrypt(cipher) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, masterKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return "[Error decrypting]";
  }
}

function savePassword() {
  const site = prompt("🌐 Website:");
  const username = prompt("👤 Username:");
  const password = prompt("🔑 Password:");
  const entry = `${site} | ${username} | ${password}`;
  const encrypted = encrypt(entry);
  let vault = JSON.parse(localStorage.getItem("vault") || "[]");
  vault.push(encrypted);
  localStorage.setItem("vault", JSON.stringify(vault));
  alert("✅ Encrypted & Saved!");
  showVault();
}

function showVault() {
  const vault = JSON.parse(localStorage.getItem("vault") || "[]");
  app.innerHTML = "<h2>🔒 Encrypted Vault:</h2><ul>" + 
    vault.map(c => `<li>${decrypt(c)}</li>`).join("") + 
    "</ul>";
}

const app = document.getElementById("app");

const btn = document.createElement("button");
btn.innerText = "➕ Save New Password";
btn.onclick = savePassword;
document.body.appendChild(btn);

showVault();
